import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from './index';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const sampleImages = [
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80',
];

export const Default: StoryObj<typeof Carousel> = {
  render: () => (
    <Carousel className="h-[350px] w-[600px]">
      <CarouselContent>
        {sampleImages.map((src, i) => (
          <CarouselItem key={i}>
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="h-[350px] w-full rounded-xl object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const AutoplayWithProgressBar: StoryObj = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // False-positive: text lives in a `bg-black/60 backdrop-blur-sm` scrim
            // that sits above an <img>. axe reports "cannot determine background because
            // element contains an image node". The scrim provides adequate contrast
            // (white on ~#000 at 60% opacity ≈ 10:1) but axe can't resolve it statically.
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
  },
  render: () => (
    <Carousel autoplay delay={3000} loop className="h-[360px] w-[600px]">
      <CarouselProgress className="mb-2" />
      <CarouselContent>
        {sampleImages.map((src, i) => (
          <CarouselItem key={i}>
            <div className="relative">
              {/* aria-hidden: purely decorative background image; the caption overlay
                  below provides the meaningful description for screen readers */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className="h-[320px] w-full rounded-xl object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 p-3 text-white backdrop-blur-sm">
                <p className="text-sm font-semibold">Autoplay Banner {i + 1}</p>
                <p className="text-xs text-neutral-300">
                  Pauses on hover or focus.
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const FadeAnimation: StoryObj = {
  render: () => (
    <Carousel animation="fade" className="h-[350px] w-[600px]">
      <CarouselContent>
        {sampleImages.map((src, i) => (
          <CarouselItem key={i}>
            <img
              src={src}
              alt={`Fade Slide ${i + 1}`}
              className="h-[350px] w-full rounded-xl object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const ZoomAnimation: StoryObj = {
  render: () => (
    <Carousel animation="zoom" className="h-[350px] w-[600px]">
      <CarouselContent>
        {sampleImages.map((src, i) => (
          <CarouselItem key={i}>
            <img
              src={src}
              alt={`Zoom Slide ${i + 1}`}
              className="h-[350px] w-full rounded-xl object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const ContentCardsCarousel: StoryObj = {
  render: () => (
    <Carousel className="w-[500px]">
      <CarouselContent>
        <CarouselItem>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Enterprise Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              Track real-time data insights and visual performance reports.
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Design System Core</CardTitle>
            </CardHeader>
            <CardContent>
              Unified React primitives for consistent user interfaces.
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};
