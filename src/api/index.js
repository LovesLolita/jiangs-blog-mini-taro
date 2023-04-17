import tools from "@/common/tools";
import baseUrl from "./baseUrl";

function makeURL(module, action) {
  return `${baseUrl}/wp-json/jiangMpApi/v1/${module}/${action}`;
}

export default {
  // 获取首页配置
  JIANGQIE_SETTING_HOME: () =>
    tools.request({
      url: makeURL("setting", "home"),
    }),

  //  获取首页轮播图
  JIANGQIE_SETTING_LUNBOTU: () =>
    tools.request({
      url: makeURL("setting", "rotatedPictures"),
    }),

  // 获取最新文章列表
  JIANGQIE_POSTS_LAST: (params) =>
    tools.request({
      url: makeURL("posts", "last"),
      params: params
    }),
};
