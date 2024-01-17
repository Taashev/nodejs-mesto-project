export const messageError = {
  userNotFound: 'Запрашиваемый пользователь не найден',
  userValidationError: 'Переданы некорректные данные пользователя',

  cardNotFound: 'Карточка не найдена',
  cardValidationError: 'Переданы некорректные данные карточки',

  serverError: 'На сервере произошла ошибка',
  badRequest: 'Переданы некорректные данные',
  notFound: 'Ресурс не найден',
  authError: 'Необходима авторизация',
  forbiddenError: 'У вас нет на это прав',
  syntaxError: 'Синтаксическая ошибка',
};

export const STATUS_CODE = {
  created: 201,
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
};
