import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

const ToastContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="mx-[20px] mb-[20px] flex flex-row items-center justify-start rounded-xl bg-black px-[20px] py-[16px] z-50">
      {children}
    </View>
  );
};

export const showToast = (success: boolean, text1: string) => {
  Toast.show({
    type: 'custom',
    position: 'bottom',
    bottomOffset: 90,

    visibilityTime: 2000,
    props: {
      renderContent: () => (
        <ToastContainer>
          {/* {success ? <ToastSuccess /> : <ToastAlert />} */}
          <Text className="ml-2 font-600 text-white">{text1}</Text>
        </ToastContainer>
      ),
    },
  });
};
