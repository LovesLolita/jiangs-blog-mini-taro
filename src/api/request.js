import Taro from "@tarojs/taro";
/**
   * 网络请求
   * @{param}	 opts
   */
const  request = (opts) => {
  console.log(opts);
  Taro.showLoading({
    title: "加载中,请稍后",
    mask: true, // 防止触摸穿透
  })
  const {
    url = "",
    params = {}, // 请求参数
    method = "GET",
    ...rest // 剩余参数
  } = opts;
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      data: params,
      method,
      ...rest,
    })
      .then((res) => {
        const { data } = res;
        if (data?.code === 0) {
          // 成功
          Taro.hideLoading();
          resolve(data);
          
        } else {
          // 不是预期的结果
          Taro.hideLoading();
          reject(res);
          
        }
      })
      .catch((err) => {
        reject(err);
        Taro.hideLoading();
      });
  });
}

export default request