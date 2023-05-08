// eslint-disable-next-line
export default definePageConfig({
  navigationBarTitleText: " ",
  onReachBottomDistance: 50,
  usingComponents: {
    // 定义需要引入的第三方组件
    // 1. key 值指定第三方组件名字，以小写开头
    // 2. value 值指定第三方组件 js 文件的相对路径
    "mp-html": "@/components/mp-weixin"
  },
});
