import { Timeline, Text, Title, Space } from '@mantine/core';
import { IconUserPlus, IconCalendarEvent, IconUsers, IconBuilding, IconHeartHandshake,  IconMoneybag } from '@tabler/icons-react';

import React from 'react'

export const VendorTimeline = () => {
  return (
    <div className='flex flex-col'>
      <Title order={3}>Renting out sport facilities is a breeze:</Title>
      <Timeline color="orange" active={4} bulletSize={48} lineWidth={2} mt="md">
        <Timeline.Item bullet={<IconUserPlus size={36} />} title="Sign up">
          <Text size="sm">Sign up and create a vendor account</Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconBuilding size={36} />} title="Add facility info">
          <Text size="sm">Fill in the information about your facility and publish it</Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconUsers size={36} />} title="Wait for requests">
          <Text size="sm" >Wait for incoming requests</Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconHeartHandshake size={36} />} title="Accept requests">
          <Text size="sm">Accept the request you like the most</Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconMoneybag size={36} />} title="Profit">
          <Text size="md">Build a long-lasting customer base</Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
