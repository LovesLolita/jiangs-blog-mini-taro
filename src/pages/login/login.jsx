import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState, useRef } from "react";
import API from "@/api";
import tools from "@/common/tools";
import { Avatar, Icon, Tabs, Button, Tag } from "@nutui/nutui-react-taro";
import { useUpdate, useMount } from "ahooks";
import useUser from "@/hooks/useUser";
import BoundOperation from "./component/boundOperation";

import "./login.scss";

const Login = () => {
  // 非受控刷新
  const forceUpdate = useUpdate();

  /* 小程序code */
  const code = useRef(null);

  // 获取code
  const getCode = async () => {
    try {
      const res = await Taro.login();
      console.log(res);
      code.current = res.code;
    } catch (err) {
      console.log(err);
    }
  };

  useMount(() => {
    getCode();
  });
  /* 小程序code end */

  /* 获取配置 */
  const [option, setOption] = useState({});

  const getOptionData = async () => {
    try {
      const res = await API.SETTING_UCENTER();
      if (res.code === 0) {
        setOption(res.data);
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useMount(() => {
    getOptionData();
  });
  /* 获取配置end */
  /* Tab */
  const [tabValue, setTabValue] = useState("0");
  /* Tab END */

  /* 登入 */
  // useUser 自定义hooks
  const [user, updateUser] = useUser();

  //绑定登入
  const getBoundLogin = (info) => {
    console.log(info);
    authLogin(info)
  };

  // 登入
  const authLogin = async (LoginInfo) => {
    try {
      let infoType = {
        channel: void 0,
        nickname: "",
      };
      // 判断渠道
      console.log(Taro.getEnv());
      if (Taro.getEnv() === "WEAPP") {
        infoType.channel = "weixin";
        infoType.nickname = "微信用户";
      } else if (Taro.getEnv() === "QQ") {
        infoType.channel = "qq";
        infoType.nickname = "QQ用户";
      } else if (Taro.getEnv() === "ALIPAY") {
        infoType.channel = "aliPay";
        infoType.nickname = "支付宝用户";
      } else {
        infoType.channel = "other";
        infoType.nickname = "其他用户";
      }
      let params = void 0;
      if (tabValue === "0") {
        params = {
          code: code.current,
          nickname: infoType.nickname,
          avatar: "",
          channel: infoType.channel,
        };
      } else if (tabValue === "1") {
        params = {
          code: code.current,
          nickname: infoType.nickname,
          avatar: "",
          channel: 'bangding',
          user:LoginInfo.userName,
          password:LoginInfo.password
        };
      }
      const res = await API.USER_LOGIN(params);
      if (res.code === 0) {
        updateUser(res.data);
        tools.navigateBack()
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
      if (err.data.msg) {
        Taro.showToast({
          icon: "none",
          title: err.data.msg,
        });
        getCode();
      }
    }
  };
  /* 登入 END */

  return (
    <View className="login">
      <View className="top_user_info">
        <image src={option?.background} alt="" mode="aspectFill" />
        <View className="user_avatar">
          <Avatar size="large" shape="round" className="avatar_style">
            <Icon name="my" size="3.5rem" className="avatar_icon"></Icon>
          </Avatar>
          <View className="user_name">未登入</View>
          <Tag type="danger">授权登入可查看更多内容</Tag>
        </View>
      </View>
      <>
        <Tabs
          value={tabValue}
          onChange={({ paneKey }) => {
            setTabValue(paneKey);
          }}
        >
          <Tabs.TabPane title="授权登录">
            <Button
              size="large"
              type="primary"
              onClick={() => authLogin()}
              color="linear-gradient(to right, #7232dd, #478cdc)"
            >
              授权登入
            </Button>
            <View className="accredit_login_tip">
              如果您已经有站点的账户，建议使用“绑定登录”关联账户进行登录，否则将会在第一次登录时创建新的账户
            </View>
          </Tabs.TabPane>
          <Tabs.TabPane title="绑定登入">
            {" "}
            <BoundOperation boundLogin={getBoundLogin} />{" "}
          </Tabs.TabPane>
        </Tabs>
      </>
    </View>
  );
};

export default Login;
