import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import KinddSuspiccousIdeastab from '../../KinddSuspiccousIdeastab';
import KinddSuspiccousIdeasloddr from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeasloddr';
import KinddSuspiccousIdeasonbrd from '../KinddSuspiccousIdeasscrn/KinddSuspiccousIdeasonbrd';
import KinddSuspiccousIdeascasefile from '../KinddSuspiccousIdeasscrn/KinddSuspiccousIdeascasefile';
import KinddSuspiccousIdeascaseclosed from '../KinddSuspiccousIdeasscrn/KinddSuspiccousIdeascaseclosed';
import KinddSuspiccousIdeasstorydetail from '../KinddSuspiccousIdeasscrn/KinddSuspiccousIdeasstorydetail';
import KinddSuspiccousIdeaspartysetup from '../KinddSuspiccousIdeasscrn/KinddSuspiccousIdeaspartysetup';
import KinddSuspiccousIdeaspartyspin from '../KinddSuspiccousIdeasscrn/KinddSuspiccousIdeaspartyspin';
import KinddSuspiccousIdeaspartysituation from '../KinddSuspiccousIdeasscrn/KinddSuspiccousIdeaspartysituation';
import KinddSuspiccousIdeaspartyvote from '../KinddSuspiccousIdeasscrn/KinddSuspiccousIdeaspartyvote';
import KinddSuspiccousIdeaspartyresults from '../KinddSuspiccousIdeasscrn/KinddSuspiccousIdeaspartyresults';
import KinddSuspiccousIdeascipherssaved from '../KinddSuspiccousIdeasscrn/KinddSuspiccousIdeascipherssaved';
import type {KinddSuspiccousIdeasRootParamList} from './KinddSuspiccousIdeasrootParams';

export type {KinddSuspiccousIdeasRootParamList} from './KinddSuspiccousIdeasrootParams';

const Stack = createStackNavigator<KinddSuspiccousIdeasRootParamList>();

const KinddSuspiccousIdeasstakk = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="KinddSuspiccousIdeasloddr"
        component={KinddSuspiccousIdeasloddr}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeasonbrd"
        component={KinddSuspiccousIdeasonbrd}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeastab"
        component={KinddSuspiccousIdeastab}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeascasefile"
        component={KinddSuspiccousIdeascasefile}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeascaseclosed"
        component={KinddSuspiccousIdeascaseclosed}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeasstorydetail"
        component={KinddSuspiccousIdeasstorydetail}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeaspartysetup"
        component={KinddSuspiccousIdeaspartysetup}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeaspartyspin"
        component={KinddSuspiccousIdeaspartyspin}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeaspartysituation"
        component={KinddSuspiccousIdeaspartysituation}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeaspartyvote"
        component={KinddSuspiccousIdeaspartyvote}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeaspartyresults"
        component={KinddSuspiccousIdeaspartyresults}
      />
      <Stack.Screen
        name="KinddSuspiccousIdeascipherssaved"
        component={KinddSuspiccousIdeascipherssaved}
      />
    </Stack.Navigator>
  );
};

export default KinddSuspiccousIdeasstakk;
