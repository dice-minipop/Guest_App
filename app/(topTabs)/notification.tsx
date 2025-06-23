import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import EmptyItemComponent from '@/components/notification/emptyItem';
import NotificationItemComponent from '@/components/notification/notificationItem';
import { data } from '@/constants/dummyData/notificationList';

export default function Notification() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent
        style="WHITE"
        hasSafeArea={false}
        title="알림"
        rightIcon={
          <Pressable className="flex flex-row px-[20px] py-[12px]">
            <Text className="BTN1 text-deep_gray">모두 읽음</Text>
          </Pressable>
        }
      />

      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={data}
        ListHeaderComponent={() => <View className="h-[32px]" />}
        renderItem={({ item }) => <NotificationItemComponent key={item.id} data={item} />}
        ListEmptyComponent={() => <EmptyItemComponent />}
      />
    </SafeAreaView>
  );
}
