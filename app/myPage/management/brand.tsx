import { useActionSheet } from '@expo/react-native-action-sheet';
import { Image, ImageBackground } from 'expo-image';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import CameraIcon from '@/assets/icons/myPage/camera.svg';
import PlusIcon from '@/assets/icons/myPage/plus.svg';
import RoundXIcon from '@/assets/icons/roundX.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import CustomSelect from '@/components/common/customSelect';
import { ageRangeItems, genderItems } from '@/constants/filtering';
import { useCreateBrand, useGetMyBrandInfo, useUpdateBrand } from '@/hooks/brand/brand';
import { cameraImagePicker, galleryImagePicker, galleryImagesPicker } from '@/hooks/useImage';
import { showCustomActionSheetWithMap } from '@/utils/actionSheetUtil';

export default function BrandManagement() {
  const width = Dimensions.get('screen').width;

  const { data } = useGetMyBrandInfo();

  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();

  // 초기 렌더 시에는 서버 데이터가 아직 없을 수 있으므로 안전한 기본값으로 초기화
  const [brandId, setBrandId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [targetGender, setTargetGender] = useState<string[]>([]);
  const [targetAgeGroup, setTargetAgeGroup] = useState<string[]>([]);

  useEffect(() => {
    // data가 undefined가 아니고, 최소 1개 이상 있을 때만 setState 수행
    if (!data || data.length === 0) return;

    const brand = data[0];

    if (!brand) return;

    setBrandId(brand.id ?? 0);
    setName(brand.name ?? '');
    setDescription(brand.description ?? '');
    setLogoUrl(brand.logoUrl ?? '');
    setImageUrls(brand.imageUrls ?? []);
    setTargetGender(brand.targetGender ?? []);
    setTargetAgeGroup(brand.targetAgeGroup ?? []);
  }, [data]);

  const { showActionSheetWithOptions } = useActionSheet();

  const logoOptions = {
    options: ['앨범에서 사진 선택', '사진 찍기', '기본 프로필 색상 선택', '취소'],
    cancelButtonIndex: 3,
    tintColor: '#5B4FF4',
  };

  const logoActionMap = {
    0: async () => {
      try {
        const response = await galleryImagePicker();
        if (response) {
          setLogoUrl(response.imageUrl);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    },
    1: async () => {
      try {
        const response = await cameraImagePicker();
        if (response) {
          setLogoUrl(response.imageUrl);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    },
    2: () => console.log('기본 프로필 색상 선택'),
  };

  const imagesOptions = {
    options: ['앨범에서 사진 선택', '사진 찍기', '취소'],
    cancelButtonIndex: 2,
    tintColor: '#5B4FF4',
  };

  const imagesActionMap = {
    0: async () => {
      try {
        const response = await galleryImagesPicker();
        if (response) {
          setImageUrls(response.imageUrls);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    },
    1: async () => {
      try {
        const response = await cameraImagePicker();
        if (response) {
          setLogoUrl(response.imageUrl);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    },
  };

  const onPressLogo = () => {
    showCustomActionSheetWithMap(showActionSheetWithOptions, logoOptions, logoActionMap);
  };

  const onPressImages = () => {
    showCustomActionSheetWithMap(showActionSheetWithOptions, imagesOptions, imagesActionMap);
  };

  const handleBrand = () => {
    if (brandId === 0) {
      createBrand({
        name,
        description,
        logoUrl,
        imageUrls,
        homepageUrl: '',
        targetGender,
        targetAgeGroup,
      });
    } else {
      updateBrand({
        brandId,
        data: {
          name,
          description,
          logoUrl,
          imageUrls,
          homepageUrl: '',
          targetGender,
          targetAgeGroup,
        },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent
        style="WHITE"
        hasSafeArea={false}
        title="나의 브랜드 프로필 편집"
        rightIcon={
          <Pressable onPress={handleBrand} className="flex flex-row px-[20px] py-[12px]">
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
          <CustomSelect<string>
            label="브랜드 타겟 성별"
            subLabel=" (중복 선택 가능)"
            required={true}
            value={targetGender}
            setValue={setTargetGender}
            options={genderItems}
            wrapGap="gap-1.5"
            padding="px-3 py-1"
            rounded="rounded-full"
          />

          <CustomSelect<string>
            label="브랜드 타겟 연령대"
            subLabel=" (중복 선택 가능)"
            required={true}
            value={targetAgeGroup}
            setValue={setTargetAgeGroup}
            options={ageRangeItems}
            textStyle="BTN2"
          />

          <View className="gap-y-[8px]">
            <Text className="CAP1 text-dark_gray">내 브랜드 이름</Text>
            <TextInput
              value={name}
              onChangeText={(e: string) => setName(e)}
              placeholder="브랜드 이름을 입력해주세요"
              placeholderTextColor={'#CCCCCC'}
              className="h-[44px] px-[16px] border border-light_gray rounded-lg INPUT text-dark_gray"
            />
          </View>

          <View className="gap-y-[8px]">
            <Text className="CAP1 text-dark_gray">짧은 브랜드 소개</Text>
            <TextInput
              value={description}
              onChangeText={(e: string) => setDescription(e)}
              placeholder="팝업 공간을 대여해주는 호스트와 신뢰할 수 있는 거래를 위해 브랜드를 1~2문장으로 짧게 설명해주세요"
              placeholderTextColor={'#CCCCCC'}
              className="h-[98px] p-[16px] border border-light_gray rounded-lg INPUT text-dark_gray"
              multiline
            />
          </View>

          <View className="overflow-visible">
            <Text className="CAP1 text-dark_gray">브랜드, 상품 관련 이미지 (최대 10장)</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                columnGap: 6,
                overflow: 'visible',
                paddingTop: 8,
              }}
            >
              <Pressable
                onPress={onPressImages}
                className="bg-white flex justify-center items-center rounded-xl border border-light_gray w-[80px] h-[80px]"
              >
                <PlusIcon />
                <Text className="CAP2 text-medium_gray text-center">
                  <Text className="text-purple">{imageUrls.length}</Text> / 10
                </Text>
              </Pressable>
              {imageUrls.map((item) => (
                <View key={item} className="relative">
                  <Image
                    source={{ uri: item }}
                    style={{ width: 80, height: 80, borderRadius: 12 }}
                  />
                  <Pressable
                    onPress={() => {
                      setImageUrls((prev) => prev.filter((url) => url !== item));
                    }}
                    className="absolute -top-2 -right-2 z-10 overflow-visible"
                  >
                    <RoundXIcon />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
