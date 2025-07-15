import type { Preview } from '@storybook/react-native';
import { StoryFn } from '@storybook/react-native';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const withBackButton = (Story: StoryFn) => {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={() => router.back()} className="mx-[20px] py-[8px] self-start">
        <Text>{'<'} 홈으로 돌아가기</Text>
      </Pressable>

      <Story />
    </View>
  );
};

const preview: Preview = {
  decorators: [withBackButton],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
