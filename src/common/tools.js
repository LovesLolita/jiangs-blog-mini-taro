import Taro from "@tarojs/taro";
import { objectToString } from "@/common/utils";
import Constant from "./constant";

const tools = {
  getToken: () => {
    let user = Taro.getStorageSync(Constant.USER_KEY);

    if (!user) {
      return false;
    }

    return user.token;
  },
  checkSession: () => {
    Taro.checkSession({
      fail: () => {
        // session_key 已经失效，需要重新执行登录流程
        Taro.setStorageSync(Constant.USER_KEY, false); //重新登录
      },
    });
  },
  setUser(user) {
    Taro.setStorageSync(Constant.USER_KEY, user);
  },

  getUser() {
    return Taro.getStorageSync(Constant.USER_KEY);
  },
  /**
   * 页面loading
   * @{param}
   */
  showLoading: (param = "") => {
    let dptOpts = {
      title: "加载中...",
      mask: true, // 防止触摸穿透
    };
    if (Object.prototype.toString.call(param) === "[object String]") {
      dptOpts.title = param;
    } else if (Object.prototype.toString.call(param) === "[object Object]") {
      dptOpts = {
        ...dptOpts,
        ...param,
      };
    }
    return Taro.showLoading(dptOpts);
  },
  hideLoading: () => {
    Taro.hideLoading();
  },
  /**
   * 页面提示
   * @{param}
   */
  showToast: (param) => {
    let dptOpts = {
      title: "温馨提示", // 提示内容
      icon: "none",
      mask: true,
      duration: 2000, // 提示时间
    };
    if (Object.prototype.toString.call(param) === "[object String]") {
      dptOpts.title = param;
    } else if (Object.prototype.toString.call(param) === "[object Object]") {
      dptOpts = {
        ...dptOpts,
        ...param,
      };
    } else {
      throw new Error("参数类型有误，应该是字符串或者对象");
    }
    return Taro.showToast(dptOpts);
  },
  /**
   *
   * @{param}	 url 页面路径
   * @{Object}	 data 页面参数
   */
  navigateTo: ({ url, data }) => {
    const searchStr = objectToString(data);
    return Taro.navigateTo({
      url: `${url}?${searchStr}`,
    });
  },
  navigateBack() {
    Taro.navigateBack({
      delta: 1,
      fail: () => {
        Taro.switchTab({
          url: "/pages/index/index",
        });
      },
    });
  },
  /**
   *
   * @{param}	 time 缓存有效时间 单位：s
   */
  setStorageSyncWithTime: (key, value, time) => {
    try {
      const curTime = Date.now();
      // 过期时间
      const expiredTime = curTime + time * 1000;
      Taro.setStorageSync(key, {
        [key]: value,
        expiredTime,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getStorageSyncWithTime: (key) => {
    try {
      const result = Taro.getStorageSync(key);
      const { expiredTime } = result;
      if (Date.now() > expiredTime) {
        // 已过期
        Taro.removeStorageSync(key);
      } else {
        return result[key];
      }
    } catch (err) {
      console.log(err);
    }
  },
  /**
   *
   * @{param}	 fn 如果登录就执行fn
   */
  doLogin: (fn) => {
    const user = tools.getStorageSyncWithTime("userInfo");
    if (!user?.userPhone) {
      tools.navigateTo({
        url: "/pages/login/login",
      });
    } else {
      fn?.();
    }
  },
  isAliPay: Taro.ENV_TYPE.ALIPAY === Taro.getEnv(),
  isBaiDu: Taro.ENV_TYPE.SWAN === Taro.getEnv(),
  isH5: Taro.ENV_TYPE.WEB === Taro.getEnv(),
};

export default tools;
