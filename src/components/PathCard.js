import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, Animated, StyleSheet, LayoutAnimation, Platform, UIManager,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { PRIMARY } from '../theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

function FeatItem({ label, desc, theme }) {
  return (
    <View style={styles.feat}>
      <View style={styles.featDot} />
      <Text style={[styles.featTxt, { color: theme.featTxt }]}>
        <Text style={[styles.featStr, { color: theme.featStr }]}>{label} </Text>
        {desc}
      </Text>
    </View>
  );
}

export default function PathCard({ tag, name, desc, features, btnLabel, onBtnPress }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(v => !v);
  };

  return (
    <View style={[
      styles.card,
      { backgroundColor: theme.pathBg, borderColor: open ? 'rgba(201,31,65,0.3)' : theme.border },
    ]}>
      <TouchableOpacity style={styles.head} onPress={toggle} activeOpacity={0.8}>
        <View style={{ flex: 1 }}>
          <Text style={styles.tag}>{tag}</Text>
          <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
        </View>
        <View style={[styles.arrow, open && styles.arrowOpen]}>
          <Text style={[styles.arrowTxt, { color: open ? PRIMARY : theme.eyebrow }]}>›</Text>
        </View>
      </TouchableOpacity>

      {open && (
        <View style={styles.body}>
          <Text style={[styles.desc, { color: theme.pathDesc }]}>{desc}</Text>
          <View style={styles.featList}>
            {features.map((f, i) => (
              <FeatItem key={i} label={f.label} desc={f.desc} theme={theme} />
            ))}
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={onBtnPress}
            activeOpacity={0.85}
          >
            <Text style={styles.btnTxt}>{btnLabel}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  tag: {
    fontSize: 10,
    fontWeight: '700',
    color: PRIMARY,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  arrow: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(100,100,100,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginLeft: 'auto',
  },
  arrowOpen: {
    backgroundColor: 'rgba(201,31,65,0.12)',
    transform: [{ rotate: '90deg' }],
  },
  arrowTxt: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '300',
    marginLeft: 2,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  desc: {
    fontSize: 13,
    lineHeight: 22,
    marginBottom: 18,
  },
  featList: {
    gap: 12,
    marginBottom: 20,
  },
  feat: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  featDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: PRIMARY,
    marginTop: 6,
    flexShrink: 0,
  },
  featTxt: {
    fontSize: 13,
    lineHeight: 22,
    flex: 1,
  },
  featStr: {
    fontWeight: '600',
  },
  btn: {
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
});
