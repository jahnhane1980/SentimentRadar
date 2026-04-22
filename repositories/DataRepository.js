import { SettingsRepository } from './SettingsRepository';

// Die Mock-Daten wurden wie besprochen aus der Constants.js hierher verschoben
const mockAssets = [
  {
    id: '1',
    name: 'BTC',
    currentScore: 85,
    trend: [60, 65, 70, 68, 75, 82, 85],
  },
  {
    id: '2',
    name: 'ETH',
    currentScore: 77,
    trend: [80, 78, 75, 72, 74, 76, 77],
  },
  {
    id: '3',
    name: 'NAVITAS',
    currentScore: 56,
    trend: [40, 45, 50, 55, 52, 54, 56],
  },
  {
    id: '4',
    name: 'Silver',
    currentScore: 88,
    trend: [85, 86, 84, 87, 88, 89, 88],
  },
];

export const DataRepository = {
  fetchSentimentData: async () => {
    // 1. Prüfen, ob Zugangsdaten im SecureStore vorhanden sind
    const hasAccess = await SettingsRepository.hasCredentials();
    
    if (!hasAccess) {
      // Gemäß Vorgabe: Ohne Keys kein Datenabruf und Anzeige der Aufforderung
      return {
        success: false,
        requiresSetup: true,
        data: [],
      };
    }

    // 2. Platzhalter für die spätere Google Cloud/BigQuery Anbindung.
    // Solange die nicht steht, simulieren wir einen asynchronen Abruf und geben den Mock zurück.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          requiresSetup: false,
          data: mockAssets,
        });
      }, 800); // Künstliche Verzögerung für realistisches Ladeverhalten
    });
  }
};