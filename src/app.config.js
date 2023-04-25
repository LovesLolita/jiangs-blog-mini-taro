// eslint-disable-next-line
export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/categories/categories",
    "pages/hot/hot",
    "pages/ucenter/ucenter",
    "pages/login/login",
    "pages/verify/verify"
  ],
  tabBar: {
    color: "#bfbfbf",
    selectedColor: "#000",
    backgroundColor: "#FFFFFF",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/images/tabbar/index_gray.png",
        selectedIconPath: "assets/images/tabbar/index_active.png",
      },
      {
        pagePath: "pages/categories/categories",
        text: "分类",
        iconPath: "assets/images/tabbar/cat_gray.png",
        selectedIconPath: "assets/images/tabbar/cat_active.png",
      },
      // // {
      // // 	"pagePath": "pages/moment/moment",
      // // 	"text": "时光圈",
      // // 	"iconPath": "assets/images/tabbar/cat_gray.png",
      // // 	"selectedIconPath": "assets/images/tabbar/cat_active.png"
      // // },
      {
        pagePath: "pages/hot/hot",
        text: "热榜",
        iconPath: "assets/images/tabbar/hot_gray.png",
        selectedIconPath: "assets/images/tabbar/hot_active.png",
      },
      {
        pagePath: "pages/ucenter/ucenter",
        text: "我的",
        iconPath: "assets/images/tabbar/my_gray.png",
        selectedIconPath: "assets/images/tabbar/my_active.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
