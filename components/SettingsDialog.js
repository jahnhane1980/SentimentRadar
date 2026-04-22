import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Theme } from '../Theme';
import { Constants } from '../Constants';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { NotificationService } from '../services/NotificationService';

export const SettingsDialog = ({ visible, onClose, onSettingsSaved }) => {
  const [form, setForm] = useState({
    projectId: '',
    datasetId: '',
    tableId: '',
    clientEmail: '',
    privateKey: '',
  });

  // Vorhandene Daten laden, wenn das Modal geöffnet wird
  useEffect(() => {
    if (visible) {
      loadCurrentSettings();
    }
  }, [visible]);

  const loadCurrentSettings = async () => {
    const saved = await SettingsRepository.getSettings();
    if (saved) {
      setForm({
        projectId: saved.projectId || '',
        datasetId: saved.datasetId || '',
        tableId: saved.tableId || '',
        clientEmail: saved.clientEmail || '',
        privateKey: saved.privateKey || '',
      });
    }
  };

  const handleSave = async () => {
    const success = await SettingsRepository.saveSettings(form);
    if (success) {
      NotificationService.showSuccess('Gespeichert', 'Deine Zugangsdaten wurden verschlüsselt hinterlegt.');
      if (onSettingsSaved) onSettingsSaved();
      onClose();
    } else {
      NotificationService.showError('Fehler', 'Die Daten konnten nicht gespeichert werden.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.overlay}
      >
        <View style={styles.dialogContainer}>
          <Text style={styles.title}>{Constants.strings.settingsTitle}</Text>
          
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{Constants.strings.labels.projectId}</Text>
              <TextInput 
                style={styles.input} 
                value={form.projectId} 
                onChangeText={(t) => setForm({...form, projectId: t})}
                placeholder="my-project-id"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{Constants.strings.labels.datasetId}</Text>
              <TextInput 
                style={styles.input} 
                value={form.datasetId} 
                onChangeText={(t) => setForm({...form, datasetId: t})}
                placeholder="sentiment_dataset"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{Constants.strings.labels.tableId}</Text>
              <TextInput 
                style={styles.input} 
                value={form.tableId} 
                onChangeText={(t) => setForm({...form, tableId: t})}
                placeholder="market_scores"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{Constants.strings.labels.clientEmail}</Text>
              <TextInput 
                style={styles.input} 
                value={form.clientEmail} 
                onChangeText={(t) => setForm({...form, clientEmail: t})}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{Constants.strings.labels.privateKey}</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                value={form.privateKey} 
                onChangeText={(t) => setForm({...form, privateKey: t})}
                multiline={true}
                numberOfLines={4}
                secureTextEntry={true} // Visueller Schutz
              />
            </View>
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>{Constants.strings.closeButton}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>{Constants.strings.saveButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end', // Schiebt das Modal nach unten
  },
  dialogContainer: {
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: Theme.borderRadius.large,
    borderTopRightRadius: Theme.borderRadius.large,
    padding: Theme.spacing.large,
    maxHeight: '90%',
  },
  title: {
    fontFamily: Theme.typography.fontFamilyBold,
    fontSize: Theme.typography.fontSizeLarge,
    color: Theme.colors.textMain,
    marginBottom: Theme.spacing.large,
  },
  scrollArea: {
    marginBottom: Theme.spacing.large,
  },
  inputGroup: {
    marginBottom: Theme.spacing.medium,
  },
  label: {
    fontFamily: Theme.typography.fontFamilyNormal,
    fontSize: Theme.typography.fontSizeSmall,
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.disabled,
    borderRadius: Theme.borderRadius.default,
    padding: Theme.spacing.medium,
    fontFamily: Theme.typography.fontFamilyNormal,
    color: Theme.colors.textMain,
    backgroundColor: Theme.colors.lightGrey,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: Theme.spacing.medium,
    flex: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Theme.colors.textSecondary,
    fontFamily: Theme.typography.fontFamilyNormal,
  },
  saveButton: {
    backgroundColor: Theme.colors.primaryBlue,
    padding: Theme.spacing.medium,
    borderRadius: Theme.borderRadius.default,
    flex: 2,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Theme.colors.background,
    fontFamily: Theme.typography.fontFamilyBold,
  }
});