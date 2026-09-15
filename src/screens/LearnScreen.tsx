import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { CANTONS, Canton } from '../data/cantons';
import { CantonFlag } from '../components/CantonFlags';
import { PlayfulButton } from '../components/PlayfulButton';
import { colors, fonts, radii, shadow } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Learn'>;

export const LearnScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openAt = (id: string) => setSelectedIndex(CANTONS.findIndex((c) => c.id === id));
  const close = () => setSelectedIndex(null);
  const step = (dir: 1 | -1) =>
    setSelectedIndex((i) => (i === null ? null : (i + dir + CANTONS.length) % CANTONS.length));

  const selected: Canton | null = selectedIndex !== null ? CANTONS[selectedIndex] : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>‹ Zurück</Text>
        </Pressable>
        <Text style={styles.title}>Die 26 Kantone</Text>
        <View style={{ width: 60 }} />
      </View>

      <FlatList
        data={CANTONS}
        keyExtractor={(c) => c.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => openAt(item.id)}>
            <CantonFlag id={item.id} size={58} />
            <Text style={styles.cardLabel} numberOfLines={1}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={close}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {selected && (
              <>
                <Pressable style={styles.modalClose} onPress={close} hitSlop={10}>
                  <Text style={styles.modalCloseText}>✕</Text>
                </Pressable>
                <CantonFlag id={selected.id} size={140} />
                <Text style={styles.modalName}>{selected.name}</Text>
                <Text style={styles.modalMeta}>
                  Hauptort: {selected.capital} · seit {selected.joined}
                </Text>
                <Text style={styles.modalFact}>{selected.fact}</Text>
                <View style={styles.modalNav}>
                  <PlayfulButton label="‹ Vorher" size="sm" color={colors.secondary} onPress={() => step(-1)} />
                  <PlayfulButton label="Nachher ›" size="sm" color={colors.secondary} onPress={() => step(1)} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  back: { fontFamily: fonts.body, color: colors.secondary, fontSize: 16, width: 70 },
  title: { fontFamily: fonts.subheading, fontSize: 19, color: colors.text },
  grid: { padding: 14, gap: 10 },
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 4,
    ...shadow,
  },
  cardLabel: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.text,
    marginTop: 6,
    maxWidth: 96,
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#00000066',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 26,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  modalClose: { position: 'absolute', top: 12, right: 14 },
  modalCloseText: { fontSize: 20, color: colors.textLight },
  modalName: { fontFamily: fonts.heading, fontSize: 24, color: colors.primary, marginTop: 14 },
  modalMeta: { fontFamily: fonts.body, fontSize: 14, color: colors.textLight, marginTop: 6 },
  modalFact: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 20,
  },
  modalNav: { flexDirection: 'row', gap: 12, marginTop: 22 },
});
