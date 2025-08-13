import React, { useEffect, useCallback, useRef } from "react";
import { showToast } from "@/lib/toast";
import type { UseSessionTimeoutOptions } from "@/lib/interfaces";

export const useSessionTimeout = ({
  timeoutMinutes = 5,
  warningMinutes = 4,
  onTimeout,
}: UseSessionTimeoutOptions) => {
  const timeoutRef = React.useRef<NodeJS.Timeout>(null);
  const warningRef = React.useRef<NodeJS.Timeout>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    warningRef.current = setTimeout(() => {
      showToast(
        `Your session will expire in ${warningMinutes} minute(s) due to inactivity.`,
        "warning"
      );
    }, (timeoutMinutes - warningMinutes) * 60 * 1000);

    timeoutRef.current = setTimeout(() => {
      showToast("Session expired due to inactivity", "info");
      onTimeout();
    }, timeoutMinutes * 60 * 1000);
  }, [timeoutMinutes, warningMinutes, onTimeout]);

  const handleActivity = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    let throttleTimer: NodeJS.Timeout;
    const throttledActivity = () => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        handleActivity();
        throttleTimer = null as any;
      }, 1000);
    };

    events.forEach((event) => {
      document.addEventListener(event, throttledActivity, true);
    });

    resetTimer();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, throttledActivity, true);
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [handleActivity, resetTimer]);

  return { resetTimer };
};
