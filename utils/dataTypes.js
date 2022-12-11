export const groupArrayBy = (items, field) => {
  const groupedItems = {};

  items.forEach((item) => {
    const value = item[field];

    if (groupedItems[value]) {
      groupedItems[value].push(item);
    } else {
      groupedItems[value] = [item];
    }
  });

  return groupedItems;
};

export const arrayToSelectOptions = (list) =>
  list.map((i) => ({ value: i, label: i }));

export const formatAmount = (amount, toWholeNumber = false) => {
  if (toWholeNumber) {
    const value = Math.round(Number(amount));
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  let formattedAmount = (+amount || 0).toFixed(2).toString();
  if (!formattedAmount.includes(".")) {
    formattedAmount = `${amount}.00`;
  }
  return formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const saveToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
export const getFromStorage = (name) => {
  const items = JSON.parse(localStorage.getItem(name));
  return items;
};
export const clearAllActiveSession = (trackingId) => {
  let userSessionStage = `userCurrentStage__${trackingId}`;
  let userSessionId = `userQuoteDetails_Storage__${trackingId}`;
  let currentTracker = `currentTrackingId_equity`;
  localStorage.removeItem(userSessionId);
  localStorage.removeItem(userSessionStage);
  localStorage.removeItem(currentTracker);
};
