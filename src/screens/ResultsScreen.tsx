import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { PlayfulButton } from '../components/PlayfulButton';
import { ConfettiBurst } from '../components/ConfettiBurst';
import { colors, fonts, radii, shadow } from '../theme/theme';
import { HIGH_SCORE_KEY } from '../data/storageKeys';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

function resultCopy(ratio: number): { title: string; emoji: string } {
  if (ratio === 1) return { title: 'Perfekt! Du kennst alle Kantone!', emoji: '🏆' };
  if (ratio >= 0.8) return { title: 'Fantastisch gemacht!', emoji: '🌟' };
  if (ratio >= 0.5) return { title: 'Gut gemacht, weiter so!', emoji: '👍' };
  return { title: 'Guter Anfang, übe weiter!', emoji: '🌱' };
}

export const ResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { score, total } = route.params;
  const ratio = total > 0 ? score / total : 0;
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const copy = resultCopy(ratio);

  useEffect(() => {
    AsyncStorage.getItem(HIGH_SCORE_KEY).then((v) => {
      const stored = v ? Number(v) : 0;
      setIsNewHighScore(stored === score && score > 0);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {ratio >= 0.5 && <ConfettiBurst count={ratio === 1 ? 26 : 16} />}

      <View style={styles.content}>
        <Text style={styles.emoji}>{copy.emoji}</Text>
        <Text style={styles.title}>{copy.title}</Text>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreValue}>
            {score} / {total}
          </Text>
          <Text style={styles.scoreLabel}>richtige Antworten</Text>
          {isNewHighScore && <Text style={styles.newBest}>🎉 Neue Bestpunktzahl!</Text>}
        </View>

        <View style={styles.buttons}>
          <PlayfulButton
            label="Nochmal spielen"
            emoji="🔁"
            size="lg"
            color={colors.primary}
            onPress={() => navigation.replace('Quiz', route.params && { mode: 'mixed', questionCount: total })}
          />
          <PlayfulButton
            label="Zur Startseite"
            emoji="🏠"
            size="md"
            color={colors.secondary}
            style={{ marginTop: 16 }}
            onPress={() => navigation.popToTop()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  emoji: { fontSize: 72 },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 12,
  },
  scoreCard: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    paddingVertical: 28,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 28,
    ...shadow,
  },
  scoreValue: { fontFamily: fonts.heading, fontSize: 44, color: colors.text },
  scoreLabel: { fontFamily: fonts.body, fontSize: 15, color: colors.textLight, marginTop: 4 },
  newBest: { fontFamily: fonts.subheading, fontSize: 15, color: colors.accent, marginTop: 12 },
  buttons: { marginTop: 36, width: '100%', alignItems: 'center' },
});
