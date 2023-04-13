/* eslint-disable */
import React, { memo } from "react";
import { View, Text } from "@tarojs/components";
import { Icon } from "@nutui/nutui-react-taro";
import "./articlesLoading.scss";

const ArticlesLoading = memo(
  ({ loadingText = "加载中", loadingShow = true }) => {
    return (
      <>
        {(() => {
          if (loadingShow) {
            return (
              <View className="articles_loading">
                <Text className="articles_text">{loadingText || "加载中"}</Text>

                <Icon name="loading" className="text_icon" />
              </View>
            );
          }
        })()}
      </>
    );
  }
);

export default ArticlesLoading;
