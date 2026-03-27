import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence, 
  Easing, 
  FadeInDown,
  FadeIn
} from 'react-native-reanimated';
import GradientBackground from '../components/GradientBackground';
import MouseTrail from '../components/MouseTrail';
// Icons removed for system stability

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function FeatureCard({ icon: Icon, title, desc, delay, color }: any) {
  return (
    <Animated.View 
      entering={FadeInDown.delay(delay).springify()}
      className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-4 w-full"
    >
      <View className="bg-primary/20 w-12 h-12 rounded-2xl items-center justify-center mb-4">
        <Icon color={color} size={24} />
      </View>
      <Text className="text-white text-xl font-bold mb-2">{title}</Text>
      <Text className="text-gray-400 leading-relaxed">{desc}</Text>
    </Animated.View>
  );
}

export default function LandingScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  
  const buttonScale = useSharedValue(1);
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }]
  }));

  const scrollDown = () => {
    scrollViewRef.current?.scrollTo({ y: Dimensions.get('window').height, animated: true });
  };

  return (
    <GradientBackground className="flex-1">
      <MouseTrail />
      
      <ScrollView 
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* SECTION 1: DEFINITION */}
        <View style={{ minHeight: Dimensions.get('window').height * 0.6 }} className="p-8 pt-32 items-center justify-center">
          <Animated.View 
            entering={FadeIn.duration(1000)}
            className="bg-primary/10 px-6 py-2 rounded-full mb-10 border border-primary/30"
          >
            <Text className="text-primary font-black text-xs uppercase tracking-[5px]">The Identity Nexus</Text>
          </Animated.View>

          <Animated.Text 
            entering={FadeInDown.delay(200).springify()}
            className="text-white text-7xl font-black text-center tracking-tighter mb-8 leading-none uppercase"
          >
            ALTER<Text className="text-primary">SELF</Text>
          </Animated.Text>

          <Animated.Text 
            entering={FadeInDown.delay(400).springify()}
            style={{ color: '#FFFFFF', textAlign: 'center' }}
            className="text-2xl leading-relaxed max-w-4xl font-bold"
          >
            AlterSelf AI helps you turn your photos into amazing digital art.{"\n"}
            Advanced AI Technology{"\n"}
            to change your style to anything you want instantly.
          </Animated.Text>
        </View>

        {/* SECTION 2: KEY FEATURES */}
        <View className="px-8 mb-20">
          <Text className="text-white/20 text-5xl font-black mb-10 tracking-widest uppercase text-center">Protocol Features</Text>
          
          <View className="flex-col gap-6">
            <FeatureCard 
              delay={500}
              color="#3b82f6"
              title="Neural Mesh Mapping"
              desc="We extract 128 vectors from your facial structure to ensure a perfect likeness in every style."
            />
            <FeatureCard 
              delay={600}
              color="#fbbf24"
              title="Multilingual AI Guide"
              desc="An integrated AI chatbot helps you select the perfect character and style in any language."
            />
            <FeatureCard 
              delay={700}
              color="#10b981"
              title="Secure Identity Vault"
              desc="Your generated identities are stored in an encrypted history, accessible only via your secure protocol login."
            />
          </View>
        </View>

        {/* SECTION 3: FORGE ESSENCE BUTTON */}
        <View className="px-8 items-center">
          <Animated.Text 
            entering={FadeInDown.delay(800)}
            className="text-gray-500 font-bold uppercase tracking-[4px] mb-10 text-center"
          >
            Ready to Begin Synthesis?
          </Animated.Text>

          <AnimatedPressable
            onPressIn={() => (buttonScale.value = withTiming(0.95, { duration: 100 }))}
            onPressOut={() => (buttonScale.value = withTiming(1, { duration: 150 }))}
            onPress={() => router.push('/login')}
            style={[buttonStyle, styles.glowShadow]}
            className="w-full max-w-md bg-primary rounded-[40px] p-10 items-center justify-center flex-row border-t border-white/40 shadow-2xl"
          >
            <Text className="text-white text-3xl font-black mr-4 uppercase tracking-tighter">Forge Essence</Text>
            <Text className="text-3xl">⚡</Text>
          </AnimatedPressable>

          <Pressable className="mt-12 opacity-40">
            <Text className="text-gray-400 font-bold">Protocol v2.4.0-Stable</Text>
          </Pressable>
        </View>

        {/* WATERMARK */}
        <View className="mt-32 items-center">
           <Text className="text-gray-800 font-black text-xs tracking-[10px] uppercase">AJ - Akarsh Jain</Text>
           <Text className="text-gray-900 text-[10px] mt-2">Founding Neural Architect</Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  glowShadow: {
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  floatingArrow: {
    // We'll add a simple animation in a real implementation, but for now just a style
  }
});

