import React from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
// Icons removed for absolute system stability
import GradientBackground from '../components/GradientBackground';
import AIChatbot from '../components/AIChatbot';

const SCREEN_WIDTH = Dimensions.get('window').width;

function StatCard({ title, value, sub, iconLabel, color }: any) {
  return (
    <Animated.View
      entering={FadeInDown.delay(200).springify()}
      className="bg-white/5 border border-white/10 p-5 rounded-3xl flex-1 mr-4"
    >
      <View style={{ backgroundColor: color + '20' }} className="w-10 h-10 rounded-xl items-center justify-center mb-4">
        <Text style={{ color: color }} className="text-lg font-bold">{iconLabel}</Text>
      </View>
      <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</Text>
      <View className="flex-row items-end justify-between mt-1">
        <Text className="text-white text-2xl font-black">{value}</Text>
        <Text className="text-green-500 font-bold text-xs mb-1">{sub}</Text>
      </View>
    </Animated.View>
  );
}

function MockPieChart() {
  return (
    <View className="items-center justify-center relative w-40 h-40">
      <View className="w-32 h-32 rounded-full border-[12px] border-primary/20 items-center justify-center">
        <View className="absolute inset-x-0 top-0 h-1/2 w-full border-[12px] border-primary rounded-t-full" />
        <View className="absolute inset-0 items-center justify-center">
          <Text className="text-white text-2xl font-black">74%</Text>
          <Text className="text-gray-500 text-[10px] font-bold uppercase">Efficiency</Text>
        </View>
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <GradientBackground className="flex-1">
      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Sidebar / Top Nav */}
      <View className="flex-row items-center justify-between p-6 pt-16 border-b border-white/5">
        <View className="flex-row items-center">
          <View className="bg-primary w-10 h-10 rounded-xl items-center justify-center border-t border-white/40">
            <Text className="text-white font-bold">📱</Text>
          </View>
          <Text className="text-white font-black text-xl ml-3 tracking-tighter uppercase">Nexus<Text className="text-primary">DB</Text></Text>
        </View>
        <View className="flex-row gap-4">
           <Pressable
             onPress={() => setIsChatOpen(true)}
             className="w-10 h-10 bg-primary/20 rounded-full items-center justify-center border border-primary/40"
           >
              <Text className="text-lg">✨</Text>
           </Pressable>
           <Pressable className="w-10 h-10 bg-white/5 rounded-full items-center justify-center border border-white/10">
              <Text className="text-lg">🔔</Text>
           </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {/* WELCOME SECTION */}
        <Animated.View entering={FadeInDown.springify()} className="mb-8">
          <Text className="text-gray-500 font-bold uppercase tracking-[2px] text-xs">Akarsh's Digital Nexus</Text>
          <Text className="text-white text-4xl font-black mt-1">Identity Dashboard</Text>
        </Animated.View>

        {/* ANALYTICS ROW */}
        <View className="flex-row mb-8">
          <StatCard
            title="Synths"
            value="42"
            sub="+12%"
            iconLabel="✨"
            color="#c026d3"
          />
          <StatCard
            title="Credits"
            value="1.2k"
            sub="PRO"
            iconLabel="⚡"
            color="#fbbf24"
          />
        </View>

        {/* CHARTS SECTION */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="bg-white/5 border border-white/10 p-6 rounded-[32px] mb-8 flex-row items-center"
        >
          <View className="flex-1">
            <Text className="text-white text-xl font-black mb-1">Neural Affinity</Text>
            <Text className="text-gray-500 mb-4 text-xs">Your style preference distribution</Text>
            <View className="flex-row items-center mb-2">
              <View className="w-3 h-3 rounded-full bg-primary mr-2" />
              <Text className="text-gray-400 text-xs">Anime Synthesis</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <View className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
              <Text className="text-gray-400 text-xs">Cyber Vectors</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
              <Text className="text-gray-400 text-xs">Ethereal Bloom</Text>
            </View>
          </View>
          <MockPieChart />
        </Animated.View>

        {/* RECENT RECORDS */}
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-white text-xl font-black">Forge History</Text>
          <Pressable className="flex-row items-center">
            <Text className="text-primary font-bold text-xs uppercase mr-1">View All ↗️</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-12">
          {[1, 2, 3, 4].map((i) => (
            <Animated.View
              key={i}
              entering={FadeInRight.delay(i * 100).springify()}
              className="mr-4 w-48 aspect-[3/4] rounded-3xl overflow-hidden border border-white/10"
            >
              <Image
                source={{ uri: `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=300&auto=format&fit=crop` }}
                className="w-full h-full"
              />
              <View className="absolute bottom-0 inset-x-0 p-4 bg-black/60 backdrop-blur-md">
                <Text className="text-white font-bold text-xs">Neural ID #{i}04{i}</Text>
                <Text className="text-gray-400 text-[10px]">2h ago • Anime Style</Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>

        {/* AJ WATERMARK FOOTER */}
        <View className="items-center mb-20 opacity-30">
          <Text className="text-white font-black text-[10px] tracking-[6px] uppercase">AJ - Akarsh Jain</Text>
        </View>
      </ScrollView>

      {/* FLOATING ACTION BUTTON */}
      <Pressable
        onPress={() => router.push('/choose-mode')}
        className="absolute bottom-12 right-8 bg-primary w-16 h-16 rounded-full items-center justify-center shadow-2xl border-t border-white/40"
      >
        <Text className="text-white font-black text-3xl">➕</Text>
      </Pressable>

      {/* BOTTOM NAV BAR */}
      <View className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-xl border-t border-white/5 flex-row justify-around p-6 pb-10">
        <Text className="text-2xl">📱</Text>
        <Text className="text-2xl opacity-40">⏳</Text>
        <View className="w-6" /> {/* Placeholder for FAB */}
        <Text className="text-2xl opacity-40">⚙️</Text>
        <Text className="text-2xl opacity-40">👤</Text>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({});
