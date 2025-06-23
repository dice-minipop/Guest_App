import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import BackHeaderComponent from '@/components/common/backHeader';

export default function PrivacyPolicy() {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent style="WHITE" hasSafeArea={false} />

      {loading && <ActivityIndicator size="large" color="#000000" />}

      <WebView
        source={{
          uri: 'https://juvenile-chess-b24.notion.site/18e7ece7ecb5806dab25c6fe7c424d7c?pvs=4',
        }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </SafeAreaView>
  );
}
