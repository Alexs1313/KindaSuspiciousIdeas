import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  kinddSuspiccousIdeasPartyCategories,
  type KinddSuspiccousIdeasPartyCategory,
  type KinddSuspiccousIdeasPartyCategoryId,
} from './KinddSuspiccousIdeaspartyData';
import {
  kinddSuspiccousIdeasIncrementGamesPlayed,
  kinddSuspiccousIdeasLoadGamesPlayed,
} from './KinddSuspiccousIdeasgameStatsStorage';

export type KinddSuspiccousIdeasPartyPlayerScore = {
  kinddSuspiccousPlayerName: string;
  kinddSuspiccousTotalPoints: number;
  kinddSuspiccousTurnCount: number;
  kinddSuspiccousVoteSum: number;
};

type KinddSuspiccousIdeasPartyState = {
  kinddSuspiccousPlayers: string[];
  kinddSuspiccousTotalRounds: number;
  kinddSuspiccousCurrentRound: number;
  kinddSuspiccousCurrentPlayerIndex: number;
  kinddSuspiccousCurrentVoterIndex: number;
  kinddSuspiccousCurrentCategory: KinddSuspiccousIdeasPartyCategory | null;
  kinddSuspiccousCurrentSituation: string;
  kinddSuspiccousCurrentTurnVotes: number[];
  kinddSuspiccousScores: KinddSuspiccousIdeasPartyPlayerScore[];
  kinddSuspiccousUsedSituationKeys: string[];
  kinddSuspiccousGameFinished: boolean;
  kinddSuspiccousGamesPlayedCount: number;
  kinddSuspiccousReloadGamesPlayedCount: () => Promise<number>;
  kinddSuspiccousSetupPlayers: (kinddSuspiccousNames: string[]) => void;
  kinddSuspiccousSetupRounds: (kinddSuspiccousRounds: number) => void;
  kinddSuspiccousStartGame: () => void;
  kinddSuspiccousPickCategory: (
    kinddSuspiccousCategoryId: KinddSuspiccousIdeasPartyCategoryId,
  ) => void;
  kinddSuspiccousSubmitVote: (kinddSuspiccousPercent: number) => boolean;
  kinddSuspiccousResetGame: () => void;
  kinddSuspiccousCurrentPlayerName: () => string;
  kinddSuspiccousCurrentDefenderName: () => string;
  kinddSuspiccousVoterCount: () => number;
  kinddSuspiccousIsGameOver: () => boolean;
};

const KinddSuspiccousIdeasPartyContext =
  createContext<KinddSuspiccousIdeasPartyState | null>(null);

const kinddSuspiccousIdeasDefaultPlayers = ['Player 1', 'Player 2', 'Player 3'];

function kinddSuspiccousIdeasBuildScores(
  kinddSuspiccousNames: string[],
): KinddSuspiccousIdeasPartyPlayerScore[] {
  return kinddSuspiccousNames.map(kinddSuspiccousName => ({
    kinddSuspiccousPlayerName: kinddSuspiccousName,
    kinddSuspiccousTotalPoints: 0,
    kinddSuspiccousTurnCount: 0,
    kinddSuspiccousVoteSum: 0,
  }));
}

function kinddSuspiccousIdeasPickSituation(
  kinddSuspiccousCategory: KinddSuspiccousIdeasPartyCategory,
  kinddSuspiccousUsedKeys: string[],
): {kinddSuspiccousSituation: string; kinddSuspiccousKey: string} {
  const kinddSuspiccousAvailable = kinddSuspiccousCategory.kinddSuspiccousSituations
    .map((kinddSuspiccousText, kinddSuspiccousIndex) => ({
      kinddSuspiccousText,
      kinddSuspiccousKey: `${kinddSuspiccousCategory.kinddSuspiccousCategoryId}-${kinddSuspiccousIndex}`,
    }))
    .filter(
      kinddSuspiccousItem =>
        !kinddSuspiccousUsedKeys.includes(kinddSuspiccousItem.kinddSuspiccousKey),
    );

  const kinddSuspiccousPool =
    kinddSuspiccousAvailable.length > 0
      ? kinddSuspiccousAvailable
      : kinddSuspiccousCategory.kinddSuspiccousSituations.map(
          (kinddSuspiccousText, kinddSuspiccousIndex) => ({
            kinddSuspiccousText,
            kinddSuspiccousKey: `${kinddSuspiccousCategory.kinddSuspiccousCategoryId}-${kinddSuspiccousIndex}`,
          }),
        );

  const kinddSuspiccousPick =
    kinddSuspiccousPool[
      Math.floor(Math.random() * kinddSuspiccousPool.length)
    ];

  return {
    kinddSuspiccousSituation: kinddSuspiccousPick.kinddSuspiccousText,
    kinddSuspiccousKey: kinddSuspiccousPick.kinddSuspiccousKey,
  };
}

export function KinddSuspiccousIdeasPartyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [kinddSuspiccousPlayers, setKinddSuspiccousPlayers] = useState(
    kinddSuspiccousIdeasDefaultPlayers,
  );
  const [kinddSuspiccousTotalRounds, setKinddSuspiccousTotalRounds] =
    useState(3);
  const [kinddSuspiccousCurrentRound, setKinddSuspiccousCurrentRound] =
    useState(1);
  const [kinddSuspiccousCurrentPlayerIndex, setKinddSuspiccousCurrentPlayerIndex] =
    useState(0);
  const [kinddSuspiccousCurrentVoterIndex, setKinddSuspiccousCurrentVoterIndex] =
    useState(0);
  const [kinddSuspiccousCurrentCategory, setKinddSuspiccousCurrentCategory] =
    useState<KinddSuspiccousIdeasPartyCategory | null>(null);
  const [kinddSuspiccousCurrentSituation, setKinddSuspiccousCurrentSituation] =
    useState('');
  const [kinddSuspiccousCurrentTurnVotes, setKinddSuspiccousCurrentTurnVotes] =
    useState<number[]>([]);
  const [kinddSuspiccousScores, setKinddSuspiccousScores] = useState<
    KinddSuspiccousIdeasPartyPlayerScore[]
  >(() => kinddSuspiccousIdeasBuildScores(kinddSuspiccousIdeasDefaultPlayers));
  const [kinddSuspiccousUsedSituationKeys, setKinddSuspiccousUsedSituationKeys] =
    useState<string[]>([]);
  const [kinddSuspiccousGameFinished, setKinddSuspiccousGameFinished] =
    useState(false);
  const [kinddSuspiccousGamesPlayedCount, setKinddSuspiccousGamesPlayedCount] =
    useState(0);
  const kinddSuspiccousGameCountedRef = useRef(false);

  const kinddSuspiccousReloadGamesPlayedCount = useCallback(async () => {
    const kinddSuspiccousCount = await kinddSuspiccousIdeasLoadGamesPlayed();
    setKinddSuspiccousGamesPlayedCount(kinddSuspiccousCount);
    return kinddSuspiccousCount;
  }, []);

  useEffect(() => {
    void kinddSuspiccousReloadGamesPlayedCount();
  }, [kinddSuspiccousReloadGamesPlayedCount]);

  const kinddSuspiccousFinishPartyGame = useCallback(() => {
    setKinddSuspiccousCurrentCategory(null);
    setKinddSuspiccousCurrentSituation('');
    setKinddSuspiccousCurrentTurnVotes([]);
    setKinddSuspiccousGameFinished(true);

    if (kinddSuspiccousGameCountedRef.current) {
      return;
    }
    kinddSuspiccousGameCountedRef.current = true;

    void kinddSuspiccousIdeasIncrementGamesPlayed().then(
      kinddSuspiccousNext => {
        setKinddSuspiccousGamesPlayedCount(kinddSuspiccousNext);
      },
    );
  }, []);

  const kinddSuspiccousSetupPlayers = useCallback(
    (kinddSuspiccousNames: string[]) => {
      setKinddSuspiccousPlayers(kinddSuspiccousNames);
      setKinddSuspiccousScores(
        kinddSuspiccousIdeasBuildScores(kinddSuspiccousNames),
      );
    },
    [],
  );

  const kinddSuspiccousSetupRounds = useCallback(
    (kinddSuspiccousRounds: number) => {
      setKinddSuspiccousTotalRounds(kinddSuspiccousRounds);
    },
    [],
  );

  const kinddSuspiccousStartGame = useCallback(() => {
    setKinddSuspiccousCurrentRound(1);
    setKinddSuspiccousCurrentPlayerIndex(0);
    setKinddSuspiccousCurrentVoterIndex(0);
    setKinddSuspiccousCurrentCategory(null);
    setKinddSuspiccousCurrentSituation('');
    setKinddSuspiccousCurrentTurnVotes([]);
    setKinddSuspiccousUsedSituationKeys([]);
    setKinddSuspiccousGameFinished(false);
    kinddSuspiccousGameCountedRef.current = false;
    setKinddSuspiccousScores(
      kinddSuspiccousIdeasBuildScores(kinddSuspiccousPlayers),
    );
  }, [kinddSuspiccousPlayers]);

  const kinddSuspiccousPickCategory = useCallback(
    (kinddSuspiccousCategoryId: KinddSuspiccousIdeasPartyCategoryId) => {
      const kinddSuspiccousCategory = kinddSuspiccousIdeasPartyCategories.find(
        kinddSuspiccousItem =>
          kinddSuspiccousItem.kinddSuspiccousCategoryId ===
          kinddSuspiccousCategoryId,
      );
      if (!kinddSuspiccousCategory) {
        return;
      }

      const {kinddSuspiccousSituation, kinddSuspiccousKey} =
        kinddSuspiccousIdeasPickSituation(
          kinddSuspiccousCategory,
          kinddSuspiccousUsedSituationKeys,
        );

      setKinddSuspiccousCurrentCategory(kinddSuspiccousCategory);
      setKinddSuspiccousCurrentSituation(kinddSuspiccousSituation);
      setKinddSuspiccousUsedSituationKeys(kinddSuspiccousPrev => [
        ...kinddSuspiccousPrev,
        kinddSuspiccousKey,
      ]);
      setKinddSuspiccousCurrentTurnVotes([]);
      setKinddSuspiccousCurrentVoterIndex(0);
    },
    [kinddSuspiccousUsedSituationKeys],
  );

  const kinddSuspiccousAdvanceTurn = useCallback(() => {
    const kinddSuspiccousNextPlayerIndex =
      kinddSuspiccousCurrentPlayerIndex + 1;

    if (kinddSuspiccousNextPlayerIndex >= kinddSuspiccousPlayers.length) {
      const kinddSuspiccousNextRound = kinddSuspiccousCurrentRound + 1;
      if (kinddSuspiccousNextRound > kinddSuspiccousTotalRounds) {
        kinddSuspiccousFinishPartyGame();
        return;
      }
      setKinddSuspiccousCurrentRound(kinddSuspiccousNextRound);
      setKinddSuspiccousCurrentPlayerIndex(0);
    } else {
      setKinddSuspiccousCurrentPlayerIndex(kinddSuspiccousNextPlayerIndex);
    }

    setKinddSuspiccousCurrentCategory(null);
    setKinddSuspiccousCurrentSituation('');
    setKinddSuspiccousCurrentTurnVotes([]);
    setKinddSuspiccousCurrentVoterIndex(0);
  }, [
    kinddSuspiccousCurrentPlayerIndex,
    kinddSuspiccousCurrentRound,
    kinddSuspiccousFinishPartyGame,
    kinddSuspiccousPlayers.length,
    kinddSuspiccousTotalRounds,
  ]);

  const kinddSuspiccousSubmitVote = useCallback(
    (kinddSuspiccousPercent: number) => {
      const kinddSuspiccousDefenderIndex = kinddSuspiccousCurrentPlayerIndex;
      const kinddSuspiccousDefenderName =
        kinddSuspiccousPlayers[kinddSuspiccousDefenderIndex];
      const kinddSuspiccousUpdatedVotes = [
        ...kinddSuspiccousCurrentTurnVotes,
        kinddSuspiccousPercent,
      ];

      const kinddSuspiccousVoters = kinddSuspiccousPlayers.filter(
        (_, kinddSuspiccousIndex) =>
          kinddSuspiccousIndex !== kinddSuspiccousDefenderIndex,
      );

      if (kinddSuspiccousUpdatedVotes.length < kinddSuspiccousVoters.length) {
        setKinddSuspiccousCurrentTurnVotes(kinddSuspiccousUpdatedVotes);
        setKinddSuspiccousCurrentVoterIndex(
          kinddSuspiccousUpdatedVotes.length,
        );
        return false;
      }

      const kinddSuspiccousAverage = Math.round(
        kinddSuspiccousUpdatedVotes.reduce(
          (kinddSuspiccousSum, kinddSuspiccousVote) =>
            kinddSuspiccousSum + kinddSuspiccousVote,
          0,
        ) / kinddSuspiccousUpdatedVotes.length,
      );

      setKinddSuspiccousScores(kinddSuspiccousPrev =>
        kinddSuspiccousPrev.map(kinddSuspiccousItem => {
          if (
            kinddSuspiccousItem.kinddSuspiccousPlayerName !==
            kinddSuspiccousDefenderName
          ) {
            return kinddSuspiccousItem;
          }
          return {
            ...kinddSuspiccousItem,
            kinddSuspiccousTotalPoints:
              kinddSuspiccousItem.kinddSuspiccousTotalPoints +
              kinddSuspiccousAverage,
            kinddSuspiccousTurnCount:
              kinddSuspiccousItem.kinddSuspiccousTurnCount + 1,
            kinddSuspiccousVoteSum:
              kinddSuspiccousItem.kinddSuspiccousVoteSum +
              kinddSuspiccousAverage,
          };
        }),
      );

      const kinddSuspiccousIsLastTurn =
        kinddSuspiccousCurrentRound === kinddSuspiccousTotalRounds &&
        kinddSuspiccousCurrentPlayerIndex ===
          kinddSuspiccousPlayers.length - 1;

      if (kinddSuspiccousIsLastTurn) {
        kinddSuspiccousFinishPartyGame();
        return true;
      }

      kinddSuspiccousAdvanceTurn();
      return false;
    },
    [
      kinddSuspiccousAdvanceTurn,
      kinddSuspiccousCurrentPlayerIndex,
      kinddSuspiccousCurrentRound,
      kinddSuspiccousCurrentTurnVotes,
      kinddSuspiccousFinishPartyGame,
      kinddSuspiccousPlayers,
      kinddSuspiccousTotalRounds,
    ],
  );

  const kinddSuspiccousResetGame = useCallback(() => {
    setKinddSuspiccousPlayers(kinddSuspiccousIdeasDefaultPlayers);
    setKinddSuspiccousTotalRounds(3);
    setKinddSuspiccousCurrentRound(1);
    setKinddSuspiccousCurrentPlayerIndex(0);
    setKinddSuspiccousCurrentVoterIndex(0);
    setKinddSuspiccousCurrentCategory(null);
    setKinddSuspiccousCurrentSituation('');
    setKinddSuspiccousCurrentTurnVotes([]);
    setKinddSuspiccousUsedSituationKeys([]);
    setKinddSuspiccousGameFinished(false);
    kinddSuspiccousGameCountedRef.current = false;
    setKinddSuspiccousScores(
      kinddSuspiccousIdeasBuildScores(kinddSuspiccousIdeasDefaultPlayers),
    );
  }, []);

  const kinddSuspiccousCurrentPlayerName = useCallback(
    () => kinddSuspiccousPlayers[kinddSuspiccousCurrentPlayerIndex] ?? '',
    [kinddSuspiccousCurrentPlayerIndex, kinddSuspiccousPlayers],
  );

  const kinddSuspiccousCurrentDefenderName = useCallback(
    () => kinddSuspiccousPlayers[kinddSuspiccousCurrentPlayerIndex] ?? '',
    [kinddSuspiccousCurrentPlayerIndex, kinddSuspiccousPlayers],
  );

  const kinddSuspiccousVoterCount = useCallback(
    () => Math.max(kinddSuspiccousPlayers.length - 1, 1),
    [kinddSuspiccousPlayers.length],
  );

  const kinddSuspiccousIsGameOver = useCallback(
    () => kinddSuspiccousGameFinished,
    [kinddSuspiccousGameFinished],
  );

  const kinddSuspiccousValue = useMemo(
    () => ({
      kinddSuspiccousPlayers,
      kinddSuspiccousTotalRounds,
      kinddSuspiccousCurrentRound,
      kinddSuspiccousCurrentPlayerIndex,
      kinddSuspiccousCurrentVoterIndex,
      kinddSuspiccousCurrentCategory,
      kinddSuspiccousCurrentSituation,
      kinddSuspiccousCurrentTurnVotes,
      kinddSuspiccousScores,
      kinddSuspiccousUsedSituationKeys,
      kinddSuspiccousGameFinished,
      kinddSuspiccousGamesPlayedCount,
      kinddSuspiccousReloadGamesPlayedCount,
      kinddSuspiccousSetupPlayers,
      kinddSuspiccousSetupRounds,
      kinddSuspiccousStartGame,
      kinddSuspiccousPickCategory,
      kinddSuspiccousSubmitVote,
      kinddSuspiccousResetGame,
      kinddSuspiccousCurrentPlayerName,
      kinddSuspiccousCurrentDefenderName,
      kinddSuspiccousVoterCount,
      kinddSuspiccousIsGameOver,
    }),
    [
      kinddSuspiccousCurrentCategory,
      kinddSuspiccousCurrentPlayerIndex,
      kinddSuspiccousCurrentRound,
      kinddSuspiccousCurrentSituation,
      kinddSuspiccousCurrentTurnVotes,
      kinddSuspiccousCurrentVoterIndex,
      kinddSuspiccousCurrentDefenderName,
      kinddSuspiccousCurrentPlayerName,
      kinddSuspiccousIsGameOver,
      kinddSuspiccousPickCategory,
      kinddSuspiccousPlayers,
      kinddSuspiccousResetGame,
      kinddSuspiccousScores,
      kinddSuspiccousSetupPlayers,
      kinddSuspiccousSetupRounds,
      kinddSuspiccousStartGame,
      kinddSuspiccousSubmitVote,
      kinddSuspiccousTotalRounds,
      kinddSuspiccousUsedSituationKeys,
      kinddSuspiccousGameFinished,
      kinddSuspiccousGamesPlayedCount,
      kinddSuspiccousReloadGamesPlayedCount,
      kinddSuspiccousVoterCount,
    ],
  );

  return (
    <KinddSuspiccousIdeasPartyContext.Provider value={kinddSuspiccousValue}>
      {children}
    </KinddSuspiccousIdeasPartyContext.Provider>
  );
}

export function useKinddSuspiccousIdeasParty() {
  const kinddSuspiccousContext = useContext(KinddSuspiccousIdeasPartyContext);
  if (!kinddSuspiccousContext) {
    throw new Error(
      'useKinddSuspiccousIdeasParty must be used within KinddSuspiccousIdeasPartyProvider',
    );
  }
  return kinddSuspiccousContext;
}

export {kinddSuspiccousIdeasPartyCategories};
