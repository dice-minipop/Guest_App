import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { useLogout } from '@/hooks/auth/auth';

import OpacityPressable from '../common/opacityPressable';

const MenuContainer: React.FC = () => {
  const router = useRouter();

  const { mutateAsync: logout } = useLogout();

  const menuGroups: {
    label: string;
    onPress: () => void;
  }[][] = [
    [
      { label: '찜한 목록', onPress: () => router.push('/(topTabs)/like') },
      { label: '쪽지함', onPress: () => router.push('/(topTabs)/chat') },
    ],
    [
      { label: '회원 정보 관리', onPress: () => router.push('/myPage/management/guest') },
      { label: '이용 약관', onPress: () => router.push('/myPage/(terms)/terms-of-service') },
      { label: '개인정보 처리방침', onPress: () => router.push('/myPage/(terms)/privacy-policy') },
    ],
    [{ label: '로그아웃', onPress: () => logout() }],
    [{ label: '탈퇴하기', onPress: () => router.push('/myPage/withdraw') }],
  ];

  return (
    <View className="px-[20px] py-[24px]">
      {menuGroups.map((group, i) => (
        <View key={i}>
          {group.map(({ label, onPress }) => (
            <OpacityPressable key={label} onPress={onPress} className="py-[12px]">
              <Text className="SUB3 text-deep_gray">{label}</Text>
            </OpacityPressable>
          ))}

          {i === 0 || i === 1 ? (
            <View className="h-[1px] bg-stroke my-[24px]" />
          ) : i === 2 ? (
            <View className="h-[8px] bg-back_gray my-[24px] mx-[-20px]" />
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default MenuContainer;
