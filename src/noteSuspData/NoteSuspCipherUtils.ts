export type NoteSuspCipherType =
  | 'caesar'
  | 'rot13'
  | 'atbash'
  | 'binary';

export type NoteSuspCipherMode = 'encode' | 'decode';

const noteSuspCaesarShift = 3;

const noteSuspShiftChar = (
  char: string,
  shift: number,
) => {
  const code = char.charCodeAt(0);

  if (code >= 65 && code <= 90) {
    return String.fromCharCode(
      ((code - 65 + shift + 26) % 26) + 65,
    );
  }

  if (code >= 97 && code <= 122) {
    return String.fromCharCode(
      ((code - 97 + shift + 26) % 26) + 97,
    );
  }

  return char;
};

const noteSuspCaesarTransform = (
  text: string,
  shift: number,
) =>
  text
    .split('')
    .map(char =>
      noteSuspShiftChar(char, shift),
    )
    .join('');

const noteSuspAtbashTransform = (text: string) =>
  text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        return String.fromCharCode(90 - (code - 65));
      }

      if (code >= 97 && code <= 122) {
        return String.fromCharCode(122 - (code - 97));
      }

      return char;
    })
    .join('');

const noteSuspToBinary = (text: string) =>
  text
    .split('')
    .map(char =>
      char.charCodeAt(0).toString(2).padStart(8, '0'),
    )
    .join(' ');

const noteSuspFromBinary = (text: string) => {
  const bits = text
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);

  if (bits.length === 0) {
    return '';
  }

  return bits
    .map(bit => {
      if (!/^[01]{1,8}$/.test(bit)) {
        return '';
      }
      return String.fromCharCode(parseInt(bit, 2));
    })
    .join('');
};

export const noteSuspCipherTypeLabels: Record<
  NoteSuspCipherType,
  string
> = {
  caesar: 'Caesar',
  rot13: 'ROT13',
  atbash: 'Atbash',
  binary: 'Binary',
};

export const noteSuspTransformCipher = (
  text: string,
  type: NoteSuspCipherType,
  mode: NoteSuspCipherMode,
) => {
  if (!text.trim()) {
    return '';
  }

  const isEncode = mode === 'encode';

  switch (type) {
    case 'caesar':
      return noteSuspCaesarTransform(
        text,
        isEncode
          ? noteSuspCaesarShift
          : -noteSuspCaesarShift,
      );
    case 'rot13':
      return noteSuspCaesarTransform(text, 13);
    case 'atbash':
      return noteSuspAtbashTransform(text);
    case 'binary':
      return isEncode
        ? noteSuspToBinary(text)
        : noteSuspFromBinary(text);
    default:
      return '';
  }
};
