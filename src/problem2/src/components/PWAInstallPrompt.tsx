import React, { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Don’t show if already installed
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    // Don’t show if dismissed within 1 day
    const dismissedUntil = localStorage.getItem("pwaDismissedUntil");
    const now = Date.now();
    if (dismissedUntil && Number(dismissedUntil) > now) return;

    // Listen for install prompt (Android/Chrome)
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowModal(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // iOS fallback (no beforeinstallprompt event)
    if (isIos) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2000); // show after 2s
      return () => clearTimeout(timer);
    }

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const isIos = /iphone|ipad|ipod/.test(
    window.navigator.userAgent.toLowerCase()
  );
  const isInStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone;

  const handleInstall = async () => {
    // Handle iOS
    if (isIos && !isInStandalone) {
      setShowModal(false);
      alert(
        "To install this app, tap the Share icon (↑) then 'Add to Home Screen'."
      );
      return;
    }

    // Handle Chrome/Android
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted install");
    } else {
      console.log("User dismissed install");
    }
    setShowModal(false);
  };

  const handleDismiss = () => {
    const laterTime = Date.now() + 6 * 60 * 60 * 1000; // Snooze for 6 hours
    localStorage.setItem("pwaDismissedUntil", String(laterTime));
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="font-headline bg-white/70 dark:bg-black/40 backdrop-blur-3xl border-t border-l border-white dark:border-white/50 text-text rounded-xl shadow-lg p-6 max-w-sm text-center">
        <h2 className="text-lg mb-2 text-text">Install this app?</h2>
        <p className="text-sm mb-4 text-text">
          Add this app to your home screen for a better experience.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleInstall}
            className="px-4 py-2 rounded-full bg-pagination-active hover:scale-105 transition font-semibold text-sm"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 rounded-full bg-pagination-hover hover:scale-105 transition font-semibold text-sm"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
