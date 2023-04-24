import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState, useRef } from "react";
import API from "@/api";
import tools from "@/common/tools";
import { Avatar, Icon, Tabs, Button, Tag } from "@nutui/nutui-react-taro";
import { useUpdate, useMount } from "ahooks";

import "./login.scss";

const Login = () => {
  // 非受控刷新
  const forceUpdate = useUpdate();

  /* 小程序code */
  const code = useRef(null)

  // 获取code
  const getCode = async () => {
    try {
      const res = await Taro.login()
      console.log(res);
      code.current  = res.code;
    } catch (err) {
      console.log(err);
    }
  }

  useMount(() => {
    getCode()
  })
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
  const [tab1value, setTab1value] = useState("0");
  /* Tab END */

  /* 登入 */
  const authLogin = () => {
    Taro.login({
      success: async (res) => {
        console.log(res);
        let params = {
          code: res.code,
          nickname: "微信用户",
          avatar: "",
          channel: "weixin",
        };
        const res1 = await API.USER_LOGIN(params);
        if (res1.code === 0) {
          console.log(res1);
        } else {
        }
      },
    });
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
          value={tab1value}
          onChange={({ paneKey }) => {
            setTab1value(paneKey);
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
          <Tabs.TabPane title="绑定登入"> Tab 2 </Tabs.TabPane>
        </Tabs>
      </>
    </View>
  );
};

export default Login;
