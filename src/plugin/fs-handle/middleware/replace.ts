import type { Connect } from 'vite';
import { Preload } from '../types';
import { NODEOPTION } from '../const';
import replaceNode from '../common/replaceNode';

const replaceMiddleware: Connect.NextHandleFunction = (req: any, res, next) => {
  const params = req.body as Preload;
  if (params.type === NODEOPTION.REPLACE) {
    replaceNode(params);
    console.log('替换成功');
    return;
  }
  next();
};

export default replaceMiddleware;
