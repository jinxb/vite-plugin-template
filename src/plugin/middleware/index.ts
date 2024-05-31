import CodeMetaMiddleware from './CodeMetaMiddleware'
// import FileTypeMiddleware from './FileTypeMiddleware';
import FSHandleMiddleware from './HandleFileMiddleware'
import PushInfoMiddleware from './PushInfoMiddleware'
// import materialMiddleware from '@codeMeta-vue/materials';

const middlewares = {
  PushInfoMiddleware,
  CodeMetaMiddleware,
  FSHandleMiddleware
  // materialMiddleware,
}

export default middlewares
