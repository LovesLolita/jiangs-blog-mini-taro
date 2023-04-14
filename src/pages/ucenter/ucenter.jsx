/* eslint-disable */
import React from "react";
import { Avatar, Icon, Tag, Grid, GridItem, Button } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";

import "./ucenter.scss";

const Ucenter = () => {
  return (
    <View className="u_center">
      <View className="top_user_info">
        <Tag type="warning" className="login_tag">
          未登入
        </Tag>
        <View className="user_avatar">
          <Avatar size="large" shape="round" className="avatar_style">
            <Icon name="my" size="3.5rem" className="avatar_icon"></Icon>
          </Avatar>
        </View>
      </View>
      <View className="features_options">
        <Grid gutter={4}>
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
