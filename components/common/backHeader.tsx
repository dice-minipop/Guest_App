import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/icons/backArrow.svg';
import BlackBackArrowIcon from '@/assets/icons/black-backArrow.svg';

interface BackHeaderComponentProps {
  style?: 'BLACK' | 'WHITE';
  hasSafeArea?: boolean;
  title?: string;
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const BackHeaderComponent: React.FC<BackHeaderComponentProps> = ({
  style = 'BLACK',
  hasSafeArea = true,
  title,
  children,
  rightIcon,
}) => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return style === 'BLACK' ? (
    <View className="bg-black z-50">
      <StatusBar style="light" />

      {hasSafeArea && <View style={{ height: top }} />}
      <View className="flex flex-row items-center pl-[3px]">
        <Pressable onPress={() => router.back()} className="p-[12px]">
          <BackArrowIcon />
        </Pressable>

        {title !== undefined && (
          <Text className="BODY1 text-black absolute left-1/2 -translate-x-1/2 py-[12px]">
            {title}
          </Text>
        )}

        {children !== undefined && (
          <View className="absolute left-1/2 -translate-x-1/2 py-[12px] -translate-y-1/2 top-1/2 z-50">
            {children}
          </View>
        )}
      </View>
    </View>
  ) : (
    <View className="bg-white">
      <StatusBar style="dark" />

      {hasSafeArea && <View style={{ height: top }} />}
      <View className="flex flex-row w-full items-center justify-between px-[3px]">
        <Pressable onPress={() => router.back()} className="p-[12px]">
          <BlackBackArrowIcon />
        </Pressable>

        {title !== undefined && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="BODY1 text-black max-w-[240px] absolute left-1/2 -translate-x-1/2 py-[12px] text-center"
          >
            {title}
          </Text>
        )}

        {children !== undefined && <View className="absolute">{children}</View>}

        {rightIcon !== undefined && <View>{rightIcon}</View>}
      </View>
    </View>
  );
};

export default BackHeaderComponent;
