
 /* eslint-disable */
import React, { useEffect, useState } from "react";
import tools from "@/common/tools";
import API from "@/api";
import { Avatar, Icon, Tag, Grid, GridItem, Button } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";

import "./ucenter.scss";

const Ucenter = () => {

  /* 获取用户信息 */
  const [userBackground, setUserBackground] = useState('')

  const userInfo = async() => {
    try {
      const res = await API.SETTING_UCENTER()
      console.log(res);
      if(res.code === 0) {
        setUserBackground(res.data.background || '')
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    userInfo()
  }, [])
  /* 获取用户信息end */

  return (
    <View className="u_center">
      <View className="top_user_info">
        <img src={userBackground} alt="" />
        <Tag type="warning" className="login_tag">
          未登入
        </Tag>
        <View className="user_avatar">
          <Avatar size="large" shape="round" className="avatar_style">
            <Icon name="my" size="3.5rem" className="avatar_icon"></Icon>
          </Avatar>
          <View className="user_name">
            微信用户
          </View>
        </View>
      </View>
      <View className="features_options">
        <Grid gutter={15} columnNum={3}>
          <GridItem icon="eye" text="我的浏览" />
          <GridItem icon="fabulous" text="我的点赞" />
          <GridItem icon="star" text="我的收藏" />
          <GridItem icon="comment" text="我的评论" />
          <GridItem icon="tips" text="关于我们" />
          <GridItem icon="people" text="意见反馈" />
          <GridItem icon="service" text="在线客服" />
          <GridItem icon="scan2" text="扫码登入" />
        </Grid>
      </View>
      <View className="out_login">
        <Button size="large" type="primary" color="#7232dd">
          退出登入
        </Button>
      </View>
    </View>
  );
};

export default Ucenter;
