import dayjs from 'dayjs';

export interface DisplayDateProps {
  date?: string;
  format?: string;
}

export function DisplayDate({ date, format = 'MMM DD, YYYY'}: DisplayDateProps) {
  if (!date) {
    return null;
  }

  return <>
    {dayjs(date).format(format)}
  </>;
}
