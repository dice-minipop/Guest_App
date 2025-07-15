import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChatIcon from '@/assets/icons/topTabs/chat.svg';
import LikeIcon from '@/assets/icons/topTabs/like.svg';
import MagnifierIcon from '@/assets/icons/topTabs/magnifier.svg';
import NotificationIcon from '@/assets/icons/topTabs/notification.svg';

interface TopNavigationComponentProps {
  title: string;
  scrollY?: number;
}

const TopNavigationComponent: React.FC<TopNavigationComponentProps> = ({ title, scrollY }) => {
  const isStorybook = globalThis.__STORYBOOK__ === true;
  const expoRouter = useRouter();
  const router = isStorybook ? require('@/constants/mockRouter').mockRouter : expoRouter;

  const { top } = useSafeAreaInsets();

  const magnifierOpacity = useRef(new Animated.Value(0)).current;
  const shouldShowMagnifier = title === '팝업 공간' && (scrollY ?? 0) >= 71;

  useEffect(() => {
    Animated.timing(magnifierOpacity, {
      toValue: shouldShowMagnifier ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [shouldShowMagnifier]);

  return (
    <View className="bg-black z-50">
      <StatusBar style="light" />

      <View style={{ height: top }} />
      <View className="flex flex-row justify-between items-center p-[4px] pl-[16px]">
        <Text className="SUB1 text-white">{title}</Text>

        <View className="flex flex-row">
          {/* MagnifierIcon always rendered, fade controlled by opacity */}
          <Animated.View
            style={{
              opacity: magnifierOpacity,
              pointerEvents: shouldShowMagnifier ? 'auto' : 'none',
            }}
          >
            <Pressable onPress={() => router.push(`/space/search`)} className="p-[12px]">
              <MagnifierIcon />
            </Pressable>
          </Animated.View>

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
