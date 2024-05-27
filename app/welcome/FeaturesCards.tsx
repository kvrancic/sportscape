import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';

const mockdata = [
  {
    title: 'Seamless Booking',
    description:
      'Effortlessly book venues for football, basketball, and volleyball with just a few clicks. Our intuitive interface ensures a smooth experience.',
    icon: IconGauge,
  },
  {
    title: 'Athlete and Vendor Profiles',
    description:
      'Create detailed profiles whether you’re an athlete or a venue vendor. Connect, engage, and manage your sports activities easily.',
    icon: IconUser,
  },
  {
    title: 'Secure Transactions',
    description:
      'We prioritize your privacy and security. All transactions are protected, ensuring a safe and trustworthy environment for all users.',
    icon: IconCookie,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.orange[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg" color='orange'>
          Sportscape Features
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Enhance Your Sports Experience with Sportscape
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Discover how Sportscape can revolutionize the way you book venues, connect with other athletes, and manage your sports activities.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
