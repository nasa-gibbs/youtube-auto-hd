<script lang="ts">
  import { slide } from "svelte/transition";
  import { storage } from "wxt/storage";
  import { getValue } from "@/lib/shared-utils";
  import { initial } from "@/lib/ythd-setup";
  import { SELECTORS } from "@/lib/ythd-utils";

  let isHideDonationSection: boolean = true;
  let isShowDismissButton: boolean = false;
  let timeoutShow: ReturnType<typeof setTimeout>;

  new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) {
      return;
    }
    observer.disconnect();
    timeoutShow = setTimeout(() => {
      isShowDismissButton = true;
    }, 5000);
  }).observe(document.querySelector(SELECTORS.donationInjectParent)!);

  Promise.all([
    storage.getItem<typeof initial.isHidePromotionSection>("sync:isHidePromotionSection", {
      fallback: initial.isHidePromotionSection
    }),
    storage.getItem<typeof initial.isHideDonationSection>("sync:isHideDonationSection", {
      fallback: initial.isHideDonationSection
    })
  ]).then(([pIsHidePromotionSection, pIsHideDonationSection]) => {
    isHideDonationSection = getValue(pIsHidePromotionSection || pIsHideDonationSection);
  });

  storage.watch<typeof initial.isHideDonationSection>("sync:isHideDonationSection", pIsHideDonationSection => {
    isHideDonationSection = pIsHideDonationSection !== null ? pIsHideDonationSection : initial.isHideDonationSection;
  });

  function hideDonationSection() {
    clearTimeout(timeoutShow);
    storage.setItem("sync:isHideDonationSection", true);
  }
</script>

{#if !isHideDonationSection}
  <article class="ythd-donation">
    <h1 class="title">YouTube Auto HD</h1>

    <p class="description">
      Please consider supporting me via <a
        href="https://paypal.me/avi12"
        target="_blank"
        class="link"
        on:click={hideDonationSection}>PayPal</a> :)
    </p>

    {#if isShowDismissButton}
      <button class="close" transition:slide on:click={hideDonationSection}>Don't show again</button>
    {/if}
  </article>
{/if}

<style>
  :global(body) {
    margin: 0;
  }

  .ythd-donation {
    background-color: var(--yt-spec-additive-background, rgba(0, 0, 0, 0.5));
    padding: 12px;
    margin-bottom: 10px;
    direction: ltr;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    & .title {
      color: var(--yt-spec-text-primary, #0f0f0f);
      margin: 0 0 4px 0;
      font-size: 1.4rem;
    }

    & .description {
      color: var(--yt-spec-text-secondary, #606060);
      margin: 0;
      font-size: 1.4rem;
      line-height: 1.8rem;

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    & .link {
      color: var(--yt-spec-call-to-action, #3ea6ff);
      text-decoration: none;
    }

    & .close {
      color: var(--yt-spec-call-to-action, #3ea6ff);
      border: none;
      padding: 0;
      background: none;
      cursor: pointer;
      align-self: end;
      overflow: clip;
    }
  }
</style>
