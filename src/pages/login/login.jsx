import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import API from "@/api";
import tools from "@/common/tools";
import { Avatar, Icon,Tabs,Button } from "@nutui/nutui-react-taro";

import './login.scss'

const Login = () => {
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
  useEffect(() => {
    getOptionData();
  }, []);
  /* 获取配置end */

  /*  */
  const [tab1value, setTab1value] = useState('0');
  /*  */

  /*  */
  const authLogin = () => {
    Taro.login({
      success: async(res) => {
        console.log(res);
        let params = {
          code: res.code,
          nickname: '微信用户',
          avatar: '',
          channel: 'weixin'
        }
        const res1 = await API.USER_LOGIN(params)
        if(res1.code === 0) {
          console.log(res1);
        } else {

        }
      },
    })
  }
  /*  */

  return (
    <View className='login'>
      <View
        className='app-info'
        style={
          ({ background: "no-repeat; background-size: 100% auto" },
          option?.background
            ? `background-image: url(${option?.background});`
            : "")
        }
      >
        {/* 替换为小程序logo */}
        <Avatar size='large' shape='round' className='avatar_style' >
            <Icon name='my' size='3.5rem' className='avatar_icon'></Icon>
          </Avatar>
        <View class='app-name'></View>
        <View class='app-slogan'></View>
      </View>
      <>
      <Tabs value={tab1value} onChange={({ paneKey }) => {
        setTab1value(paneKey)
      }}
      >
        <Tabs.TabPane title='授权登录'><Button type="primary" onClick={()=> authLogin()}>主要按钮</Button></Tabs.TabPane>
        <Tabs.TabPane title='绑定登入'> Tab 2 </Tabs.TabPane>
      </Tabs>
    </>
    </View>
  );
};

export default Login;
