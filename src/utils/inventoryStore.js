let inventoryVersion = 0;
const listeners = new Set();

export const invalidateInventory = () => {
  inventoryVersion += 1;
  listeners.forEach((listener) => listener());
};

export const subscribeToInventory = (listener) => {
  listeners.add(listener);

  return () => listeners.delete(listener);
};

export const getInventoryVersion = () => inventoryVersion;
