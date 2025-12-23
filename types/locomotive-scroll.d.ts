declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el?: HTMLElement | null;
    wrapper?: HTMLElement | null;
    smooth?: boolean;
    smoothMobile?: boolean;
    resetNativeScroll?: boolean;
    getDirection?: boolean;
    getSpeed?: boolean;
    class?: string;
    scrollbarContainer?: HTMLElement | null;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    initClass?: string;
    getScrollFromAnywhere?: boolean;
    touchMultiplier?: number;
    firefoxMultiplier?: number;
    reloadOnContextChange?: boolean;
    lerp?: number;
    multiplier?: number;
    classPrefix?: string;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    initClass?: string;
    getScrollFromAnywhere?: boolean;
    touchMultiplier?: number;
    firefoxMultiplier?: number;
    reloadOnContextChange?: boolean;
    lerp?: number;
    multiplier?: number;
  }

  export default class LocomotiveScroll {
    constructor(options?: LocomotiveScrollOptions);
    update(): void;
    destroy(): void;
    start(): void;
    stop(): void;
    scrollTo(target: string | number, options?: { offset?: number; duration?: number; easing?: string }): void;
    setScroll(x: number, y: number): void;
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
  }
}

