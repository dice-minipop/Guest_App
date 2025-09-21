import { useState } from 'react';
import { Pressable } from 'react-native';

import AppleIcon from '@/assets/icons/onBoarding/apple.svg';
import GoogleIcon from '@/assets/icons/onBoarding/google.svg';
import KakaoIcon from '@/assets/icons/onBoarding/kakao.svg';

interface SocialLoginButtonProps {
  type: 'KAKAO' | 'GOOGLE' | 'APPLE';
}

export default function SocialLoginButton({ type }: SocialLoginButtonProps) {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const backgroundColor = {
    KAKAO: 'bg-[#FEE500]',
    GOOGLE: 'bg-white',
    APPLE: 'bg-black',
  };

  const borderColor = {
    KAKAO: 'border-[#FEE500]',
    GOOGLE: 'border-stroke',
    APPLE: 'border-black',
  };

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`flex justify-center items-center w-[52px] h-[52px] rounded-full border ${borderColor[type]} ${backgroundColor[type]} ${isPressed && 'opacity-50'}`}
    >
      {type === 'KAKAO' && <KakaoIcon />}
      {type === 'GOOGLE' && <GoogleIcon />}
      {type === 'APPLE' && <AppleIcon />}
    </Pressable>
  );
}
