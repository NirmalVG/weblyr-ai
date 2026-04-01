'use client';

import { useState, useEffect, useMemo } from 'react';
import { getDevicePerformance } from '@/lib/utils';
import type { DevicePerformanceTier } from '@/types';

/**
 * Returns the device performance tier.
 * Memoized. SSR-safe (defaults to 'medium').
 */
export function useDevicePerformance(): DevicePerformanceTier {
  const [tier, setTier] = useState<DevicePerformanceTier>('medium');

  useEffect(() => {
    setTier(getDevicePerformance());
  }, []);

  return useMemo(() => tier, [tier]);
}
