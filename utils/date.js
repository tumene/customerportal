import moment from "moment";

export const getTodayDate = () => {
  const todaysDate = new Date();
  return todaysDate;
};

export const disableFutureDate = (currentDate, config) =>
  currentDate.isSameOrAfter(
    moment().subtract(config?.amount || 1, config?.label || "days")
  );

export const disablePastDate = (currentDate) =>
  currentDate.isBefore(moment().subtract(1, "days"));
