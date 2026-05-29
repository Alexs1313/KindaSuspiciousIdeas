import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SuspiciouskinddaIdeastab from '../../SuspiciouskinddaIdeastab';
import SuspiciouskinddaIdeasloddr from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeasloddr';
import SuspiciouskinddaIdeasonbrd from '../SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeasonbrd';
import SuspiciouskinddaIdeascasefile from '../SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeascasefile';
import SuspiciouskinddaIdeascaseclosed from '../SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeascaseclosed';
import SuspiciouskinddaIdeasstorydetail from '../SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeasstorydetail';
import SuspiciouskinddaIdeaspartysetup from '../SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeaspartysetup';
import SuspiciouskinddaIdeaspartyspin from '../SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeaspartyspin';
import SuspiciouskinddaIdeaspartysituation from '../SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeaspartysituation';
import SuspiciouskinddaIdeaspartyvote from '../SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeaspartyvote';
import SuspiciouskinddaIdeaspartyresults from '../SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeaspartyresults';
import SuspiciouskinddaIdeascipherssaved from '../SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeascipherssaved';
import type {SuspiciouskinddaIdeasRootParamList} from './SuspiciouskinddaIdeasrootParams';

export type {SuspiciouskinddaIdeasRootParamList} from './SuspiciouskinddaIdeasrootParams';

const Stack = createStackNavigator<SuspiciouskinddaIdeasRootParamList>();

const SuspiciouskinddaIdeasstakk = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SuspiciouskinddaIdeasloddr"
        component={SuspiciouskinddaIdeasloddr}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeasonbrd"
        component={SuspiciouskinddaIdeasonbrd}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeastab"
        component={SuspiciouskinddaIdeastab}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeascasefile"
        component={SuspiciouskinddaIdeascasefile}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeascaseclosed"
        component={SuspiciouskinddaIdeascaseclosed}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeasstorydetail"
        component={SuspiciouskinddaIdeasstorydetail}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeaspartysetup"
        component={SuspiciouskinddaIdeaspartysetup}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeaspartyspin"
        component={SuspiciouskinddaIdeaspartyspin}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeaspartysituation"
        component={SuspiciouskinddaIdeaspartysituation}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeaspartyvote"
        component={SuspiciouskinddaIdeaspartyvote}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeaspartyresults"
        component={SuspiciouskinddaIdeaspartyresults}
      />
      <Stack.Screen
        name="SuspiciouskinddaIdeascipherssaved"
        component={SuspiciouskinddaIdeascipherssaved}
      />
    </Stack.Navigator>
  );
};

export default SuspiciouskinddaIdeasstakk;
