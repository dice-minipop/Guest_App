import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChatIcon from '@/assets/icons/topTabs/chat.svg';
import LikeIcon from '@/assets/icons/topTabs/like.svg';
import NotificationIcon from '@/assets/icons/topTabs/notification.svg';

interface TopNavigationComponentProps {
  title: string;
}

const TopNavigationComponent: React.FC<TopNavigationComponentProps> = ({ title }) => {
  const router = useRouter();

  const { top } = useSafeAreaInsets();

  return (
    <View className="bg-black z-50">
      <StatusBar style="light" />

      <View style={{ height: top }} />
      <View className="flex flex-row justify-between items-center p-[4px] pl-[16px]">
        <Text className="SUB1 text-white">{title}</Text>

        <View className="flex flex-row">
          <Pressable onPress={() => router.push('/(topTabs)/like')} className="p-[12px]">
            <LikeIcon />
          </Pressable>
          {title !== '팝업 지원 공고' && (
            <Pressable onPress={() => router.push('/(topTabs)/chat')} className="p-[12px]">
              <ChatIcon />
            </Pressable>
          )}
          <Pressable onPress={() => router.push('/(topTabs)/notification')} className="p-[12px]">
            <NotificationIcon />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TopNavigationComponent;
