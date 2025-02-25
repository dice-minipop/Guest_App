import React from 'react';
import { Text, Pressable, View } from 'react-native';
import { Portal } from 'react-native-portalize';

interface WithdrawModalComponentProps {
  items: string[];
  isVisible: boolean;
  closeModal: () => void;
  value: string;
  handleValue: (text: string) => void;
}

const WithdrawModalComponent: React.FC<WithdrawModalComponentProps> = ({
  items,
  isVisible,
  closeModal,
  value,
  handleValue,
}) => {
  return (
    isVisible && (
      <Portal>
        <View
          className="relative flex h-screen w-screen justify-end bg-black/50"
          onTouchEnd={closeModal}
        >
          <View
            className="rounded-t-xl bg-white pt-11 px-5 pb-[98px] gap-y-1"
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {items.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  handleValue(item);
                  closeModal();
                }}
                className={`p-4 ${value === item ? 'bg-back_gray' : 'bg-white'}`}
              >
                <Text
                  className={`text-SUB3 font-SUB3 leading-SUB3 ${value === item ? 'text-black' : 'text-medium_gray'}`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Portal>
    )
  );
};

export default WithdrawModalComponent;
