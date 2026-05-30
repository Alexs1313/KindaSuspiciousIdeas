export type CipherType =
  | 'caesar'
  | 'rot13'
  | 'atbash'
  | 'binary';

export type CipherMode = 'encode' | 'decode';

const CAESAR_SHIFT = 3;

const shiftChar = (
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

const caesarTransform = (
  text: string,
  shift: number,
) =>
  text
    .split('')
    .map(char =>
      shiftChar(char, shift),
    )
    .join('');

const atbashTransform = (text: string) =>
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

const toBinary = (text: string) =>
  text
    .split('')
    .map(char =>
      char.charCodeAt(0).toString(2).padStart(8, '0'),
    )
    .join(' ');

const fromBinary = (text: string) => {
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

export const cipherTypeLabels: Record<
  CipherType,
  string
> = {
  caesar: 'Caesar',
  rot13: 'ROT13',
  atbash: 'Atbash',
  binary: 'Binary',
};

export const transformCipher = (
  text: string,
  type: CipherType,
  mode: CipherMode,
) => {
  if (!text.trim()) {
    return '';
  }

  const isEncode = mode === 'encode';

  switch (type) {
    case 'caesar':
      return caesarTransform(
        text,
        isEncode
          ? CAESAR_SHIFT
          : -CAESAR_SHIFT,
      );
    case 'rot13':
      return caesarTransform(text, 13);
    case 'atbash':
      return atbashTransform(text);
    case 'binary':
      return isEncode
        ? toBinary(text)
        : fromBinary(text);
    default:
      return '';
  }
};
