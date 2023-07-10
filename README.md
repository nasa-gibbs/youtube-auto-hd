# YouTube Auto HD + FPS

A browser extension that sets the quality of YouTube videos according to the user's preference, based on the video's
FPS.
Available for:

- [Google Chrome](https://chrome.google.com/webstore/detail/fcphghnknhkimeagdglkljinmpbagone) ![Chrome Web Store](https://img.shields.io/chrome-web-store/users/fcphghnknhkimeagdglkljinmpbagone?color=white&label=users&style=flat-square)
- [Mozilla Firefox](https://addons.mozilla.org/firefox/addon/youtube-auto-hd-fps)
  90+ ![Mozilla Add-on](https://img.shields.io/amo/users/youtube-auto-hd-fps?color=white&label=users&style=flat-square)
- [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/ggnepcoiimddpmjaoejhdfppjbcnfaom) ![users count](https://img.shields.io/badge/dynamic/json?label=users&query=activeInstallCount&style=flat-square&color=white&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/ggnepcoiimddpmjaoejhdfppjbcnfaom)
- [Opera](https://addons.opera.com/en/extensions/details/youtube-auto-hd-fps)
- [Safari](https://apps.apple.com/us/app/id1546729687) - maintained
  by [carlosjeurissen](https://github.com/carlosjeurissen)

![A screenshot from the extension's pop-up page](https://github.com/avi12/youtube-auto-hd/assets/6422804/fc7a4581-0162-427c-a6bc-7d96e68a3961)

Made by [avi12](https://avi12.com)

Powered by [Plasmo](https://github.com/plasmohq/plasmo)

## Known issue

Due to the way the browsers handle extensions, when an extension receives an update, content scripts in already-open web
pages cannot use the [Storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage),
until the user reloads those web pages.
In the context of this extension, it means that when the extension receives an update, as long as the user doesn't
reload YouTube web pages, the extension cannot get the data regarding the user-preferred qualities.

### A kind-of working solution

To provide a smooth user experience, I decided to use the last qualities that were fetched.

This solution is not perfect, since if the user wants to update the quality of the videos in the currently-open web
pages using the popup page, it will not update dynamically.
However, this is the only viable solution, as the alternative would be to auto-reload web pages, which would result in a
bad user experience.

## Translating

You can translate the extension to your own language by
filling [this form](https://apps.jeurissen.co/auto-hd-fps-for-youtube/translate).
Filling will grant you access to a Google Sheets spreadsheet via email, in which you can contribute your translations.

## Requirements for setting up

Install [Node.js](https://nodejs.org) and [PNPM](https://pnpm.io/installation).

## Install dependencies:

```shell script
pnpm i
```

## Start the dev server

### Chromium browsers

```shell script
pnpm dev
```

### Firefox

```shell script
pnpm build:firefox
```

## Running

### Chromium/Chrome

```shell script
pnpm run-chromium
```

### Chromium/Chrome RTL

```shell script
pnpm run-chromium:rtl
```

### Edge on Windows 10/11

```shell
pnpm run-edge:windows
```

### Opera on Windows 10/11

```shell
pnpm run-opera:windows
```

### Firefox

```shell
pnpm run-firefox
```

### Phone/tablet

1. Install [Android Studio](https://developer.android.com/studio) on your operating system
2. Create an AVD (Android Virtual Device)
3. For a phone emulator, choose one that
   has [Play Store preinstalled](https://user-images.githubusercontent.com/6422804/167658974-9ec9d13f-d297-4e8b-85d6-376809f34aab.png)
4. For a tablet emulator, [follow these steps](https://aamnah.com/android/play_store_emulator_install_missing) after
   creating it to have Play Store
   preinstalled
5. Run the emulator:
   ```shell
    emulator @DEVICE_NAME
   ```
6. Download [Kiwi Browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser). I recommend creating
   a Google account specifically to be used with the emulator
7. - If you're using a single emulator while on Windows, you can run:
     ```shell
     pnpm build-pack:test-push
     ```
   - If you're testing on multiple emulators, and you're on PowerShell:
     First find the emulator ID:
     ```powershell
     adb devices
     ```
     Then:
     ```powershell
     pnpm build-pack:test; `
     $zip = "chrome-mv3-prod.zip"; `
     $destAndroid = "/storage/emulated/0/Download/$zip"; `
     adb -s ID shell rm $destAndroid; `
     adb -s ID push "build/$zip" $destAndroid;
     ```
     where you replace `ID` with the emulator ID
8. <details>
   <summary>Side-load the extension on Kiwi</summary>
   <!--suppress HtmlDeprecatedAttribute -->
   <img align="top" src="https://user-images.githubusercontent.com/6422804/167670341-a0cae554-e922-40b3-b8ed-7bec1ebf17bc.png" alt="Choose zip from storage">
   </details>
9. Select the ZIP in the Download folder
10. To reload, you must first remove the extension and then repeat steps 5-8

### Sideloading onto your daily driver browser

After `pnpm dev`:

- Chromium-based browsers
  1. Open the extensions page
  2. Enable "Developer mode"
  3. Open `youtube-auto-hd/build` on your file system
  4. Drag-drop `chrome-mv3-dev` onto the extensions page
- Firefox:
  1. [Follow this guide](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/#:~:text=To%20install%20an%20extension%20temporarily)
  2. In the file system window, select `youtube-auto-hd/build/firefox-mv2-dev/manifest.json`

## Build & pack

```shell
pnpm build-pack
```

### Build & pack for Firefox

```shell
pnpm build-pack:firefox
```

## Contribution

Feel free to contribute! Keep in mind that the license I chose
is [GPL v3](https://github.com/avi12/youtube-auto-hd/blob/main/LICENSE).
If you want to fork, make sure to credit [avi12](https://avi12.com) and link to this repository.
