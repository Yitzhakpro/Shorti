import dayjs from 'dayjs/esm/index.js';
import RelativeTime from 'dayjs/esm/plugin/relativeTime';

dayjs.extend(RelativeTime);

export const fromNow = (date: Date): string => {
  const fromNow = dayjs(date).fromNow();

  return fromNow;
};
