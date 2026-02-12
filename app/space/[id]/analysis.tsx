import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import AverageBarChartComponent from '@/components/space/detail/analysis/averageBarChart';
import BarChartComponent from '@/components/space/detail/analysis/barChart';
import LineChartComponent from '@/components/space/detail/analysis/lineChart';
import { useGetSpacePopulationAnalysis } from '@/hooks/space/space';

export default function SpaceDetailAnalysis() {
  const { id } = useLocalSearchParams();

  const { data } = useGetSpacePopulationAnalysis(Number(id));

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} title="상세 유동인구 정보" />

      <ScrollView contentContainerStyle={{ paddingTop: 24, paddingBottom: 64 }}>
        <AverageBarChartComponent />
        <View className="bg-back_gray h-[8px] my-[24px]" />
        <LineChartComponent />
        <View className="bg-back_gray h-[8px] my-[24px]" />
        <BarChartComponent />
      </ScrollView>
    </SafeAreaView>
  );
}
