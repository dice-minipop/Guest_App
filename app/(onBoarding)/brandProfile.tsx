import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
// import CTAContainer from '@/components/common/ctaContainer';
// import CustomPressable from '@/components/common/customPressable/customPressable';
import CustomSelect from '@/components/common/customSelect';
import CustomTextInput from '@/components/common/customTextInput';
import HorizontalImageList from '@/components/common/imageList';
import OpacityPressable from '@/components/common/opacityPressable';
import { ageRangeItems, genderItems } from '@/constants/filtering';
import { useCreateBrandProfile } from '@/hooks/brand/brand';
import { useSignUpStore } from '@/zustands/onBoard/store';

export default function BrandProfile() {
  const {
    signUpStore,
    setTargetGender,
    setTargetAgeGroup,
    setBrandName,
    setBrandDescription,
    setImageUrls,
  } = useSignUpStore();

  const { mutateAsync: createBrandProfile, isPending } = useCreateBrandProfile();

  const isCompleted =
    signUpStore.brandProfile.targetGender.length !== 0 &&
    signUpStore.brandProfile.targetAgeGroup.length !== 0;

  const handleSubmit = async () => {
    await createBrandProfile({
      name: signUpStore.brandProfile.name || '',
      description: signUpStore.brandProfile.description || '',
      logoUrl: signUpStore.brandProfile.logoUrl || '',
      imageUrls: signUpStore.brandProfile.imageUrls || [],
      homepageUrl: '',
      targetGender: signUpStore.brandProfile.targetGender,
      targetAgeGroup: signUpStore.brandProfile.targetAgeGroup,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} title="회원가입" />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, rowGap: 24 }}
        bottomOffset={80}
      >
        <View className="gap-y-[8px] pt-[32px] pb-[8px]">
          <Text className="H2 text-black">브랜드 프로필을 등록해주세요</Text>
          <Text className="SUB3 text-deep_gray">
            선택한 브랜드 타겟에 맞는 팝업 공간을 추천드려요
          </Text>
        </View>

        <CustomSelect<string>
          label="브랜드 타겟 성별"
          subLabel=" (중복 선택 가능)"
          required={true}
          value={signUpStore.brandProfile.targetGender}
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
          value={signUpStore.brandProfile.targetAgeGroup}
          setValue={setTargetAgeGroup}
          options={ageRangeItems}
          textStyle="BTN2"
        />

        <CustomTextInput
          label="내 브랜드 이름"
          subLabel=" (선택)"
          value={signUpStore.brandProfile.name}
          setValue={setBrandName}
          placeholder="브랜드 이름을 입력해주세요"
        />

        <CustomTextInput
          label="짧은 브랜드 소개"
          subLabel=" (선택)"
          value={signUpStore.brandProfile.description}
          setValue={setBrandDescription}
          multiline={true}
          height="h-24"
          placeholder="팝업 공간을 대여해주는 호스트와 신뢰할 수 있는 거래를 위해 브랜드를 1~2문장으로 짧게 설명해주세요"
        />

        <HorizontalImageList
          label="브랜드, 상품 관련 이미지"
          subLabel=" (최대 10장/선택)"
          value={signUpStore.brandProfile.imageUrls}
          setValue={setImageUrls}
        />
      </KeyboardAwareScrollView>

      <View className="px-[20px] py-[16px]">
        <OpacityPressable
          onPress={handleSubmit}
          className={`${isCompleted ? 'bg-black' : 'bg-light_gray'} py-[15.5px] rounded-lg`}
          disabled={!isCompleted || isPending}
        >
          <Text className="BTN1 text-white text-center">
            {isPending ? '등록 중...' : '회원가입'}
          </Text>
        </OpacityPressable>
      </View>
    </SafeAreaView>
  );
}
