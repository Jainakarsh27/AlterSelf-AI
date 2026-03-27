import React, { useState, useRef } from 'react';
import { View, Image, PanResponder, Dimensions } from 'react-native';
import { ChevronRight, ChevronLeft } from 'lucide-react-native';

export default function BeforeAfterSlider({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) {
  const screenWidth = Dimensions.get('window').width - 48; // accounting for px-6 padding
  const height = screenWidth; // square aspect ratio
  const [position, setPosition] = useState(screenWidth / 2);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newX = gestureState.moveX - 24; // offset padding to align with component bounds
        if (newX < 0) newX = 0;
        if (newX > screenWidth) newX = screenWidth;
        setPosition(newX);
      },
    })
  ).current;

  return (
    <View 
      style={{ 
        width: screenWidth, 
        height, 
        borderRadius: 24, 
        overflow: 'hidden', 
        backgroundColor: '#111',
        shadowColor: '#9333ea', 
        shadowOpacity: 0.5, 
        shadowRadius: 20, 
        elevation: 10 
      }}
    >
      {/* After Image (Background) */}
      <Image source={{ uri: afterImage }} style={{ width: screenWidth, height, position: 'absolute' }} resizeMode="cover" />
      
      {/* Before Image (Foreground Masked) */}
      <View style={{ width: position, height, overflow: 'hidden', position: 'absolute', borderRightWidth: 2, borderColor: 'white' }}>
        <Image source={{ uri: beforeImage }} style={{ width: screenWidth, height }} resizeMode="cover" />
      </View>

      {/* Slider Handle */}
      <View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          left: position - 20,
          top: 0,
          bottom: 0,
          width: 40,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 5, elevation: 5 }}>
          <ChevronLeft color="#9333ea" size={16} style={{ marginRight: -4 }} />
          <ChevronRight color="#9333ea" size={16} />
        </View>
      </View>
    </View>
  );
}
