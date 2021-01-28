const { getAssetFromKV, mapRequestToAsset } = require('@cloudflare/kv-asset-handler')
const createApp = require('./entry-server').default
const clientManifest = require('../build/vue-ssr-client-manifest.json')
const { createRenderer } = require('../vendor/basic')

const renderer = createRenderer({
  clientManifest,
  inject: true,
  template: (content, context) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${context.head || ''}
    ${context.renderResourceHints(context)}
    ${context.renderStyles(context)}
  </head>
  <body>
    ${content}
    ${context.renderState(context)}
    ${context.renderScripts(context)}
  </body>
</html>
`,
})

async function render(req) {
  const url = new URL(req.url)
  const context = {
    title: 'Explorer',
    url: url.pathname,
    cookie: req.headers['cookie'],
  }
  const app = await createApp(context)
  return renderer.renderToString(app, context)
}

addEventListener('fetch', (event) => {
  try {
    event.respondWith(handleEvent(event))
  } catch (err) {
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  const options = {
    cacheControl: {
      bypassCache: true
    }
  }
  const url = new URL(event.request.url)
  if (url.pathname.indexOf('/build') === 0) {
    const buildModifier = (req) => {
      const _url = `${req.url}`.replace('/build', '').replace(/^\/+/, '')
      return mapRequestToAsset(new Request(_url, req))
    }
    return await getAssetFromKV(event, {
      cacheControl: {
        bypassCache: true,
      },
      mapRequestToAsset: buildModifier,
    })
  }
  try {
    const response = await render(event.request)
    return new Response(response, {
      status: 200,
      headers: new Headers({
        'Content-Type': 'text/html;charset=UTF-8',
      }),
    })
  } catch (err) {
    console.log(err)
    console.log(err.message)
    return new Response(`${JSON.stringify(err)}`, {
      status: 500
    })
  }
}
