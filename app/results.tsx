import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Image, Share, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Download, Share2, RefreshCcw, ArrowLeft, Maximize2, Sparkles, Zap } from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const MOCK_RESULTS = [
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=500&auto=format&fit=crop', // anime girl
  'https://images.unsplash.com/photo-1620336655055-088d06e76fb0?q=80&w=500&auto=format&fit=crop', // anime boy/neutral
  'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=500&auto=format&fit=crop', // futuristic/cyber
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop', // glitch/abstract
];

export default function ResultsScreen() {
  const router = useRouter();
  const { image } = useLocalSearchParams();
  const originalImage = (image as string) || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop';
  
  const [selectedResult, setSelectedResult] = useState(MOCK_RESULTS[0]);
  const [compareMode, setCompareMode] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out my AI transformation from AlterSelf AI!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    Alert.alert("Saved", "High-res artwork saved to your gallery!");
  };

  return (
    <GradientBackground className="flex-1 px-6 pt-16">
      <View className="flex-row items-center justify-between mb-6">
        <Pressable 
          onPress={() => router.replace('/')} 
          className="w-12 h-12 items-center justify-center bg-white/10 rounded-full border border-white/20 active:bg-white/20"
        >
          <ArrowLeft color="white" size={24} />
        </Pressable>
        <Text className="text-white font-black text-xs uppercase tracking-[4px]">Neural Outlay</Text>
        <View className="w-12 h-12" />
      </View>

      <Animated.Text entering={FadeInDown.delay(100).springify()} className="text-white text-3xl font-extrabold mb-1">
        Your transformations
      </Animated.Text>
      <Animated.Text entering={FadeInDown.delay(150).springify()} className="text-primary text-3xl font-extrabold mb-6">
        are ready ✨
      </Animated.Text>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Main Display */}
        <Animated.View entering={FadeInDown.delay(200).springify()} className="mb-6 relative">
          {compareMode ? (
            <BeforeAfterSlider beforeImage={originalImage} afterImage={selectedResult} />
          ) : (
            <View className="w-full aspect-square rounded-[40px] overflow-hidden border-2 border-primary/50 bg-black/40" style={{ shadowColor: '#9333ea', shadowOpacity: 0.5, shadowRadius: 30, elevation: 15 }}>
              <Image source={{ uri: selectedResult }} className="w-full h-full" resizeMode="cover" />
              
              {/* Animated Stickers/Overlays */}
              <Animated.View 
                entering={FadeInDown.delay(1000).springify()}
                className="absolute top-4 left-4 bg-primary/40 p-2 rounded-xl border border-white/20 backdrop-blur-md"
              >
                <Sparkles color="white" size={16} />
              </Animated.View>

              <Animated.View 
                entering={FadeInDown.delay(1200).springify()}
                className="absolute bottom-4 right-4 bg-white/10 p-2 rounded-full border border-white/20"
              >
                <Zap color="#fbbf24" size={20} fill="#fbbf24" />
              </Animated.View>
            </View>
          )}

          <Pressable 
            onPress={() => setCompareMode(!compareMode)}
            className="absolute top-4 right-4 bg-black/60 px-4 py-2 rounded-full border border-white/30 flex-row items-center"
          >
            <Maximize2 color="white" size={16} className="mr-2" />
            <Text className="text-white font-bold text-xs uppercase tracking-wider">
              {compareMode ? 'View Single' : 'Compare'}
            </Text>
          </Pressable>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(300).springify()} className="flex-row gap-4 mb-8">
          <Pressable onPress={handleDownload} className="flex-1 bg-primary py-4 rounded-2xl items-center justify-center flex-row shadow-lg border border-white/20 active:bg-primary/80">
            <Download color="white" size={20} className="mr-2" />
            <Text className="text-white font-bold text-lg">Save HD</Text>
          </Pressable>
          <Pressable onPress={handleShare} className="flex-1 bg-white/10 py-4 rounded-2xl items-center justify-center flex-row border border-white/20 active:bg-white/20">
            <Share2 color="white" size={20} className="mr-2" />
            <Text className="text-white font-bold text-lg">Share</Text>
          </Pressable>
        </Animated.View>

        {/* Grid Selection */}
        <Animated.Text entering={FadeInDown.delay(400).springify()} className="text-white text-xl font-bold mb-4">
          All Variations
        </Animated.Text>
        
        <Animated.View entering={FadeInDown.delay(500).springify()} className="flex-row flex-wrap justify-between gap-y-4">
          {MOCK_RESULTS.map((res, idx) => (
            <Pressable 
              key={idx}
              onPress={() => {
                setSelectedResult(res);
                setCompareMode(false);
              }}
              className={`w-[47%] aspect-square rounded-2xl overflow-hidden border-2 ${selectedResult === res ? 'border-primary' : 'border-transparent'}`}
            >
              <Image source={{ uri: res }} className="w-full h-full" resizeMode="cover" />
              {selectedResult === res && (
                <View className="absolute inset-0 bg-primary/20" />
              )}
            </Pressable>
          ))}
        </Animated.View>

        <Pressable 
          onPress={() => router.replace('/')}
          className="mt-6 bg-white/5 py-4 rounded-2xl items-center justify-center flex-row border border-white/10 active:bg-white/10 mb-8"
        >
          <RefreshCcw color="#a855f7" size={20} className="mr-2" />
          <Text className="text-primary font-bold text-lg">Start New Creation</Text>
        </Pressable>

        {/* WATERMARK */}
        <View className="items-center pb-12 opacity-20">
           <Text className="text-white font-black text-[10px] tracking-[6px] uppercase">AJ - Akarsh Jain</Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
