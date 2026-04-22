import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'; // Globaler Container benötigt
import { Theme } from './Theme';
import { Constants } from './Constants';
import { AssetRow } from './components/AssetRow';
import { SettingsDialog } from './components/SettingsDialog';
import { DataRepository } from './repositories/DataRepository';

export default function App() {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const [needsSetup, setNeedsSetup] = useState(false);

  // Initialer Datenabruf beim Start
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const result = await DataRepository.fetchSentimentData();
    
    if (result.requiresSetup) {
      setNeedsSetup(true);
      setAssets([]);
    } else if (result.success) {
      setAssets(result.data);
      setNeedsSetup(false);
    }
    setLoading(false);
  };

  const renderItem = ({ item }) => <AssetRow asset={item} />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.title}>{Constants.strings.appTitle}</Text>
        <TouchableOpacity onPress={() => setIsSettingsVisible(true)} activeOpacity={0.6}>
          <Ionicons name="settings-outline" size={28} color={Theme.colors.textMain} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Theme.colors.primaryBlue} />
          <Text style={styles.infoText}>{Constants.strings.loadingText}</Text>
        </View>
      ) : needsSetup ? (
        <View style={styles.centerContainer}>
          <Ionicons name="lock-closed-outline" size={64} color={Theme.colors.disabled} />
          <Text style={styles.setupTitle}>{Constants.strings.setupRequiredTitle}</Text>
          <Text style={styles.setupText}>{Constants.strings.setupRequiredText}</Text>
        </View>
      ) : (
        <FlatList
          data={assets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onRefresh={loadData}
          refreshing={loading}
        />
      )}

      <SettingsDialog 
        visible={isSettingsVisible} 
        onClose={() => setIsSettingsVisible(false)}
        onSettingsSaved={loadData} // Automatischer Refresh nach dem Speichern
      />

      {/* Globaler Toast-Container am Ende der Haupt-View */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingTop: Theme.spacing.statusBarPadding, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.medium,
    paddingVertical: Theme.spacing.large,
  },
  title: {
    fontFamily: Theme.typography.fontFamilyBold,
    fontSize: Theme.typography.fontSizeTitle,
    color: Theme.colors.textMain,
  },
  listContent: {
    paddingHorizontal: Theme.spacing.medium,
    paddingBottom: Theme.spacing.xlarge,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xlarge,
  },
  infoText: {
    marginTop: Theme.spacing.medium,
    color: Theme.colors.textSecondary,
    fontFamily: Theme.typography.fontFamilyNormal,
  },
  setupTitle: {
    fontFamily: Theme.typography.fontFamilyBold,
    fontSize: Theme.typography.fontSizeLarge,
    marginTop: Theme.spacing.medium,
    color: Theme.colors.textMain,
  },
  setupText: {
    textAlign: 'center',
    fontFamily: Theme.typography.fontFamilyNormal,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.small,
  }
});