let openFloatingLayerCount = 0;

export const registerOpenFloatingLayer = (): void => {
  openFloatingLayerCount += 1;
};

export const unregisterOpenFloatingLayer = (): void => {
  openFloatingLayerCount = Math.max(0, openFloatingLayerCount - 1);
};

export const hasOpenFloatingLayer = (): boolean => openFloatingLayerCount > 0;
