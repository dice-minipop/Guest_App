import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import AcceptReservationList from '@/components/reservation/acceptReservationList';
import CancelReservationList from '@/components/reservation/cancelReservationList';
import PendingReservationList from '@/components/reservation/pendingReservationList';
import TopNavigationComponent from '@/components/tabs/topNavigation';

const renderScene = SceneMap({
  PENDING: PendingReservationList,
  ACCEPT: AcceptReservationList,
  CANCEL: CancelReservationList,
});

export default function Reservation() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'PENDING', title: '대기중' },
    { key: 'ACCEPT', title: '예약 완료' },
    { key: 'CANCEL', title: '예약 취소' },
  ]);

  return (
    <View className="flex-1 bg-white">
      <TopNavigationComponent title="예약 관리" />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('screen').width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#000000' }}
            style={{ backgroundColor: '#F4F4F4' }}
            activeColor="#000000"
            inactiveColor="#999999"
          />
        )}
      />
    </View>
  );
}
