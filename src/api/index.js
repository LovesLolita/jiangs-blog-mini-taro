import { request, Upload } from "@/api/request";
import baseUrl from "./baseUrl";

function makeURL(module, action) {
  return `${baseUrl}/wp-json/jiangMpApi/v1/${module}/${action}`;
}

export default {
  // 获取首页配置
  SETTING_HOME: () =>
    request({
      url: makeURL("setting", "home"),
    }),

  //  获取首页轮播图
  SETTING_LUNBOTU: () =>
    request({
      url: makeURL("setting", "rotatedPictures"),
    }),

  // 获取最新文章列表
  POSTS_LAST: (params) =>
    request({
      url: makeURL("posts", "last"),
      params: params,
    }),
  // 获取我的配置
  SETTING_UCENTER: (params) =>
    request({
      url: makeURL("setting", "ucenter"),
      params: params,
    }),
  // 获取热门配置
  SETTING_HOT: () =>
    request({
      url: makeURL("setting", "hot"),
    }),
  // 获取热门配置
  POSTS_HOT: (params) =>
    request({
      url: makeURL("posts", "hot"),
      params: params,
      option: {
        hideLoading: true,
      },
    }),
  // 用户登录
  USER_LOGIN: (params) =>
    request({
      url: makeURL("user", "login3"),
      params: params,
    }),
  // 用户登录演示
  USER_LOGIN_TEST: (params) =>
    request({
      url: makeURL("user", "logintest"),
      params: params,
    }),
  // 上传图片
  OTHER_UPLOAD: (path) =>
    Upload({
      url: makeURL("other", "upload"),
      path: path,
      data: {},
    }),
  //  用户 设置昵称头像
  USER_SET_INFO: (params) =>
    request({
      url: makeURL("user", "set_info"),
      params: params,
    })
};
