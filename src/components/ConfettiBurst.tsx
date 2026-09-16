import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const EMOJI = ['🎉', '✨', '⭐️', '🎊', '🏔️'];
const { width: SCREEN_W } = Dimensions.get('window');

interface Piece {
  key: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  rotateTo: number;
}

export const ConfettiBurst: React.FC<{ count?: number }> = ({ count = 18 }) => {
  const pieces = useRef<Piece[]>(
    Array.from({ length: count }).map((_, i) => ({
      key: i,
      emoji: EMOJI[i % EMOJI.length],
      left: Math.random() * SCREEN_W,
      delay: Math.random() * 400,
      duration: 1600 + Math.random() * 900,
      rotateTo: Math.random() > 0.5 ? 1 : -1,
    }))
  ).current;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((p) => (
        <ConfettiPiece key={p.key} piece={p} />
      ))}
    </View>
  );
};

const ConfettiPiece: React.FC<{ piece: Piece }> = ({ piece }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: piece.duration,
      delay: piece.delay,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-40, 640] });
  const opacity = anim.interpolate({ inputRange: [0, 0.1, 0.85, 1], outputRange: [0, 1, 1, 0] });
  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${piece.rotateTo * 360}deg`],
  });

  return (
    <Animated.Text
      style={{
        position: 'absolute',
        left: piece.left,
        fontSize: 26,
        transform: [{ translateY }, { rotate }],
        opacity,
      }}
    >
      {piece.emoji}
    </Animated.Text>
  );
};
