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
  suspiciouskinddaIdeasPartyCategories,
  type SuspiciouskinddaIdeasPartyCategory,
  type SuspiciouskinddaIdeasPartyCategoryId,
} from './SuspiciouskinddaIdeaspartyData';
import {
  suspiciouskinddaIdeasIncrementGamesPlayed,
  suspiciouskinddaIdeasLoadGamesPlayed,
} from './SuspiciouskinddaIdeasgameStatsStorage';

export type SuspiciouskinddaIdeasPartyPlayerScore = {
  suspiciouskinddaPlayerName: string;
  suspiciouskinddaTotalPoints: number;
  suspiciouskinddaTurnCount: number;
  suspiciouskinddaVoteSum: number;
};

type SuspiciouskinddaIdeasPartyState = {
  suspiciouskinddaPlayers: string[];
  suspiciouskinddaTotalRounds: number;
  suspiciouskinddaCurrentRound: number;
  suspiciouskinddaCurrentPlayerIndex: number;
  suspiciouskinddaCurrentVoterIndex: number;
  suspiciouskinddaCurrentCategory: SuspiciouskinddaIdeasPartyCategory | null;
  suspiciouskinddaCurrentSituation: string;
  suspiciouskinddaCurrentTurnVotes: number[];
  suspiciouskinddaScores: SuspiciouskinddaIdeasPartyPlayerScore[];
  suspiciouskinddaUsedSituationKeys: string[];
  suspiciouskinddaGameFinished: boolean;
  suspiciouskinddaGamesPlayedCount: number;
  suspiciouskinddaReloadGamesPlayedCount: () => Promise<number>;
  suspiciouskinddaSetupPlayers: (suspiciouskinddaNames: string[]) => void;
  suspiciouskinddaSetupRounds: (suspiciouskinddaRounds: number) => void;
  suspiciouskinddaStartGame: () => void;
  suspiciouskinddaPickCategory: (
    suspiciouskinddaCategoryId: SuspiciouskinddaIdeasPartyCategoryId,
  ) => void;
  suspiciouskinddaSubmitVote: (suspiciouskinddaPercent: number) => boolean;
  suspiciouskinddaResetGame: () => void;
  suspiciouskinddaCurrentPlayerName: () => string;
  suspiciouskinddaCurrentDefenderName: () => string;
  suspiciouskinddaVoterCount: () => number;
  suspiciouskinddaIsGameOver: () => boolean;
};

const SuspiciouskinddaIdeasPartyContext =
  createContext<SuspiciouskinddaIdeasPartyState | null>(null);

const suspiciouskinddaIdeasDefaultPlayers = ['Guest 1', 'Guest 2', 'Guest 3'];

function suspiciouskinddaIdeasBuildScores(
  suspiciouskinddaNames: string[],
): SuspiciouskinddaIdeasPartyPlayerScore[] {
  return suspiciouskinddaNames.map(suspiciouskinddaName => ({
    suspiciouskinddaPlayerName: suspiciouskinddaName,
    suspiciouskinddaTotalPoints: 0,
    suspiciouskinddaTurnCount: 0,
    suspiciouskinddaVoteSum: 0,
  }));
}

function suspiciouskinddaIdeasPickSituation(
  suspiciouskinddaCategory: SuspiciouskinddaIdeasPartyCategory,
  suspiciouskinddaUsedKeys: string[],
): {suspiciouskinddaSituation: string; suspiciouskinddaKey: string} {
  const suspiciouskinddaAvailable = suspiciouskinddaCategory.suspiciouskinddaSituations
    .map((suspiciouskinddaText, suspiciouskinddaIndex) => ({
      suspiciouskinddaText,
      suspiciouskinddaKey: `${suspiciouskinddaCategory.suspiciouskinddaCategoryId}-${suspiciouskinddaIndex}`,
    }))
    .filter(
      suspiciouskinddaItem =>
        !suspiciouskinddaUsedKeys.includes(suspiciouskinddaItem.suspiciouskinddaKey),
    );

  const suspiciouskinddaPool =
    suspiciouskinddaAvailable.length > 0
      ? suspiciouskinddaAvailable
      : suspiciouskinddaCategory.suspiciouskinddaSituations.map(
          (suspiciouskinddaText, suspiciouskinddaIndex) => ({
            suspiciouskinddaText,
            suspiciouskinddaKey: `${suspiciouskinddaCategory.suspiciouskinddaCategoryId}-${suspiciouskinddaIndex}`,
          }),
        );

  const suspiciouskinddaPick =
    suspiciouskinddaPool[
      Math.floor(Math.random() * suspiciouskinddaPool.length)
    ];

  return {
    suspiciouskinddaSituation: suspiciouskinddaPick.suspiciouskinddaText,
    suspiciouskinddaKey: suspiciouskinddaPick.suspiciouskinddaKey,
  };
}

export function SuspiciouskinddaIdeasPartyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [suspiciouskinddaPlayers, setSuspiciouskinddaPlayers] = useState(
    suspiciouskinddaIdeasDefaultPlayers,
  );
  const [suspiciouskinddaTotalRounds, setSuspiciouskinddaTotalRounds] =
    useState(3);
  const [suspiciouskinddaCurrentRound, setSuspiciouskinddaCurrentRound] =
    useState(1);
  const [suspiciouskinddaCurrentPlayerIndex, setSuspiciouskinddaCurrentPlayerIndex] =
    useState(0);
  const [suspiciouskinddaCurrentVoterIndex, setSuspiciouskinddaCurrentVoterIndex] =
    useState(0);
  const [suspiciouskinddaCurrentCategory, setSuspiciouskinddaCurrentCategory] =
    useState<SuspiciouskinddaIdeasPartyCategory | null>(null);
  const [suspiciouskinddaCurrentSituation, setSuspiciouskinddaCurrentSituation] =
    useState('');
  const [suspiciouskinddaCurrentTurnVotes, setSuspiciouskinddaCurrentTurnVotes] =
    useState<number[]>([]);
  const [suspiciouskinddaScores, setSuspiciouskinddaScores] = useState<
    SuspiciouskinddaIdeasPartyPlayerScore[]
  >(() => suspiciouskinddaIdeasBuildScores(suspiciouskinddaIdeasDefaultPlayers));
  const [suspiciouskinddaUsedSituationKeys, setSuspiciouskinddaUsedSituationKeys] =
    useState<string[]>([]);
  const [suspiciouskinddaGameFinished, setSuspiciouskinddaGameFinished] =
    useState(false);
  const [suspiciouskinddaGamesPlayedCount, setSuspiciouskinddaGamesPlayedCount] =
    useState(0);
  const suspiciouskinddaGameCountedRef = useRef(false);

  const suspiciouskinddaReloadGamesPlayedCount = useCallback(async () => {
    const suspiciouskinddaCount = await suspiciouskinddaIdeasLoadGamesPlayed();
    setSuspiciouskinddaGamesPlayedCount(suspiciouskinddaCount);
    return suspiciouskinddaCount;
  }, []);

  useEffect(() => {
    void suspiciouskinddaReloadGamesPlayedCount();
  }, [suspiciouskinddaReloadGamesPlayedCount]);

  const suspiciouskinddaFinishPartyGame = useCallback(() => {
    setSuspiciouskinddaCurrentCategory(null);
    setSuspiciouskinddaCurrentSituation('');
    setSuspiciouskinddaCurrentTurnVotes([]);
    setSuspiciouskinddaGameFinished(true);

    if (suspiciouskinddaGameCountedRef.current) {
      return;
    }
    suspiciouskinddaGameCountedRef.current = true;

    void suspiciouskinddaIdeasIncrementGamesPlayed().then(
      suspiciouskinddaNext => {
        setSuspiciouskinddaGamesPlayedCount(suspiciouskinddaNext);
      },
    );
  }, []);

  const suspiciouskinddaSetupPlayers = useCallback(
    (suspiciouskinddaNames: string[]) => {
      setSuspiciouskinddaPlayers(suspiciouskinddaNames);
      setSuspiciouskinddaScores(
        suspiciouskinddaIdeasBuildScores(suspiciouskinddaNames),
      );
    },
    [],
  );

  const suspiciouskinddaSetupRounds = useCallback(
    (suspiciouskinddaRounds: number) => {
      setSuspiciouskinddaTotalRounds(suspiciouskinddaRounds);
    },
    [],
  );

  const suspiciouskinddaStartGame = useCallback(() => {
    setSuspiciouskinddaCurrentRound(1);
    setSuspiciouskinddaCurrentPlayerIndex(0);
    setSuspiciouskinddaCurrentVoterIndex(0);
    setSuspiciouskinddaCurrentCategory(null);
    setSuspiciouskinddaCurrentSituation('');
    setSuspiciouskinddaCurrentTurnVotes([]);
    setSuspiciouskinddaUsedSituationKeys([]);
    setSuspiciouskinddaGameFinished(false);
    suspiciouskinddaGameCountedRef.current = false;
    setSuspiciouskinddaScores(
      suspiciouskinddaIdeasBuildScores(suspiciouskinddaPlayers),
    );
  }, [suspiciouskinddaPlayers]);

  const suspiciouskinddaPickCategory = useCallback(
    (suspiciouskinddaCategoryId: SuspiciouskinddaIdeasPartyCategoryId) => {
      const suspiciouskinddaCategory = suspiciouskinddaIdeasPartyCategories.find(
        suspiciouskinddaItem =>
          suspiciouskinddaItem.suspiciouskinddaCategoryId ===
          suspiciouskinddaCategoryId,
      );
      if (!suspiciouskinddaCategory) {
        return;
      }

      const {suspiciouskinddaSituation, suspiciouskinddaKey} =
        suspiciouskinddaIdeasPickSituation(
          suspiciouskinddaCategory,
          suspiciouskinddaUsedSituationKeys,
        );

      setSuspiciouskinddaCurrentCategory(suspiciouskinddaCategory);
      setSuspiciouskinddaCurrentSituation(suspiciouskinddaSituation);
      setSuspiciouskinddaUsedSituationKeys(suspiciouskinddaPrev => [
        ...suspiciouskinddaPrev,
        suspiciouskinddaKey,
      ]);
      setSuspiciouskinddaCurrentTurnVotes([]);
      setSuspiciouskinddaCurrentVoterIndex(0);
    },
    [suspiciouskinddaUsedSituationKeys],
  );

  const suspiciouskinddaAdvanceTurn = useCallback(() => {
    const suspiciouskinddaNextPlayerIndex =
      suspiciouskinddaCurrentPlayerIndex + 1;

    if (suspiciouskinddaNextPlayerIndex >= suspiciouskinddaPlayers.length) {
      const suspiciouskinddaNextRound = suspiciouskinddaCurrentRound + 1;
      if (suspiciouskinddaNextRound > suspiciouskinddaTotalRounds) {
        suspiciouskinddaFinishPartyGame();
        return;
      }
      setSuspiciouskinddaCurrentRound(suspiciouskinddaNextRound);
      setSuspiciouskinddaCurrentPlayerIndex(0);
    } else {
      setSuspiciouskinddaCurrentPlayerIndex(suspiciouskinddaNextPlayerIndex);
    }

    setSuspiciouskinddaCurrentCategory(null);
    setSuspiciouskinddaCurrentSituation('');
    setSuspiciouskinddaCurrentTurnVotes([]);
    setSuspiciouskinddaCurrentVoterIndex(0);
  }, [
    suspiciouskinddaCurrentPlayerIndex,
    suspiciouskinddaCurrentRound,
    suspiciouskinddaFinishPartyGame,
    suspiciouskinddaPlayers.length,
    suspiciouskinddaTotalRounds,
  ]);

  const suspiciouskinddaSubmitVote = useCallback(
    (suspiciouskinddaPercent: number) => {
      const suspiciouskinddaDefenderIndex = suspiciouskinddaCurrentPlayerIndex;
      const suspiciouskinddaDefenderName =
        suspiciouskinddaPlayers[suspiciouskinddaDefenderIndex];
      const suspiciouskinddaUpdatedVotes = [
        ...suspiciouskinddaCurrentTurnVotes,
        suspiciouskinddaPercent,
      ];

      const suspiciouskinddaVoters = suspiciouskinddaPlayers.filter(
        (_, suspiciouskinddaIndex) =>
          suspiciouskinddaIndex !== suspiciouskinddaDefenderIndex,
      );

      if (suspiciouskinddaUpdatedVotes.length < suspiciouskinddaVoters.length) {
        setSuspiciouskinddaCurrentTurnVotes(suspiciouskinddaUpdatedVotes);
        setSuspiciouskinddaCurrentVoterIndex(
          suspiciouskinddaUpdatedVotes.length,
        );
        return false;
      }

      const suspiciouskinddaAverage = Math.round(
        suspiciouskinddaUpdatedVotes.reduce(
          (suspiciouskinddaSum, suspiciouskinddaVote) =>
            suspiciouskinddaSum + suspiciouskinddaVote,
          0,
        ) / suspiciouskinddaUpdatedVotes.length,
      );

      setSuspiciouskinddaScores(suspiciouskinddaPrev =>
        suspiciouskinddaPrev.map(suspiciouskinddaItem => {
          if (
            suspiciouskinddaItem.suspiciouskinddaPlayerName !==
            suspiciouskinddaDefenderName
          ) {
            return suspiciouskinddaItem;
          }
          return {
            ...suspiciouskinddaItem,
            suspiciouskinddaTotalPoints:
              suspiciouskinddaItem.suspiciouskinddaTotalPoints +
              suspiciouskinddaAverage,
            suspiciouskinddaTurnCount:
              suspiciouskinddaItem.suspiciouskinddaTurnCount + 1,
            suspiciouskinddaVoteSum:
              suspiciouskinddaItem.suspiciouskinddaVoteSum +
              suspiciouskinddaAverage,
          };
        }),
      );

      const suspiciouskinddaIsLastTurn =
        suspiciouskinddaCurrentRound === suspiciouskinddaTotalRounds &&
        suspiciouskinddaCurrentPlayerIndex ===
          suspiciouskinddaPlayers.length - 1;

      if (suspiciouskinddaIsLastTurn) {
        suspiciouskinddaFinishPartyGame();
        return true;
      }

      suspiciouskinddaAdvanceTurn();
      return false;
    },
    [
      suspiciouskinddaAdvanceTurn,
      suspiciouskinddaCurrentPlayerIndex,
      suspiciouskinddaCurrentRound,
      suspiciouskinddaCurrentTurnVotes,
      suspiciouskinddaFinishPartyGame,
      suspiciouskinddaPlayers,
      suspiciouskinddaTotalRounds,
    ],
  );

  const suspiciouskinddaResetGame = useCallback(() => {
    setSuspiciouskinddaPlayers(suspiciouskinddaIdeasDefaultPlayers);
    setSuspiciouskinddaTotalRounds(3);
    setSuspiciouskinddaCurrentRound(1);
    setSuspiciouskinddaCurrentPlayerIndex(0);
    setSuspiciouskinddaCurrentVoterIndex(0);
    setSuspiciouskinddaCurrentCategory(null);
    setSuspiciouskinddaCurrentSituation('');
    setSuspiciouskinddaCurrentTurnVotes([]);
    setSuspiciouskinddaUsedSituationKeys([]);
    setSuspiciouskinddaGameFinished(false);
    suspiciouskinddaGameCountedRef.current = false;
    setSuspiciouskinddaScores(
      suspiciouskinddaIdeasBuildScores(suspiciouskinddaIdeasDefaultPlayers),
    );
  }, []);

  const suspiciouskinddaCurrentPlayerName = useCallback(
    () => suspiciouskinddaPlayers[suspiciouskinddaCurrentPlayerIndex] ?? '',
    [suspiciouskinddaCurrentPlayerIndex, suspiciouskinddaPlayers],
  );

  const suspiciouskinddaCurrentDefenderName = useCallback(
    () => suspiciouskinddaPlayers[suspiciouskinddaCurrentPlayerIndex] ?? '',
    [suspiciouskinddaCurrentPlayerIndex, suspiciouskinddaPlayers],
  );

  const suspiciouskinddaVoterCount = useCallback(
    () => Math.max(suspiciouskinddaPlayers.length - 1, 1),
    [suspiciouskinddaPlayers.length],
  );

  const suspiciouskinddaIsGameOver = useCallback(
    () => suspiciouskinddaGameFinished,
    [suspiciouskinddaGameFinished],
  );

  const suspiciouskinddaValue = useMemo(
    () => ({
      suspiciouskinddaPlayers,
      suspiciouskinddaTotalRounds,
      suspiciouskinddaCurrentRound,
      suspiciouskinddaCurrentPlayerIndex,
      suspiciouskinddaCurrentVoterIndex,
      suspiciouskinddaCurrentCategory,
      suspiciouskinddaCurrentSituation,
      suspiciouskinddaCurrentTurnVotes,
      suspiciouskinddaScores,
      suspiciouskinddaUsedSituationKeys,
      suspiciouskinddaGameFinished,
      suspiciouskinddaGamesPlayedCount,
      suspiciouskinddaReloadGamesPlayedCount,
      suspiciouskinddaSetupPlayers,
      suspiciouskinddaSetupRounds,
      suspiciouskinddaStartGame,
      suspiciouskinddaPickCategory,
      suspiciouskinddaSubmitVote,
      suspiciouskinddaResetGame,
      suspiciouskinddaCurrentPlayerName,
      suspiciouskinddaCurrentDefenderName,
      suspiciouskinddaVoterCount,
      suspiciouskinddaIsGameOver,
    }),
    [
      suspiciouskinddaCurrentCategory,
      suspiciouskinddaCurrentPlayerIndex,
      suspiciouskinddaCurrentRound,
      suspiciouskinddaCurrentSituation,
      suspiciouskinddaCurrentTurnVotes,
      suspiciouskinddaCurrentVoterIndex,
      suspiciouskinddaCurrentDefenderName,
      suspiciouskinddaCurrentPlayerName,
      suspiciouskinddaIsGameOver,
      suspiciouskinddaPickCategory,
      suspiciouskinddaPlayers,
      suspiciouskinddaResetGame,
      suspiciouskinddaScores,
      suspiciouskinddaSetupPlayers,
      suspiciouskinddaSetupRounds,
      suspiciouskinddaStartGame,
      suspiciouskinddaSubmitVote,
      suspiciouskinddaTotalRounds,
      suspiciouskinddaUsedSituationKeys,
      suspiciouskinddaGameFinished,
      suspiciouskinddaGamesPlayedCount,
      suspiciouskinddaReloadGamesPlayedCount,
      suspiciouskinddaVoterCount,
    ],
  );

  return (
    <SuspiciouskinddaIdeasPartyContext.Provider value={suspiciouskinddaValue}>
      {children}
    </SuspiciouskinddaIdeasPartyContext.Provider>
  );
}

export function useSuspiciouskinddaIdeasParty() {
  const suspiciouskinddaContext = useContext(SuspiciouskinddaIdeasPartyContext);
  if (!suspiciouskinddaContext) {
    throw new Error(
      'useSuspiciouskinddaIdeasParty must be used within SuspiciouskinddaIdeasPartyProvider',
    );
  }
  return suspiciouskinddaContext;
}

export {suspiciouskinddaIdeasPartyCategories};
