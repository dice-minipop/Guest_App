import { View, Text } from 'react-native';

import { useSpaceFilterStore } from '@/zustands/filter/space';

import AgeRange from './ageRange';
import Gender from './gender';
import Purpose from './purpose';
import Weekend from './weekend';

interface FootTrafficFilteringProps {
  viewRef: React.RefObject<View>;
  handleLayout: (event: any, index: number) => void;
}

const FootTrafficFiltering: React.FC<FootTrafficFilteringProps> = ({ viewRef, handleLayout }) => {
  const { spaceFilter, setSpaceFilter } = useSpaceFilterStore();

  const toggleValue = <T, K extends keyof typeof spaceFilter>(key: K, value: T) => {
    const current = spaceFilter[key] as T[] | undefined;
    const next = current?.includes(value)
      ? current.filter((v) => v !== value)
      : [...(current ?? []), value];

    setSpaceFilter({ [key]: next } as Partial<typeof spaceFilter>);
  };

  return (
    <View
      className="gap-y-[24px] mt-[24px]"
      ref={viewRef}
      onLayout={(event) => handleLayout(event, 1)}
    >
      <View className="h-[8px] bg-back_gray" />

      <View className="gap-y-[32px] px-[20px]">
        <Text className="CAP1 text-dark_gray">유동인구</Text>

        <Gender
          value={spaceFilter.targetGender}
          handleValue={(e: string) => toggleValue('targetGender', e)}
        />
        <AgeRange
          value={spaceFilter.targetAgeGroup}
          handleValue={(e: number) => toggleValue('targetAgeGroup', e)}
        />
        <Weekend
          value={spaceFilter.targetDayofWeek}
          handleValue={(e: string) => toggleValue('targetDayofWeek', e)}
        />
        <Purpose
          value={spaceFilter.targetPurpose}
          handleValue={(e: string) => toggleValue('targetPurpose', e)}
        />
      </View>
    </View>
  );
};

export default FootTrafficFiltering;
