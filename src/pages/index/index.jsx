/* eslint-disable */
import Taro from '@tarojs/taro'
import { Component, useEffect, useState } from "react";
import { View, Text, Swiper, SwiperItem, ScrollView } from "@tarojs/components";
import {
  Tabs,
  Divider,
  Empty,
  Button,
  Row,
  Col,
  Icon,
} from "@nutui/nutui-react-taro";
import tools from "@/common/tools";
import API from "@/api";
import "./index.scss";

const Index = () => {
  /* 首页轮播图 */
  const [initPage, setInitPage] = useState(0);
  const [swiperList, setSwiperList] = useState([]);

  const getSwiperInfo = async () => {
    try {
      const res = await API.JIANGQIE_SETTING_LUNBOTU();
      console.log(res);
      if (res?.code === 0) {
        setSwiperList(res?.data?.data || []);
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 副作用
  useEffect(() => {
    getSwiperInfo();
  }, []);

  /* 首页轮播图 */

  /* 首页文章列表 */

  const [latestArticles, setLatestArticles] = useState([]);

  const onScrollToLower = () => {
    getLatestArticles(false);
  };

  const getLatestArticles = async (refresh) => {
    try {
      let offset = 0;
      if (!refresh) {
        offset = latestArticles.length;
      }
      let params = {
        offset: offset,
      };
      const res = await API.JIANGQIE_POSTS_LAST(params);
      console.log(res);
      if (res.code === 0) {
        setLatestArticles([...latestArticles, ...res.data]);
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
      
    }
  };

  useEffect(() => {
    getLatestArticles();
  }, []);
  /* 首页文章列表end */

  return (
    <View className="page_index">
      <Tabs type="line" size="large" leftAlign>
        <Tabs.TabPane title="头条">
          <Swiper
            className="scroll_swiper"
            indicatorDots
            autoplay
            circular
            interval={5000}
          >
            {swiperList.map((item, index) => {
              return (
                <SwiperItem key={index}>
                  <View className="img_box">
                    <img src={item.img} alt="" />
                  </View>
                </SwiperItem>
              );
            })}
          </Swiper>
          <View className="new_articles">
            <Divider
              contentPosition="left"
              styles={{
                color: "#1989fa",
                borderColor: "#1989fa",
              }}
            >
              最新文章
            </Divider>
            {(() => {
              if (latestArticles.length === 0) {
                return (
                  <View className="empty">
                    <Empty image="network" description="无最新文章">
                      <div style={{ marginTop: "10px" }}>
                        <Button
                          icon="refresh"
                          type="primary"
                          onClick={()=> getLatestArticles("refresh")}
                        >
                          亲,请重试一下
                        </Button>
                      </div>
                    </Empty>
                  </View>
                );
              } else {
                return (
                  <ScrollView
                    className="scroll_view"
                    scrollY
                    scrollWithAnimation
                    scrollAnchoring
                    scrollTop={0}
                    onRefresherRefresh={(e) => getLatestArticles( "refresh",e)}
                    onScrollToLower={onScrollToLower}
                  >
                    {latestArticles.map((item, index) => {
                      return (
                        <View className="articles_content" key={index}>
                          <Row>
                            <Col span="14">
                              <View className="left_text_box">
                                <View className="left_title">{item.title}</View>
                                <View className="left_content">
                                  {item.excerpt}
                                </View>
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
                  </ScrollView>
                );
              }
            })()}
          </View>
        </Tabs.TabPane>
      </Tabs>
    </View>
  );
};

export default Index;
