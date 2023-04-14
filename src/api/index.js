import tools from "@/common/tools";
import baseUrl from "./baseUrl";

function makeURL(module, action) {
  return `${baseUrl}/wp-json/jiangqie/v1/${module}/${action}`;
}

export default {
  // 获取首页配置
  SETTING_HOME: () =>
    tools.request({
      url: makeURL("setting", "home"),
    }),

  //  获取首页轮播图
  SETTING_LUNBOTU: () =>
    tools.request({
      url: makeURL("setting", "rotatedPictures"),
    }),

  // 获取最新文章列表
  POSTS_LAST: (params) =>
    tools.request({
      url: makeURL("posts", "last"),
      params: params,
    }),
  // 获取我的配置
  SETTING_UCENTER: (params) =>
    tools.request({
      url: makeURL("setting", "ucenter"),
      params: params,
    }),
};
