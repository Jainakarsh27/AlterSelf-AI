import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientBackground({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <View style={styles.container} className={className}>
      <LinearGradient
        colors={['#1A0B2E', '#000000']}
        style={styles.background}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
