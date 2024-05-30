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
              At Sportscape, we bridge the gap between venue owners and athletes. Whether you&#39;re looking to book a slot for a game or join an existing one, Sportscape makes it easy. Explore venues, connect with fellow sports enthusiasts, and enjoy seamless bookings.
            </Text>

            <div className={classes.controls}>
              <Link href="/signup">
                <Button
                  variant="gradient"
                  gradient={{ from: '#d9480f', to: '#ffc078' }}
                  size="xl"
                  className={classes.control}
                  mt={40}
                >
                  Get started
                </Button>
              </Link>
              <Link href="/login" className={classes.loginLink}>
                Already have an account? Log in instead.
              </Link>
            </div>
          </div> 
        </div>
      </Container>
    </div>
  );
}
