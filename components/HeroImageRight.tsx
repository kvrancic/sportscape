import { Container, Title, Text, Button } from '@mantine/core';
import classes from './HeroImageRight.module.css';
import Link from 'next/link';

export default function HeroImageRight() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Welcome to{' '}
              <Text
                className={classes.gradientText}
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: '#d9480f', to: '#ffc078' }}
              >
                Sportscape
              </Text>{' '}
              - your wingman in the world of sports
            </Title>

            <Text className={classes.description} mt={30}>
              Build fully functional accessible web applications with ease – Mantine includes more
              than 100 customizable components and hooks to cover you in any situation
            </Text>

            <Link href="/auth/signin">
              <Button
                variant="gradient"
                gradient={{ from: '#d9480f', to: '#ffc078' }}
                size="xl"
                className={classes.control}
                mt={40}
                component="a"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}