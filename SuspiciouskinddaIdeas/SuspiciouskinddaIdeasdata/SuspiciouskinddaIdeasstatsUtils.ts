import type {
  SuspiciouskinddaIdeasCase,
  SuspiciouskinddaIdeasCaseProgress,
  SuspiciouskinddaIdeasVerdict,
} from './SuspiciouskinddaIdeascasesStore';

const suspiciouskinddaIdeasAccuracyForVerdict = (
  suspiciouskinddaCases: SuspiciouskinddaIdeasCase[],
  suspiciouskinddaProgressById: Record<string, SuspiciouskinddaIdeasCaseProgress>,
  suspiciouskinddaTargetVerdict: SuspiciouskinddaIdeasVerdict,
) => {
  const suspiciouskinddaMatchingCases = suspiciouskinddaCases.filter(
    suspiciouskinddaItem =>
      suspiciouskinddaItem.suspiciouskinddaCaseVerdict ===
      suspiciouskinddaTargetVerdict,
  );

  const suspiciouskinddaSolvedMatching = suspiciouskinddaMatchingCases.filter(
    suspiciouskinddaItem =>
      suspiciouskinddaProgressById[suspiciouskinddaItem.suspiciouskinddaCaseId]
        ?.suspiciouskinddaCaseIsSolved,
  );

  if (suspiciouskinddaSolvedMatching.length === 0) {
    return 0;
  }

  const suspiciouskinddaCorrectCount = suspiciouskinddaSolvedMatching.filter(
    suspiciouskinddaItem => {
      const suspiciouskinddaProgress =
        suspiciouskinddaProgressById[suspiciouskinddaItem.suspiciouskinddaCaseId];
      return (
        suspiciouskinddaProgress?.suspiciouskinddaCaseYourVerdict ===
        suspiciouskinddaItem.suspiciouskinddaCaseVerdict
      );
    },
  ).length;

  return Math.round(
    (suspiciouskinddaCorrectCount / suspiciouskinddaSolvedMatching.length) * 100,
  );
};

export const suspiciouskinddaIdeasBuildSettingsStats = (
  suspiciouskinddaCases: SuspiciouskinddaIdeasCase[],
  suspiciouskinddaProgressById: Record<string, SuspiciouskinddaIdeasCaseProgress>,
) => {
  const suspiciouskinddaCasesSolved = suspiciouskinddaCases.filter(
    suspiciouskinddaItem =>
      suspiciouskinddaProgressById[suspiciouskinddaItem.suspiciouskinddaCaseId]
        ?.suspiciouskinddaCaseIsSolved,
  ).length;

  return {
    suspiciouskinddaCasesSolved,
    suspiciouskinddaSuspicionAccuracy: suspiciouskinddaIdeasAccuracyForVerdict(
      suspiciouskinddaCases,
      suspiciouskinddaProgressById,
      'suspicious',
    ),
    suspiciouskinddaClearAccuracy: suspiciouskinddaIdeasAccuracyForVerdict(
      suspiciouskinddaCases,
      suspiciouskinddaProgressById,
      'not_suspicious',
    ),
  };
};
