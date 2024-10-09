import { storage, type StorageArea, type StorageItemKey } from "wxt/storage";
import pathIconOn from "@/public/icon-128.png";
import pathIconOff from "@/public/icon-off.png";

function setIcon(isEnabled: boolean) {
  const action = chrome.action || chrome.browserAction; // chrome.browserAction for Firefox MV2
  action.setIcon({
    path: isEnabled ? pathIconOn : pathIconOff
  });
}

async function iconActions() {
  storage.watch<boolean>("local:isExtensionEnabled", isEnabled => setIcon(isEnabled!));
}

export default defineBackground(() => {
  chrome.runtime.setUninstallURL("");
  chrome.runtime.onInstalled.addListener(async () => {
    const storageAreas: Array<StorageArea> = ["local", "sync"];

    for (const area of storageAreas) {
      const Storage = await chrome.storage[area].get();

      // @ts-ignore
      const getValue = value => {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      };

      const keyValuePairs: Array<{ key: StorageItemKey; value: any }> = Object.entries(Storage).map(([key, value]) => ({
        key: `${area}:${key}`,
        value: getValue(value)
      }));
      await storage.setItems(keyValuePairs);
    }

    await iconActions();
  });
});
