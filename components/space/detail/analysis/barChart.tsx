import { Dimensions, Text, View } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';
import { BarChart } from 'react-native-gifted-charts';

const BarChartComponent: React.FC = () => {
  //   const values = [120000, 97000, 32000, 27000];
  //   const maxValue = Math.max(...values);

  //   const data = {
  //     labels: ['January', 'February', 'March', 'April'],
  //     datasets: [
  //       {
  //         data: values,
  //         colors: values.map(
  //           (value) =>
  //             (opacity = 1) =>
  //               value === maxValue
  //                 ? `rgba(91, 79, 244, ${opacity})` // 보라색 (최댓값)
  //                 : `rgba(200, 200, 200, ${opacity})`, // 회색 (기타)
  //         ),
  //       },
  //     ],
  //   };

  //   const chartConfig = {
  //     backgroundColor: '#FFFFFF',
  //     backgroundGradientFrom: '#FFFFFF',
  //     backgroundGradientTo: '#FFFFFF',
  //     color: (opacity = 1) => `rgba(91, 79, 244, ${opacity})`, // fallback
  //   };

  const barData = [
    { value: 250, label: '월' },
    { value: 500, label: '화' },
    { value: 745, label: '수' },
    { value: 320, label: '목' },
    { value: 600, label: '금' },
    { value: 256, label: '토' },
    { value: 300, label: '일' },
  ];

  const maxValue = Math.max(...barData.map((d) => d.value));

  const updatedBarData = barData.map((d) => ({
    ...d,
    frontColor: d.value === maxValue ? '#5B4FF4' : '#CCCCCC',
  }));

  return (
    <View className="gap-y-[22px]">
      <Text className="SUB2 text-black px-[20px]">
        성수2가 1동은{'\n'}
        <Text className="text-purple">토요일에</Text> 유동인구가 가장 많아요
      </Text>

      {/* <View className="relative">
        <View className="absolute top-0 left-0 w-[20px] bg-white z-10 h-full" />
      <BarChart
        data={barData}
        width={Dimensions.get('window').width + 60}
        height={220}
        //   chartConfig={chartConfig}
        verticalLabelRotation={30}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        style={{
          marginLeft: -50,
          // marginRight: 0,
          // paddingLeft: 0,
          // paddingRight: 0,
        }}
        fromZero
        showBarTops
      />
      <View className="absolute top-0 right-0 w-[20px] bg-white z-10 h-full" />
      </View> */}

      <View>
        <BarChart
          barWidth={28}
          noOfSections={3}
          barBorderRadius={4}
          frontColor="lightgray"
          data={updatedBarData}
          yAxisThickness={0}
          xAxisThickness={0}
          hideYAxisText={true}
          disableScroll={true}
          barStyle={{
            paddingLeft: 0,
            marginLeft: 0,
          }}
        />
      </View>
    </View>
  );
};

export default BarChartComponent;
