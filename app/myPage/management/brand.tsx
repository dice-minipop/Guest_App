import { useActionSheet } from '@expo/react-native-action-sheet';
import { ImageBackground } from 'expo-image';
import { useState } from 'react';
import { Dimensions, Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import CameraIcon from '@/assets/icons/myPage/camera.svg';
import PlusIcon from '@/assets/icons/myPage/plus.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import { showCustomActionSheetWithMap } from '@/utils/actionSheetUtil';

export default function BrandManagement() {
  const width = Dimensions.get('screen').width;

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [homepageUrl, setHomepageUrl] = useState<string>('');

  const { showActionSheetWithOptions } = useActionSheet();

  const logoOptions = {
    options: ['앨범에서 사진 선택', '사진 찍기', '기본 프로필 색상 선택', '취소'],
    cancelButtonIndex: 3,
    tintColor: '#5B4FF4',
  };

  const logoActionMap = {
    0: () => console.log('앨범에서 사진 선택'),
    1: () => console.log('사진 찍기'),
    2: () => console.log('기본 프로필 색상 선택'),
  };

  const imagesOptions = {
    options: ['앨범에서 사진 선택', '사진 찍기', '취소'],
    cancelButtonIndex: 2,
    tintColor: '#5B4FF4',
  };

  const imagesActionMap = {
    0: () => console.log('앨범에서 사진 선택'),
    1: () => console.log('사진 찍기'),
  };

  const onPressLogo = () => {
    showCustomActionSheetWithMap(showActionSheetWithOptions, logoOptions, logoActionMap);
  };

  const onPressImages = () => {
    showCustomActionSheetWithMap(showActionSheetWithOptions, imagesOptions, imagesActionMap);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent
        style="WHITE"
        hasSafeArea={false}
        title="나의 브랜드 프로필 편집"
        rightIcon={
          <Pressable className="flex flex-row px-[20px] py-[12px]">
            <Text className="BTN1 text-black">완료</Text>
          </Pressable>
        }
      />

      <KeyboardAwareScrollView
        contentContainerStyle={{ rowGap: 32, paddingBottom: 64 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        {logoUrl !== '' ? (
          <ImageBackground
            source={{ uri: logoUrl }}
            style={{ width: width, height: 291, zIndex: 0 }}
          >
            <View className="bg-black/50 w-full h-[291px] flex justify-center items-center">
              <Pressable onPress={onPressLogo} className="p-[16px]">
                <CameraIcon />
              </Pressable>
            </View>
          </ImageBackground>
        ) : (
          <View style={{ width: width, height: 291, zIndex: 0, backgroundColor: '#000000' }}>
            <View className="bg-black/50 w-full h-[291px] flex justify-center items-center">
              <Pressable onPress={onPressLogo} className="p-[16px]">
                <CameraIcon />
              </Pressable>
            </View>
          </View>
        )}

        <View className="px-[20px] gap-y-[24px]">
          <View className="gap-y-[8px]">
            <Text className="CAP1 text-dark_gray">내 브랜드 이름</Text>
            <TextInput
              value={name}
              onChangeText={(e: string) => setName(e)}
              placeholder="브랜드 이름을 입력해주세요"
              placeholderTextColor={'#CCCCCC'}
              className="h-[44px] px-[16px] leading-[16px] border border-light_gray rounded-lg"
            />
          </View>

          <View className="gap-y-[8px]">
            <Text className="CAP1 text-dark_gray">짧은 브랜드 소개</Text>
            <TextInput
              value={description}
              onChangeText={(e: string) => setDescription(e)}
              placeholder="팝업 공간을 대여해주는 호스트와 신뢰할 수 있는 거래를 위해 브랜드를 1~2문장으로 짧게 설명해주세요"
              placeholderTextColor={'#CCCCCC'}
              className="h-[98px] p-[16px] leading-[16px] border border-light_gray rounded-lg"
              multiline
            />
          </View>

          <View className="gap-y-[8px]">
            <Text className="CAP1 text-dark_gray">브랜드, 상품 관련 이미지 (최대 10장)</Text>
            <Pressable
              onPress={onPressImages}
              className="bg-white flex justify-center items-center rounded-xl border border-light_gray w-[80px] h-[80px]"
            >
              <PlusIcon />
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
