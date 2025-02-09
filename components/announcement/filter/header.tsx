import Icon from '@/components/icon/icon';
import React from 'react';
import { Text, View, Pressable } from 'react-native';

// import XButton from '@assets/x.svg';

interface HeaderComponentProps {
  activeIndex: number;
  onScroll: (type: string) => void;
  onClose: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ activeIndex, onScroll, onClose }) => {
  return (
    <View className="bg-white">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row gap-x-3 px-5 pb-0.5">
          {['region', 'target', 'status'].map((filterType, index) => (
            <Pressable key={filterType} onPress={() => onScroll(filterType)} className="py-[8.5px]">
              <Text
                className={`font-H2 text-H2 leading-H2 ${
                  activeIndex === index ? 'text-black' : 'text-light_gray'
                }`}
              >
                {filterType === 'region' && '지역'}
                {filterType === 'target' && '지원대상'}
                {filterType === 'status' && '모집상태'}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={onClose} className="mr-[3px] flex items-center justify-center p-3">
          <Icon.X />
        </Pressable>
      </View>

      <View className="mx-5 h-[1px] bg-stroke" />
    </View>
  );
};

export default HeaderComponent;
