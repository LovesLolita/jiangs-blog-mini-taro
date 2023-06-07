/* eslint-disable */
import React, { useEffect, useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import tools from "@/common/tools";
import API from "@/api";
import {
  Avatar,
  Icon,
  Tag,
  Grid,
  GridItem,
  Button,
} from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";

import "./ucenter.scss";

const Ucenter = () => {
  /* 获取用户信息 */
  // useUser 自定义hooks
  const [user, updateUser] = useState(() => tools.getUser());
  // 保持最新数据
  useDidShow(() => {
    updateUser(() => tools.getUser());
  });
  /* 获取用户信息 end */

  /* 获取配置信息 */
  const [setting, setSetting] = useState("");

  const userInfo = async () => {
    try {
      const res = await API.SETTING_UCENTER();
      console.log(res);
      if (res.code === 0) {
        setSetting(res.data || "");
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userInfo();
  }, []);
  /* 获取配置信息end */

  /* click avatar */
  const userNavigateTo = async () => {
    if (user) {
      Taro.navigateTo({
        url: "/pages/verify/verify",
      });
    } else {
      // 登入页面
      Taro.navigateTo({
        url: "/pages/login/login",
      });
    }
  };
  /* click avatar end */

  /* 宫格 */
  // 浏览 收藏 点赞 评论 跳转字段
  let myOptions = ["views", "likes", "favorites", "comments"];
  const girdNavigateTo = (tag, title) => {
    if (myOptions.indexOf(tag) !== -1) {
      Taro.navigateTo({
        url: `/pages/articleList/articleList?track=${tag}&title=${title}`,
      });
    }
  };

  // 扫码登入
  const openPhotoScanCode = () => {
    if (!tools.getUser()) {
      Taro.navigateTo({
        url: "/pages/login/login",
      });
      return;
    }
    Taro.scanCode({
      success: (res) => {
        console.log(res);
        try {
          const result = JSON.parse(res.result);
          if (result.type !== "qrcodelogin") {
            throw new error();
          }
          qrCodeLogin(result.code);
        } catch (e) {
          Taro.showToast({
            title: "二维码无效！",
            icon: "none",
          });
        }
      },
      fail: (res) => {
        Taro.showToast({
          title: "扫码失败",
          icon: "none",
        });
      },
    });
  };
  //  扫码后登入
  const qrCodeLogin = async (qrCodeSrt) => {
    try {
      const { code } = await Taro.login();
      if (code) {
        let params = {
          code: code,
          channel: "qrcodelogin",
          nickname: "微信用户",
          qrcodeStr: qrCodeSrt,
        };
        const res = await API.USER_LOGIN(params);
        if (res.code === 0) {
          Taro.showToast({
            title: "登录成功！",
            icon: "none",
          });
        }
      }
    } catch (err) {
      console.log(err);
      if (err.msg) {
        Taro.showToast({
          title: err.msg,
          icon: "none",
        });
      }
    }
  };

  // 订阅信息
  const subscriptionMessage = () => {
    // 获取用户的当前设置，判断是否点击了“总是保持以上，不在询问”
    Taro.getSetting({
      // withSubscriptions:true,  //是否获取用户订阅消息的订阅状态，默认false不返回
      success(res) {
        if (res.authSetting["scope.subscribeMessage"]) {
          //用户点击了“总是保持以上，不再询问”
          Taro.openSetting({
            // 打开设置页
            success(res) {
              console.log(res.authSetting, "设置");
            },
          });
        } else {
          // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息

          Taro.requestSubscribeMessage({
            tmplIds: [
              "ZNagCd5-99wAjjFrJjp0QyVV_TL7f90X6VeZ1IE83rE",
              "TKMRssS0R1ehkh8JN_XCRYcSggMD4_4FpH92nJC2PMk",
              "ne8Sp81kxdlpR49Pq_q-MNfHNxm0m1OsMijxa0cHHBU",
            ],
            success(res) {
              console.log(res);
            },
            fail: (res) => {
              console.log(res);
            },
          });
        }
      },
    });
  };

  // 退出登入
  const clearCache = () => {
    Taro.showModal({
      title: "提示",
      content: "确定需要退出登入吗",
      success: (res) => {
        if (res.confirm) {
          Taro.clearStorageSync();
          Taro.showToast({
            icon: "none",
            title: "退出成功",
          });
          Taro.reLaunch({
            url: "/pages/ucenter/ucenter",
          });
        }
      },
    });
  };
  /* 宫格end */

  return (
    <View className="u_center">
      <View className="top_user_info">
        <image src={setting.background} alt="" mode="aspectFill" />
        {user ? (
          <Tag type="success" className="login_tag">
            已登入
          </Tag>
        ) : (
          <Tag type="warning" className="login_tag">
            未登入
          </Tag>
        )}
        <View className="user_avatar" onClick={userNavigateTo}>
          {user ? (
            <Avatar
              size="large"
              shape="round"
              className="avatar_style"
              icon={user.avatar}
            />
          ) : (
            <Avatar size="large" shape="round" className="avatar_style">
              <Icon name="my" size="3.5rem" className="avatar_icon"></Icon>
            </Avatar>
          )}
          <View className="user_name">{user ? user.nickname : ""}</View>
        </View>
      </View>
      <View className="features_options">
        <Grid gutter={15} columnNum={3}>
          <GridItem
            icon="eye"
            text="我的浏览"
            name="myView"
            onClick={() => girdNavigateTo("views", "我的浏览")}
          />
          <GridItem
            icon="fabulous"
            text="我的点赞"
            onClick={() => girdNavigateTo("likes", "我的点赞")}
          />
          <GridItem
            icon="star"
            text="我的收藏"
            onClick={() => girdNavigateTo("favorites", "我的收藏")}
          />
          <GridItem
            icon="comment"
            text="我的评论"
            onClick={() => girdNavigateTo("comments", "我的评论")}
          />
          <GridItem open-type="feedback" icon="tips" text="关于我们" />
          <GridItem icon="scan2" text="扫码登入" onClick={openPhotoScanCode} />
          <GridItem
            icon="heart1"
            text="订阅模板信息"
            onClick={subscriptionMessage}
          />
        </Grid>
      </View>
      <View className="out_login">
        {user ? (
          <Button
            size="large"
            type="primary"
            color="#7232dd"
            onClick={clearCache}
          >
            退出登入
          </Button>
        ) : null}
      </View>
    </View>
  );
};

export default Ucenter;
