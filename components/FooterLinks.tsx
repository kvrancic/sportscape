'use client';

import { Text, Container, ActionIcon, Group, rem, Image } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './FooterLinks.module.css';
import { Barlow } from 'next/font/google'


const bebas = Barlow({
  weight: '900',
  subsets: ['latin']
});


export function FooterLinks() {
  

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <div>
            <Image className={classes.logoImage} src="https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/public-storage/sportscape-logo.png?t=2024-05-27T19%3A18%3A05.834Z" alt="Sportscape logo" h={100} w={100}/>
            <p className={'${barlow.className} text-3xl font-black'}>SPORTSCAPE</p>
          </div>
          <Text size="xs" c="dimmed" className={classes.description}>
            Project built as a part of the Final Thesis at the Faculty of Electrical Engineering and Computing, University of Zagreb.
          </Text>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 Karlo Vrancic
        </Text>
      </Container>
    </footer>
  );
}