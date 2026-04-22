export const Constants = {
  strings: {
    appTitle: 'Market Sentiment',
    dailyScoreLabel: 'Score',
    trendLabel: 'Sentiment Verlauf',
    loadingText: 'Daten werden geladen...',
    errorText: 'Fehler beim Laden der Daten.',
    settingsTitle: 'Konfiguration',
    saveButton: 'Speichern',
    closeButton: 'Abbrechen',
    setupRequiredTitle: 'Setup erforderlich',
    setupRequiredText: 'Bitte hinterlege deine Google Cloud Projektdaten in den Einstellungen, um Live-Daten abzurufen.',
    labels: {
      projectId: 'Google Cloud Project ID',
      datasetId: 'BigQuery Dataset ID',
      tableId: 'BigQuery Table ID',
      clientEmail: 'Service Account Email',
      privateKey: 'Private Key',
    }
  },
  numbers: {
    chartHeight: 120,
    maxScore: 100,
  }
};