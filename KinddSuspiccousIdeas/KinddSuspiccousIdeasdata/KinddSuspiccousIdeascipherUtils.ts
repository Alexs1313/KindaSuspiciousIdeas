export type KinddSuspiccousIdeasCipherType =
  | 'caesar'
  | 'rot13'
  | 'atbash'
  | 'binary';

export type KinddSuspiccousIdeasCipherMode = 'encode' | 'decode';

const kinddSuspiccousIdeasCaesarShift = 3;

const kinddSuspiccousIdeasShiftChar = (
  kinddSuspiccousChar: string,
  kinddSuspiccousShift: number,
) => {
  const kinddSuspiccousCode = kinddSuspiccousChar.charCodeAt(0);

  if (kinddSuspiccousCode >= 65 && kinddSuspiccousCode <= 90) {
    return String.fromCharCode(
      ((kinddSuspiccousCode - 65 + kinddSuspiccousShift + 26) % 26) + 65,
    );
  }

  if (kinddSuspiccousCode >= 97 && kinddSuspiccousCode <= 122) {
    return String.fromCharCode(
      ((kinddSuspiccousCode - 97 + kinddSuspiccousShift + 26) % 26) + 97,
    );
  }

  return kinddSuspiccousChar;
};

const kinddSuspiccousIdeasCaesar = (
  kinddSuspiccousText: string,
  kinddSuspiccousShift: number,
) =>
  kinddSuspiccousText
    .split('')
    .map(kinddSuspiccousChar =>
      kinddSuspiccousIdeasShiftChar(kinddSuspiccousChar, kinddSuspiccousShift),
    )
    .join('');

const kinddSuspiccousIdeasAtbash = (kinddSuspiccousText: string) =>
  kinddSuspiccousText
    .split('')
    .map(kinddSuspiccousChar => {
      const kinddSuspiccousCode = kinddSuspiccousChar.charCodeAt(0);

      if (kinddSuspiccousCode >= 65 && kinddSuspiccousCode <= 90) {
        return String.fromCharCode(90 - (kinddSuspiccousCode - 65));
      }

      if (kinddSuspiccousCode >= 97 && kinddSuspiccousCode <= 122) {
        return String.fromCharCode(122 - (kinddSuspiccousCode - 97));
      }

      return kinddSuspiccousChar;
    })
    .join('');

const kinddSuspiccousIdeasToBinary = (kinddSuspiccousText: string) =>
  kinddSuspiccousText
    .split('')
    .map(kinddSuspiccousChar =>
      kinddSuspiccousChar.charCodeAt(0).toString(2).padStart(8, '0'),
    )
    .join(' ');

const kinddSuspiccousIdeasFromBinary = (kinddSuspiccousText: string) => {
  const kinddSuspiccousBits = kinddSuspiccousText
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);

  if (kinddSuspiccousBits.length === 0) {
    return '';
  }

  return kinddSuspiccousBits
    .map(kinddSuspiccousBit => {
      if (!/^[01]{1,8}$/.test(kinddSuspiccousBit)) {
        return '';
      }
      return String.fromCharCode(parseInt(kinddSuspiccousBit, 2));
    })
    .join('');
};

export const kinddSuspiccousIdeasCipherTypeLabels: Record<
  KinddSuspiccousIdeasCipherType,
  string
> = {
  caesar: 'Caesar',
  rot13: 'ROT13',
  atbash: 'Atbash',
  binary: 'Binary',
};

export const kinddSuspiccousIdeasTransformCipher = (
  kinddSuspiccousText: string,
  kinddSuspiccousType: KinddSuspiccousIdeasCipherType,
  kinddSuspiccousMode: KinddSuspiccousIdeasCipherMode,
) => {
  if (!kinddSuspiccousText.trim()) {
    return '';
  }

  const kinddSuspiccousIsEncode = kinddSuspiccousMode === 'encode';

  switch (kinddSuspiccousType) {
    case 'caesar':
      return kinddSuspiccousIdeasCaesar(
        kinddSuspiccousText,
        kinddSuspiccousIsEncode
          ? kinddSuspiccousIdeasCaesarShift
          : -kinddSuspiccousIdeasCaesarShift,
      );
    case 'rot13':
      return kinddSuspiccousIdeasCaesar(kinddSuspiccousText, 13);
    case 'atbash':
      return kinddSuspiccousIdeasAtbash(kinddSuspiccousText);
    case 'binary':
      return kinddSuspiccousIsEncode
        ? kinddSuspiccousIdeasToBinary(kinddSuspiccousText)
        : kinddSuspiccousIdeasFromBinary(kinddSuspiccousText);
    default:
      return '';
  }
};
