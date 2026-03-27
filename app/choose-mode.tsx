import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeInDown } from 'react-native-reanimated';
import { Wand2, Zap, TestTube2, ArrowLeft } from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function ModeCard({ title, description, icon, delay, onPress }: { title: string, description: string, icon: React.ReactNode, delay: number, onPress: () => void }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      entering={FadeInDown.delay(delay).springify()}
      onPressIn={() => (scale.value = withTiming(0.96, { duration: 100 }))}
      onPressOut={() => (scale.value = withTiming(1, { duration: 150 }))}
      onPress={onPress}
      style={[style]}
      className="bg-white/10 border border-white/20 rounded-3xl p-5 mb-5 flex-row items-center overflow-hidden"
    >
      <View className="bg-white/10 rounded-2xl p-4 mr-4 border border-white/5">
        {icon}
      </View>
      <View className="flex-1 pr-2">
        <Text className="text-white text-xl font-bold mb-1">{title}</Text>
        <Text className="text-gray-400 text-sm leading-snug">{description}</Text>
      </View>
    </AnimatedPressable>
  );
}

export default function ChooseModeScreen() {
  const router = useRouter();

  const handleSelectMode = (mode: string) => {
    // Navigate to upload screen, passing the selected mode as a parameter
    router.push({ pathname: '/upload', params: { mode } });
  };

  return (
    <GradientBackground className="flex-1 p-6 pt-16">
      <View className="flex-row items-center justify-between mb-8">
        <Pressable 
          onPress={() => router.back()} 
          className="w-12 h-12 items-center justify-center bg-white/10 rounded-full border border-white/20 active:bg-white/20"
        >
          <ArrowLeft color="white" size={24} />
        </Pressable>
        <View className="bg-primary/20 px-4 py-1 rounded-full border border-primary/40">
           <Text className="text-primary font-black text-[10px] uppercase tracking-[3px]">Select Protocol</Text>
        </View>
      </View>

      <Animated.Text entering={FadeInDown.delay(0).springify()} className="text-white text-5xl font-black mb-1 tracking-tighter uppercase leading-none">
        Identity
      </Animated.Text>
      <Animated.Text entering={FadeInDown.delay(50).springify()} className="text-primary text-5xl font-black mb-12 tracking-tighter uppercase leading-none">
        Shift
      </Animated.Text>

      <View className="flex-1">
        <ModeCard
          title="Instant Synthesis"
          description="Parallel neural processing across all style dimensions simultaneously."
          icon={<Zap color="#fbbf24" size={32} fill="#fbbf24" />}
          delay={150}
          onPress={() => handleSelectMode('quick')}
        />
        
        <ModeCard
          title="Alchemy Forge"
          description="Precision control over prompt vectors, style weights, and neural intensity."
          icon={<Wand2 color="#a855f7" size={32} />}
          delay={250}
          onPress={() => handleSelectMode('custom')}
        />
        
        <ModeCard
          title="Neural Nexus"
          description="Experimental multi-latent space transformations. Stability: UNSTABLE."
          icon={<TestTube2 color="#3b82f6" size={32} />}
          delay={350}
          onPress={() => handleSelectMode('experimental')}
        />
      </View>

      {/* WATERMARK */}
      <View className="items-center pb-8 opacity-20">
         <Text className="text-white font-black text-[10px] tracking-[6px] uppercase">AJ - Akarsh Jain</Text>
      </View>
    </GradientBackground>
  );
}
