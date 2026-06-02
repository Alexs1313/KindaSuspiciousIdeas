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
  incrementPartySessionsCount,
  loadPartySessionsCount,
} from '../storage/partyStatsStorage';

export type PartyGuestScore = {
  guestName: string;
  totalPoints: number;
  turnCount: number;
  voteSum: number;
};

type PartyState = {
  guests: string[];
  totalRounds: number;
  currentRound: number;
  currentGuestIndex: number;
  currentVoterIndex: number;
  currentCategory: PartyCategory | null;
  currentSituation: string;
  currentTurnVotes: number[];
  scores: PartyGuestScore[];
  usedSituationKeys: string[];
  partyFinished: boolean;
  partySessionsCount: number;
  reloadPartySessionsCount: () => Promise<number>;
  setupGuests: (names: string[]) => void;
  setupRounds: (rounds: number) => void;
  startParty: () => void;
  pickCategory: (
    categoryId: PartyCategoryId,
  ) => void;
  submitVote: (percent: number) => boolean;
  resetParty: () => void;
  currentGuestName: () => string;
  currentDefenderName: () => string;
  voterCount: () => number;
  isPartyComplete: () => boolean;
};

const PartyContext =
  createContext<PartyState | null>(null);

const DEFAULT_GUESTS = ['Guest 1', 'Guest 2', 'Guest 3'];

function buildScores(
  names: string[],
): PartyGuestScore[] {
  return names.map(name => ({
    guestName: name,
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
  const [guests, setGuests] = useState(
    DEFAULT_GUESTS,
  );
  const [totalRounds, setTotalRounds] =
    useState(3);
  const [currentRound, setCurrentRound] =
    useState(1);
  const [currentGuestIndex, setCurrentGuestIndex] =
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
    PartyGuestScore[]
  >(() => buildScores(DEFAULT_GUESTS));
  const [usedSituationKeys, setUsedSituationKeys] =
    useState<string[]>([]);
  const [partyFinished, setPartyFinished] =
    useState(false);
  const [partySessionsCount, setPartySessionsCount] =
    useState(0);
  const sessionCountedRef = useRef(false);

  const reloadPartySessionsCount = useCallback(async () => {
    const count = await loadPartySessionsCount();
    setPartySessionsCount(count);
    return count;
  }, []);

  useEffect(() => {
    void reloadPartySessionsCount();
  }, [reloadPartySessionsCount]);

  const finishParty = useCallback(() => {
    setCurrentCategory(null);
    setCurrentSituation('');
    setCurrentTurnVotes([]);
    setPartyFinished(true);

    if (sessionCountedRef.current) {
      return;
    }
    sessionCountedRef.current = true;

    void incrementPartySessionsCount().then(
      next => {
        setPartySessionsCount(next);
      },
    );
  }, []);

  const setupGuests = useCallback(
    (names: string[]) => {
      setGuests(names);
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

  const startParty = useCallback(() => {
    setCurrentRound(1);
    setCurrentGuestIndex(0);
    setCurrentVoterIndex(0);
    setCurrentCategory(null);
    setCurrentSituation('');
    setCurrentTurnVotes([]);
    setUsedSituationKeys([]);
    setPartyFinished(false);
    sessionCountedRef.current = false;
    setScores(
      buildScores(guests),
    );
  }, [guests]);

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
    const nextGuestIndex =
      currentGuestIndex + 1;

    if (nextGuestIndex >= guests.length) {
      const nextRound = currentRound + 1;
      if (nextRound > totalRounds) {
        finishParty();
        return;
      }
      setCurrentRound(nextRound);
      setCurrentGuestIndex(0);
    } else {
      setCurrentGuestIndex(nextGuestIndex);
    }

    setCurrentCategory(null);
    setCurrentSituation('');
    setCurrentTurnVotes([]);
    setCurrentVoterIndex(0);
  }, [
    currentGuestIndex,
    currentRound,
    finishParty,
    guests.length,
    totalRounds,
  ]);

  const submitVote = useCallback(
    (percent: number) => {
      const defenderIndex = currentGuestIndex;
      const defenderName =
        guests[defenderIndex];
      const updatedVotes = [
        ...currentTurnVotes,
        percent,
      ];

      const voters = guests.filter(
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
            item.guestName !==
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
        currentGuestIndex ===
          guests.length - 1;

      if (isLastTurn) {
        finishParty();
        return true;
      }

      advanceTurn();
      return false;
    },
    [
      advanceTurn,
      currentGuestIndex,
      currentRound,
      currentTurnVotes,
      finishParty,
      guests,
      totalRounds,
    ],
  );

  const resetParty = useCallback(() => {
    setGuests(DEFAULT_GUESTS);
    setTotalRounds(3);
    setCurrentRound(1);
    setCurrentGuestIndex(0);
    setCurrentVoterIndex(0);
    setCurrentCategory(null);
    setCurrentSituation('');
    setCurrentTurnVotes([]);
    setUsedSituationKeys([]);
    setPartyFinished(false);
    sessionCountedRef.current = false;
    setScores(
      buildScores(DEFAULT_GUESTS),
    );
  }, []);

  const currentGuestName = useCallback(
    () => guests[currentGuestIndex] ?? '',
    [currentGuestIndex, guests],
  );

  const currentDefenderName = useCallback(
    () => guests[currentGuestIndex] ?? '',
    [currentGuestIndex, guests],
  );

  const voterCount = useCallback(
    () => Math.max(guests.length - 1, 1),
    [guests.length],
  );

  const isPartyComplete = useCallback(
    () => partyFinished,
    [partyFinished],
  );

  const value = useMemo(
    () => ({
      guests,
      totalRounds,
      currentRound,
      currentGuestIndex,
      currentVoterIndex,
      currentCategory,
      currentSituation,
      currentTurnVotes,
      scores,
      usedSituationKeys,
      partyFinished,
      partySessionsCount,
      reloadPartySessionsCount,
      setupGuests,
      setupRounds,
      startParty,
      pickCategory,
      submitVote,
      resetParty,
      currentGuestName,
      currentDefenderName,
      voterCount,
      isPartyComplete,
    }),
    [
      currentCategory,
      currentGuestIndex,
      currentRound,
      currentSituation,
      currentTurnVotes,
      currentVoterIndex,
      currentDefenderName,
      currentGuestName,
      isPartyComplete,
      pickCategory,
      guests,
      resetParty,
      scores,
      setupGuests,
      setupRounds,
      startParty,
      submitVote,
      totalRounds,
      usedSituationKeys,
      partyFinished,
      partySessionsCount,
      reloadPartySessionsCount,
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
