import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import en from '../../constants/translations/en.json';
import vi from '../../constants/translations/vi.json';

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { en, vi };

export default i18n;
