import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { Pressable, Text } from 'react-native';
import { Portal } from 'react-native-portalize';

interface SortBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  sort: 'latest' | 'oldest';
  handleSort: (sort: 'latest' | 'oldest') => void;
}

export default function SortBottomSheet({
  bottomSheetRef,
  sort,
  handleSort,
}: SortBottomSheetProps) {
  const sortByItems = [
    { title: '최신순', value: 'latest' as const },
    { title: '오래된 순', value: 'oldest' as const },
  ];

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[180]}
        index={-1}
        enableContentPanningGesture={false}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
      >
        <BottomSheetView className="flex-1 py-[12px]">
          {sortByItems.map((item) => (
            <Pressable
              key={item.value}
              className="px-[20px] py-[12px]"
              onPress={() => {
                handleSort(item.value);
                bottomSheetRef.current?.close();
              }}
            >
              <Text
                className={['BTN1', sort === item.value ? 'text-black' : 'text-light_gray'].join(
                  ' ',
                )}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
}
