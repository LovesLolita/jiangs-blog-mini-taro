import React, { useState } from "react";
import { View } from "@tarojs/components";
import { Input, Button } from "@nutui/nutui-react-taro";
import styles from './index.module.scss'

const BoundOperation = () => {
  const [loginInfo, setLoginInfo] = useState({
    user: "",
    password: "",
  });
  return (
    <>
      <Input
        label="账户"
        placeholder="亲,请输入账户名称"
        defaultValue={loginInfo.user}
        clearable
        clearSize="18"
      />
      <Input
        label="密码"
        placeholder="亲,请输入密码"
        defaultValue={loginInfo.password}
        clearable
        clearSize="18"
        type="password"
      />
      <View>
      <Button block className={styles.btn} size="large" type="primary"  color="linear-gradient(to right, #7232dd, #4975f2)">
        登入
      </Button>
      </View>
    </>
  );
};

export default BoundOperation;
