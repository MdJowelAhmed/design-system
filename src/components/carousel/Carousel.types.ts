import type { HTMLAttributes } from 'react';

export type CarouselAnimation = 'slide' | 'fade' | 'zoom' | 'scale';
export type CarouselOrientation = 'horizontal' | 'vertical';
export type CarouselAlign = 'start' | 'center' | 'end';
export type CarouselGap = 'none' | 'sm' | 'md' | 'lg';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Transition animation type between slides.
   * @default 'slide'
   */
  animation?: CarouselAnimation;
  /**
   * Scroll orientation.
   * @default 'horizontal'
   */
  orientation?: CarouselOrientation;
  /**
   * Slide alignment inside track.
   * @default 'start'
   */
  align?: CarouselAlign;
  /**
   * Infinite loop mode.
   * @default true
   */
  loop?: boolean;
  /**
   * Autoplay timer.
   * @default false
   */
  autoplay?: boolean;
  /**
   * Autoplay delay in milliseconds.
   * @default 4000
   */
  delay?: number;
  /**
   * Enable touch drag / swipe gestures.
   * @default true
   */
  draggable?: boolean;
  /**
   * Number of visible slides per view.
   * @default 1
   */
  slidesPerView?: number;
  /**
   * Gap spacing between slides.
   * @default 'md'
   */
  gap?: CarouselGap;
  /**
   * Merge props onto child element via Radix Slot.
   */
  asChild?: boolean;
}

export interface CarouselContextValue {
  currentIndex: number;
  totalSlides: number;
  direction: number;
  animation: CarouselAnimation;
  orientation: CarouselOrientation;
  align: CarouselAlign;
  loop: boolean;
  autoplay: boolean;
  delay: number;
  draggable: boolean;
  slidesPerView: number;
  gap: CarouselGap;
  isPaused: boolean;
  isDragging: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  setTotalSlides: (total: number) => void;
  setIsPaused: (paused: boolean) => void;
  setIsDragging: (dragging: boolean) => void;
}

export interface CarouselContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface CarouselItemProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
> {
  /**
   * Index of this slide item (0-based).
   */
  index?: number;
}

export interface CarouselControlProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  'color'
> {
  /**
   * Screen reader accessible button label.
   */
  'aria-label'?: string;
}

export interface CarouselDotsProps extends HTMLAttributes<HTMLDivElement> {}

export interface CarouselProgressProps extends HTMLAttributes<HTMLDivElement> {}
