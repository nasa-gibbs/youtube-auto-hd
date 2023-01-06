import { labelToQuality } from "../shared-scripts/ythd-setup";
import {
  addGlobalEventListener,
  getVisibleElement,
  observerOptions,
  SELECTORS
} from "../shared-scripts/ythd-utilities";
import type { YouTubeLabel } from "../types";
import { prepareToChangeQualityOnMobile } from "./ythd-content-script-functions-mobile";

window.ythdLastQualityClicked = null;
let gTitleLast = document.title;
let gPlayerObserver: MutationObserver;

function addTemporaryBodyListenerOnMobile(): void {
  // For some reason, the title observer will run as soon as .observer() calls,
  // so we need to prevent it
  if (gTitleLast === document.title) {
    return;
  }

  // When changing a URL, often the title will change more than once,
  // so we need to ignore any multiple changes in a row
  if (document.title === "- YouTube") {
    return;
  }

  gTitleLast = document.title;

  if (!gPlayerObserver) {
    gPlayerObserver = new MutationObserver(() => {
      const elVideo = getVisibleElement<HTMLVideoElement>(SELECTORS.video);
      if (!elVideo) {
        return;
      }

      gPlayerObserver.disconnect();

      window.ythdLastQualityClicked = null;
      elVideo.addEventListener("canplay", prepareToChangeQualityOnMobile);
    });
  }

  gPlayerObserver.observe(document, observerOptions);
}

function saveManualQualityChangeOnMobile({ target, isTrusted }: Event): void {
  // We use programmatic "onchange" to change quality on mobile, but we need to save/respond only to <select> onchange
  if (!isTrusted) {
    return;
  }

  const element = target as HTMLElement;
  if (!element.matches(SELECTORS.mobileQualityDropdownWrapper)) {
    return;
  }

  const elDropdownQuality = element.querySelector<HTMLSelectElement>(SELECTORS.mobileQualityDropdown);
  const label = elDropdownQuality.value as YouTubeLabel;
  window.ythdLastQualityClicked = labelToQuality[label];
}

async function init(): Promise<void> {
  await addGlobalEventListener(addTemporaryBodyListenerOnMobile);
  document.addEventListener("change", saveManualQualityChangeOnMobile);

  // When the user visits a /watch page, the video's quality will be changed as soon as it loads
  new MutationObserver((_, observer) => {
    if (!location.pathname.startsWith("/watch")) {
      observer.disconnect();
      return;
    }

    const elVideo = getVisibleElement<HTMLVideoElement>(SELECTORS.video);
    if (elVideo) {
      observer.disconnect();
      prepareToChangeQualityOnMobile();
    }
  }).observe(document, observerOptions);
}

init();
