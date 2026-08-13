import { useSyncExternalStore } from "react";

import {
  getInventoryVersion,
  subscribeToInventory,
} from "../utils/inventoryStore";

const useInventoryVersion = () =>
  useSyncExternalStore(
    subscribeToInventory,
    getInventoryVersion,
    getInventoryVersion,
  );

export default useInventoryVersion;
