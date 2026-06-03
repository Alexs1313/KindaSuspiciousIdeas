import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import type {NoteSuspRootStackParamList} from './NoteSuspTypes';

export const noteSuspNavigationRef =
  createNavigationContainerRef<NoteSuspRootStackParamList>();

const noteSuspLegacyRouteNames: Record<string, keyof NoteSuspRootStackParamList> = {
  CaseFileScreen: 'CaseFile',
  CaseClosedScreen: 'CaseClosed',
  StoryDetailScreen: 'StoryDetail',
  PartySetupScreen: 'PartySetup',
  PartySpinScreen: 'PartyCategoryPicker',
  PartySpin: 'PartyCategoryPicker',
  PartyCategoryPickerScreen: 'PartyCategoryPicker',
  PartySituationScreen: 'PartySituation',
  PartyVoteScreen: 'PartyVote',
  PartyResultsScreen: 'PartyResults',
  CipherScreenssaved: 'SavedCiphers',
};

function noteSuspResolveRouteName(
  screen: keyof NoteSuspRootStackParamList | string,
): keyof NoteSuspRootStackParamList {
  return (
    noteSuspLegacyRouteNames[screen] ??
    (screen as keyof NoteSuspRootStackParamList)
  );
}

export function noteSuspNavigateRootScreen<
  RouteName extends keyof NoteSuspRootStackParamList,
>(
  screen: RouteName | string,
  params?: NoteSuspRootStackParamList[RouteName],
) {
  if (!noteSuspNavigationRef.isReady()) {
    return;
  }

  const routeName = noteSuspResolveRouteName(screen);
  noteSuspNavigationRef.navigate(
    routeName as never,
    params as never,
  );
}

export function noteSuspReplaceRootScreen<
  RouteName extends keyof NoteSuspRootStackParamList,
>(
  screen: RouteName | string,
  params?: NoteSuspRootStackParamList[RouteName],
) {
  if (!noteSuspNavigationRef.isReady()) {
    return;
  }

  noteSuspNavigationRef.dispatch(
    StackActions.replace(
      noteSuspResolveRouteName(screen),
      params,
    ),
  );
}

export function noteSuspResetToMain() {
  if (!noteSuspNavigationRef.isReady()) {
    return;
  }

  noteSuspNavigationRef.reset({
    index: 0,
    routes: [{name: 'Main'}],
  });
}
