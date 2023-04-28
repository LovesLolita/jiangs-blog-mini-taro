/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import tools from "@/common/tools";
import API from "@/api";
import {
  Tabs,
  Col,
  Row,
  Icon,
  Empty,
  Button,
  Sticky,
  BackTop,
} from "@nutui/nutui-react-taro";
import { View, Text, ScrollView } from "@tarojs/components";
import ArticlesLoading from "@/components/articlesLoading/articlesLoading";

import "./hot.scss";

const Hot = () => {
  /* 获取热门配置 */

  const [HotOptions, setHotOptions] = useState({});
  const getHotOptions = useCallback(async () => {
    try {
      const res = await API.SETTING_HOT();
      if (res.code === 0) {
        setHotOptions(res.data || {});
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getHotOptions();
  }, [getHotOptions]);
  /* 获取热门配置end */

  /* tab栏 */
  const TabBar = [
    { title: "浏览数", sort: "views" },
    { title: "点赞数", sort: "likes" },
    // { title: "收藏数", sort: "favorites" },
    { title: "评论数", sort: "comments" },
  ];
  const [tabValue, setTabValue] = useState("views");
  const changeTabValue = (item) => {
    setTabValue(item.paneKey);
  };
  useEffect(() => {
    getHotArticles("refresh");
  }, [tabValue]);
  /* tab栏end */

  /* 热门文章列表 */
  const [loadingShow, setLoadingShow] = useState(false);
  const [hotArticlesList, setHotArticlesList] = useState([]);
  // 获取热门列表
  const getHotArticles = async (refresh) => {
    try {
      setLoadingShow(true);
      let params = {
        offset: refresh ? 0 : hotArticlesList.length,
        sort: tabValue,
      };
      const res = await API.POSTS_HOT(params);
      if (res.code === 0) {
        setLoadingShow(false);
        setHotArticlesList([...hotArticlesList, ...res.data]);
      } else {
        setLoadingShow(false);
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      setLoadingShow(false);
      console.log(err);
    }
  };

  usePullDownRefresh(() => {
    getHotArticles("refresh");
  });
  // 页面触底动作
  useReachBottom(() => {
    getHotArticles();
  });

  const hotArticlesDom = () => {
    if (hotArticlesList.length === 0) {
      return (
        <View className="empty">
          <Empty image="network" description="当前分类无文章">
            <div style={{ marginTop: "10px" }}>
              <Button
                icon="refresh"
                type="primary"
                onClick={() => getHotArticles("refresh")}
              >
                亲,刷新一下
              </Button>
            </div>
          </Empty>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View className="scroll_view">
            {hotArticlesList.map((item, index) => {
              return (
                <View className="articles_content" key={index}>
                  <Row>
                    <Col span="14">
                      <View className="left_text_box">
                        <View className="left_title">{item.title}</View>
                        <View
                          className="left_content"
                          style={{ textAlign: "left" }}
                        >
                          {item.time}
                          <Icon name="eye" className="left_icon"></Icon>
                          {item.views}
                        </View>
                      </View>
                    </Col>
                    <Col span="10">
                      <View className="image_box">
                        <img src={item.thumbnail} alt="" />
                      </View>
                    </Col>
                  </Row>
                </View>
              );
            })}
          </View>
        </ScrollView>
      );
    }
  };
  /* 热门文章列表end */

  return (
    <View className="hot">
      <BackTop distance={200} bottom={50} />
      <View className="timeline-head">
        {(() => {
          if (Object.keys(HotOptions).length !== 0) {
            return (
              <View className="timeline-head-text">
                <Text>{HotOptions.title}</Text>
                <View className="timeline-head-describe">
                  {HotOptions.description}
                </View>
              </View>
            );
          }
        })()}
        <image src={HotOptions.background} mode="aspectFill" />
      </View>
      <Sticky top={0}>
        <Tabs
          value={tabValue}
          onChange={(item) => {
            changeTabValue(item);
          }}
          type="smile"
        >
          {TabBar.map((item, index) => {
            return (
              <Tabs.TabPane
                key={index}
                paneKey={item.sort}
                title={item.title}
              />
            );
          })}
        </Tabs>
      </Sticky>
      {hotArticlesDom()}
      <ArticlesLoading loadingShow={loadingShow} />
    </View>
  );
};
export default Hot;
