import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {ArrowLeft, Sparkles, Image as ImageIcon, SlidersHorizontal, Type } from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';

const STYLES = [
  { id: 'anime', label: 'Anime', color: '#ec4899' },
  { id: 'pixel', label: 'Pixel Art', color: '#8b5cf6' },
  { id: 'sketch', label: 'Sketch', color: '#64748b' },
  { id: 'cartoon', label: 'Cartoon', color: '#0ea5e9' },
  { id: 'flat', label: 'Flat Vector', color: '#10b981' },
];

const PRESETS = ["Disney style", "Cyberpunk", "Minimalist vector", "Watercolor", "Neon Noir"];

export default function StudioScreen() {
  const router = useRouter();
  const { image, mode } = useLocalSearchParams();
  const [selectedStyle, setSelectedStyle] = useState('anime');
  const [intensity, setIntensity] = useState(3); // 1 to 5
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    router.push({ 
      pathname: '/generating', 
      params: { image, mode, style: selectedStyle, intensity, prompt } 
    });
  };

  return (
    <GradientBackground className="flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-16" contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="flex-row items-center justify-between mb-8">
            <Pressable 
              onPress={() => router.back()} 
              className="w-12 h-12 items-center justify-center bg-white/10 rounded-full border border-white/20 active:bg-white/20"
            >
              <ArrowLeft color="white" size={24} />
            </Pressable>
            <Text className="text-gray-400 font-semibold text-sm tracking-widest uppercase">
              Step 2 of 3
            </Text>
          </View>

          <Animated.Text entering={FadeInDown.delay(100).springify()} className="text-white text-3xl font-extrabold mb-1">
            Choose your
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(150).springify()} className="text-primary text-3xl font-extrabold mb-8">
            transformation
          </Animated.Text>

          {/* Style Selection */}
          <Animated.View entering={FadeInDown.delay(200).springify()} className="mb-8">
            <View className="flex-row items-center mb-4">
              <ImageIcon color="#a855f7" size={20} className="mr-2" />
              <Text className="text-white text-lg font-bold">Art Style</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible">
              {STYLES.map((s) => (
                <Pressable
                  key={s.id}
                  onPress={() => setSelectedStyle(s.id)}
                  className={`mr-3 px-5 py-3 rounded-2xl border ${selectedStyle === s.id ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10'}`}
                >
                  <Text className={selectedStyle === s.id ? 'text-white font-bold' : 'text-gray-400 font-medium'}>
                    {s.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Intensity Slider (Discrete 1-5) */}
          <Animated.View entering={FadeInDown.delay(300).springify()} className="mb-8 bg-white/5 p-5 rounded-3xl border border-white/10" style={{ elevation: 5 }}>
            <View className="flex-row items-center mb-4">
              <SlidersHorizontal color="#ec4899" size={20} className="mr-2" />
              <Text className="text-white text-lg font-bold">Style Intensity</Text>
            </View>
            
            <View className="flex-row justify-between items-center bg-black/40 rounded-full p-1 relative">
              {[1, 2, 3, 4, 5].map((val) => (
                <Pressable
                  key={val}
                  onPress={() => setIntensity(val)}
                  className={`flex-1 py-3 items-center rounded-full ${intensity === val ? 'bg-primary' : ''}`}
                >
                  <Text className={intensity === val ? 'text-white font-bold' : 'text-gray-500 font-semibold'}>
                    {val === 1 ? 'Low' : val === 5 ? 'High' : val}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View className="flex-row justify-between mt-2 px-2">
              <Text className="text-gray-500 text-xs text-left w-1/3">Realistic</Text>
              <Text className="text-gray-500 text-xs text-right w-1/3">Artistic</Text>
            </View>
          </Animated.View>

          {/* Prompt Box */}
          <Animated.View entering={FadeInDown.delay(400).springify()} className="mb-8">
            <View className="flex-row items-center mb-4">
              <Type color="#3b82f6" size={20} className="mr-2" />
              <Text className="text-white text-lg font-bold">Describe your style <Text className="text-gray-500 font-normal">(Optional)</Text></Text>
            </View>
            
            <TextInput
              value={prompt}
              onChangeText={setPrompt}
              placeholder="e.g., cyberpunk anime with neon lighting..."
              placeholderTextColor="#6b7280"
              multiline
              textAlignVertical="top"
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-base h-28 mb-4 selection:bg-primary/50"
            />

            <Text className="text-gray-400 text-sm mb-3 font-medium">Or try a preset:</Text>
            <View className="flex-row flex-wrap gap-2">
              {PRESETS.map((p) => (
                <Pressable
                  key={p}
                  onPress={() => setPrompt(p)}
                  className="bg-white/10 px-4 py-2 rounded-full border border-white/20 active:bg-white/20"
                >
                  <Text className="text-gray-300 text-sm font-medium">{p}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Floating Action Button */}
      <View className="absolute bottom-6 left-6 right-6">
        <Pressable
          onPress={handleGenerate}
          className="bg-primary rounded-2xl p-4 items-center justify-center flex-row shadow-[0_0_20px_rgba(147,51,234,0.4)] border border-white/20 active:bg-primary/80"
          style={{ elevation: 15 }}
        >
          <Text className="text-white text-xl font-bold mr-2">Generate Now</Text>
          <Sparkles color="white" size={20} />
        </Pressable>
      </View>
    </GradientBackground>
  );
}
