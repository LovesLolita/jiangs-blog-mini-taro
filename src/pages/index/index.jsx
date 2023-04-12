/* eslint-disable */
import { Component, useEffect, useState } from "react";
import { View, Text, Swiper, SwiperItem, ScrollView } from "@tarojs/components";
import { Tabs, Divider, Empty, Button } from "@nutui/nutui-react-taro";
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
                {
                  /* <View className='empty'>
                    <Empty image='network' description='无最新文章'>
                      <div style={{ marginTop: "10px" }}>
                        <Button icon='refresh' type='primary'>
                          亲,请重试一下
                        </Button>
                      </div>
                    </Empty>
                  </View> */
                }
               
            <ScrollView
            className='scroll_view'
            scrollY
            scrollWithAnimation
            scrollTop={0}
            >
              <View className="articles_content"></View>
              <View className="articles_content"></View>
              <View className="articles_content"></View>
              <View className="articles_content"></View>
              <View className="articles_content"></View>
              <View className="articles_content"></View>
            </ScrollView>
          </View>
        </Tabs.TabPane>
      </Tabs>
    </View>
  );
};

export default Index;
