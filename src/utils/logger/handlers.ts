import winston from 'winston';

export const errorFilter = winston.format((info) => {
  return info.level === 'error' ? info : false;
});

export const warnFilter = winston.format((info) => {
  return info.level === 'warn' ? info : false;
});

export const infoFilter = winston.format((info) => {
  return info.level === 'info' ? info : false;
});

export const handlePrintfMessage = (
  info: winston.Logform.TransformableInfo,
): string => {
  return JSON.stringify(
    `{createdAt: ${info.timestamp}, level: ${info.level}, message: ${info.message} }`,
  );
};

export const handleTimestamp = () => {
  return new Date().toString();
};
