import { ActionSheetOptions } from '@expo/react-native-action-sheet';

type ActionSheetHandler = (selectedIndex?: number) => void;

type ActionMap = Record<number, () => void>;

export const showCustomActionSheetWithMap = (
  showActionSheetWithOptions: (options: ActionSheetOptions, callback: ActionSheetHandler) => void,
  config: ActionSheetOptions,
  actionMap: ActionMap,
) => {
  const { cancelButtonIndex } = config;

  showActionSheetWithOptions(config, (selectedIndex?: number) => {
    if (
      selectedIndex !== undefined &&
      selectedIndex !== cancelButtonIndex &&
      actionMap[selectedIndex]
    ) {
      actionMap[selectedIndex]!();
    }
  });
};
