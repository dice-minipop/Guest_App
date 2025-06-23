import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const LineChartComponent: React.FC = () => {
  const data = {
    labels: ['', '10대 이하', '20대', '30대', '40대', '50대', '60대'],
    datasets: [
      {
        data: [0, 80000, 120000, 75000, 50000, 31000, 10000],
        color: (opacity = 1) => `rgba(255, 53, 127, ${opacity})`, // 핑크
        strokeWidth: 3,
      },
      {
        data: [0, 50000, 100000, 40000, 25000, 30000, 5000],
        color: (opacity = 1) => `rgba(91, 79, 244, ${opacity})`, // 퍼플
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View className="gap-y-[22px]">
      <Text className="SUB2 text-black px-[20px]">
        성수2가 1동은{'\n'}
        <Text className="text-purple">20대 여자</Text> 유동인구가 가장 많아요
      </Text>

      <View className="relative">
        <View className="absolute top-0 left-0 w-[20px] bg-white z-10 h-full" />
        <LineChart
          data={data}
          width={Dimensions.get('window').width + 100}
          height={220}
          chartConfig={chartConfig}
          withVerticalLines={false}
          withHorizontalLines={false}
          // withVerticalLabels={false}
          withHorizontalLabels={false}
          fromZero={true}
          bezier
          style={{
            marginLeft: -80,
            // marginRight: 0,
            // paddingLeft: 0,
            // paddingRight: 0,
          }}
        />
        <View className="absolute top-0 right-0 w-[20px] bg-white z-10 h-full" />
      </View>
    </View>
  );
};

export default LineChartComponent;
