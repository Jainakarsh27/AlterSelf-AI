import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import GradientBackground from '../components/GradientBackground';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function LoginScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const buttonScale = useSharedValue(1);
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }]
  }));

  const handleAuth = () => {
    router.replace('/dashboard');
  };

  const handleGoogleSync = () => {
    setIsSyncing(true);
    // Simulate Google OAuth Delay
    setTimeout(() => {
      setIsSyncing(false);
      router.replace('/dashboard');
    }, 2000);
  };

  return (
    <GradientBackground className="flex-1 p-6 pt-16">
      <Pressable
        onPress={() => router.back()}
        className="mb-12 w-12 h-12 items-center justify-center bg-white/10 rounded-full border border-white/20 active:bg-white/20"
      >
        <Text className="text-white font-black text-xl">←</Text>
      </Pressable>

      <Animated.Text entering={FadeInDown.delay(100).springify()} className="text-white text-5xl font-black mb-2 tracking-tighter uppercase">
        {isLogin ? 'Access' : 'Create'}
      </Animated.Text>
      <Animated.Text entering={FadeInDown.delay(200).springify()} className="text-primary text-5xl font-black mb-12 tracking-tighter uppercase">
        Identity
      </Animated.Text>

      {isSyncing ? (
        <View className="flex-1 items-center justify-center">
           <Text className="text-white font-black text-xl mb-4 tracking-widest animate-pulse uppercase">Syncing with Google...</Text>
           <View className="w-16 h-1 bg-primary rounded-full mb-4" />
           <Text className="text-gray-500 font-bold text-xs">Awaiting Secure Token...</Text>
        </View>
      ) : (
        <View className="space-y-6">
          {!isLogin && (
            <Animated.View entering={FadeInDown.delay(300)} className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-4">
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#555"
                className="text-white font-bold text-lg"
              />
            </Animated.View>
          )}

          <Animated.View entering={FadeInDown.delay(400)} className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-4">
            <TextInput
              placeholder="Email / Phone"
              placeholderTextColor="#555"
              className="text-white font-bold text-lg"
              keyboardType="email-address"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(500)} className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-2">
            <TextInput 
              placeholder="Password" 
              placeholderTextColor="#555"
              className="text-white font-bold text-lg"
              secureTextEntry
            />
          </Animated.View>

          <Pressable className="items-end mb-8 p-2">
             <Text className="text-gray-400 font-bold text-xs uppercase tracking-widest">Forgot Password?</Text>
          </Pressable>

          <AnimatedPressable
            onPressIn={() => (buttonScale.value = withTiming(0.95, { duration: 100 }))}
            onPressOut={() => (buttonScale.value = withTiming(1, { duration: 150 }))}
            onPress={handleAuth}
            style={[buttonStyle, styles.glowShadow]}
            className="bg-primary rounded-3xl p-6 items-center justify-center border-t border-white/30"
          >
            <Text className="text-white text-2xl font-black uppercase tracking-widest">
              {isLogin ? 'LOG IN' : 'REGISTER'}
            </Text>
          </AnimatedPressable>

          <View className="flex-row items-center my-12">
            <View className="flex-1 h-px bg-white/10" />
            <Text className="mx-4 text-gray-500 font-bold uppercase text-xs tracking-widest">OR USE</Text>
            <View className="flex-1 h-px bg-white/10" />
          </View>

          <View className="flex-row gap-4">
            <Pressable className="flex-1 bg-white/5 p-5 rounded-3xl items-center justify-center border border-white/10">
              <Text className="text-white font-black text-xs">GITHUB</Text>
            </Pressable>
            <Pressable 
              onPress={handleGoogleSync}
              className="flex-1 bg-white/5 p-5 rounded-3xl items-center justify-center border border-white/10"
            >
              <Text className="text-white font-black text-xs">GOOGLE</Text>
            </Pressable>
          </View>

          <Pressable 
            className="mt-12 items-center" 
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text className="text-gray-400 font-bold">
              {isLogin ? "New user? " : "Already have an account? "}
              <Text className="text-primary font-black uppercase underline">
                {isLogin ? 'Register' : 'Log In'}
              </Text>
            </Text>
          </Pressable>
        </View>
      )}
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  glowShadow: {
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  }
});
