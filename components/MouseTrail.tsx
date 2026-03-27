import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  withSequence,
  runOnJS
} from 'react-native-reanimated';

const PARTICLE_COUNT = 8;
const PARTICLE_SIZE = 12;

function TrailParticle({ index, mouseX, mouseY }: { index: number, mouseX: Animated.SharedValue<number>, mouseY: Animated.SharedValue<number> }) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value }
    ],
    opacity: scale.value * 0.5,
  }));

  useEffect(() => {
    const delay = index * 50;
    const interval = setInterval(() => {
      x.value = withSpring(mouseX.value, { damping: 15, stiffness: 100 });
      y.value = withSpring(mouseY.value, { damping: 15, stiffness: 100 });
      
      scale.value = withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(0, { duration: 800 })
      );
    }, 100 + delay);

    return () => clearInterval(interval);
  }, [index, mouseX, mouseY]);

  return (
    <Animated.View 
      style={[
        styles.particle, 
        { backgroundColor: index % 2 === 0 ? '#9333ea' : '#ec4899' },
        animatedStyle
      ]} 
    />
  );
}

export default function MouseTrail() {
  if (Platform.OS !== 'web') return null;

  const mouseX = useSharedValue(0);
  const mouseY = useSharedValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.value = e.clientX;
      mouseY.value = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <TrailParticle key={i} index={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    width: PARTICLE_SIZE,
    height: PARTICLE_SIZE,
    borderRadius: PARTICLE_SIZE / 2,
    zIndex: 9999,
    shadowColor: '#9333ea',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});
