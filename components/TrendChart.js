import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Theme } from '../Theme';
import { Constants } from '../Constants';

export const TrendChart = ({ data, height = Constants.numbers.chartHeight }) => {
  const maxScore = Constants.numbers.maxScore;

  const createSvgPath = () => {
    if (!data || data.length === 0) return '';
    
    const stepX = 100 / (data.length - 1);
    let path = '';
    
    data.forEach((value, index) => {
      const x = index * stepX;
      const y = 100 - (value / maxScore) * 100; 
      
      if (index === 0) {
        path += `M ${x},${y} `;
      } else {
        path += `L ${x},${y} `;
      }
    });
    return path;
  };

  const linePath = createSvgPath();
  const areaPath = `${linePath} L 100,100 L 0,100 Z`;

  return (
    <View style={{ height }}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={Theme.colors.primaryBlue} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={Theme.colors.background} stopOpacity="0.0" />
          </LinearGradient>
        </Defs>
        
        {/* Gefüllte Fläche */}
        <Path d={areaPath} fill="url(#chartGradient)" />
        
        {/* Verlaufslinie */}
        <Path 
          d={linePath} 
          fill="none" 
          stroke={Theme.colors.primaryBlue} 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};