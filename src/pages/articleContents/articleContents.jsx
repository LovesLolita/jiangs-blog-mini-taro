import Taro, { useLoad } from "@tarojs/taro";
import React, { useRef, useState } from "react";
import { View, Text, RichText } from "@tarojs/components";
import {
  Row,
  Col,
  Icon,
  Button,
  Avatar,
  AvatarGroup,
} from "@nutui/nutui-react-taro";
import tools from "@/common/tools";
import API from "@/api";
import { useMount, useSetState } from "ahooks";

import "./articleContents.scss";

const ArticleContents = () => {
  /* 初始化获取文章信息 */
  const articleId = useRef(null);

  // 页面初始进行 hook
  useLoad((options) => {
    console.log(options);
    if (options.scene) {
      articleId.current = decodeURIComponent(options.scene);
    } else if (options.post_id) {
      articleId.current = options.post_id;
    }
  });
  /* 初始化获取文章信息 end */

  /* 获取文章内容 */
  const [articleContent, setArticleContent] = useState({});

  const getArticleContent = async () => {
    try {
      let params = {
        post_id: articleId.current,
      };
      const res = await API.POST_DETAIL(params);
      if (res.code === 0) {
        setArticleContent(res.data);
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 富文本样式单独处理
  function resultNode(node) {
    if (node) {
      node = node.replace(/<table/g, '<table class="table"');
      node = node.replace(/<th/g, '<th class="table_th"');
      node = node.replace(/<tr/g, '<tr class="table_tr"');
      node = node.replace(/<td/g, '<td class="table_td"');
      return node;
    }
  }

  useMount(() => {
    getArticleContent();
  });
  /* 获取文章内容 end */

  return (
    <View className="article_contents">
      <View className="article_top">
        <Text className="article_title">{articleContent?.title}</Text>
        <View className="article_title_other">
          <Row>
            <Col span="20">
              <View className="other_classify">
                {articleContent?.time}&emsp;
                {articleContent?.cats?.map((item, idx) => {
                  return (
                    <>
                      <Text key={idx}>{item.name}</Text>
                      &emsp;
                    </>
                  );
                })}
              </View>
            </Col>
            <Col span="4">
              <View className="other_classify">
                <Icon
                  size=".7rem"
                  name="eye"
                  className="nut-icon-am-breathe  nut-icon-am-infinite"
                />
                &nbsp; {articleContent?.views}
              </View>
            </Col>
          </Row>
        </View>
      </View>
      <View className="article_text">
        {/* <mp-html
        className="new-mp-html"
        content={articleContent}
        tagStyle={{
          table: "border-collapse: collapse;",
          th: "border: 1px solid #ccc;padding: 3px 5px;text-align: left;background-color: #f1f1f1;text-align: center;background: #f1f1f1;",
          td: "border: 1px solid #ccc;padding: 3px 5px;text-align: left;",
        }}
      /> */}
        <View className="article_rich_text">
          <RichText
            nodes={resultNode(articleContent?.content)}
            style={{ background: "#ccc" }}
          />
        </View>

        <View class="text_end">
          <text>- The End -</text>
        </View>
        <View class="text_tag">
          {articleContent?.tags?.map((item, index) => {
            return (
              <Text key={index} className="text_tag_item">
                {item.name}
              </Text>
            );
          })}
        </View>
      </View>
      <View className="page_laud">
        <Row gutter={20} type="flex" justify="center">
          <Col span="8">
            <Button
              icon="fabulous"
              iconSize={16}
              block
              className="page_laud_btn"
            >
              点个赞
            </Button>
          </Col>
          <Col span="8">
            <Button icon="share" iconSize={16} block className="page_laud_btn">
              海报分享
            </Button>
          </Col>
        </Row>
      </View>
      <View className="page_laud_list">
        <View className="page_laud_list_title">
          - 共计2人点赞，包含网站端0人点赞 -
        </View>
        <View className="page_laud_list_block">
          <AvatarGroup span="-4">
            <Avatar url="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
            <Avatar color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">
              L
            </Avatar>
            <Avatar color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">
              U
            </Avatar>
          </AvatarGroup>
        </View>
      </View>
      <View className="pre_next_view">
        <View className="">
          <Icon
            style={{ verticalAlign: "initial" }}
            name="left"
            size=".8rem"
          ></Icon>
          &nbsp;
          <Text>上一篇</Text>
        </View>
        <View>
          <Text>下一篇</Text>
          &nbsp;
          <Icon
            style={{ verticalAlign: "initial" }}
            name="right"
            size=".8rem"
          ></Icon>
        </View>
      </View>
    </View>
  );
};

export default ArticleContents;
