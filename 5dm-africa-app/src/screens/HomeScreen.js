import React, { useEffect, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Animated, Image, Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { PRIMARY } from '../theme';

const BRANDS_ROW1 = ['ECOWAS', 'Samsung', 'Microsoft', 'World Bank', 'Mastercard Fdn', 'UNHCR'];
const BRANDS_ROW2 = ['FSD Kenya', 'Kenya Tourism', 'African Dev Bank', 'Bill & Melinda Gates', 'African Energy'];

function TopBar({ onChatOpen }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.topbar, { backgroundColor: theme.bg, borderBottomColor: theme.border3, paddingTop: insets.top }]}>
      <Image
        source={{ uri: isDark ? 'https://dashboards.5dm.africa/app/2/5DM-white-logo.webp' : 'https://dashboards.5dm.africa/app/2/5DM-black-logo.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: theme.backBg, borderColor: theme.border2 }]} onPress={toggleTheme}>
          <Text style={{ fontSize: 16 }}>{isDark ? '🌙' : '☀️'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: theme.backBg, borderColor: theme.border2 }]} onPress={onChatOpen}>
          <Text style={{ fontSize: 16 }}>💬</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Badge() {
  const dotAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim, { toValue: 0.3, duration: 1300, useNativeDriver: true }),
        Animated.timing(dotAnim, { toValue: 1, duration: 1300, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <View style={styles.badge}>
      <Animated.View style={[styles.bdot, { opacity: dotAnim }]} />
      <Text style={styles.btxt}>AdTech for Africa</Text>
    </View>
  );
}

function Marquee({ items, duration, reverse }) {
  const anim = useRef(new Animated.Value(0)).current;
  const doubled = [...items, ...items];
  const PILL_W = 130;
  const totalW = items.length * PILL_W;

  useEffect(() => {
    const start = reverse ? -totalW : 0;
    const end = reverse ? 0 : -totalW;
    anim.setValue(start);
    Animated.loop(
      Animated.timing(anim, {
        toValue: end,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={{ overflow: 'hidden', marginBottom: 10 }}>
      <Animated.View style={{ flexDirection: 'row', gap: 10, transform: [{ translateX: anim }] }}>
        {doubled.map((b, i) => (
          <View key={i} style={styles.brandPill}>
            <Text style={styles.brandTxt}>{b}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

function DivLine() {
  const { theme } = useTheme();
  return <View style={[styles.divline, { backgroundColor: theme.divline }]} />;
}

function ProblemCard({ title, desc }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.problemCard, { backgroundColor: theme.bg2, borderColor: theme.border }]}>
      <View style={styles.redBar} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.problemTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.problemDesc, { color: theme.sub }]}>{desc}</Text>
      </View>
    </View>
  );
}

function PathMini({ num, title, onPress }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={[styles.pathMini, { backgroundColor: theme.bg2, borderColor: theme.border }]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.pathNum}>{num}</Text>
      <Text style={[styles.pathName, { color: theme.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

function Stat({ num, suffix, label }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.stat, { backgroundColor: theme.bg2, borderColor: theme.border }]}>
      <Text style={[styles.statN, { color: theme.text }]}>
        {num}<Text style={{ color: PRIMARY }}>{suffix}</Text>
      </Text>
      <Text style={[styles.statL, { color: theme.statLbl }]}>{label}</Text>
    </View>
  );
}

function PresenceRow({ city, country }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.prow, { backgroundColor: theme.prowBg, borderColor: theme.border }]}>
      <View>
        <Text style={[styles.pcity, { color: theme.text }]}>{city}</Text>
        <Text style={[styles.pctry, { color: theme.pctry }]}>{country}</Text>
      </View>
      <View style={styles.pdot} />
    </View>
  );
}

export default function HomeScreen({ onChatOpen }) {
  const { theme } = useTheme();
  const nav = useNavigation();

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <TopBar onChatOpen={onChatOpen} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.section}>
          <Badge />
          <Text style={[styles.hero, { color: theme.text }]}>
            Where Data Meets <Text style={{ color: PRIMARY }}>Creative</Text>
            {'\n'}to Drive Real Results.
          </Text>
          <Text style={[styles.muted, { color: theme.sub }]}>
            5DM is Africa's leading audience intelligence partner — digitizing the consumer supply chain for brands across Sub-Saharan Africa.
          </Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btnRed} onPress={() => nav.navigate('Services')} activeOpacity={0.85}>
              <Text style={styles.btnRedTxt}>Explore Solutions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnOutline, { borderColor: theme.border2 }]} onPress={() => nav.navigate('Contact')} activeOpacity={0.85}>
              <Text style={[styles.btnOutlineTxt, { color: theme.sub }]}>Get in Touch</Text>
            </TouchableOpacity>
          </View>
        </View>

        <DivLine />

        {/* The Problem */}
        <View style={[styles.section, { marginBottom: 20 }]}>
          <Text style={[styles.eyebrow, { color: theme.eyebrow }]}>The Problem</Text>
          <Text style={[styles.secH, { color: theme.text }]}>Reaching African Audiences Remains Fragmented.</Text>
          <Text style={[styles.muted, { color: theme.sub }]}>Disconnected data, high costs, and poor ROI leave brands unable to compete.</Text>
        </View>
        <View style={{ gap: 10, paddingHorizontal: 22 }}>
          <ProblemCard title="Fragmented Supply Chains" desc="Disconnected data sources prevent unified audience understanding." />
          <ProblemCard title="Data Deficiency" desc="Lack of reliable data for informed go-to-market strategies." />
          <ProblemCard title="ROI Challenges" desc="Difficulty assessing the true effectiveness of marketing spend." />
          <View style={styles.alertCard}>
            <Text style={styles.alertLabel}>System Alert</Text>
            <Text style={[styles.alertTxt, { color: theme.text }]}>
              The Result: Low campaign effectiveness, poor ROI, and inability to compete with global markets.
            </Text>
          </View>
        </View>

        <DivLine />

        {/* Four Paths */}
        <View style={[styles.section, { marginBottom: 18 }]}>
          <Text style={[styles.eyebrow, { color: theme.eyebrow }]}>Our Approach</Text>
          <Text style={[styles.secH, { color: theme.text }]}>Four Paths. One Platform.</Text>
        </View>
        <View style={styles.pathGrid}>
          {[
            { num: '01', title: 'Audience\nPath' },
            { num: '02', title: 'Creative\nPath' },
            { num: '03', title: 'Media\nPath' },
            { num: '04', title: 'Resonance' },
          ].map(p => (
            <PathMini key={p.num} num={p.num} title={p.title} onPress={() => nav.navigate('Services')} />
          ))}
        </View>

        <DivLine />

        {/* Stats */}
        <View style={[styles.section, { marginBottom: 14 }]}>
          <Text style={[styles.eyebrow, { color: theme.eyebrow }]}>By the Numbers</Text>
        </View>
        <View style={styles.statsRow}>
          <Stat num="8" suffix="K+" label="Videos Ingested via Resonance" />
          <Stat num="13" suffix="K+" label="Segmented Farmer Leads" />
          <Stat num="3" suffix="x" label="Better vs Industry Benchmarks" />
        </View>

        <DivLine />

        {/* CTA Card */}
        <View style={[styles.rcard, { marginHorizontal: 22 }]}>
          <View style={styles.rcardGlow} />
          <Text style={styles.rcardH}>Ready to Transform Your Audience Strategy?</Text>
          <Text style={styles.rcardP}>Delivering measurable results across Sub-Saharan Africa with Africa's most advanced ad-tech platform.</Text>
          <TouchableOpacity style={styles.rcardBtn} onPress={() => nav.navigate('Contact')} activeOpacity={0.85}>
            <Text style={styles.rcardBtnTxt}>Request a Demo</Text>
          </TouchableOpacity>
        </View>

        <DivLine />

        {/* Clients */}
        <View style={[styles.clientBox, { backgroundColor: theme.bg2, borderColor: theme.border }]}>
          <View style={styles.clientTopBar} />
          <Text style={[styles.eyebrow, { color: theme.eyebrow }]}>Trusted By</Text>
          <Text style={[styles.secH, { color: theme.text, marginBottom: 6, marginTop: 4 }]}>Leading Brands</Text>
          <Text style={[styles.muted, { color: theme.sub, marginBottom: 18, fontSize: 12 }]}>
            World-class organisations across Africa and beyond.
          </Text>
          <Marquee items={BRANDS_ROW1} duration={22000} reverse={false} />
          <Marquee items={BRANDS_ROW2} duration={26000} reverse={true} />
          <View style={[styles.clientBottom, { borderTopColor: theme.border }]}>
            <Text style={styles.clientNum}>50<Text style={{ fontSize: 15 }}>+</Text></Text>
            <Text style={[styles.clientSub, { color: theme.sub }]}>Global brands & organisations{'\n'}trust 5DM to reach their audiences</Text>
          </View>
        </View>

        <DivLine />

        {/* Presence */}
        <View style={[styles.section, { marginBottom: 16 }]}>
          <Text style={[styles.eyebrow, { color: theme.eyebrow }]}>Our Presence</Text>
          <Text style={[styles.secH, { color: theme.text }]}>Where We Operate</Text>
        </View>
        <View style={{ gap: 10, paddingHorizontal: 22 }}>
          <PresenceRow city="Nairobi" country="Kenya" />
          <PresenceRow city="Lagos" country="Nigeria" />
          <PresenceRow city="Johannesburg" country="South Africa" />
          <PresenceRow city="Cape Town" country="South Africa" />
        </View>

        <DivLine />

        <View style={{ paddingHorizontal: 22, paddingBottom: 40 }}>
          <TouchableOpacity style={styles.btnRed} onPress={() => nav.navigate('Contact')} activeOpacity={0.85}>
            <Text style={styles.btnRedTxt}>Get Started Today</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  logo: { width: 80, height: 32 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { flex: 1 },
  section: { paddingHorizontal: 22, paddingTop: 32, paddingBottom: 4 },
  hero: { fontSize: 32, fontWeight: '800', lineHeight: 36, letterSpacing: -0.5, marginBottom: 16 },
  muted: { fontSize: 14, lineHeight: 24, marginBottom: 28 },
  btnRow: { flexDirection: 'row', gap: 10 },
  btnRed: {
    flex: 1,
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRedTxt: { color: '#fff', fontSize: 14, fontWeight: '700', letterSpacing: 0.1 },
  btnOutline: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlineTxt: { fontSize: 14, fontWeight: '500' },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  secH: { fontSize: 24, fontWeight: '800', letterSpacing: -0.4, lineHeight: 28, marginBottom: 14 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(201,31,65,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(201,31,65,0.15)',
    borderRadius: 30,
    paddingVertical: 6,
    paddingLeft: 10,
    paddingRight: 14,
    marginBottom: 22,
  },
  bdot: { width: 6, height: 6, borderRadius: 3, backgroundColor: PRIMARY },
  btxt: { fontSize: 10, fontWeight: '700', color: PRIMARY, letterSpacing: 1.2, textTransform: 'uppercase' },
  divline: { height: 1, marginHorizontal: 22, marginVertical: 28 },
  problemCard: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  redBar: { width: 3, borderRadius: 2, backgroundColor: PRIMARY, alignSelf: 'stretch' },
  problemTitle: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  problemDesc: { fontSize: 12, lineHeight: 20 },
  alertCard: {
    backgroundColor: 'rgba(201,31,65,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(201,31,65,0.2)',
    borderRadius: 14,
    padding: 16,
    paddingHorizontal: 18,
  },
  alertLabel: { fontSize: 10, fontWeight: '700', color: PRIMARY, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 },
  alertTxt: { fontSize: 13, lineHeight: 22 },
  pathGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 22,
  },
  pathMini: {
    width: '48%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    paddingHorizontal: 14,
  },
  pathNum: { fontSize: 10, fontWeight: '700', color: PRIMARY, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 },
  pathName: { fontSize: 14, fontWeight: '700', lineHeight: 20 },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 22 },
  stat: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 18, paddingHorizontal: 12 },
  statN: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5, marginBottom: 4 },
  statL: { fontSize: 10, fontWeight: '500', lineHeight: 14 },
  rcard: {
    backgroundColor: PRIMARY,
    borderRadius: 20,
    padding: 28,
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  rcardGlow: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  rcardH: { fontSize: 20, fontWeight: '800', color: '#fff', lineHeight: 26, marginBottom: 10 },
  rcardP: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 22, lineHeight: 22 },
  rcardBtn: {
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  rcardBtnTxt: { color: '#fff', fontSize: 13, fontWeight: '600' },
  clientBox: {
    marginHorizontal: 22,
    borderRadius: 20,
    padding: 24,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  clientTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: PRIMARY,
  },
  brandPill: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(150,150,150,0.2)',
    backgroundColor: 'rgba(100,100,100,0.1)',
  },
  brandTxt: { fontSize: 12, fontWeight: '600', color: '#888', whiteSpace: 'nowrap' },
  clientBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  clientNum: { fontSize: 24, fontWeight: '800', color: PRIMARY },
  clientSub: { fontSize: 11, lineHeight: 17 },
  prow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
  },
  pcity: { fontSize: 14, fontWeight: '600' },
  pctry: { fontSize: 11, marginTop: 2 },
  pdot: { width: 7, height: 7, borderRadius: 4, backgroundColor: PRIMARY },
});
