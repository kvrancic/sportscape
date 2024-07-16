'use client';

import Link from 'next/link';
import { Text, Space, Blockquote, Image, Title } from '@mantine/core';
import HeroImageRight from './HeroImageRight';
import { FeaturesCards } from './FeaturesCards';
import { FaqWithImage } from './FaqWithImage';
import { CardsCarousel } from './CardsCarousel';
import { AthleteTimeline} from './AthleteTimeline';
import { VendorTimeline } from './VendorTimeline';
import '@mantine/carousel/styles.css';

export default function Welcome() {
  return (
    <>
      <HeroImageRight />

      <Space h="lg" />

      <FeaturesCards />

      <Space h="lg" />

      <div className="flex justify-center content-center">
        <div className="flex flex-col mx-auto 2xl:w-2/5 sm:mx-4">
          

          <Space h="20" />

          <Blockquote color="orange" cite="– Sportscape Team" mt="xl">
            Finding the perfect sports venue has never been easier – Sportscape connects you with the best facilities and fellow athletes effortlessly.
          </Blockquote>

          <Space h="50" />

          <div className="grid grid-cols-1 md:grid-cols-2 justify-center content-center md:space-y-0 space-y-10 md:space-x-10 lg:mx-auto mx-4">
            <AthleteTimeline />
            <VendorTimeline />
          </div>

          <Space h="100" />

          <Title align="center">Explore the sports we offer:</Title>

          <Space h="lg" />

          <CardsCarousel/>

          <Space h="lg" />
        </div>
      </div>

      

      <Space h="lg" />

      <FaqWithImage />
    </>
  );
}
