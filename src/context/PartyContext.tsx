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
  partyCategories,
  type PartyCategory,
  type PartyCategoryId,
} from '../data/partyCategories';
import {
  incrementGamesPlayed,
  loadGamesPlayed,
} from '../storage/gameStatsStorage';

export type PartyPlayerScore = {
  playerName: string;
  totalPoints: number;
  turnCount: number;
  voteSum: number;
};

type PartyState = {
  players: string[];
  totalRounds: number;
  currentRound: number;
  currentPlayerIndex: number;
  currentVoterIndex: number;
  currentCategory: PartyCategory | null;
  currentSituation: string;
  currentTurnVotes: number[];
  scores: PartyPlayerScore[];
  usedSituationKeys: string[];
  gameFinished: boolean;
  gamesPlayedCount: number;
  reloadGamesPlayedCount: () => Promise<number>;
  setupPlayers: (names: string[]) => void;
  setupRounds: (rounds: number) => void;
  startGame: () => void;
  pickCategory: (
    categoryId: PartyCategoryId,
  ) => void;
  submitVote: (percent: number) => boolean;
  resetGame: () => void;
  currentPlayerName: () => string;
  currentDefenderName: () => string;
  voterCount: () => number;
  isGameOver: () => boolean;
};

const PartyContext =
  createContext<PartyState | null>(null);

const DEFAULT_PLAYERS = ['Guest 1', 'Guest 2', 'Guest 3'];

function buildScores(
  names: string[],
): PartyPlayerScore[] {
  return names.map(name => ({
    playerName: name,
    totalPoints: 0,
    turnCount: 0,
    voteSum: 0,
  }));
}

function pickSituation(
  category: PartyCategory,
  usedKeys: string[],
): {situation: string; key: string} {
  const available = category.situations
    .map((text, index) => ({
      text,
      key: `${category.categoryId}-${index}`,
    }))
    .filter(
      item =>
        !usedKeys.includes(item.key),
    );

  const pool =
    available.length > 0
      ? available
      : category.situations.map(
          (text, index) => ({
            text,
            key: `${category.categoryId}-${index}`,
          }),
        );

  const pick =
    pool[
      Math.floor(Math.random() * pool.length)
    ];

  return {
    situation: pick.text,
    key: pick.key,
  };
}

export function PartyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [players, setPlayers] = useState(
    DEFAULT_PLAYERS,
  );
  const [totalRounds, setTotalRounds] =
    useState(3);
  const [currentRound, setCurrentRound] =
    useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] =
    useState(0);
  const [currentVoterIndex, setCurrentVoterIndex] =
    useState(0);
  const [currentCategory, setCurrentCategory] =
    useState<PartyCategory | null>(null);
  const [currentSituation, setCurrentSituation] =
    useState('');
  const [currentTurnVotes, setCurrentTurnVotes] =
    useState<number[]>([]);
  const [scores, setScores] = useState<
    PartyPlayerScore[]
  >(() => buildScores(DEFAULT_PLAYERS));
  const [usedSituationKeys, setUsedSituationKeys] =
    useState<string[]>([]);
  const [gameFinished, setGameFinished] =
    useState(false);
  const [gamesPlayedCount, setGamesPlayedCount] =
    useState(0);
  const gameCountedRef = useRef(false);

  const reloadGamesPlayedCount = useCallback(async () => {
    const count = await loadGamesPlayed();
    setGamesPlayedCount(count);
    return count;
  }, []);

  useEffect(() => {
    void reloadGamesPlayedCount();
  }, [reloadGamesPlayedCount]);

  const finishPartyGame = useCallback(() => {
    setCurrentCategory(null);
    setCurrentSituation('');
    setCurrentTurnVotes([]);
    setGameFinished(true);

    if (gameCountedRef.current) {
      return;
    }
    gameCountedRef.current = true;

    void incrementGamesPlayed().then(
      next => {
        setGamesPlayedCount(next);
      },
    );
  }, []);

  const setupPlayers = useCallback(
    (names: string[]) => {
      setPlayers(names);
      setScores(
        buildScores(names),
      );
    },
    [],
  );

  const setupRounds = useCallback(
    (rounds: number) => {
      setTotalRounds(rounds);
    },
    [],
  );

  const startGame = useCallback(() => {
    setCurrentRound(1);
    setCurrentPlayerIndex(0);
    setCurrentVoterIndex(0);
    setCurrentCategory(null);
    setCurrentSituation('');
    setCurrentTurnVotes([]);
    setUsedSituationKeys([]);
    setGameFinished(false);
    gameCountedRef.current = false;
    setScores(
      buildScores(players),
    );
  }, [players]);

  const pickCategory = useCallback(
    (categoryId: PartyCategoryId) => {
      const category = partyCategories.find(
        item =>
          item.categoryId ===
          categoryId,
      );
      if (!category) {
        return;
      }

      const {situation, key} =
        pickSituation(
          category,
          usedSituationKeys,
        );

      setCurrentCategory(category);
      setCurrentSituation(situation);
      setUsedSituationKeys(prev => [
        ...prev,
        key,
      ]);
      setCurrentTurnVotes([]);
      setCurrentVoterIndex(0);
    },
    [usedSituationKeys],
  );

  const advanceTurn = useCallback(() => {
    const nextPlayerIndex =
      currentPlayerIndex + 1;

    if (nextPlayerIndex >= players.length) {
      const nextRound = currentRound + 1;
      if (nextRound > totalRounds) {
        finishPartyGame();
        return;
      }
      setCurrentRound(nextRound);
      setCurrentPlayerIndex(0);
    } else {
      setCurrentPlayerIndex(nextPlayerIndex);
    }

    setCurrentCategory(null);
    setCurrentSituation('');
    setCurrentTurnVotes([]);
    setCurrentVoterIndex(0);
  }, [
    currentPlayerIndex,
    currentRound,
    finishPartyGame,
    players.length,
    totalRounds,
  ]);

  const submitVote = useCallback(
    (percent: number) => {
      const defenderIndex = currentPlayerIndex;
      const defenderName =
        players[defenderIndex];
      const updatedVotes = [
        ...currentTurnVotes,
        percent,
      ];

      const voters = players.filter(
        (_, index) =>
          index !== defenderIndex,
      );

      if (updatedVotes.length < voters.length) {
        setCurrentTurnVotes(updatedVotes);
        setCurrentVoterIndex(
          updatedVotes.length,
        );
        return false;
      }

      const average = Math.round(
        updatedVotes.reduce(
          (sum, vote) =>
            sum + vote,
          0,
        ) / updatedVotes.length,
      );

      setScores(prev =>
        prev.map(item => {
          if (
            item.playerName !==
            defenderName
          ) {
            return item;
          }
          return {
            ...item,
            totalPoints:
              item.totalPoints +
              average,
            turnCount:
              item.turnCount + 1,
            voteSum:
              item.voteSum +
              average,
          };
        }),
      );

      const isLastTurn =
        currentRound === totalRounds &&
        currentPlayerIndex ===
          players.length - 1;

      if (isLastTurn) {
        finishPartyGame();
        return true;
      }

      advanceTurn();
      return false;
    },
    [
      advanceTurn,
      currentPlayerIndex,
      currentRound,
      currentTurnVotes,
      finishPartyGame,
      players,
      totalRounds,
    ],
  );

  const resetGame = useCallback(() => {
    setPlayers(DEFAULT_PLAYERS);
    setTotalRounds(3);
    setCurrentRound(1);
    setCurrentPlayerIndex(0);
    setCurrentVoterIndex(0);
    setCurrentCategory(null);
    setCurrentSituation('');
    setCurrentTurnVotes([]);
    setUsedSituationKeys([]);
    setGameFinished(false);
    gameCountedRef.current = false;
    setScores(
      buildScores(DEFAULT_PLAYERS),
    );
  }, []);

  const currentPlayerName = useCallback(
    () => players[currentPlayerIndex] ?? '',
    [currentPlayerIndex, players],
  );

  const currentDefenderName = useCallback(
    () => players[currentPlayerIndex] ?? '',
    [currentPlayerIndex, players],
  );

  const voterCount = useCallback(
    () => Math.max(players.length - 1, 1),
    [players.length],
  );

  const isGameOver = useCallback(
    () => gameFinished,
    [gameFinished],
  );

  const value = useMemo(
    () => ({
      players,
      totalRounds,
      currentRound,
      currentPlayerIndex,
      currentVoterIndex,
      currentCategory,
      currentSituation,
      currentTurnVotes,
      scores,
      usedSituationKeys,
      gameFinished,
      gamesPlayedCount,
      reloadGamesPlayedCount,
      setupPlayers,
      setupRounds,
      startGame,
      pickCategory,
      submitVote,
      resetGame,
      currentPlayerName,
      currentDefenderName,
      voterCount,
      isGameOver,
    }),
    [
      currentCategory,
      currentPlayerIndex,
      currentRound,
      currentSituation,
      currentTurnVotes,
      currentVoterIndex,
      currentDefenderName,
      currentPlayerName,
      isGameOver,
      pickCategory,
      players,
      resetGame,
      scores,
      setupPlayers,
      setupRounds,
      startGame,
      submitVote,
      totalRounds,
      usedSituationKeys,
      gameFinished,
      gamesPlayedCount,
      reloadGamesPlayedCount,
      voterCount,
    ],
  );

  return (
    <PartyContext.Provider value={value}>
      {children}
    </PartyContext.Provider>
  );
}

export function useParty() {
  const context = useContext(PartyContext);
  if (!context) {
    throw new Error(
      'useParty must be used within PartyProvider',
    );
  }
  return context;
}

export {partyCategories};
