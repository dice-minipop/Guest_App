import { useRouter } from 'expo-router';
import { Fragment, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import FilledLikeIcon from '@/assets/icons/filled-like.svg';
import LikeIcon from '@/assets/icons/like.svg';
import { useToggleAnnouncementLike } from '@/hooks/like/like';
import { AnnouncementItem } from '@/types/announcement';
import { formatDate } from '@/utils/translateDate';

interface AnnouncementItemComponentProps {
  data: AnnouncementItem;
}

const AnnouncementItemComponent: React.FC<AnnouncementItemComponentProps> = ({ data }) => {
  const router = useRouter();

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const { mutateAsync: announcementLike, isPending } = useToggleAnnouncementLike(data.id);

  return (
    <Fragment>
      {isPending && (
        <Modal transparent={true}>
          <View className="bg-black/50 w-screen h-screen">
            <Text className="text-white">로딩중</Text>
          </View>
        </Modal>
      )}
      <Pressable
        // TODO : 공고 별 id로 수정
        // onPress={() => router.push(`/announcement/${data.id}`)}
        onPress={() => router.push(`/announcement/1`)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className="border border-stroke rounded-lg bg-white mx-[20px]"
      >
        <View
          className={`pt-[8px] pl-[16px] pb-[16px] pr-[6px] flex flex-row justify-between  ${isPressed && 'opacity-50'}`}
        >
          <View className="flex flex-col mt-[8px] gap-y-[8px]">
            <View>
              <Text className="CAP1 text-medium_gray">{data.city}</Text>
              <Text numberOfLines={1} className="max-w-[240px] SUB1 text-black">
                {data.title}
              </Text>
            </View>

            <Text className="CAP2 text-light_gray">
              {data.target} 대상 | {formatDate(data.recruitmentStartAt)} ~{' '}
              {formatDate(data.recruitmentEndAt)}
            </Text>
          </View>

          <Pressable
            onPress={() => announcementLike()}
            className="flex flex-col items-center self-start py-[8px]"
          >
            {data.isLiked ? <FilledLikeIcon /> : <LikeIcon />}
            <Text
              className={`CAP2 text-center w-[48px] ${data.isLiked ? 'text-purple' : 'text-semiLight_gray'}`}
            >
              {data.likeCount > 999 ? '999+' : data.likeCount}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Fragment>
  );
};

export default AnnouncementItemComponent;
