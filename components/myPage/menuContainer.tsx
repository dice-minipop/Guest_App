import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useLogout } from '@/hooks/auth/auth';

const MenuContainer: React.FC = () => {
  const router = useRouter();

  const { mutateAsync: logout } = useLogout();

  return (
    <View className="px-[20px] py-[24px]">
      <Pressable onPress={() => router.push('/(topTabs)/like')} className="py-[12px]">
        <Text className="SUB3 text-deep_gray">찜한 목록</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/(topTabs)/chat')} className="py-[12px]">
        <Text className="SUB3 text-deep_gray">쪽지함</Text>
      </Pressable>

      <View className="h-[1px] bg-stroke my-[24px]" />

      <Pressable onPress={() => router.push('/myPage/management/guest')} className="py-[12px]">
        <Text className="SUB3 text-deep_gray">회원 정보 관리</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/myPage/(terms)/terms-of-service')}
        className="py-[12px]"
      >
        <Text className="SUB3 text-deep_gray">이용 약관</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/myPage/(terms)/privacy-policy')}
        className="py-[12px]"
      >
        <Text className="SUB3 text-deep_gray">개인정보 처리방침</Text>
      </Pressable>

      <View className="h-[1px] bg-stroke my-[24px]" />

      <Pressable onPress={() => logout()} className="py-[12px]">
        <Text className="SUB3 text-deep_gray">로그아웃</Text>
      </Pressable>

      <View className="h-[8px] bg-back_gray my-[24px] mx-[-20px]" />

      <Pressable onPress={() => router.push('/myPage/withdraw')} className="py-[12px]">
        <Text className="SUB3 text-deep_gray">탈퇴하기</Text>
      </Pressable>
    </View>
  );
};

export default MenuContainer;
