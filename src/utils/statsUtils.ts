import type {
  Case,
  CaseProgress,
  Verdict,
} from '../context/CasesContext';

const accuracyForVerdict = (
  cases: Case[],
  progressById: Record<string, CaseProgress>,
  targetVerdict: Verdict,
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

export const buildSettingsStats = (
  cases: Case[],
  progressById: Record<string, CaseProgress>,
) => {
  const casesSolved = cases.filter(
    item =>
      progressById[item.caseId]
        ?.isSolved,
  ).length;

  return {
    casesSolved,
    suspicionAccuracy: accuracyForVerdict(
      cases,
      progressById,
      'suspicious',
    ),
    clearAccuracy: accuracyForVerdict(
      cases,
      progressById,
      'not_suspicious',
    ),
  };
};
