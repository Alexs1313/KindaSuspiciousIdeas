export type SuspiciouskinddaIdeasCipherType =
  | 'caesar'
  | 'rot13'
  | 'atbash'
  | 'binary';

export type SuspiciouskinddaIdeasCipherMode = 'encode' | 'decode';

const suspiciouskinddaIdeasCaesarShift = 3;

const suspiciouskinddaIdeasShiftChar = (
  suspiciouskinddaChar: string,
  suspiciouskinddaShift: number,
) => {
  const suspiciouskinddaCode = suspiciouskinddaChar.charCodeAt(0);

  if (suspiciouskinddaCode >= 65 && suspiciouskinddaCode <= 90) {
    return String.fromCharCode(
      ((suspiciouskinddaCode - 65 + suspiciouskinddaShift + 26) % 26) + 65,
    );
  }

  if (suspiciouskinddaCode >= 97 && suspiciouskinddaCode <= 122) {
    return String.fromCharCode(
      ((suspiciouskinddaCode - 97 + suspiciouskinddaShift + 26) % 26) + 97,
    );
  }

  return suspiciouskinddaChar;
};

const suspiciouskinddaIdeasCaesar = (
  suspiciouskinddaText: string,
  suspiciouskinddaShift: number,
) =>
  suspiciouskinddaText
    .split('')
    .map(suspiciouskinddaChar =>
      suspiciouskinddaIdeasShiftChar(suspiciouskinddaChar, suspiciouskinddaShift),
    )
    .join('');

const suspiciouskinddaIdeasAtbash = (suspiciouskinddaText: string) =>
  suspiciouskinddaText
    .split('')
    .map(suspiciouskinddaChar => {
      const suspiciouskinddaCode = suspiciouskinddaChar.charCodeAt(0);

      if (suspiciouskinddaCode >= 65 && suspiciouskinddaCode <= 90) {
        return String.fromCharCode(90 - (suspiciouskinddaCode - 65));
      }

      if (suspiciouskinddaCode >= 97 && suspiciouskinddaCode <= 122) {
        return String.fromCharCode(122 - (suspiciouskinddaCode - 97));
      }

      return suspiciouskinddaChar;
    })
    .join('');

const suspiciouskinddaIdeasToBinary = (suspiciouskinddaText: string) =>
  suspiciouskinddaText
    .split('')
    .map(suspiciouskinddaChar =>
      suspiciouskinddaChar.charCodeAt(0).toString(2).padStart(8, '0'),
    )
    .join(' ');

const suspiciouskinddaIdeasFromBinary = (suspiciouskinddaText: string) => {
  const suspiciouskinddaBits = suspiciouskinddaText
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);

  if (suspiciouskinddaBits.length === 0) {
    return '';
  }

  return suspiciouskinddaBits
    .map(suspiciouskinddaBit => {
      if (!/^[01]{1,8}$/.test(suspiciouskinddaBit)) {
        return '';
      }
      return String.fromCharCode(parseInt(suspiciouskinddaBit, 2));
    })
    .join('');
};

export const suspiciouskinddaIdeasCipherTypeLabels: Record<
  SuspiciouskinddaIdeasCipherType,
  string
> = {
  caesar: 'Caesar',
  rot13: 'ROT13',
  atbash: 'Atbash',
  binary: 'Binary',
};

export const suspiciouskinddaIdeasTransformCipher = (
  suspiciouskinddaText: string,
  suspiciouskinddaType: SuspiciouskinddaIdeasCipherType,
  suspiciouskinddaMode: SuspiciouskinddaIdeasCipherMode,
) => {
  if (!suspiciouskinddaText.trim()) {
    return '';
  }

  const suspiciouskinddaIsEncode = suspiciouskinddaMode === 'encode';

  switch (suspiciouskinddaType) {
    case 'caesar':
      return suspiciouskinddaIdeasCaesar(
        suspiciouskinddaText,
        suspiciouskinddaIsEncode
          ? suspiciouskinddaIdeasCaesarShift
          : -suspiciouskinddaIdeasCaesarShift,
      );
    case 'rot13':
      return suspiciouskinddaIdeasCaesar(suspiciouskinddaText, 13);
    case 'atbash':
      return suspiciouskinddaIdeasAtbash(suspiciouskinddaText);
    case 'binary':
      return suspiciouskinddaIsEncode
        ? suspiciouskinddaIdeasToBinary(suspiciouskinddaText)
        : suspiciouskinddaIdeasFromBinary(suspiciouskinddaText);
    default:
      return '';
  }
};
