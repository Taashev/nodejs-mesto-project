import { regexpUrl } from '../utils/constants';

export const userConfig = {
  name: {
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    regexpUrl,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
};
