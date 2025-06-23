import { Text, View } from 'react-native';

import SmallCheckPolygonIcon from '@/assets/icons/spaceDetail/small-check-polygon.svg';

const AverageBarChartComponent: React.FC = () => {
  const data = [
    { title: '성수2가 1동\n평균', value: 120000 },
    { title: '성수동 4개 구역\n평균', value: 97000 },
    { title: '서울\n평균', value: 32000 },
    { title: '전국\n평균', value: 27000 },
  ];

  const targetData = [
    {
      title: '20대 여성 유동인구 높음',
      isChecked: true,
    },
    {
      title: '사진 촬영 목적 비율 높음',
      subTitle: '47%의 유동인구가 사진 촬영을 위해 방문했어요',
      isChecked: true,
    },
  ];

  const maxValue = data[0].value;
  const maxHeight = 112;

  return (
    <View className="gap-y-[24px] px-[20px]">
      <View>
        <Text className="SUB3 text-semiLight_gray mb-[8px]">25년 02월 기준</Text>
        <Text className="H2 text-black">성수2가 1동은</Text>
        <Text className="SUB2 text-purple">전국 20대 여성 유동인구가 상위 5%에요</Text>
      </View>

      <View className="flex flex-row justify-around items-center">
        {data.map((item, index) => (
          <View key={item.title} className="flex flex-col items-center">
            <Text className={`BTN2 text-center ${index === 0 ? 'text-purple' : 'text-light_gray'}`}>
              {item.value.toLocaleString()}명
            </Text>
            <View className="h-[112px] mt-[8px] mb-[16px] flex flex-col justify-end">
              <View
                style={{
                  height: (item.value / maxValue) * maxHeight,
                  backgroundColor: index === 0 ? '#5B4FF4' : '#CCCCCC',
                  width: 36,
                  borderRadius: 4,
                }}
              />
            </View>
            <Text className={`CAP2 text-center ${index === 0 ? 'text-purple' : 'text-light_gray'}`}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>

      <View className="bg-back_gray rounded-lg p-[16px]">
        <Text className="SUB2 text-black text-center">브랜드 타겟과 일치하나요?</Text>

        <View className="bg-light_gray h-[1px] my-[12px]" />

        <View className="pl-[20px] gap-y-[8px]">
          {targetData.map((item) => (
            <View key={item.title} className="flex flex-row items-center gap-x-[8px]">
              <SmallCheckPolygonIcon />
              <View className="flex flex-col gap-y-[2px]">
                <Text className="BODY1 text-deep_gray">{item.title}</Text>
                {item.subTitle && <Text className="BTN2 text-medium_gray">{item.subTitle}</Text>}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AverageBarChartComponent;
