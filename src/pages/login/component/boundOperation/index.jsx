import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { Input, Button } from "@nutui/nutui-react-taro";
import tools from "@/common/tools";
import API from "@/api";
import useUser from '@/hooks/useUser';

// css module
import styles from "./index.module.scss";

const BoundOperation = () => {
  /* 输入 */
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
  });

  const disabledFlag = () => {
    if(!loginInfo.userName || !loginInfo.password){
      return true
    } else {
      return false
    }
  }

  // 点击登入
  // useUser 自定义hooks
  const [user, updateUser] = useUser();

  const ToLogin = async() => {
    console.log(loginInfo);
    try {
      const res = await API.USER_LOGIN_TEST({})
      if(res.code === 0) {
        updateUser(res.data)
      } else {
        tools.showToast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  }

  /* 输入 end */

  return (
    <>
      <Input
        label='账户'
        placeholder='亲,请输入账户名称'
        name='userName'
        defaultValue={loginInfo.userName}
        value={loginInfo.userName}
        clearable
        clearSize='18'
        onChange={(val) =>
          setLoginInfo({
            ...loginInfo,
            userName: val,
          })
        }
        onClear={() => {
          setLoginInfo({
            ...loginInfo,
            userName: '',
          })
        }}
      />
      <Input
        label='密码'
        placeholder='亲,请输入密码'
        name='password'
        defaultValue={loginInfo.password}
        value={loginInfo.password}
        clearable
        clearSize='18'
        type='password'
        onChange={(val) =>
          setLoginInfo({
            ...loginInfo,
            password: val,
          })
        }
        onClear={() => {
          setLoginInfo({
            ...loginInfo,
            password: '',
          })
        }}
      />
      <View>
        <Button
          block
          disabled={disabledFlag()}
          className={styles.btn}
          size='large'
          type='primary'
          color='#497ef2'
          onClick={ToLogin}
        >
          登入
        </Button>
      </View>
    </>
  );
};

export default BoundOperation;
