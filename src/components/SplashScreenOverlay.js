import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';

export default function SplashScreenOverlay({ onDone }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(0.15)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo pop-in
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Glow burst
    Animated.sequence([
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 200,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(glowScale, {
          toValue: 1.8,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Bar slide
    Animated.timing(barWidth, {
      toValue: 54,
      duration: 400,
      delay: 850,
      useNativeDriver: false,
    }).start();

    // Fade out entire splash
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      delay: 2500,
      useNativeDriver: true,
    }).start(() => onDone());
  }, []);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container, { opacity }]} pointerEvents="none">
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />
      <Animated.Image
        source={{ uri: 'https://5dm.africa/wp-content/uploads/2025/05/Isolation_Mode.webp' }}
        style={[
          styles.logo,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
        resizeMode="contain"
      />
      <Animated.View style={[styles.bar, { width: barWidth }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  glow: {
    position: 'absolute',
    width: 480,
    height: 480,
    borderRadius: 240,
    backgroundColor: 'rgba(201,31,65,0.45)',
  },
  logo: {
    width: 160,
    height: 52,
    zIndex: 1,
  },
  bar: {
    height: 2,
    marginTop: 18,
    backgroundColor: '#C91F41',
    borderRadius: 1,
    zIndex: 1,
  },
});
