import Taro from "@tarojs/taro";
import tools from "@/common/tools";
/**
 * 网络请求
 * @{param}	 opts
 */
const request = (opts) => {
  console.log(opts);
  Taro.showLoading({
    title: "加载中,请稍后",
    mask: true, // 防止触摸穿透
  });
  const {
    url = "",
    params = {}, // 请求参数
    method = "GET",
    ...rest // 剩余参数
  } = opts;
  params.token = tools.getToken();
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
        } else if(data?.code === -1){
          Taro.navigateTo({
						url: '/pages/login/login'
					})
          resolve(res);
					return;
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
};

const Upload = ({url, path, data = {}}) => {
  
  return new Promise(function (resolve, reject) {
    Taro.showLoading({
      title: "上传中……",
    });

    data.token = tools.getToken();

    if (Taro.getEnv() === "WEAPP") {
      data.os = "wx";
    } else if (Taro.getEnv() === "QQ") {
      data.os = "qq";
    }

    console.log(url, path, data);
    Taro.uploadFile({
      url: url,
      filePath: path,
      name: "image",
      formData: data,
      success(res) {
        if (res.statusCode != 200) {
          reject(res.errMsg);
          return;
        }

        let Data = void 0;
        if (
          res.data instanceof String ||
          (typeof res.data).toLowerCase() == "string"
        ) {
          Data = JSON.parse(res.data);
        } else {
          Data = res.data;
        }

        if (Data.code == -1) {
          //尚未登录
          Taro.navigateTo({
            url: "/pages/login/login",
          });
          return;
        }

        resolve(Data);
      },
      fail(err) {
        console.log(err);
      },
      complete() {
        Taro.hideLoading();
      },
    });
  });
};

export {
  request,
  Upload
}
