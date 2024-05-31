import { createFilter, PluginOption } from 'vite'
import { InjectCodeMetaSFC, InjectRuntime } from './runtime'
import middleware from './middleware'

export default function vitePluginCodeMeta(customOptions: object): PluginOption {
  // const jsOptions = {
  //   include: [/vue\.js\?v=[a-zA-Z0-9]{8}$/],
  //   exclude: [],
  // };

  const SFCOption = {
    include: [/\.vue$/],
    exclude: []
  }

  const filterSFC = createFilter(SFCOption.include, SFCOption.exclude)
  // const filterJS = createFilter(jsOptions.include, jsOptions.exclude);

  return {
    name: 'vite-plugin-code-meta',
    apply: 'serve',
    configureServer(server) {
      let isSpecificMiddlewareExecuted = { value: false }
      const { PushInfoMiddleware, CodeMetaMiddleware, FSHandleMiddleware } = middleware
      const specificMiddleware = PushInfoMiddleware(isSpecificMiddlewareExecuted)
      const middlewares = [specificMiddleware, CodeMetaMiddleware, FSHandleMiddleware]
      for (const middleware of middlewares) {
        server.middlewares.use(middleware)
      }
    },
    transform(src: string, id: string) {
      const isSFC = filterSFC(id)
      // const isJS = filterJS(id);
      if (isSFC) {
        return {
          code: InjectCodeMetaSFC(src, id)
        }
      }
      // return InjectMometaElementV3(src, id, isJS)
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return InjectRuntime(html)
      }
    }
  }
}
