import { create } from 'dva-core'

let app; // dva实例
let store; // 维持项目所有的state树的对象
let dispatch; // 改变store中state的唯一方法

const createApp = (opts) => {
  // 创建dva实例
  app = create(opts)
  // 确保所有state模块（model）只注册一次
  if (!global.registered) {
    opts.models.forEach(model => app.model(model));
  }
  global.registered = true;
  // 运行程序
  app.start()
  store = app._store;
  // 用函数返回store，确保每次拿到的都是一个全新的对象
  app.getStore = () => store;
  dispatch = store.dispatch;
  app.dispatch = dispatch;

  return app;
}

export default createApp