import type {
  KinddSuspiccousIdeasCase,
  KinddSuspiccousIdeasCaseProgress,
  KinddSuspiccousIdeasVerdict,
} from './KinddSuspiccousIdeascasesStore';

const kinddSuspiccousIdeasAccuracyForVerdict = (
  kinddSuspiccousCases: KinddSuspiccousIdeasCase[],
  kinddSuspiccousProgressById: Record<string, KinddSuspiccousIdeasCaseProgress>,
  kinddSuspiccousTargetVerdict: KinddSuspiccousIdeasVerdict,
) => {
  const kinddSuspiccousMatchingCases = kinddSuspiccousCases.filter(
    kinddSuspiccousItem =>
      kinddSuspiccousItem.kinddSuspiccousCaseVerdict ===
      kinddSuspiccousTargetVerdict,
  );

  const kinddSuspiccousSolvedMatching = kinddSuspiccousMatchingCases.filter(
    kinddSuspiccousItem =>
      kinddSuspiccousProgressById[kinddSuspiccousItem.kinddSuspiccousCaseId]
        ?.kinddSuspiccousCaseIsSolved,
  );

  if (kinddSuspiccousSolvedMatching.length === 0) {
    return 0;
  }

  const kinddSuspiccousCorrectCount = kinddSuspiccousSolvedMatching.filter(
    kinddSuspiccousItem => {
      const kinddSuspiccousProgress =
        kinddSuspiccousProgressById[kinddSuspiccousItem.kinddSuspiccousCaseId];
      return (
        kinddSuspiccousProgress?.kinddSuspiccousCaseYourVerdict ===
        kinddSuspiccousItem.kinddSuspiccousCaseVerdict
      );
    },
  ).length;

  return Math.round(
    (kinddSuspiccousCorrectCount / kinddSuspiccousSolvedMatching.length) * 100,
  );
};

export const kinddSuspiccousIdeasBuildSettingsStats = (
  kinddSuspiccousCases: KinddSuspiccousIdeasCase[],
  kinddSuspiccousProgressById: Record<string, KinddSuspiccousIdeasCaseProgress>,
) => {
  const kinddSuspiccousCasesSolved = kinddSuspiccousCases.filter(
    kinddSuspiccousItem =>
      kinddSuspiccousProgressById[kinddSuspiccousItem.kinddSuspiccousCaseId]
        ?.kinddSuspiccousCaseIsSolved,
  ).length;

  return {
    kinddSuspiccousCasesSolved,
    kinddSuspiccousSuspicionAccuracy: kinddSuspiccousIdeasAccuracyForVerdict(
      kinddSuspiccousCases,
      kinddSuspiccousProgressById,
      'suspicious',
    ),
    kinddSuspiccousClearAccuracy: kinddSuspiccousIdeasAccuracyForVerdict(
      kinddSuspiccousCases,
      kinddSuspiccousProgressById,
      'not_suspicious',
    ),
  };
};
