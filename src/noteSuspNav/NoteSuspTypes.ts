export type NoteSuspRootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
  CaseFile: {caseId: string};
  CaseClosed: {caseId: string};
  StoryDetail: {storyId: string};
  PartySetup: undefined;
  PartyCategoryPicker: undefined;
  PartySituation: undefined;
  PartyVote: undefined;
  PartyResults: undefined;
  SavedCiphers: undefined;
  // Legacy route names kept for older bundles / deep links.
  CaseFileScreen: {caseId: string};
  CaseClosedScreen: {caseId: string};
  StoryDetailScreen: {storyId: string};
  PartySetupScreen: undefined;
  PartyCategoryPickerScreen: undefined;
  PartySituationScreen: undefined;
  PartyVoteScreen: undefined;
  PartyResultsScreen: undefined;
  CipherScreenssaved: undefined;
};

export type NoteSuspMainTabParamList = {
  Cases: undefined;
  Stories: undefined;
  Party: undefined;
  Cipher: undefined;
  Settings: undefined;
};
