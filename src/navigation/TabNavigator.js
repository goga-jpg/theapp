import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { PRIMARY } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ContactScreen from '../screens/ContactScreen';
import ChatDrawer from '../components/ChatDrawer';

const Tab = createBottomTabNavigator();

const HomeIcon = ({ color }) => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

function CustomTabBar({ state, descriptors, navigation, onChatOpen }) {
  const { theme, isDark } = useTheme();
  const tabs = [
    {
      name: 'Home', label: 'Home',
      icon: (active) => (
        <View style={[styles.niIco, active && { backgroundColor: 'rgba(201,31,65,0.12)' }]}>
          <View style={{ width: 22, height: 22, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'relative', width: 22, height: 22 }}>
              {/* House icon via View shapes */}
              <View style={[styles.houseBody, { borderColor: active ? PRIMARY : theme.niOff }]} />
              <View style={[styles.houseRoof, { borderBottomColor: active ? PRIMARY : theme.niOff }]} />
            </View>
          </View>
        </View>
      ),
    },
    {
      name: 'Services', label: 'Solutions',
      icon: (active) => (
        <View style={[styles.niIco, active && { backgroundColor: 'rgba(201,31,65,0.12)' }]}>
          <View style={styles.gridWrap}>
            {[0, 1, 2, 3].map(i => (
              <View key={i} style={[styles.gridCell, { borderColor: active ? PRIMARY : theme.niOff }]} />
            ))}
          </View>
        </View>
      ),
    },
    {
      name: 'Contact', label: 'Contact',
      icon: (active) => (
        <View style={[styles.niIco, active && { backgroundColor: 'rgba(201,31,65,0.12)' }]}>
          <View style={[styles.envOuter, { borderColor: active ? PRIMARY : theme.niOff }]}>
            <View style={[styles.envChevron, { borderTopColor: active ? PRIMARY : theme.niOff }]} />
          </View>
        </View>
      ),
    },
  ];

  return (
    <View style={[styles.bnav, { backgroundColor: theme.bg, borderTopColor: theme.border }]}>
      {state.routes.map((route, index) => {
        const active = state.index === index;
        const tab = tabs[index];
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.ni}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}
          >
            {tab.icon(active)}
            <Text style={[styles.niLbl, { color: active ? PRIMARY : theme.niOff }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabNavigator() {
  const [chatOpen, setChatOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Tab.Navigator
        tabBar={(props) => (
          <CustomTabBar {...props} onChatOpen={() => setChatOpen(true)} />
        )}
        screenOptions={{
          header: () => null,
        }}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen onChatOpen={() => setChatOpen(true)} />}
        </Tab.Screen>
        <Tab.Screen name="Services">
          {() => <ServicesScreen onChatOpen={() => setChatOpen(true)} />}
        </Tab.Screen>
        <Tab.Screen name="Contact">
          {() => <ContactScreen onChatOpen={() => setChatOpen(true)} />}
        </Tab.Screen>
      </Tab.Navigator>
      <ChatDrawer visible={chatOpen} onClose={() => setChatOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  bnav: {
    height: 72,
    flexDirection: 'row',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  ni: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
  },
  niIco: {
    width: 46,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  niLbl: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  houseBody: {
    position: 'absolute',
    bottom: 0,
    left: 3,
    right: 3,
    height: 12,
    borderWidth: 2,
    borderTopWidth: 0,
  },
  houseRoof: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  gridWrap: {
    width: 18,
    height: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  gridCell: {
    width: 7,
    height: 7,
    borderWidth: 1.5,
    borderRadius: 1,
  },
  envOuter: {
    width: 20,
    height: 14,
    borderWidth: 1.5,
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
  },
  envChevron: {
    marginTop: -1,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
