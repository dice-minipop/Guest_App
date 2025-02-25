import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { Suspense, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import LoadingComponent from '@/components/common/loadingComponent';
import Icon from '@/components/icon/icon';
import { useCreateBrand, useGetMyBrandInfo, useUpdateBrand } from '@/hooks/brand/brand';
import { useGetGuestInfo } from '@/hooks/guest/guest';
import { BrandInfo } from '@/server/brand/response';
import { uploadImage, uploadImageList } from '@/server/s3/s3';

const MyBrandUpdateScreen = () => {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { data, refetch: brandRefetch } = useGetMyBrandInfo();
  const { refetch: infoRefetch } = useGetGuestInfo();

  const { mutateAsync: updateBrand } = useUpdateBrand(infoRefetch, brandRefetch);
  const { mutateAsync: createBrand } = useCreateBrand(infoRefetch, brandRefetch);

  const [brandData, setBrandData] = useState<BrandInfo>({
    id: data.length > 0 ? data[0].id : 0,
    name: data.length > 0 ? data[0].name : '',
    description: data.length > 0 ? data[0].description : '',
    logoUrl: data.length > 0 ? data[0].logoUrl : '',
    imageUrls: data.length > 0 ? data[0].imageUrls : [],
    homepageUrl: data.length > 0 ? data[0].homepageUrl : '',
  });

  const uploadS3Image = async (imageList: ImagePicker.ImagePickerAsset[]) => {
    try {
      setIsUploading(true);
      const response = await uploadImage(imageList);
      setBrandData((prev) => ({ ...prev, logoUrl: response.imageUrl }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadS3Images = async (imageList: ImagePicker.ImagePickerAsset[]) => {
    try {
      setIsUploading(true);
      const response = await uploadImageList(imageList);
      setBrandData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...response.imageUrls],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '이미지 업로드를 위해 갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      uploadS3Image(result.assets);
    }
  };

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '이미지 업로드를 위해 갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      uploadS3Images(result.assets);
    }
  };

  const removeImage = (index: number) => {
    setBrandData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleBrand = async () => {
    const { id, ...brandDataWithoutId } = brandData;

    if (data.length === 0) {
      await createBrand(brandDataWithoutId);
    } else {
      await updateBrand({ brandId: id, data: brandDataWithoutId });
    }
  };

  return (
    <Suspense>
      <SafeAreaView className={`flex-1 bg-white ${Platform.OS === 'android' && 'pt-[50px]'}`}>
        <StatusBar style="dark" />
        {isUploading && <LoadingComponent />}
        <View className="flex flex-row justify-between items-center px-1 relative">
          <Pressable onPress={() => router.back()} className="p-3">
            <Icon.BlackLeftArrow />
          </Pressable>

          <Text className="absolute left-1/2 -translate-x-1/2 text-SUB3 font-SUB3 leading-SUB3">
            나의 브랜드 프로필 편집
          </Text>

          <Pressable
            onPress={() => {
              console.log('클릭됨');
              handleBrand();
            }}
            className="px-5 py-3.5"
          >
            <Text className="text-BTN1 font-BTN1 leading-BTN1">완료</Text>
          </Pressable>
        </View>

        <KeyboardAvoidingView
          // className="gap-y-8"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={{ rowGap: 32, paddingBottom: 16 }}>
            {brandData.logoUrl !== '' ? (
              <ImageBackground
                source={{ uri: brandData.logoUrl }}
                resizeMode="cover"
                className="h-[291px] w-screen flex justify-center items-center"
              >
                <View className="absolute inset-0 bg-black/50" />

                <Pressable className="p-4" onPress={pickImage}>
                  <Icon.Camera />
                </Pressable>
              </ImageBackground>
            ) : (
              <View className="w-screen h-[291px] bg-black flex justify-center items-center">
                <Pressable className="p-4" onPress={pickImage}>
                  <Icon.Camera />
                </Pressable>
              </View>
            )}

            <View className="gap-y-6">
              <View className="flex flex-col gap-y-2 px-5">
                <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">
                  내 브랜드 이름
                </Text>
                <TextInput
                  value={brandData.name}
                  onChangeText={(text: string) => setBrandData({ ...brandData, name: text })}
                  placeholder="브랜드 이름을 입력해주세요"
                  className="p-4 border border-light_gray rounded-lg"
                />
              </View>

              <View className="flex flex-col gap-y-2 px-5">
                <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">
                  짧은 브랜드 소개
                </Text>
                <TextInput
                  value={brandData.description}
                  onChangeText={(text: string) => setBrandData({ ...brandData, description: text })}
                  multiline
                  placeholder="팝업 공간을 대여해주는 호스트와 신뢰할 수 있는 거래를 위해 브랜드를 1~2문장으로 짧게 설명해주세요"
                  className="p-4 border border-light_gray rounded-lg min-h-[98px]"
                />
              </View>

              <View className="flex flex-col px-5">
                <Text className="text-CAP1 font-CAP1 leading-CAP1 text-dark_gray">
                  브랜드, 상품 관련 이미지 (최대 10장)
                </Text>
                <ScrollView
                  contentContainerStyle={{
                    columnGap: 6,
                    flexDirection: 'row',
                    position: 'relative',
                    paddingTop: 8,
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <Pressable
                    onPress={pickImages}
                    className="flex flex-col justify-center items-center gap-y-0.5 border border-light_gray rounded-xl w-20 h-20"
                  >
                    <Icon.Plus />
                    <Text className="text-CAP2 font-CAP2 leading-CAP2 text-medium_gray">
                      <Text className="text-purple">{brandData.imageUrls.length}</Text> / 10
                    </Text>
                  </Pressable>
                  {brandData.imageUrls.map((image, index) => (
                    <View key={index} className="relative">
                      <Image
                        source={{ uri: image }}
                        alt="이미지"
                        className="w-20 h-20 rounded-xl border border-light_gray"
                      />

                      <Pressable
                        onPress={() => removeImage(index)}
                        className="absolute -top-2 -right-2 z-10 overflow-visible"
                      >
                        <Icon.Delete />
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Suspense>
  );
};

export default MyBrandUpdateScreen;
