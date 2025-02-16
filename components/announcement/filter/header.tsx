import React from 'react';
import { Text, View, Pressable } from 'react-native';

import Icon from '@/components/icon/icon';

interface HeaderComponentProps {
  type: string;
  handleType: (text: string) => void;
  onClose: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ type, handleType, onClose }) => {
  return (
    <View className="bg-white">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row gap-x-3 px-5 pb-0.5">
          {['지역', '지원대상', '모집상태'].map((filterType) => (
            <Pressable
              key={filterType}
              onPress={() => handleType(filterType)}
              className="py-[8.5px]"
            >
              <Text
                className={`font-H2 text-H2 leading-H2 ${
                  filterType === type ? 'text-black' : 'text-light_gray'
                }`}
              >
                {filterType}
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
