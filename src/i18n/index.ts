import { Locales } from './locales';

import en from './en.json';
import ja from './ja.json';

export const messages = {
  [Locales.EN]: en,
  [Locales.JA]: ja,
};

export const defaultLocale = Locales.EN;
