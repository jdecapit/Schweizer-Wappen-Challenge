import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts, radii, shadow } from '../theme/theme';

interface Props {
  label: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  emoji?: string;
  style?: ViewStyle;
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  testID?: string;
}

export const PlayfulButton: React.FC<Props> = ({
  label,
  onPress,
  color = colors.primary,
  textColor = colors.white,
  testID,
  emoji,
  style,
  size = 'md',
  disabled,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => Animated.spring(scale, { toValue: 0.93, useNativeDriver: true, speed: 30 }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start();

  const paddingV = size === 'lg' ? 18 : size === 'md' ? 14 : 10;
  const fontSize = size === 'lg' ? 22 : size === 'md' ? 18 : 15;

  return (
    <Animated.View style={{ transform: [{ scale }], opacity: disabled ? 0.5 : 1 }}>
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        disabled={disabled}
        testID={testID}
        style={[
          styles.base,
          { backgroundColor: color, paddingVertical: paddingV },
          shadow,
          style,
        ]}
      >
        <Text style={[styles.label, { color: textColor, fontSize }]}>
          {emoji ? `${emoji}  ` : ''}
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.subheading,
    letterSpacing: 0.3,
  },
});
