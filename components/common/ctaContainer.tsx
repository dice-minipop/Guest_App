import { View } from 'react-native';

interface CTAContainerProps {
  children: React.ReactNode;
  extraBottom?: number;
}

export default function CTAContainer({ children, extraBottom = 0 }: CTAContainerProps) {
  return (
    <View
      style={{ bottom: 24, paddingBottom: extraBottom }}
      className="absolute left-[20px] right-[20px] z-50 bg-white"
    >
      {children}
    </View>
  );
}
