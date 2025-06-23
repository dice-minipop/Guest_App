import * as Clipboard from 'expo-clipboard';
import { Alert, Pressable, Text, View } from 'react-native';

import CopyIcon from '@/assets/icons/copy.svg';
import FilledLikeIcon from '@/assets/icons/filled-like.svg';
import LikeIcon from '@/assets/icons/like.svg';
import { AnnouncementDetailComponentProps } from '@/types/announcement';
import { formatDate } from '@/utils/dateUtils';

const AnnouncementBasicInfoComponent: React.FC<AnnouncementDetailComponentProps> = ({ data }) => {
  return (
    <View className="pl-[20px] pt-[26px]">
      <View className="flex flex-col gap-y-[24px]">
        <View className="flex flex-row justify-between pr-[5px]">
          <Text className="H2 text-black max-w-[280px]">{data.title}</Text>

          <Pressable className="flex flex-col items-center py-[8px]">
            {data.isLiked ? <FilledLikeIcon /> : <LikeIcon />}
            <Text
              className={`CAP2 text-center w-[48px] ${data.isLiked ? 'text-purple' : 'text-semiLight_gray'}`}
            >
              {data.likeCount > 999 ? '999+' : data.likeCount}
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="h-[1px] bg-stroke my-[24px] mr-[20px]" />

      <View className="flex flex-col gap-y-[20px] pr-[20px]">
        <View className="flex flex-col gap-y-[8px]">
          <View className="flex flex-row items-start gap-x-[20px]">
            <Text className="CAP1 text-deep_gray">해당 지역</Text>
            <Text className="CAP1 text-deep_gray">{data.city}</Text>
          </View>

          <View className="flex flex-row items-start gap-x-[20px]">
            <Text className="CAP1 text-deep_gray">공간 위치</Text>
            <Text className="flex-1 CAP1 text-deep_gray">
              {data.district} {data.address} {data.hostName}
            </Text>
          </View>

          <View className="flex flex-row items-start gap-x-[20px]">
            <Text className="CAP1 text-deep_gray">지원 대상</Text>
            <Text className="CAP1 text-deep_gray">{data.target}</Text>
          </View>

          <View className="flex flex-row items-start gap-x-[20px]">
            <Text className="CAP1 text-deep_gray">모집 기간</Text>
            <Text className="CAP1 text-deep_gray">
              {formatDate(data.recruitmentStartAt)}~{formatDate(data.recruitmentEndAt)}
            </Text>
          </View>

          <View className="flex flex-row items-start gap-x-[20px]">
            <Text className="CAP1 text-deep_gray">문의 번호</Text>
            <View className="flex flex-row items-center gap-x-[10px]">
              <Text className="CAP1 text-deep_gray">{data.contactNumber}</Text>
              <Pressable
                onPress={async () => {
                  await Clipboard.setStringAsync(data.contactNumber);
                  Alert.alert('전화번호가 복사되었습니다.');
                }}
              >
                <CopyIcon />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AnnouncementBasicInfoComponent;
