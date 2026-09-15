import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, QuizMode } from '../navigation/types';
import { PlayfulButton } from '../components/PlayfulButton';
import { colors, fonts, radii, shadow } from '../theme/theme';
import { HIGH_SCORE_KEY } from '../data/storageKeys';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MODES: { key: QuizMode; label: string; emoji: string }[] = [
  { key: 'mixed', label: 'Gemischt', emoji: '🔀' },
  { key: 'flagToName', label: 'Flagge → Name', emoji: '🏳️' },
  { key: 'nameToFlag', label: 'Name → Flagge', emoji: '🔤' },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [mode, setMode] = useState<QuizMode>('mixed');
  const [highScore, setHighScore] = useState<number | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(HIGH_SCORE_KEY).then((v) => setHighScore(v ? Number(v) : 0));
    const unsub = navigation.addListener('focus', () => {
      AsyncStorage.getItem(HIGH_SCORE_KEY).then((v) => setHighScore(v ? Number(v) : 0));
    });
    return unsub;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.mascot}>🐮</Text>
        <Text style={styles.title}>Schweizer{'\n'}Wappen Challenge</Text>
        <Text style={styles.subtitle}>Lerne alle 26 Kantone der Schweiz! 🏔️</Text>
      </View>

      {highScore !== null && (
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreEmoji}>🏆</Text>
          <Text style={styles.scoreText}>Bestpunktzahl: {highScore}/10</Text>
        </View>
      )}

      <View style={styles.modeRow}>
        {MODES.map((m) => (
          <Pressable
            key={m.key}
            onPress={() => setMode(m.key)}
            style={[styles.modeChip, mode === m.key && styles.modeChipActive]}
          >
            <Text style={styles.modeEmoji}>{m.emoji}</Text>
            <Text style={[styles.modeLabel, mode === m.key && styles.modeLabelActive]}>{m.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.buttons}>
        <PlayfulButton
          label="Quiz starten"
          emoji="🎯"
          size="lg"
          color={colors.primary}
          onPress={() => navigation.navigate('Quiz', { mode, questionCount: 10 })}
        />
        <PlayfulButton
          label="Kantone entdecken"
          emoji="📖"
          size="md"
          color={colors.secondary}
          style={{ marginTop: 16 }}
          onPress={() => navigation.navigate('Learn', undefined)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 28,
  },
  hero: {
    alignItems: 'center',
    marginTop: 24,
  },
  mascot: {
    fontSize: 64,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.textLight,
    marginTop: 10,
    textAlign: 'center',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radii.pill,
    ...shadow,
  },
  scoreEmoji: { fontSize: 18, marginRight: 8 },
  scoreText: { fontFamily: fonts.body, color: colors.text, fontSize: 15 },
  modeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  modeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: colors.border,
  },
  modeChipActive: {
    borderColor: colors.primary,
    backgroundColor: '#FDEBE9',
  },
  modeEmoji: { fontSize: 14, marginRight: 6 },
  modeLabel: { fontFamily: fonts.body, color: colors.textLight, fontSize: 13 },
  modeLabelActive: { color: colors.primary },
  buttons: {
    width: '100%',
    alignItems: 'center',
  },
});
