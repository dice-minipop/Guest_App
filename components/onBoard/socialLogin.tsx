import AppleIcon from '@/assets/icons/onBoarding/apple.svg';
import GoogleIcon from '@/assets/icons/onBoarding/google.svg';
import KakaoIcon from '@/assets/icons/onBoarding/kakao.svg';

import OpacityPressable from '../common/opacityPressable';

interface SocialLoginButtonProps {
  type: 'KAKAO' | 'GOOGLE' | 'APPLE';
}

export default function SocialLoginButton({ type }: SocialLoginButtonProps) {
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
    <OpacityPressable
      className={`flex justify-center items-center w-[52px] h-[52px] rounded-full border ${borderColor[type]} ${backgroundColor[type]}`}
    >
      {type === 'KAKAO' && <KakaoIcon />}
      {type === 'GOOGLE' && <GoogleIcon />}
      {type === 'APPLE' && <AppleIcon />}
    </OpacityPressable>
  );
}
