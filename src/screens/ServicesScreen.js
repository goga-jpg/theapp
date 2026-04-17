import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { PRIMARY } from '../theme';
import PathCard from '../components/PathCard';

const PATHS = [
  {
    tag: '01 — Audience Path',
    name: 'Audience Intelligence',
    desc: "Building Africa's largest repository of unique, buyable audiences. We target intent, not just demographics — across 290 sub-counties in Kenya and 774 LGAs in Nigeria.",
    features: [
      { label: 'Verticals & Brands —', desc: 'Financial Services, FMCG, Retail & Automotive segments defined by real purchase signals, not guesswork' },
      { label: 'Behavioural Lifestyles —', desc: 'Digital Nomads, Health Enthusiasts, Luxury Shoppers — how people live, not just who they are' },
      { label: 'Geographic Precision —', desc: 'Hyper-local to sub-county & LGA level. Addressable reach: Financial 8.4M · FMCG 8.1M · Govt 7.0M' },
      { label: 'Real-Time Activation —', desc: 'RTB audience filters, programmatic buying, and transparent reach numbers before you spend' },
    ],
    btnLabel: 'Get Started with Audience Path',
  },
  {
    tag: '02 — Creative Path',
    name: 'Data-Driven Creative',
    desc: 'Concept to campaign in 72 hours. Our AI-accelerated production delivers creative that performs 2–3× better than industry benchmarks — without losing cultural relevance.',
    features: [
      { label: 'Intelligence-Led Strategy —', desc: 'Every art direction and messaging decision informed by deep audience data' },
      { label: 'Creative Automation (DCO) —', desc: 'Personalised ad variations at scale, right message to right user in real-time' },
      { label: 'Content Cabal —', desc: 'Creator network producing authentic 9:16 vertical content. AI workflows turn 4-hour tasks into 15-min outputs' },
      { label: 'Omnichannel Formats —', desc: 'HTML5 banners, Rich Media, CTV, vertical video & interactive ads' },
    ],
    btnLabel: 'Start a Creative Brief',
  },
  {
    tag: '03 — Media Path',
    name: 'Omnichannel Activation',
    desc: 'Unifying media operations within our marketing cloud — targeted engagement and measurable conversions across every channel.',
    features: [
      { label: 'TV Sync & Geo-Targeting —', desc: 'Synchronise digital campaigns with live broadcasts. Geo-fencing drives footfall with attribution you can prove' },
      { label: 'Sports Sync —', desc: 'Live match triggers (goals, halftime, corner kicks). Reach fans at peak emotion' },
      { label: 'Chlorophyll CRM —', desc: "Africa's first agri-marketing cloud. Reach 250M+ smallholder farmers via SMS, WhatsApp & Radio" },
      { label: 'Happy Hour —', desc: 'D2C drinks platform capturing "Party Planner" & "Socializer" audience data' },
    ],
    btnLabel: 'Activate Your Media',
  },
  {
    tag: '04 — Resonance',
    name: 'Video Intelligence Engine',
    desc: "5DM's proprietary video advertising intelligence engine — analysing emotional and contextual signals to match ads with maximum cultural resonance.",
    features: [
      { label: '8,415 Videos Ingested —', desc: 'Growing library with +200 new videos this week spanning trending African content' },
      { label: 'Intent-Based Targeting —', desc: 'Ads served only where comment sentiment is positive and brand-safe. Never against negative content' },
      { label: 'Emotional Arc Matching —', desc: 'Inspirational content for awareness, Knowledge Seekers for demos, Entertainment for lifestyle' },
      { label: '23% Match Rate —', desc: 'Real-time campaign management and cross-device activation via RTB filters' },
    ],
    btnLabel: 'Activate Resonance',
  },
];

const ALSO = [
  { title: 'Integrated Marketing Strategy', sub: 'Consulting · Brand Strategy · Consumer Insights' },
  { title: 'Media Planning & Buying', sub: 'Planning · Buying · Optimisation · Reporting' },
  { title: 'AdTech & Software Development', sub: 'Custom platforms · Data Analytics & AI · AdTech Dev' },
];

const TEAM = [
  { initials: 'MW', name: 'Mavin Waganda', role: 'Chief Executive Officer', red: true },
  { initials: 'AK', name: 'Allen Kambuni', role: 'Chief Growth Officer', red: false },
  { initials: 'JO', name: 'Jonah Otieno', role: 'Chief Business Officer', red: false },
];

export default function ServicesScreen({ onChatOpen }) {
  const { theme, isDark } = useTheme();
  const nav = useNavigation();

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
        <Text style={[styles.tbTitle, { color: theme.text }]}>Solutions</Text>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: theme.backBg, borderColor: theme.border2 }]} onPress={onChatOpen}>
          <Text style={{ fontSize: 16 }}>💬</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={[styles.eyebrow, { color: theme.eyebrow }]}>5DM Product Suite</Text>
          <Text style={[styles.secH, { color: theme.text }]}>Four Paths.{'\n'}One Platform.</Text>
          <Text style={[styles.muted, { color: theme.sub }]}>
            Giving brands the data, creative, media, and video intelligence to reach African audiences at scale.
          </Text>
        </View>

        <View style={styles.paths}>
          {PATHS.map((p, i) => (
            <PathCard
              key={i}
              tag={p.tag}
              name={p.name}
              desc={p.desc}
              features={p.features}
              btnLabel={p.btnLabel}
              onBtnPress={() => nav.navigate('Contact')}
            />
          ))}
        </View>

        <View style={styles.divline2}>
          <View style={[styles.divlineInner, { backgroundColor: theme.divline }]} />
        </View>

        {/* Also Available */}
        <View style={styles.sectionPad}>
          <Text style={[styles.eyebrow, { color: theme.eyebrow, marginBottom: 14 }]}>Also Available</Text>
          <View style={{ gap: 10 }}>
            {ALSO.map((a, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.svcRow, { backgroundColor: theme.bg2, borderColor: theme.border }]}
                onPress={() => nav.navigate('Contact')}
                activeOpacity={0.8}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.svcTitle, { color: theme.text }]}>{a.title}</Text>
                  <Text style={[styles.svcSub, { color: theme.eyebrow }]}>{a.sub}</Text>
                </View>
                <Text style={{ color: theme.eyebrow, fontSize: 18 }}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.divlineInner, { backgroundColor: theme.divline, marginHorizontal: 22, marginVertical: 28 }]} />

        {/* Team */}
        <View style={styles.sectionPad}>
          <Text style={[styles.eyebrow, { color: theme.eyebrow }]}>Leadership & Expertise</Text>
          <Text style={[styles.secH, { color: theme.text, marginBottom: 16 }]}>Our Team</Text>
          <View style={{ gap: 10 }}>
            {TEAM.map((t, i) => (
              <View key={i} style={[styles.teamRow, { backgroundColor: theme.bg2, borderColor: theme.border }]}>
                <View style={[styles.teamAv, { backgroundColor: t.red ? PRIMARY : theme.border2 }]}>
                  <Text style={[styles.teamInitials, { color: t.red ? '#fff' : theme.text }]}>{t.initials}</Text>
                </View>
                <View>
                  <Text style={[styles.teamName, { color: theme.text }]}>{t.name}</Text>
                  <Text style={styles.teamRole}>{t.role}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  secH: { fontSize: 24, fontWeight: '800', letterSpacing: -0.4, lineHeight: 30, marginBottom: 12 },
  muted: { fontSize: 14, lineHeight: 24 },
  paths: { paddingHorizontal: 22, paddingTop: 20, gap: 12 },
  divline2: { marginHorizontal: 22, marginVertical: 28 },
  divlineInner: { height: 1 },
  sectionPad: { paddingHorizontal: 22, marginBottom: 12 },
  svcRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
  },
  svcTitle: { fontSize: 14, fontWeight: '600' },
  svcSub: { fontSize: 11, marginTop: 3 },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
  },
  teamAv: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  teamInitials: { fontSize: 14, fontWeight: '700' },
  teamName: { fontSize: 14, fontWeight: '700' },
  teamRole: { fontSize: 11, color: PRIMARY, fontWeight: '600', marginTop: 2 },
});
