import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';
import { Theme } from '../Theme';
import { Constants } from '../Constants';
import { TrendChart } from './TrendChart';

// Aktiviert LayoutAnimation auf Android (für flüssiges Aufklappen)
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const AssetRow = ({ asset }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    // Sorgt für eine sanfte Animation beim Ändern des State
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.headerRow} 
        onPress={toggleExpand} 
        activeOpacity={0.7}
      >
        <Text style={styles.assetName}>{asset.name}</Text>
        <Text style={styles.assetScore}>
          {asset.currentScore} <Text style={styles.scoreMax}>/ {Constants.numbers.maxScore}</Text>
        </Text>
      </TouchableOpacity>

      {/* Zeigt das Diagramm nur, wenn die Reihe ausgeklappt ist */}
      {isExpanded && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>{Constants.strings.trendLabel}</Text>
          <TrendChart data={asset.trend} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.lightGrey,
    borderRadius: Theme.borderRadius.default,
    marginBottom: Theme.spacing.medium,
    overflow: 'hidden', // Wichtig für saubere Ecken beim Chart
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.medium,
  },
  assetName: {
    fontFamily: Theme.typography.fontFamilyBold,
    fontSize: Theme.typography.fontSizeLarge,
    color: Theme.colors.textMain,
  },
  assetScore: {
    fontFamily: Theme.typography.fontFamilyBold,
    fontSize: Theme.typography.fontSizeLarge,
    color: Theme.colors.primaryBlue,
  },
  scoreMax: {
    fontFamily: Theme.typography.fontFamilyLight,
    fontSize: Theme.typography.fontSizeMedium,
    color: Theme.colors.textSecondary,
  },
  chartContainer: {
    paddingHorizontal: Theme.spacing.medium,
    paddingBottom: Theme.spacing.medium,
  },
  chartLabel: {
    fontFamily: Theme.typography.fontFamilyNormal,
    fontSize: Theme.typography.fontSizeSmall,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.small,
  }
});