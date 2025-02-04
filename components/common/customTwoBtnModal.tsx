import React from 'react';
import { Text, View, Modal, Pressable } from 'react-native';

interface CustomTwoBtnModalProps {
  isVisible: boolean;
  closeModal: () => void;
  title: string;
  leftBtnText: string;
  leftBtnFunc: any;
  rightBtnText: string;
  rightBtnFunc: any;
}

const CustomTwoBtnModal: React.FC<CustomTwoBtnModalProps> = ({
  isVisible,
  closeModal,
  title,
  leftBtnText,
  leftBtnFunc,
  rightBtnText,
  rightBtnFunc,
}) => {
  return (
    isVisible && (
      <Modal transparent={true}>
        <View
          onTouchEnd={closeModal}
          className="flex h-screen w-screen items-center justify-center bg-basic px-5"
        >
          <View
            onTouchEnd={(e) => e.stopPropagation()}
            className="w-full flex-col gap-y-[17px] rounded-xl bg-white pt-5"
          >
            <Text className="text-center font-SUB2 text-SUB2 leading-SUB2 text-dark_gray">
              {title}
            </Text>

            <View className="flex flex-row">
              <Pressable
                onPress={leftBtnFunc}
                className="flex-1 rounded-bl-[14px] border-[0.33px] py-2"
              >
                <Text className="text-center font-SUB2 text-SUB2 leading-SUB2 text-purple">
                  {leftBtnText}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => rightBtnFunc()}
                className="flex-1 rounded-br-[14px] border-[0.33px] py-2"
              >
                <Text className="text-center font-SUB2 text-SUB2 leading-SUB2 text-purple">
                  {rightBtnText}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    )
  );
};

export default CustomTwoBtnModal;
