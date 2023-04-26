import { useState } from 'react';
import Taro from '@tarojs/taro';
import Constant from '@/common/constant';

function useUser() {
  const [user, setUser] = useState(() => Taro.getStorageSync(Constant.USER_KEY) || null);

  const updateUser = (newUser) => {
    if(newUser){
      Taro.setStorageSync(Constant.USER_KEY, newUser);
    }
    setUser(Taro.getStorageSync(Constant.USER_KEY));
   
  };

  return [user, updateUser];
}

export default useUser;