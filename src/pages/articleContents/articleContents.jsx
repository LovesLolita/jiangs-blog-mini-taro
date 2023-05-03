import Taro, { useLoad } from "@tarojs/taro";
import React, { useRef, useState } from "react";
import { View, Text, RichText } from "@tarojs/components";
import tools from "@/common/tools";
import API from "@/api";
import { useMount } from "ahooks";

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
  const [articleContent, setArticleContent] = useState("");

  const getArticleContent = async () => {
    try {
      let params = {
        post_id: articleId.current,
      };
      const res = await API.POST_DETAIL(params);
      if (res.code === 0) {
        setArticleContent(res.data.content);
        console.log(res.data.content);
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useMount(() => {
    getArticleContent();
  });
  /* 获取文章内容 end */

  function refaultNode(node) {
    node = node.replace(/<table/g, '<table class="table"');
    node = node.replace(/<th/g, '<th class="th"');
    node = node.replace(/<tr/g, '<tr class="tr"');
    node = node.replace(/<td/g, '<td class="td"');
    return node
  }
  return (
    <View className="article_contents">
      {/* <View dangerouslySetInnerHTML={{ __html: articleContent }}></View> */}
      <RichText
        nodes={refaultNode(articleContent)}
        style={{
          table: "border-collapse: collapse;",
          th: "border: 1px solid #ccc;padding: 3px 5px;text-align: left;background-color: #f1f1f1;text-align: center;background: #f1f1f1;",
          td: "border: 1px solid #ccc;padding: 3px 5px;text-align: left;",
        }}
      />
      {/* <mp-html
        className="new-mp-html"
        content={articleContent}
        tagStyle={{
          table: "border-collapse: collapse;",
          th: "border: 1px solid #ccc;padding: 3px 5px;text-align: left;background-color: #f1f1f1;text-align: center;background: #f1f1f1;",
          td: "border: 1px solid #ccc;padding: 3px 5px;text-align: left;",
        }}
      /> */}
    </View>
  );
};

export default ArticleContents;
