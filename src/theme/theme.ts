import {Platform} from 'react-native';

export const colors = {
  background: '#050714',
  panel: 'rgba(20, 29, 58, 0.72)',
  panelStrong: 'rgba(10, 15, 34, 0.92)',
  accent: '#2EB3FF',
  accentYellow: '#F7C948',
  accentPurple: '#A06BFF',
  text: '#FFFFFF',
  textMuted: '#7D88AD',
  tabIdle: '#4A5478',
  border: '#1A2347',
  white: '#FFFFFF',
  black: '#050714',
};

export const metrics = {
  screenPadding: 16,
  cardRadius: 20,
  tabHeight: 78,
  tabBottomOffset: Platform.OS === 'ios' ? 0 : 0,
  androidEdge: Platform.OS === 'android' ? 30 : 0,
};
