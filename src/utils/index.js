import { format } from "date-fns";

export const dateToString = (date) => {
  if (!date) return "";
  return format(date, "yyyy/M/d HH:mm");
};
