import { useEffect, useState } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import tools from "@/common/tools";
import { Avatar, Input, Button as NutButton } from "@nutui/nutui-react-taro";
import useUser from "@/hooks/useUser";
import { View, Button } from "@tarojs/components";
import API from "@/api";

import "./verify.scss";

const Verify = () => {
  /* 获取用户信息 */
  const [user, updateUser] = useUser();
  useLoad(() =>{
    console.log('useLoad');
  })
  /* 获取用户信息 end */

  /* 上传avatar */
  const [avatarUrl, updateAvatarUrl] = useState(tools.getUser()?.avatar || '');

  const onChooseAvatar = async (e) => {
    console.log(e);
    try {
      const res = await API.OTHER_UPLOAD(e.detail.avatarUrl);
      if (res.code === 0) {
        updateAvatarUrl(res.data.src);
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /* 上传avatar end */

  /* 更换昵称 */
  const [nickValue, UpdateNickValue] = useState(tools.getUser()?.nickname);
  /* 更换昵称end */

  /* 操作区 */
  const clickBack = () => {
    tools.navigateBack();
  };

  // 提交
  const clickSubmit = async () => {
    try {
      let params = {
        nickname: nickValue,
        avatar: avatarUrl,
      };
      const res = await API.USER_SET_INFO(params);
      if (res.code === 0) {
        Taro.showToast({
          icon: "none",
          title: res.msg,
        });
        updateUser({ ...tools.getUser(), nickname: nickValue, avatar: avatarUrl });
        setTimeout(() => {
          tools.navigateBack();
        }, 1500)
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /* 操作区end' */

  return (
    <View className='verify'>
      <View className='verify_info'>
        <Button
          open-type='chooseAvatar'
          className='uploader_avatar'
          onChooseAvatar={onChooseAvatar}
        >
          <Avatar size='large' icon={avatarUrl} />
          <View class='tip_avatar'>点击更换头像</View>
        </Button>
        <View className='tip_user_name'>你这么帅，不换个昵称吗</View>
        <View className='verify_input'>
          <Input
            name='text'
            value={nickValue}
            defaultValue={nickValue}
            labelAlign='center'
            inputAlign='center'
            maxlength='20'
            onChange={(val) => {
              UpdateNickValue(val);
            }}
          />
        </View>
      </View>
      <View className='verify_button'>
        <NutButton
          block
          type='primary'
          size='normal'
          color='#010101'
          onClick={clickSubmit}
        >
          提交
        </NutButton>
        <View className='verify_button_pass' onClick={clickBack}>
          跳过
        </View>
      </View>
    </View>
  );
};

export default Verify;
