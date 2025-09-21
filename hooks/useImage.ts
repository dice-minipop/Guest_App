import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import { uploadImage, uploadImageList } from '@/server/s3/s3';

export const galleryImagePicker = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    return Alert.alert('권한 필요', '이미지 업로드를 위해 사진첩 접근 권한이 필요합니다!');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    allowsMultipleSelection: false,
  });

  if (result.canceled || result.assets.length === 0) return;

  const compressedImages = await Promise.all(
    result.assets.map(async (image) => {
      const originalInfo = await FileSystem.getInfoAsync(image.uri);
      if (originalInfo.exists && 'size' in originalInfo) {
        const originalSizeKB = (originalInfo.size / 1024).toFixed(2);
        const originalSizeMB = (originalInfo.size / 1024 / 1024).toFixed(2);
        console.log(`🟡 원본 이미지 용량: ${originalSizeKB} KB (${originalSizeMB} MB)`);
      }

      const compressed = await ImageManipulator.manipulateAsync(image.uri, [], {
        compress: 0.4,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: false,
      });

      const fileInfo = await FileSystem.getInfoAsync(compressed.uri);
      if (fileInfo.exists && 'size' in fileInfo) {
        const sizeInKB = (fileInfo.size / 1024).toFixed(2);
        const sizeInMB = (fileInfo.size / 1024 / 1024).toFixed(2);
        console.log(`✅ 압축된 이미지 용량: ${sizeInKB} KB (${sizeInMB} MB)`);
      }

      return compressed;
    }),
  );

  const response = await uploadImage(compressedImages);
  return response;
};

export const galleryImagesPicker = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    return Alert.alert('권한 필요', '이미지 업로드를 위해 사진첩 접근 권한이 필요합니다!');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 1,
    allowsMultipleSelection: true,
  });

  if (result.canceled || result.assets.length === 0) return;
  if (result.assets.length > 10) {
    Alert.alert('이미지는 최대 10장만 선택할 수 있어요!');
    return;
  }

  const compressedImages = await Promise.all(
    result.assets.map(async (image) => {
      const originalInfo = await FileSystem.getInfoAsync(image.uri);
      if (originalInfo.exists && 'size' in originalInfo) {
        const originalSizeKB = (originalInfo.size / 1024).toFixed(2);
        const originalSizeMB = (originalInfo.size / 1024 / 1024).toFixed(2);
        console.log(`🟡 원본 이미지 용량: ${originalSizeKB} KB (${originalSizeMB} MB)`);
      }

      const compressed = await ImageManipulator.manipulateAsync(image.uri, [], {
        compress: 0.4,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: false,
      });

      const fileInfo = await FileSystem.getInfoAsync(compressed.uri);
      if (fileInfo.exists && 'size' in fileInfo) {
        const sizeInKB = (fileInfo.size / 1024).toFixed(2);
        const sizeInMB = (fileInfo.size / 1024 / 1024).toFixed(2);
        console.log(`✅ 압축된 이미지 용량: ${sizeInKB} KB (${sizeInMB} MB)`);
      }

      return compressed;
    }),
  );

  const response = await uploadImageList(compressedImages);
  console.log(response);

  return response;
};

export const cameraImagePicker = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== 'granted') {
    return Alert.alert('권한 필요', '이미지 업로드를 위해 카메라 접근 권한이 필요합니다!');
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled && result.assets.length > 0) {
    const image = result.assets[0];

    const compressedImage = await ImageManipulator.manipulateAsync(image.uri, [], {
      compress: 0.6,
      format: ImageManipulator.SaveFormat.JPEG, // JPEG으로 변환
      base64: false,
    });

    const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri);

    if (fileInfo.exists && 'size' in fileInfo) {
      const sizeInKB = (fileInfo.size / 1024).toFixed(2);
      const sizeInMB = (fileInfo.size / 1024 / 1024).toFixed(2);
      console.log(`✅ 압축된 파일 용량: ${sizeInKB} KB (${sizeInMB} MB)`);
    } else {
      console.warn('❌ 파일 정보를 가져올 수 없습니다.');
    }

    const response = await uploadImage([compressedImage]);
    console.log(response);

    return response;
  }
};
