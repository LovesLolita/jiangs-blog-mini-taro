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
            onClick={() => girdNavigateTo("views", '我的浏览')}
          />
          <GridItem
            icon="fabulous"
            text="我的点赞"
            onClick={() => girdNavigateTo("likes", '我的点赞')}
          />
          <GridItem
            icon="star"
            text="我的收藏"
            onClick={() => girdNavigateTo("favorites", '我的收藏')}
          />
          <GridItem
            icon="comment"
            text="我的评论"
            onClick={() => girdNavigateTo("comments", '我的评论')}
          />
          <GridItem icon="tips" text="关于我们" />
          <GridItem icon="people" text="意见反馈" />
          <GridItem icon="service" text="在线客服" />
          <GridItem icon="scan2" text="扫码登入" />
        </Grid>
      </View>
      <View className="out_login">
        {user ? (
          <Button size="large" type="primary" color="#7232dd">
            退出登入
          </Button>
        ) : null}
      </View>
    </View>
  );
};

export default Ucenter;
