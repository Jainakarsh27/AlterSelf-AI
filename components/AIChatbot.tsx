import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeInUp, FadeInDown, SlideInRight } from 'react-native-reanimated';
// Icons removed for absolute system stability

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export default function AIChatbot({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I am your Neural Synthesis Guide. I can help you find the perfect anime character for your profile or guide you through the Forge process. How can I help you today? (I speak multiple languages!)",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const getBotResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('anime') || q.includes('character')) {
      return "Based on your focus, I recommend a 'Cyber-Shonen' style. Characters like Kaneda (Akira) or Major Kusanagi (Ghost in the Shell) would capture your essence perfectly!";
    }
    if (q.includes('how') || q.includes('guide')) {
      return "To begin, go to the 'Forge' section, upload a clear front-facing photo, and select your target style protocol. I'll handle the neural synthesis from there!";
    }
    if (q.includes('hola') || q.includes('spanish')) {
      return "¡Hola! Puedo ayudarte en español también. ¿En qué puedo asistirte hoy?";
    }
    return "Understood. I'm analyzing your neural vectors now. Is there anything specific about the style or character you'd like to adjust?";
  };

  return (
    <Animated.View 
      entering={SlideInRight} 
      className="absolute bottom-24 right-6 left-6 top-24 bg-black/95 border border-white/20 rounded-[40px] overflow-hidden shadow-2xl z-50"
      style={{ elevation: 20 }}
    >
      {/* HEADER */}
      <View className="bg-primary/20 p-6 border-b border-white/10 flex-row items-center justify-between">
         <View className="flex-row items-center">
            <View className="bg-primary p-2 rounded-xl mr-3">
               <Text className="text-xl">🤖</Text>
            </View>
            <View>
               <Text className="text-white font-black uppercase text-xs tracking-widest">Neural Guide</Text>
               <View className="flex-row items-center">
                  <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  <Text className="text-gray-400 text-[10px] font-bold uppercase">Ready to Sync</Text>
               </View>
            </View>
         </View>
         <Pressable onPress={onClose} className="p-2 bg-white/10 rounded-full">
            <Text className="text-white font-bold">❌</Text>
         </Pressable>
      </View>

      {/* MESSAGES */}
      <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        className="flex-1 p-6"
      >
        {messages.map((msg, idx) => (
          <Animated.View 
            key={msg.id}
            entering={msg.sender === 'bot' ? FadeInUp : FadeInDown}
            className={`mb-6 max-w-[85%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
          >
            <View className={`p-4 rounded-3xl ${msg.sender === 'user' ? 'bg-primary border border-white/20' : 'bg-white/10 border border-white/5'}`}>
               <Text className="text-white font-medium leading-relaxed">{msg.text}</Text>
            </View>
            <Text className="text-gray-600 text-[10px] mt-2 font-bold uppercase tracking-widest px-2">
               {msg.sender === 'bot' ? 'NEURAL ENGINE' : 'YOU'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>

      {/* INPUT */}
      <View className="p-6 bg-white/5 border-t border-white/10 flex-row items-center">
         <TextInput 
           value={input}
           onChangeText={setInput}
           placeholder="Ask the Nexus Guide..."
           placeholderTextColor="#666"
           className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-white mr-4 font-medium"
           onSubmitEditing={handleSend}
         />
         <Pressable 
           onPress={handleSend}
           disabled={!input.trim()}
           className={`w-12 h-12 rounded-2xl items-center justify-center ${input.trim() ? 'bg-primary' : 'bg-gray-800'}`}
         >
            <Text className="text-white font-bold text-xl">📤</Text>
         </Pressable>
      </View>
    </Animated.View>
  );
}
