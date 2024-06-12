import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Text, Title, useMantineTheme, rem } from '@mantine/core';
import classes from './CardsCarousel.module.css';

interface CardProps {
  image: string;
  title: string;
  category: string;
  description: string;
}

function Card({ image, title, category, description }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ 
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className={classes.card}
    >
      <div className={classes.bottomContainer}>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <div className="descriptionTitle">
          <Title order={3} className={classes.title} >
            {title}
          </Title>
          <Text className={classes.description}>
            {description}
          </Text>
        </div>
      </div>
    </Paper>
  );
}

const data = [
  {
    image: 'https://images.unsplash.com/photo-1580692475446-c2fabbbbf835?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Basketball',
    category: 'Sport',
    description: 'Shooting three-pointers and dunking on your friends has never been easier'
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1684241184359-08ffcba55bee?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Football',
    category: 'Sport',
    description: 'Score goals and celebrate with style.'
  },
  {
    image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Volleyball',
    category: 'Sport',
    description: 'Bump, set, and spike your way to victory.'
  },
  {
    image: 'https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'More Coming Soon',
    category: 'Sport',
    description: 'Stay tuned for more exciting sports!'
  },
];

export function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: rem(2), sm: 'xl' }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}
