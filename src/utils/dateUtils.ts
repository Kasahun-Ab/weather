import { format } from 'date-fns';

export const formatDateTime = (date: Date): string => {
  return format(date, 'EEEE d, yyyy • h:mmaaa');
};

export const formatHourlyTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
};