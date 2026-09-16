import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { buildQuiz, QuizQuestion } from '../data/quizEngine';
import { CantonFlag } from '../components/CantonFlags';
import { ProgressBar } from '../components/ProgressBar';
import { PlayfulButton } from '../components/PlayfulButton';
import { colors, fonts, radii, shadow } from '../theme/theme';
import { Canton } from '../data/cantons';
import { HIGH_SCORE_KEY } from '../data/storageKeys';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

type AnswerState = 'idle' | 'correct' | 'wrong' | 'dimmed';

const ENCOURAGEMENTS = ['Super! 🎉', 'Toll gemacht! ⭐️', 'Genau richtig! 🙌', 'Klasse! 🥳', 'Perfekt! 🏆'];
const OOPS = ['Fast! 💪', 'Nächstes Mal klappt es! 🌟', 'Kein Problem, weiter geht’s! 🍀'];

export const QuizScreen: React.FC<Props> = ({ navigation, route }) => {
  const { mode, questionCount } = route.params;
  const questions = useMemo(() => buildQuiz(mode, questionCount), [mode, questionCount]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [message, setMessage] = useState('');

  const bounce = useRef(new Animated.Value(1)).current;
  const shakes = useRef(new Map<string, Animated.Value>()).current;
  const getShake = (id: string): Animated.Value => {
    if (!shakes.has(id)) shakes.set(id, new Animated.Value(0));
    return shakes.get(id)!;
  };

  const question: QuizQuestion = questions[index];

  useEffect(() => {
    setSelectedId(null);
    setAnswered(false);
    setMessage('');
    question.options.forEach((o) => getShake(o.id).setValue(0));
  }, [index]);

  const triggerShake = (optId: string) => {
    const val = getShake(optId);
    Animated.sequence([
      Animated.timing(val, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(val, { toValue: -1, duration: 60, useNativeDriver: true }),
      Animated.timing(val, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(val, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const triggerBounce = () => {
    bounce.setValue(0.7);
    Animated.spring(bounce, { toValue: 1, friction: 3.5, useNativeDriver: true }).start();
  };

  const finishQuiz = async (finalScore: number) => {
    const prev = await AsyncStorage.getItem(HIGH_SCORE_KEY);
    const prevScore = prev ? Number(prev) : 0;
    if (finalScore > prevScore) {
      await AsyncStorage.setItem(HIGH_SCORE_KEY, String(finalScore));
    }
    navigation.replace('Results', { score: finalScore, total: questions.length });
  };

  const onSelect = (option: Canton) => {
    if (answered) return;
    setAnswered(true);
    setSelectedId(option.id);
    const isCorrect = option.id === question.answer.id;
    if (isCorrect) {
      setScore((s) => s + 1);
      setMessage(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
      triggerBounce();
    } else {
      setMessage(OOPS[Math.floor(Math.random() * OOPS.length)]);
      triggerShake(option.id);
    }
  };

  const onNext = () => {
    if (index + 1 >= questions.length) {
      finishQuiz(score);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const getState = (optId: string): AnswerState => {
    if (!answered) return 'idle';
    if (optId === question.answer.id) return 'correct';
    if (optId === selectedId) return 'wrong';
    return 'dimmed';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.closeBtn}>✕</Text>
        </Pressable>
        <View style={{ flex: 1, marginHorizontal: 14 }}>
          <ProgressBar progress={(index + (answered ? 1 : 0)) / questions.length} />
        </View>
        <Text style={styles.scoreText}>⭐️ {score}</Text>
      </View>

      <View style={styles.promptArea}>
        {question.type === 'flagToName' ? (
          <>
            <Text style={styles.promptLabel}>Welcher Kanton ist das?</Text>
            <Animated.View style={{ transform: [{ scale: bounce }] }}>
              <View style={styles.flagCard}>
                <CantonFlag id={question.answer.id} size={170} />
              </View>
            </Animated.View>
          </>
        ) : (
          <>
            <Text style={styles.promptLabel}>Welche Flagge gehört zu...</Text>
            <Animated.View style={[styles.nameCard, { transform: [{ scale: bounce }] }]}>
              <Text style={styles.nameCardText}>{question.answer.name}</Text>
            </Animated.View>
          </>
        )}
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      <View style={question.type === 'flagToName' ? styles.optionsAreaColumn : styles.optionsAreaGrid}>
        {question.type === 'flagToName'
          ? question.options.map((opt) => (
              <TextOption key={opt.id} option={opt} state={getState(opt.id)} onPress={() => onSelect(opt)} shake={getShake(opt.id)} />
            ))
          : question.options.map((opt) => (
              <FlagOption key={opt.id} option={opt} state={getState(opt.id)} onPress={() => onSelect(opt)} shake={getShake(opt.id)} />
            ))}
      </View>

      <View style={styles.footer}>
        {answered && (
          <PlayfulButton
            label={index + 1 >= questions.length ? 'Ergebnis ansehen' : 'Weiter'}
            emoji="➡️"
            color={colors.success}
            onPress={onNext}
            testID="quiz-next"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const shakeStyle = (anim: Animated.Value) => ({
  transform: [
    {
      translateX: anim.interpolate({ inputRange: [-1, 0, 1], outputRange: [-8, 0, 8] }),
    },
  ],
});

const stateColors = (state: AnswerState) => {
  switch (state) {
    case 'correct':
      return { bg: '#E3F6E7', border: colors.success };
    case 'wrong':
      return { bg: '#FDEAEA', border: colors.error };
    case 'dimmed':
      return { bg: colors.card, border: colors.border };
    default:
      return { bg: colors.card, border: colors.border };
  }
};

const TextOption: React.FC<{ option: Canton; state: AnswerState; onPress: () => void; shake: Animated.Value }> = ({
  option,
  state,
  onPress,
  shake,
}) => {
  const c = stateColors(state);
  return (
    <Animated.View style={[shakeStyle(shake), { opacity: state === 'dimmed' ? 0.5 : 1 }]}>
      <Pressable
        onPress={onPress}
        testID={`quiz-option-${option.id}`}
        style={[styles.textOption, { backgroundColor: c.bg, borderColor: c.border }]}
      >
        <Text style={styles.textOptionLabel}>{option.name}</Text>
        {state === 'correct' && <Text style={styles.badge}>✓</Text>}
        {state === 'wrong' && <Text style={styles.badge}>✗</Text>}
      </Pressable>
    </Animated.View>
  );
};

const FlagOption: React.FC<{ option: Canton; state: AnswerState; onPress: () => void; shake: Animated.Value }> = ({
  option,
  state,
  onPress,
  shake,
}) => {
  const c = stateColors(state);
  return (
    <Animated.View style={[shakeStyle(shake), { opacity: state === 'dimmed' ? 0.5 : 1 }]}>
      <Pressable
        onPress={onPress}
        testID={`quiz-option-${option.id}`}
        style={[styles.flagOption, { backgroundColor: c.bg, borderColor: c.border }]}
      >
        <CantonFlag id={option.id} size={64} />
        {state === 'correct' && <Text style={styles.badgeCorner}>✓</Text>}
        {state === 'wrong' && <Text style={styles.badgeCorner}>✗</Text>}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20 },
  topBar: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  closeBtn: { fontSize: 20, color: colors.textLight, fontFamily: fonts.body },
  scoreText: { fontFamily: fonts.subheading, fontSize: 16, color: colors.primary },
  promptArea: { alignItems: 'center', marginTop: 22, minHeight: 250, justifyContent: 'flex-start' },
  promptLabel: { fontFamily: fonts.body, fontSize: 16, color: colors.textLight, marginBottom: 14 },
  flagCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: radii.lg,
    ...shadow,
  },
  nameCard: {
    backgroundColor: colors.card,
    paddingHorizontal: 26,
    paddingVertical: 22,
    borderRadius: radii.lg,
    ...shadow,
  },
  nameCardText: { fontFamily: fonts.heading, fontSize: 26, color: colors.primary, textAlign: 'center' },
  message: { fontFamily: fonts.subheading, fontSize: 17, color: colors.secondary, marginTop: 16 },
  optionsAreaColumn: { marginTop: 18, gap: 12 },
  optionsAreaGrid: { marginTop: 18, flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center' },
  textOption: {
    borderWidth: 2.5,
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textOptionLabel: { fontFamily: fonts.body, fontSize: 17, color: colors.text },
  badge: { fontSize: 18, fontFamily: fonts.subheading },
  flagOption: {
    borderWidth: 2.5,
    borderRadius: radii.md,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 100,
  },
  badgeCorner: { position: 'absolute', top: 4, right: 8, fontSize: 16, fontFamily: fonts.subheading },
  footer: { marginTop: 20, alignItems: 'center', paddingBottom: 20 },
});
