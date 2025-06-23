import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Pressable, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';

import XIcon from '@/assets/icons/spaceDetail/x.svg';

interface FilteringBottomSheetComponentProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  items: string[];
  selectedFilter: string;
  handleFilter: (e: string) => void;
  children: React.ReactNode;
  clearFilter: () => void;
  handleResult: () => void;
}

const FilteringBottomSheetComponent: React.FC<FilteringBottomSheetComponentProps> = ({
  bottomSheetRef,
  items,
  selectedFilter,
  handleFilter,
  children,
  clearFilter,
  handleResult,
}) => {
  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[600]}
        maxDynamicContentSize={600}
        index={-1}
        enableContentPanningGesture={false}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
      >
        <View className="flex-1">
          <View className="flex flex-row justify-between items-center pl-[20px] pr-[3px]">
            <View className="flex flex-row gap-x-[12px]">
              {items.map((item) => (
                <Pressable key={item} onPress={() => handleFilter(item)} className="py-[8.5px]">
                  <Text
                    className={`H2 ${selectedFilter === item ? 'text-black' : 'text-light_gray'}`}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable className="p-[12px]">
              <XIcon />
            </Pressable>
          </View>

          <View className="h-[1px] mx-[20px] mb-[24px] bg-stroke" />

          {children}

          <View className="bg-white flex flex-row items-center gap-x-[12px] pt-[16px] pb-[50px] w-full px-[20px] border-t border-t-stroke">
            <Pressable
              onPress={clearFilter}
              className="rounded-lg border border-stroke px-4 py-[15.5px]"
            >
              <Text className="BTN1 text-black text-center">초기화</Text>
            </Pressable>

            <Pressable
              onPress={handleResult}
              className="flex-1 rounded-lg bg-black px-4 py-[15.5px]"
            >
              <Text className="BTN1 text-white text-center">필터 결과 보기</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    </Portal>
  );
};

export default FilteringBottomSheetComponent;
