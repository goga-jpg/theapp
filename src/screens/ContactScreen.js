import React, { useState } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTheme } from '../context/ThemeContext';
import { PRIMARY } from '../theme';

const INFO_ROWS = [
  { label: 'Address', value: 'The Billows, Ring Rd Kilimani, Nairobi, Kenya' },
  { label: 'Email', value: 'info@5dm.africa' },
  { label: 'Phone', value: '+254 (0) 712 345 678' },
  { label: 'Partners', value: 'Meta Business Partner · Google Partner · CIM · Thenetworkone' },
];

export default function ContactScreen({ onChatOpen }) {
  const { theme } = useTheme();
  const nav = useNavigation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      Alert.alert('Missing fields', 'Please fill in Name, Email and Message.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    setSending(true);
    try {
      await addDoc(collection(db, 'contacts'), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (focused) => [
    styles.input,
    {
      backgroundColor: theme.inputBg,
      borderColor: focused ? 'rgba(201,31,65,0.5)' : theme.border,
      color: theme.text,
    },
  ];

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      {/* TopBar */}
      <View style={[styles.topbar, { backgroundColor: theme.bg, borderBottomColor: theme.border3 }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.backBg, borderColor: theme.border2 }]}
          onPress={() => nav.navigate('Home')}
        >
          <Text style={{ color: theme.text, fontSize: 18 }}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.tbTitle, { color: theme.text }]}>Contact Us</Text>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: theme.backBg, borderColor: theme.border2 }]} onPress={onChatOpen}>
          <Text style={{ fontSize: 16 }}>💬</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.hero}>
            <Text style={[styles.eyebrow, { color: theme.eyebrow }]}>Get in Touch</Text>
            <Text style={[styles.secH, { color: theme.text }]}>Transform Your{'\n'}Audience Strategy.</Text>
            <Text style={[styles.muted, { color: theme.sub }]}>
              Our team will reach out within 24 hours. We work with brands across Sub-Saharan Africa ready to connect at scale.
            </Text>
          </View>

          {success && (
            <View style={styles.successBanner}>
              <View style={styles.successBar} />
              <Text style={styles.successTxt}>Message sent! Our team will be in touch within 24 hours.</Text>
            </View>
          )}

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={[styles.label, { color: theme.lbl }]}>Name <Text style={{ color: PRIMARY }}>*</Text></Text>
                <TextInput
                  style={inputStyle(false)}
                  placeholder="Full name"
                  placeholderTextColor={theme.ph}
                  value={form.name}
                  onChangeText={set('name')}
                />
              </View>
              <View style={styles.half}>
                <Text style={[styles.label, { color: theme.lbl }]}>Email <Text style={{ color: PRIMARY }}>*</Text></Text>
                <TextInput
                  style={inputStyle(false)}
                  placeholder="you@co.com"
                  placeholderTextColor={theme.ph}
                  value={form.email}
                  onChangeText={set('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={[styles.label, { color: theme.lbl }]}>Phone</Text>
                <TextInput
                  style={inputStyle(false)}
                  placeholder="+254 XXX XXX"
                  placeholderTextColor={theme.ph}
                  value={form.phone}
                  onChangeText={set('phone')}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.half}>
                <Text style={[styles.label, { color: theme.lbl }]}>Company</Text>
                <TextInput
                  style={inputStyle(false)}
                  placeholder="Company name"
                  placeholderTextColor={theme.ph}
                  value={form.company}
                  onChangeText={set('company')}
                />
              </View>
            </View>
            <View>
              <Text style={[styles.label, { color: theme.lbl }]}>Message <Text style={{ color: PRIMARY }}>*</Text></Text>
              <TextInput
                style={[inputStyle(false), styles.textarea]}
                placeholder="Tell us about your project or campaign goals…"
                placeholderTextColor={theme.ph}
                value={form.message}
                onChangeText={set('message')}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>
            <TouchableOpacity
              style={[styles.submitBtn, sending && { opacity: 0.7 }]}
              onPress={submit}
              disabled={sending}
              activeOpacity={0.85}
            >
              <Text style={styles.submitTxt}>{sending ? 'Sending…' : 'Send Message'}</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info */}
          <View style={[styles.infoBox, { backgroundColor: theme.ciBg, borderColor: theme.border }]}>
            {INFO_ROWS.map((r, i) => (
              <View key={i} style={[styles.infoRow, { borderBottomColor: theme.border3, borderBottomWidth: i < INFO_ROWS.length - 1 ? 1 : 0 }]}>
                <View style={styles.ciBar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.ciLabel}>{r.label}</Text>
                  <Text style={[styles.ciVal, { color: theme.ciVal }]}>{r.value}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tbTitle: { flex: 1, fontSize: 16, fontWeight: '700' },
  hero: { paddingHorizontal: 22, paddingTop: 28, paddingBottom: 8 },
  eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  secH: { fontSize: 24, fontWeight: '800', letterSpacing: -0.4, lineHeight: 30, marginBottom: 12 },
  muted: { fontSize: 14, lineHeight: 24 },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 22,
    marginBottom: 16,
    backgroundColor: 'rgba(34,197,94,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.15)',
    borderRadius: 12,
    padding: 14,
    paddingHorizontal: 16,
  },
  successBar: { width: 3, height: 36, backgroundColor: '#4ade80', borderRadius: 2, flexShrink: 0 },
  successTxt: { color: '#4ade80', fontSize: 13, lineHeight: 20, flex: 1 },
  form: { paddingHorizontal: 22, marginTop: 20, gap: 14 },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  label: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 14,
  },
  textarea: { minHeight: 110, paddingTop: 13 },
  submitBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
  },
  submitTxt: { color: '#fff', fontSize: 14, fontWeight: '700', letterSpacing: 0.1 },
  infoBox: {
    marginHorizontal: 22,
    marginTop: 24,
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    paddingHorizontal: 18,
  },
  ciBar: { width: 3, height: 32, backgroundColor: PRIMARY, borderRadius: 2, flexShrink: 0 },
  ciLabel: { fontSize: 9, fontWeight: '700', color: PRIMARY, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 3 },
  ciVal: { fontSize: 13, lineHeight: 20 },
});
