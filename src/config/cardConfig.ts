import { regexpUrl } from '../utils/constants';

export const cardConfig = {
  name: {
    minlength: 2,
    maxlength: 30,
  },
  link: {
    regexpUrl,
  },
};
