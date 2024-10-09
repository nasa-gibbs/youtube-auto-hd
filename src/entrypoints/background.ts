import { storage, type StorageArea } from "wxt/storage";
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

chrome.runtime.onInstalled.addListener(async () => {
  const storageAreas: Array<StorageArea> = ["local", "sync"];

  for (const area of storageAreas) {
    const Storage = await browser.storage[area].get();

    // @ts-ignore
    const getValue = value => {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    };

    const storageSets = Object.entries(Storage).map(async ([key, value]) => {
      console.log(key, value);
      return storage.setItem(`${area}:${key}`, getValue(value));
    });
    await Promise.all(storageSets);
  }

  await iconActions();
});

export default defineBackground(() => {
  chrome.runtime.setUninstallURL("");
});
