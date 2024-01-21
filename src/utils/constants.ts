export const messageError = {
  userNotFound: 'Запрашиваемый пользователь не найден',
  userValidationError: 'Переданы некорректные данные пользователя',
  userConflictEmail: 'Пользователь с таким email уже существует',
  userAuth: 'Вы ввели неправильный логин или пароль',

  cardNotFound: 'Карточка не найдена',
  cardValidationError: 'Переданы некорректные данные карточки',

  serverError: 'На сервере произошла ошибка',
  badRequest: 'Переданы некорректные данные',
  notFound: 'Ресурс не найден',
  forbiddenError: 'У вас нет на это прав',

  syntaxError: 'Синтаксическая ошибка',

  tokenError:
    'При авторизации произошла ошибка. Токен не передан или передан не в том формате',
  emailError: 'Поле email заполнено некорректно',
  passwordRegistrationError: 'Поле password заполнено некорректно',
};

export const STATUS_CODE = {
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
};
