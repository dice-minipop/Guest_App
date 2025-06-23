import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomPressableComponent from '@/components/common/customPressable';
import ReservationInfoComponent from '@/components/space/reservationInfo';

export default function ReservationComplete() {
  const router = useRouter();

  const data = {
    id: 1,
    startDate: '2025.01.26',
    endDate: '2025.02.04',
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <StatusBar style="dark" />
      <ReservationInfoComponent data={data} />

      <View className="absolute left-0 bottom-[50px] w-full">
        <CustomPressableComponent
          buttonText="확인"
          onPress={() => router.dismissAll()}
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
}
