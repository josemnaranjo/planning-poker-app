import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { ClosedRound, Participant } from '../../types/index.js';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 8, fontFamily: 'Helvetica-Bold' },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 24 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontFamily: 'Helvetica-Bold', marginBottom: 8, color: '#333' },
  story: { marginBottom: 16, padding: 12, backgroundColor: '#f5f5f5' },
  storyTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 6 },
  statsRow: { flexDirection: 'row', gap: 16, marginBottom: 6 },
  statItem: { fontSize: 10, color: '#555' },
  voteRow: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 10, marginBottom: 2 },
  dispersion: { fontSize: 10, color: '#cc6600', marginTop: 4 },
  participantsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  participantChip: { fontSize: 10, color: '#555' },
});

interface Props {
  history: ClosedRound[];
  participants: Participant[];
  date: string;
}

export const PdfDocument: React.FC<Props> = ({ history, participants, date }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Resumen de Poker Planning</Text>
      <Text style={styles.subtitle}>Fecha: {date} · {participants.length} participante(s)</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Participantes</Text>
        <View style={styles.participantsRow}>
          {participants.map(p => (
            <Text key={p.id} style={styles.participantChip}>
              {p.name} ({p.role === 'moderator' ? 'Moderador' : 'Votante'})
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historias estimadas</Text>
        {history.map((round, idx) => (
          <View key={round.id} style={styles.story}>
            <Text style={styles.storyTitle}>#{idx + 1} {round.story}</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statItem}>Promedio: {round.stats.average.toFixed(1)}</Text>
              <Text style={styles.statItem}>Moda: {round.stats.mode.join(', ') || '—'}</Text>
              <Text style={styles.statItem}>Mín: {round.stats.minimum}</Text>
              <Text style={styles.statItem}>Máx: {round.stats.maximum}</Text>
            </View>
            {round.stats.hasHighDispersion && (
              <Text style={styles.dispersion}>Alta dispersión</Text>
            )}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
