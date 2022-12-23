import * as dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(RelativeTime);

export const fromNow = (date: Date): string => {
  const fromNow = dayjs(date).fromNow();

  return fromNow;
};
