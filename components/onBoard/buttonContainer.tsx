import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import DiceIcon from '@/assets/icons/onBoarding/icon.svg';
import SpeechBubble from '@/assets/icons/onBoarding/speechBubble.svg';
import { useAuthStore } from '@/zustands/auth/auth';

import CTAContainer from '../common/ctaContainer';
import TextButton from '../common/textButton';

import SocialLoginButton from './socialLogin';

export default function ButtonContainer() {
  const router = useRouter();

  const { setIsLoggedIn } = useAuthStore();

  return (
    <CTAContainer extraBottom={24}>
      <View className="gap-y-[4px]">
        {/* <View className="relative flex items-center justify-center">
          <SpeechBubble />
          <Text className="BTN2 text-center absolute top-[12px]">간편하게 시작하기</Text>
        </View> */}

        <View className="gap-y-[12px]">
          {/* <View className="flex flex-row justify-center items-center gap-x-[11px]">
            <SocialLoginButton type="KAKAO" />
            <SocialLoginButton type="GOOGLE" />
            <SocialLoginButton type="APPLE" />
          </View> */}
          <TouchableOpacity
            onPress={() => router.push('/(onBoarding)/login')}
            className="flex flex-row justify-center items-center gap-x-[8px] border border-stroke mx-[20px] py-[14px] bg-white rounded-lg"
          >
            <DiceIcon />
            <Text className="BTN1">다이스 아이디로 로그인</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-[11px] flex flex-row justify-center items-center gap-x-[8px]">
        <TextButton onPress={() => router.push('/(onBoarding)/register')}>
          회원으로 가입하기
        </TextButton>
        <Text className="text-medium_gray">|</Text>
        <TextButton onPress={() => setIsLoggedIn()}>비회원으로 둘러보기</TextButton>
      </View>
    </CTAContainer>
  );
}
