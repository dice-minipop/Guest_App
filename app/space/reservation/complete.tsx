import { CommonActions, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ReservationInfoComponent from '@/components/space/reservationInfo';

export default function ReservationComplete() {
  const navigation = useNavigation();

  const data = {
    id: 1,
    startDate: '2025.01.26',
    endDate: '2025.02.04',
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1">
        <ReservationInfoComponent data={data} />
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: '(tabs)' }],
            }),
          )
        }
        className="bg-black my-[16px] py-[15.5px] mx-[20px] rounded-lg"
      >
        <Text className="BTN1 text-white text-center">확인</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
