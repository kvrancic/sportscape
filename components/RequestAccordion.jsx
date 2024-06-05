import { useEffect, useState } from 'react';
import { Accordion, ActionIcon, Center, Grid, Text, Card, Group, Button } from '@mantine/core';
import { IconCheck, IconX, IconBallBasketball, IconBallFootball, IconBallVolleyball, IconInfoCircle } from '@tabler/icons-react';
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

function RequestAccordion({ title, requests, viewAllLink, limit = 0 }) {
  const limitedRequests = limit > 0 && requests ? requests.slice(0, limit) : requests;
  const items = !requests ? '' : limitedRequests.map((request) => (
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
    <div >
      {requests.length === 0 ? (
        <Center style={{ color: 'gray', textAlign: 'center', flexDirection: 'column', marginTop:'120px' }}>
          <IconInfoCircle size={64} />
          <Text>No requests available</Text>
        </Center>
      ) : (
        <Accordion variant="separated">
          {items}
        </Accordion>
      )}
    </div>
  );
}

export default RequestAccordion;
