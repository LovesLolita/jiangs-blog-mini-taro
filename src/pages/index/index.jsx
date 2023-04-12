import { Component, useEffect, useState } from "react";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { Tabs, Divider, Empty } from "@nutui/nutui-react-taro";
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
    <View className='page_index'>
      <Tabs type='line' size='large' leftAlign>
        <Tabs.TabPane title='头条'>
        </Tabs.TabPane>
      </Tabs>
          <Swiper
            className='scroll_view'
            indicatorDots
            autoplay
            circular
            interval={5000}
          >
            {swiperList.map((item, index) => {
              return (
                <SwiperItem key={index}>
                  <View className='img_box'>
                    <img src={item.img} alt='' />
                  </View>
                </SwiperItem>
              );
            })}
          </Swiper>
          <View className='new_articles'>
            <Divider
              contentPosition='left'
              styles={{
                color: "#1989fa",
                borderColor: "#1989fa"
              }}
            >
              最新文章
            </Divider>
            <View className='empty'>
            <Empty description='无最新文章' />
            </View>
          </View>
    </View>
  );
};

export default Index;
