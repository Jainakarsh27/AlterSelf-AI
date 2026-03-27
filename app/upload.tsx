import React, { useState } from 'react';
import { View, Text, Pressable, Image, ActivityIndicator, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { Camera, UploadCloud, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react-native';
import GradientBackground from '../components/GradientBackground';

export default function UploadScreen() {
  const router = useRouter();
  const { mode } = useLocalSearchParams();
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [isScanning, setIsScanning] = useState(false);

  const handlePick = async (useCamera: boolean) => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    };

    let result;
    if (useCamera) {
      if (Platform.OS === 'web') {
        // For web, if launchCameraAsync fails or is unsupported, we fallback to a more direct webcam prompt if needed
        // but launchCameraAsync is the standard starting point.
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        result = await ImagePicker.launchCameraAsync(options);
      }
    } else {
      result = await ImagePicker.launchImageLibraryAsync(options);
    }

    if (!result.canceled) {
      setIsProcessing(true);
      setIsScanning(true);
      // Simulate high-end scanning & neural mapping
      setTimeout(() => {
        setImage(result.assets[0].uri);
        setIsProcessing(false);
        setIsScanning(false);
      }, 2500);
    }
  };

  const handleContinue = () => {
    if (mode === 'quick') {
      router.push({ pathname: '/generating', params: { mode, image } });
    } else {
      router.push({ pathname: '/studio', params: { mode, image } });
    }
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
        <Text className="text-gray-400 font-semibold text-sm tracking-widest uppercase">
          Step 1 of {mode === 'quick' ? '2' : '3'}
        </Text>
      </View>

      <Animated.Text entering={FadeInDown.delay(100).springify()} className="text-white text-4xl font-extrabold mb-2">
        Upload your
      </Animated.Text>
      <Animated.Text entering={FadeInDown.delay(200).springify()} className="text-primary text-4xl font-extrabold mb-10">
        base identity
      </Animated.Text>

      {!image && !isProcessing && (
        <Animated.View entering={FadeInDown.delay(300).springify()} className="flex-1 items-center justify-center mb-20">
          <Pressable 
            onPress={() => handlePick(false)}
            className="w-full h-84 bg-white/5 border-2 border-dashed border-white/20 rounded-[40px] items-center justify-center active:bg-white/10"
          >
            <View className="bg-primary/20 p-6 rounded-full mb-6 border border-primary/40">
              <UploadCloud color="#c026d3" size={56} />
            </View>
            <Text className="text-white text-2xl font-black mb-2 uppercase tracking-tighter">Upload Identity</Text>
            <Text className="text-gray-500 text-center px-12 leading-tight">
              A high-res front facing photo works best for neural mapping.
            </Text>
          </Pressable>
          
          <Pressable 
            onPress={() => handlePick(true)}
            className="mt-8 w-full bg-white/10 py-5 rounded-[24px] flex-row items-center justify-center border border-white/20 active:bg-white/20 shadow-xl"
          >
            <Camera color="white" size={24} className="mr-3" />
            <Text className="text-white font-black text-xl uppercase tracking-widest">Invoke Camera</Text>
          </Pressable>
        </Animated.View>
      )}

      {isProcessing && (
        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut} className="flex-1 items-center justify-center mb-20">
          <View className="w-64 h-64 border-2 border-primary/30 rounded-full items-center justify-center">
             <ActivityIndicator size="large" color="#c026d3" />
             {isScanning && (
                <Animated.View 
                  className="absolute top-0 w-full h-1 bg-primary/80"
                  style={{
                    shadowColor: '#9333ea',
                    shadowRadius: 10,
                    shadowOpacity: 1,
                    // Simple top-to-bottom scan line animation would go here
                  }}
                />
             )}
          </View>
          <Text className="text-primary text-2xl font-black mt-8 uppercase tracking-widest text-center">Neural Mapping in Progress...</Text>
          <Text className="text-gray-500 mt-2">Initializing face-vector extraction</Text>
        </Animated.View>
      )}

      {image && !isProcessing && (
        <Animated.View entering={FadeInDown.springify()} className="flex-1 items-center mb-10">
          <View className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary/50 mb-8" style={{ shadowColor: '#9333ea', shadowOpacity: 0.8, shadowRadius: 20, elevation: 15 }}>
            <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
          </View>
          
          <View className="flex-row items-center mb-10 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30">
            <CheckCircle2 color="#22c55e" size={20} className="mr-2" />
            <Text className="text-green-400 font-bold">Looks good! Face detected.</Text>
          </View>

          <View className="w-full flex-row gap-4 mt-auto">
            <Pressable 
              onPress={() => setImage(null)}
              className="flex-1 py-4 bg-white/10 rounded-2xl items-center justify-center border border-white/20 active:bg-white/20"
            >
              <Text className="text-white font-bold text-lg">Retake</Text>
            </Pressable>
            <Pressable 
              onPress={handleContinue}
              className="flex-1 py-4 bg-primary rounded-2xl items-center flex-row justify-center border border-white/20"
            >
              <Text className="text-white font-bold text-lg mr-2">Continue</Text>
              <ArrowRight color="white" size={20} />
            </Pressable>
          </View>
        </Animated.View>
      )}
    </GradientBackground>
  );
}
