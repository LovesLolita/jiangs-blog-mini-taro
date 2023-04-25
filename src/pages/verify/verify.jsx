import React, { useState } from "react";
import Taro from "@tarojs/taro";
import tools from "@/common/tools";
import { Avatar, Input } from "@nutui/nutui-react-taro";
import useUser from "@/hooks/useUser";
import { useMount } from "ahooks";
import { View, Text } from "@tarojs/components";
import API from "@/api";

import "./verify.scss";

const Verify = () => {
  /* 获取用户信息 */
  const [user, updateUser] = useUser();

  /* 获取用户信息 end */

  /* 更换昵称 */
  const [nickValue, UpdateNickValue] = useState(user.nickname);
  /* 更换昵称end */

  return (
    <View className='verify'>
      <View className='verify_info'>
        <Avatar size='large' icon={user.avatar} />
        <View class='tip_avatar'>点击更换头像</View>
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
      <View className='verify_button'></View>
    </View>
  );
};

export default Verify;
