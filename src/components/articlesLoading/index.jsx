/* eslint-disable */
import React from "react";
import { View, Text } from "@tarojs/components";
import { Divider } from "@nutui/nutui-react-taro";

const articlesLoading = ({loadingText,bottomText}) => {
  return (
    <View className="">
      <View>{loadingText || '加载中'}</View>
      <Divider
        contentPosition="middle"
        styles={{
          color: "#1989fa",
          borderColor: "#ccc",
        }}
      >
        { bottomText }
      </Divider>
    </View>
  );
};

export default articlesLoading;
