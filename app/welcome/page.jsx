'use client'

import Link from 'next/link';
import { Text, Space, Blockquote, Image, Title } from '@mantine/core';
import HeroImageRight from './HeroImageRight';
import { FeaturesCards } from './FeaturesCards';
import { FaqWithImage } from './FaqWithImage';
import { CardsCarousel } from './CardCarousel';
import '@mantine/carousel/styles.css';


export default function Home() {
  


  return (
      <>
        <HeroImageRight />

        <Space h="lg" />

        <FeaturesCards />

        <Space h="lg" />


        <div className="flex justify-center">
          <div className="flex flex-col mx-auto xl:w-2/5">
          <Blockquote color="orange" cite="– Sportscape Team" mt="xl">
  Finding the perfect sports venue has never been easier – Sportscape connects you with the best facilities and fellow athletes effortlessly.
</Blockquote>


            <Space h="100" />

            <Title align="center">Explore the sports we offer:</Title>

            <Space h="lg" />

            <CardsCarousel />

            <Space h="lg" />
          </div>
        </div>

        

        <FaqWithImage />

      </>
      
    
  );
}
