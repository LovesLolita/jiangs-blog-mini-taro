import { useState } from "react";
import { useMount } from "ahooks";
import { View, Text, ScrollView } from "@tarojs/components";
import { BackTop, Button, Row, Col } from "@nutui/nutui-react-taro";
import tools from "@/common/tools";
import API from "@/api";

import "./categories.scss";

const Categories = () => {
  /* 配置信息 */
  const [setting, setSetting] = useState({});

  // 获取配置信息
  const getSettingOption = async () => {
    try {
      const res = await API.SETTING_CATEGORY();
      if (res.code === 0) {
        setSetting(res.data || {});
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useMount(() => {
    getSettingOption();
  });
  /* 配置信息end */

  /* 分类型信息 */
  const [categoriesList, setCategoriesList] = useState([]);

  // 获取分类信息
  const getCategoriesData = async() => {
    try {
      const res = await API.CATEGORY_INDEX();
      if (res.code === 0) {
        setCategoriesList(res.data || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useMount(() => {
    getCategoriesData();
  });
  /* 分类型信息 end */

  return (
    <View className='categories'>
      <BackTop distance={200} bottom={50} />
      <View className='timeline-head'>
        {(() => {
          if (Object.keys(setting).length !== 0) {
            return (
              <>
                <View className='timeline-head-text'>
                  <Text>{setting.title}</Text>
                  <View className='timeline-head-describe'>
                    {setting.description}
                  </View>
                </View>
                <image src={setting.background} mode='aspectFill' />
              </>
            );
          }
        })()}
      </View>
      <ScrollView>
        <View className='categories_list'>
          {categoriesList.map((item) => {
            console.log(item);
            return (
              <View className='categories_item' key={item.id}>
                <Row>
                  <Col span='8'>
                    <View className='img-content'>
                      <image src={item.cover} mode='aspectFill'></image>
                    </View>
                  </Col>
                  <Col span='12'>
                    <View className='right_text'>
                      <View className='sort-title'>{item.name}</View>
                      <View className='sort_summary'> {item.description}</View>
                    </View>
                  </Col>
                </Row>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;
