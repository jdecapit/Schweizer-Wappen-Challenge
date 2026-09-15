import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors, radii } from '../theme/theme';

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(width, { toValue: progress, duration: 350, useNativeDriver: false }).start();
  }, [progress]);

  return (
    <View style={styles.track}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: width.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 14,
    borderRadius: radii.pill,
    backgroundColor: colors.border,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
  },
});
