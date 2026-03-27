import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeOut, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing, SlideInDown } from 'react-native-reanimated';
import GradientBackground from '../components/GradientBackground';
import { Sparkles, Loader2 } from 'lucide-react-native';

const LOADING_MESSAGES = [
  "Initializing AI Engine...",
  "Analyzing facial geometry...",
  "Applying style transfer models...",
  "Rendering Anime style...",
  "Generating Pixel Art...",
  "Refining Sketch textures...",
  "Finalizing color palettes...",
  "Almost ready..."
];

const STYLES_TO_GENERATE = [
  { id: 'anime', label: 'Anime Edition' },
  { id: 'pixel', label: 'Pixel Variant' },
  { id: 'sketch', label: 'Sketch Composition' },
  { id: 'cartoon', label: 'Cartoon Render' },
];

function SkeletonCard({ delay, title }: { delay: number, title: string }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View entering={SlideInDown.delay(delay).springify()} className="bg-white/5 border border-white/10 rounded-3xl p-4 mb-4" style={{ shadowColor: '#9333ea', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 }}>
      {/* Image Skeleton */}
      <Animated.View style={[animatedStyle]} className="w-full h-48 bg-white/10 rounded-2xl mb-4" />
      {/* Title Skeleton */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-white font-bold mb-1 text-lg">{title}</Text>
          <Animated.View style={[animatedStyle]} className="w-32 h-3 bg-white/10 rounded-full" />
        </View>
        <Animated.View style={[animatedStyle, { transform: [{ rotate: '15deg' }] }]}>
          <Sparkles color="#ec4899" size={24} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

export default function GeneratingScreen() {
  const router = useRouter();
  const { image, mode, style, intensity, prompt } = useLocalSearchParams();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Cycle through messages
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1 < LOADING_MESSAGES.length ? prev + 1 : prev));
    }, 1200);

    // Simulate complete after 9 seconds, navigate to results
    const timeout = setTimeout(() => {
      router.replace({ pathname: '/results', params: { image, mode } });
    }, 9000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Spin animation for loader
  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);
  const spinStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));

  return (
    <GradientBackground className="flex-1 px-6 pt-16">
      <View className="items-center mb-8 bg-white/5 p-6 rounded-3xl border border-white/10">
        <Animated.View style={spinStyle} className="mb-4 bg-primary/20 p-3 rounded-full border border-primary/50">
          <Loader2 color="#ec4899" size={32} />
        </Animated.View>
        
        <View className="h-8 items-center justify-center">
          <Animated.Text key={messageIndex} entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} className="text-white text-xl font-bold text-center">
            {LOADING_MESSAGES[messageIndex]}
          </Animated.Text>
        </View>
        <Text className="text-gray-400 text-sm mt-2 text-center">
          Parallel processing enabled. Rendering multiple styles concurrently into the grid.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {STYLES_TO_GENERATE.map((s, idx) => (
          <SkeletonCard key={s.id} title={s.label} delay={idx * 150} />
        ))}
        <View className="h-10" />
      </ScrollView>
    </GradientBackground>
  );
}
