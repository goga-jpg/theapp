import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Animated, StyleSheet, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { PRIMARY } from '../theme';

const KB = [
  { k: ['audience', 'intelligence', 'repository'], r: "Audience Path builds Africa's largest repository of unique, buyable audiences segmented by verticals, lifestyles, and geography down to sub-county level." },
  { k: ['resonance', 'video', 'emotion', 'sentiment', 'viral'], r: "Resonance is 5DM's video intelligence engine with 8,415+ videos ingested and 23% match rate. We analyse emotional arcs to place ads only in brand-safe contexts." },
  { k: ['media', 'buy', 'channel', 'tv', 'sync', 'sports'], r: "Media Path unifies all media operations including geo-location targeting, TV Sync, Sports Sync and Connected TV for measurable ROI across every channel." },
  { k: ['creative', 'design', 'content', 'cabal', 'dco'], r: "Creative Path goes from concept to launch in 72 hours, using AI-accelerated workflows that deliver 2-3x better performance than industry benchmarks." },
  { k: ['agri', 'farm', 'chlorophyll', 'farmer'], r: "Chlorophyll is Africa's first agri-marketing cloud reaching 250M+ smallholder farmers across Kenya, Uganda, and Tanzania." },
  { k: ['happy hour', 'drinks', 'beverage'], r: "Happy Hour is our D2C drinks platform capturing high-intent Party Planner and Socializer audience data." },
  { k: ['price', 'cost', 'pricing', 'budget'], r: "Pricing is tailored to your campaign scope and goals. Request a demo so our team can build a custom proposal." },
  { k: ['demo', 'start', 'begin'], r: "Head to the Contact page and our team will respond within 24 hours!" },
  { k: ['location', 'nairobi', 'lagos', 'johannesburg'], r: "We operate across Nairobi, Lagos, Johannesburg, and Cape Town. Reach us at info@5dm.africa." },
  { k: ['team', 'ceo', 'leadership', 'mavin'], r: "5DM is led by Mavin Waganda (CEO), Allen Kambuni (CGO), and Jonah Otieno (CBO)." },
];

function getReply(text) {
  const l = text.toLowerCase();
  for (const { k, r } of KB) {
    if (k.some(kw => l.includes(kw))) return r;
  }
  return 'Thanks for reaching out! Contact us at info@5dm.africa or fill out the Contact form and we will get back within 24 hours.';
}

export default function ChatDrawer({ visible, onClose }) {
  const { theme } = useTheme();
  const slideAnim = useRef(new Animated.Value(1)).current; // 0 = visible, 1 = hidden (translateY %)
  const scrimOpacity = useRef(new Animated.Value(0)).current;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 0, from: 'bot', text: "Hello! I'm the 5DM Africa assistant. Ask me about our solutions, pricing, or how to get started." },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
        Animated.timing(scrimOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
        Animated.timing(scrimOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setInput('');
    const userMsg = { id: Date.now(), from: 'user', text: t };
    setMessages(prev => [...prev, userMsg]);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: getReply(t) }]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 800);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  if (!visible && slideAnim._value === 1) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Scrim */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.scrim, { opacity: scrimOpacity }]}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          { backgroundColor: theme.drawerBg, borderColor: theme.border2 },
          { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 600] }) }] },
        ]}
      >
        <View style={[styles.handle, { backgroundColor: theme.handle }]} />

        {/* Header */}
        <View style={[styles.dHead, { borderBottomColor: theme.border3 }]}>
          <View style={styles.dAv}>
            <Text style={styles.dAvTxt}>💬</Text>
          </View>
          <View>
            <Text style={[styles.dName, { color: theme.text }]}>5DM Assistant</Text>
            <Text style={[styles.dSub, { color: theme.dSub }]}>Ask me anything</Text>
          </View>
          <TouchableOpacity style={[styles.dX, { backgroundColor: theme.bg2, borderColor: theme.border }]} onPress={onClose}>
            <Text style={{ color: theme.dSub, fontSize: 14 }}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.msgs}
          contentContainerStyle={{ gap: 12, padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(msg => (
            <View key={msg.id} style={[styles.cm, msg.from === 'user' && styles.cmUser]}>
              <View style={[styles.cmAv, msg.from === 'user' && { backgroundColor: PRIMARY }]}>
                <Text style={{ fontSize: 12 }}>{msg.from === 'user' ? '👤' : '🤖'}</Text>
              </View>
              <View style={[
                styles.cmBubble,
                msg.from === 'user'
                  ? styles.cmBubbleUser
                  : { backgroundColor: theme.chatBg, borderColor: theme.chatBdr },
              ]}>
                <Text style={[
                  styles.cmTxt,
                  { color: msg.from === 'user' ? '#fff' : theme.sub },
                ]}>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={[styles.dFoot, { borderTopColor: theme.border3 }]}>
            <TextInput
              style={[styles.dInp, { backgroundColor: theme.dInpBg, borderColor: theme.border2, color: theme.text }]}
              placeholder="Type a message…"
              placeholderTextColor={theme.ph}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={send}
              returnKeyType="send"
              multiline
            />
            <TouchableOpacity style={styles.dSend} onPress={send} activeOpacity={0.85}>
              <Text style={{ color: '#fff', fontSize: 16 }}>➤</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '76%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    flexDirection: 'column',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: 0,
  },
  dHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
  },
  dAv: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(201,31,65,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(201,31,65,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dAvTxt: { fontSize: 16 },
  dName: { fontSize: 14, fontWeight: '700' },
  dSub: { fontSize: 11, marginTop: 2 },
  dX: {
    marginLeft: 'auto',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgs: { flex: 1 },
  cm: {
    flexDirection: 'row',
    gap: 8,
    maxWidth: '86%',
    alignSelf: 'flex-start',
  },
  cmUser: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
  cmAv: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(100,100,100,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  cmBubble: {
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cmBubbleUser: {
    backgroundColor: PRIMARY,
    borderBottomRightRadius: 3,
  },
  cmTxt: { fontSize: 13, lineHeight: 20 },
  dFoot: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    padding: 10,
    paddingHorizontal: 14,
    paddingBottom: 18,
    borderTopWidth: 1,
  },
  dInp: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    maxHeight: 70,
    lineHeight: 18,
  },
  dSend: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
