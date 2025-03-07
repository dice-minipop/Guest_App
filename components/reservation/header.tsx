import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface HeaderComponentProps {
  status: string;
  handleStatus: (newStatus: string) => void;
  size?: number;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ status, handleStatus, size }) => {
  return (
    <View className="bg-back_gray flex flex-row items-center justify-center px-5">
      <Pressable
        onPress={() => handleStatus('PENDING')}
        className={`flex flex-row items-center gap-x-1 py-3 mx-6 border-b-2 ${status === 'PENDING' ? 'border-b-black' : 'border-b-back_gray'}`}
      >
        <Text
          className={`text-SUB3 font-SUB3 leading-SUB3 ${status === 'PENDING' ? 'text-black' : 'text-medium_gray'}`}
        >
          대기중
        </Text>
        {/* <Text className="w-5 h-[18px] text-center text-white bg-red rounded-full text-CAP2 font-CAP2 leading-CAP2">
          {size}
        </Text> */}
      </Pressable>
      <Pressable
        onPress={() => handleStatus('ACCEPT')}
        className={`py-3 mx-6 border-b-2 ${status === 'ACCEPT' ? 'border-b-black' : 'border-b-back_gray'}`}
      >
        <Text
          className={`text-SUB3 font-SUB3 leading-SUB3 ${status === 'ACCEPT' ? 'text-black' : 'text-medium_gray'}`}
        >
          예약 완료
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handleStatus('CANCEL')}
        className={`py-3 mx-6 border-b-2 ${status === 'CANCEL' ? 'border-b-black' : 'border-b-back_gray'}`}
      >
        <Text
          className={`text-SUB3 font-SUB3 leading-SUB3 ${status === 'CANCEL' ? 'text-black' : 'text-medium_gray'}`}
        >
          예약 취소
        </Text>
      </Pressable>
    </View>
  );
};

export default HeaderComponent;
