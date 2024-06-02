import { useEffect, useState } from 'react';
import { Accordion, ActionIcon, Center, Grid, Text, Card, Group, Button } from '@mantine/core';
import { IconCheck, IconX, IconBallBasketball, IconBallFootball, IconBallVolleyball } from '@tabler/icons-react';
import Link from 'next/link';

function getSportIcon(sport) {
  switch (sport) {
    case 'basketball':
      return <IconBallBasketball size={16} />;
    case 'football':
      return <IconBallFootball size={16} />;
    case 'volleyball':
      return <IconBallVolleyball size={16} />;
    default:
      return null;
  }
}

function AccordionControl(props) {
  return (
    <Center style={{ width: '100%', justifyContent: 'space-between' }}>
      <Accordion.Control {...props} />
      <Group spacing="xs">
        <ActionIcon size="lg" variant="outline" color="gray">
          <IconCheck size="1rem" />
        </ActionIcon>
        <ActionIcon size="lg" variant="outline" color="gray">
          <IconX size="1rem" />
        </ActionIcon>
      </Group>
    </Center>
  );
}

function RequestAccordion({ title, requests, viewAllLink }) {
  const items = requests.map((request) => (
    <Accordion.Item key={request.offer_id} value={request.offer_id}>
      <AccordionControl icon={getSportIcon(request.sport)}>
        {request.athlete_id} - {request.offering_id}
      </AccordionControl>
      <Accordion.Panel>
        <Text>Details about the request</Text>
        {/* Add more details here */}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div>
      <Group position="apart" mb="md">
        <Text size="xl" fw={600}>{title}</Text>
        <Link href={viewAllLink} passHref>
          <Button variant="outline" color="orange">View All</Button>
        </Link>
      </Group>
      <Accordion variant="separated">
        {items}
      </Accordion>
    </div>
  );
}

export default RequestAccordion;
