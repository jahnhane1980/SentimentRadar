import * as SecureStore from 'expo-secure-store';

// Interne Schlüssel für den verschlüsselten Speicher
const KEYS = {
  PROJECT_ID: 'bq_project_id',
  DATASET_ID: 'bq_dataset_id',
  TABLE_ID: 'bq_table_id',
  CLIENT_EMAIL: 'bq_client_email',
  PRIVATE_KEY: 'bq_private_key',
};

export const SettingsRepository = {
  saveSettings: async (settings) => {
    try {
      if (settings.projectId) await SecureStore.setItemAsync(KEYS.PROJECT_ID, settings.projectId);
      if (settings.datasetId) await SecureStore.setItemAsync(KEYS.DATASET_ID, settings.datasetId);
      if (settings.tableId) await SecureStore.setItemAsync(KEYS.TABLE_ID, settings.tableId);
      if (settings.clientEmail) await SecureStore.setItemAsync(KEYS.CLIENT_EMAIL, settings.clientEmail);
      if (settings.privateKey) await SecureStore.setItemAsync(KEYS.PRIVATE_KEY, settings.privateKey);
      return true;
    } catch (error) {
      console.error("Fehler beim Speichern der Settings:", error);
      return false;
    }
  },

  getSettings: async () => {
    try {
      return {
        projectId: await SecureStore.getItemAsync(KEYS.PROJECT_ID),
        datasetId: await SecureStore.getItemAsync(KEYS.DATASET_ID),
        tableId: await SecureStore.getItemAsync(KEYS.TABLE_ID),
        clientEmail: await SecureStore.getItemAsync(KEYS.CLIENT_EMAIL),
        privateKey: await SecureStore.getItemAsync(KEYS.PRIVATE_KEY),
      };
    } catch (error) {
      console.error("Fehler beim Laden der Settings:", error);
      return null;
    }
  },

  hasCredentials: async () => {
    const settings = await SettingsRepository.getSettings();
    // Wir prüfen, ob die absolut notwendigen Keys vorhanden sind
    return !!(settings && settings.projectId && settings.clientEmail && settings.privateKey);
  }
};