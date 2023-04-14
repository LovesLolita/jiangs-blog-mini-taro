/* eslint-disable */
import React from "react";
import { Avatar, Icon } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";

import "./ucenter.scss";

const Ucenter = () => {
  return (
    <View className="u_center">
      <View className="top_user_info">
        <View className="user_avatar">
          <Avatar
            size="large"
            shape="round"
          >
            <Icon name="my" size='2rem' className="avatar_icon"></Icon>
            </Avatar>
        </View>
      </View>
      <View className="">
        
      </View>
    </View>
  );
};

export default Ucenter;
