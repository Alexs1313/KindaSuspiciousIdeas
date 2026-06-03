import type {
  NoteSuspCase,
  NoteSuspCaseProgress,
  NoteSuspVerdict,
} from '../noteSuspCtx/NoteSuspCasesContext';

const noteSuspAccuracyForVerdict = (
  cases: NoteSuspCase[],
  progressById: Record<string, NoteSuspCaseProgress>,
  targetVerdict: NoteSuspVerdict,
) => {
  const matchingCases = cases.filter(
    item =>
      item.verdict ===
      targetVerdict,
  );

  const solvedMatching = matchingCases.filter(
    item =>
      progressById[item.caseId]
        ?.isSolved,
  );

  if (solvedMatching.length === 0) {
    return 0;
  }

  const correctCount = solvedMatching.filter(
    item => {
      const progress =
        progressById[item.caseId];
      return (
        progress?.yourVerdict ===
        item.verdict
      );
    },
  ).length;

  return Math.round(
    (correctCount / solvedMatching.length) * 100,
  );
};

export const noteSuspBuildSettingsStats = (
  cases: NoteSuspCase[],
  progressById: Record<string, NoteSuspCaseProgress>,
) => {
  const casesSolved = cases.filter(
    item =>
      progressById[item.caseId]
        ?.isSolved,
  ).length;

  return {
    casesSolved,
    suspicionAccuracy: noteSuspAccuracyForVerdict(
      cases,
      progressById,
      'suspicious',
    ),
    clearAccuracy: noteSuspAccuracyForVerdict(
      cases,
      progressById,
      'not_suspicious',
    ),
  };
};
