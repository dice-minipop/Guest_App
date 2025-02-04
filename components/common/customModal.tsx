import React from 'react';
import { Text, View, Modal, Pressable } from 'react-native';

interface CustomModalProps {
  isVisible: boolean;
  closeModal: () => void;
  title: string;
  buttonText: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, closeModal, title, buttonText }) => {
  return (
    isVisible && (
      <Modal transparent={true}>
        <View
          onTouchEnd={closeModal}
          className="flex h-screen w-screen items-center justify-center bg-basic px-5"
        >
          <View
            onTouchEnd={(e) => e.stopPropagation()}
            className="w-full flex-col gap-y-[11px] rounded-xl bg-white p-4 pt-6"
          >
            <Text className="text-center font-H2 text-H2 leading-6 text-dark_gray">{title}</Text>

            <Pressable onPress={closeModal}>
              <Text className="py-[13px] text-center font-H2 text-H2 leading-6 text-purple">
                {buttonText}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
  );
};

export default CustomModal;
