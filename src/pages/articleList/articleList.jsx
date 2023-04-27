import Taro, { useLoad, useReachBottom } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import React, { useRef, useState } from "react";
import {
  BackTop,
  Row,
  Col,
  Icon,
  Button,
  Empty,
} from "@nutui/nutui-react-taro";
import tools from "@/common/tools";
import API from "@/api";
import ArticlesLoading from "@/components/articlesLoading/articlesLoading";
import { useMount } from "ahooks";

import style from "./articleList.module.scss";

const ArticleList = () => {
  /* 页面加载 */
  // 页面参数
  const optionsQuery = useRef({});
  // 生命周期函数--监听页面加载
  useLoad((options) => {
    optionsQuery.current = options;
    let title = void 0;
    if (options.track == "views") {
      title = "我的浏览";
    } else if (options.track == "likes") {
      title = "我的点赞";
    } else if (options.track == "favorites") {
      title = "我的收藏";
    } else if (options.track == "comments") {
      title = "我的评论";
    }
    Taro.setNavigationBarTitle({
      title: title || "最新文章",
    });
  });
  /* 页面加载 end */

  /* 文章列表 */
  const [articleList, setArticleList] = useState([]);
  const [loadingShow, setLoadingShow] = useState(false);

  // 获取文章列表
  const getArticleList = async (refresh) => {
    try {
      setLoadingShow(true);
      let offset = 0;
      if (!refresh) {
        offset = articleList.length;
      }
      console.log(optionsQuery);
      let params = {
        offset: offset,
      };
      let res = void 0;
      if (optionsQuery.current.track) {
        params.track = optionsQuery.current.track;
        res = await API.POSTS_MY(params);
      }
      if (res?.code === 0) {
        setLoadingShow(false);
        setArticleList(res.data || []);
      } else {
        tools.showToast(res.data.msg);
        setLoadingShow(false);
      }
    } catch (err) {
      console.log(err);
      setLoadingShow(false);
    }
  };

  // 空内容
  const emptyFlag = () => {
    if (articleList.length === 0) {
      return (
        <View className="empty">
          <Empty image="network" description="无文章">
            <div style={{ marginTop: "10px" }}>
              <Button
                icon="refresh"
                type="primary"
                onClick={() => getArticleList("refresh")}
              >
                亲,请重试一下
              </Button>
            </div>
          </Empty>
        </View>
      );
    }
  };
  // 页面触底动作
  useReachBottom(() => {
    getArticleList(false);
  });

  // 页面首次加载执行
  useMount(() => {
    getArticleList("refresh");
  });
  /* 文章列表end */

  return (
    <View className={style.ArticleList}>
      <BackTop distance={200} bottom={50} />
      {emptyFlag()}
      <ScrollView>
        <View className={style.categories_list}>
          {articleList.map((item) => {
            return (
              <View className={style.categories_item} key={item.id}>
                <Row>
                  <Col span="16">
                    <View className={style.right_text}>
                      <View className={style.sortTitle}>{item.title}</View>
                      <View className={style.sort_summary}>
                        <Text>{item.time}</Text>
                        <Text className={style.text_icon}>
                          {" "}
                          <Icon name="eye"></Icon>
                        </Text>

                        <Text>{item.views}</Text>
                      </View>
                    </View>
                  </Col>
                  <Col span="8">
                    <View className={style.img_content}>
                      <image src={item.thumbnail} mode="aspectFill"></image>
                    </View>
                  </Col>
                </Row>
              </View>
            );
          })}
          <ArticlesLoading loadingShow={loadingShow} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ArticleList;
