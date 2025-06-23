import { Tabs } from 'expo-router';
import { Platform, Pressable } from 'react-native';

import AnnouncementIcon from '@/assets/icons/bottomTabs/announcement.svg';
import BlackAnnouncementIcon from '@/assets/icons/bottomTabs/black-announcement.svg';
import BlackMyIcon from '@/assets/icons/bottomTabs/black-my.svg';
import BlackReservationIcon from '@/assets/icons/bottomTabs/black-reservation.svg';
import BlackSpaceIcon from '@/assets/icons/bottomTabs/black-space.svg';
import MyIcon from '@/assets/icons/bottomTabs/my.svg';
import ReservationIcon from '@/assets/icons/bottomTabs/reservation.svg';
import SpaceIcon from '@/assets/icons/bottomTabs/space.svg';
import { colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          android: {
            height: 72,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="space"
        options={{
          title: '팝업공간',
          tabBarIcon: ({ focused }) => (focused ? <BlackSpaceIcon /> : <SpaceIcon />),
          tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
          tabBarActiveTintColor: colors.dark_gray,
          tabBarInactiveTintColor: colors.light_gray,
          tabBarLabelStyle: {
            marginTop: 8,
            fontSize: 12,
            fontWeight: 500,
          },
        }}
      />

      <Tabs.Screen
        name="announcement"
        options={{
          title: '지원공고',
          tabBarIcon: ({ focused }) => (focused ? <BlackAnnouncementIcon /> : <AnnouncementIcon />),
          tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
          tabBarActiveTintColor: colors.dark_gray,
          tabBarInactiveTintColor: colors.light_gray,
          tabBarLabelStyle: {
            marginTop: 8,
            fontSize: 12,
            fontWeight: 500,
          },
        }}
      />

      <Tabs.Screen
        name="reservation"
        options={{
          title: '공간예약',
          tabBarIcon: ({ focused }) => (focused ? <BlackReservationIcon /> : <ReservationIcon />),
          tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
          tabBarActiveTintColor: colors.dark_gray,
          tabBarInactiveTintColor: colors.light_gray,
          tabBarLabelStyle: {
            marginTop: 8,
            fontSize: 12,
            fontWeight: 500,
          },
        }}
      />

      <Tabs.Screen
        name="myPage"
        options={{
          title: '마이',
          tabBarIcon: ({ focused }) => (focused ? <BlackMyIcon /> : <MyIcon />),
          tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
          tabBarActiveTintColor: colors.dark_gray,
          tabBarInactiveTintColor: colors.light_gray,
          tabBarLabelStyle: {
            marginTop: 8,
            fontSize: 12,
            fontWeight: 500,
          },
        }}
      />
    </Tabs>
  );
}
