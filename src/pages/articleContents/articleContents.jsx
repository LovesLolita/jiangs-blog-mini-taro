import Taro, { useLoad } from "@tarojs/taro";
import React, { useRef, useState, Fragment } from "react";
import {
  View,
  Text,
  RichText,
  Button as Btn,
  Textarea,
} from "@tarojs/components";
import {
  Row,
  Col,
  Icon,
  Button,
  Avatar,
  AvatarGroup,
  Popup,
} from "@nutui/nutui-react-taro";
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
  const [articleContent, setArticleContent] = useState({});

  const getArticleContent = async () => {
    try {
      let params = {
        post_id: articleId.current,
      };
      const res = await API.POST_DETAIL(params);
      if (res.code === 0) {
        Taro.setNavigationBarTitle({
          title: res.data.title,
        });
        setArticleContent(res.data);
        setUserStatus(res.data.user);
        setLikeList(res.data.like_list);
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

  /* 点赞 */

  // 点赞 操作
  const [userStatus, setUserStatus] = useState({});
  const [likeList, setLikeList] = useState([]);

  const easyLike = async (status) => {
    try {
      let params = {
        post_id: articleId.current,
      };
      const res = await API.USER_LIKE(params);
      if (res.code === 0) {
        let useData = tools.getUser();
        let likeIndex = likeList.indexOf(useData.avatar);
        if (likeIndex > -1) {
          setLikeList(likeList.filter((item, index) => index !== likeIndex));
        } else {
          setLikeList([...likeList, useData.avatar]);
        }
        setUserStatus({ ...userStatus, islike: status === 1 ? 0 : 1 });
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 文章收藏
  const changeFavorite = async (status) => {
    try {
      let params = {
        post_id: articleId.current,
      };
      const res = await API.USER_FAVORITE(params);
      if (res.code === 0) {
        setUserStatus({ ...userStatus, isfavorite: status === 1 ? 0 : 1 });
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 点赞 END */

  /* 评论列表 */
  const comment_id = useRef(0)
  const commentCount = useRef(0); // 评论总数
  const [commentsList, setCommentsList] = useState([]); // 评论数据

  // 加载获取评论
  const getLoadComments = async (refresh) => {
    try {
      let offset = 0;
      if (!refresh) {
        offset = commentsList.length;
      }
      let params = {
        post_id: articleId.current,
        offset: offset,
      };
      const res = await API.COMMENT_INDEX(params);
      if (res.code === 0) {
        if(refresh){
          setCommentsList(res.data);
        } else {
          setCommentsList([...commentsList, ...res.data]);
        }
       
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 评论删除
  const commentDelete = async(id) => {
    try {
      let params = {
        comment_id: id
      }
      const res = await API.COMMENT_DELETE(params)
      if(res.code === 0){
        getLoadComments('refresh')
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useMount(() => {
    getLoadComments();
  });
  /* 评论列表 end */

  /* 发布评论 */
  const [showBottom, setShowBottom] = useState(true);
  const [remarkValue, updateRemarkValue] = useState("");

  // 输入
  const changeRemark = (e) => {
    updateRemarkValue(e.target.value);
  };

  const confirm_remark = async() => {
    try {
      if (remarkValue.trim() === "") {
        Taro.showToast({
          icon: "none",
          title: "请输入内容",
        });
        return;
      }
      let params = {
        post_id: articleId.current,
        parent_id: comment_id.current,
        content: remarkValue
      };
      const res = await API.COMMENT_ADD(params)
      if(res.code === 0){
        setShowBottom(false)
        getLoadComments('refresh')
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function closePopup() {
    setShowBottom(false);
  }
  /* 发布评论 end */

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
              color={userStatus?.islike === 1 ? "#fa2c19" : ""}
              className="page_laud_btn"
              onClick={() => easyLike(userStatus?.islike)}
            >
              {userStatus?.islike === 1 ? "已赞过" : "点个赞"}
            </Button>
          </Col>
          <Col span="8">
            <Button icon="share" iconSize={16} block className="page_laud_btn">
              海报分享
            </Button>
          </Col>
        </Row>
      </View>
      {(() => {
        if (likeList.length !== 0) {
          return (
            <View className="page_laud_list">
              <View className="page_laud_list_title">
                - 共计{likeList.length || "0"}
                人点赞，包含网站端
                {articleContent?.webLikes || "0"}人点赞 -
              </View>
              <View className="page_laud_list_block">
                <AvatarGroup span="-8">
                  {likeList.map((item, index) => {
                    return <Avatar key={index} url={item} />;
                  })}
                </AvatarGroup>
              </View>
            </View>
          );
        }
      })()}
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
      <View className="page_cmt_box">
        <View className="page_cmt_title">
          评论
          <Text className="page_cmt_title_count">
            {parseInt(articleContent?.comment_count) + commentCount.current}
          </Text>
        </View>
        {commentsList.map((item, index) => {
          return (
            <View className="page_cmt_content" key={index}>
              <View className="page_cmt_avatar">
                {(() => {
                  if (item?.user?.avatar?.length > 0) {
                    return <Avatar size="small" icon={item.user.avatar} />;
                  } else {
                    return (
                      <Avatar
                        size="small"
                        bgColor="rgb(253, 227, 207)"
                        color="rgb(245, 106, 0)"
                      >
                        {item?.user?.name?.charAt(0) || "N"}
                      </Avatar>
                    );
                  }
                })()}
              </View>
              <View className="page_cmt_head">
                <Text>{item.user.name}</Text>
                <Text className="page_cmt_time">{item.time}</Text>
                {item.approved != 1 ? (
                  <Text className="page_cmt_time">待审核</Text>
                ) : null}
                <Text className="comment_action">回复</Text>
                {item.user.is_me == 1 ? (
                  <Text className="comment_action" onClick={commentDelete}>删除</Text>
                ) : null}
              </View>
              <View className="page_cmt_text">{item.content}</View>
              <View className="page_cmt_replay">
                {item?.replys.map((itm, idx) => {
                  return (
                    <View className="cmt_replay_box" key={idx}>
                      <View className="cmt_replay_name">
                        <Text>{itm.user.name}</Text>
                        <Text className="cmt_replay_time">{itm.time}</Text>
                        {itm.approved != 1 ? (
                          <Text className="cmt_replay_time">待审核</Text>
                        ) : null}
                        {itm.user.is_me == 1 ? (
                          <Text className="comment_action">删除</Text>
                        ) : null}
                      </View>
                      <View className="cmt_replay_world">{itm.content}</View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
      <View className="operation">
        <Row>
          <Col span="14">
            <View
              className="btn_comment"
              onClick={() => {
                setShowBottom(true);
              }}
            >
              发表你的评论
            </View>
          </Col>
          <Col span="10">
            <View className="operation_right">
              <Btn
                className="operation_item"
                onClick={() => easyLike(userStatus?.islike)}
              >
                <Icon
                  name="fabulous"
                  size="1.2rem"
                  color={userStatus?.islike === 1 ? "#fa2c19" : ""}
                ></Icon>
              </Btn>
              <Btn
                className="operation_item"
                onClick={() => changeFavorite(userStatus?.isfavorite)}
              >
                <Icon
                  name="star"
                  size="1.2rem"
                  color={userStatus?.isfavorite === 1 ? "#fa2c19" : ""}
                ></Icon>
              </Btn>
              <Btn className="operation_item" open-type="share">
                <Icon name="share" size="1.2rem"></Icon>
              </Btn>
            </View>
          </Col>
        </Row>
      </View>
      <Fragment>
        <Popup
          visible={showBottom}
          style={{ height: "40%" }}
          position="bottom"
          onClose={() => {
            setShowBottom(false);
          }}
        >
          <View className="popup_view">
            <View className="Popup_top">
              <Text className="close_btn" onClick={closePopup}>
                取消
              </Text>
              <Text className="popup_title">发布评论</Text>
              <Text className="confirm_btn" onClick={confirm_remark}>
                发布
              </Text>
            </View>
            <View className="remark">
              <Textarea
                value={remarkValue}
                placeholder="请输入发布内容"
                className="remark_TextArea"
                maxlength={200}
                autoFocus
                onInput={changeRemark}
              />
            </View>
          </View>
        </Popup>
      </Fragment>
    </View>
  );
};

export default ArticleContents;
