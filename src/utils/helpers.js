"use client"

import { useState } from "react";

export const copyLink = async () => {
  await navigator.clipboard.writeText(window.location.href);
  alert("Link disalin!");
};

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  async function shareEvent(event) {
    setIsSharing(true);
    console.log("Checking share support...");

    try {
      if (navigator.canShare) {
        await navigator.share({
          title: event.name,
          text: "Cek event seru ini!",
          url: window.location.href,
        });
        alert("Share berhasil!");
      } else if (navigator.share) {
        await navigator.share({
          title: event.name,
          text: "Cek event seru ini!",
          url: window.location.href,
        });
        alert("Share link berhasil!");
      } else {
        alert("Sharing is not supported on this device.");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      alert("Sharing failed.");
    } finally {
      setIsSharing(false);
    }
  }

  return { shareEvent: shareEvent, isSharing };
}
