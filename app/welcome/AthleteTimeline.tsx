import { Timeline, Text, Title, Space } from '@mantine/core';
import { IconUserPlus, IconCalendarEvent, IconUsers, IconMessageCircle, IconBuildingStore, IconPray } from '@tabler/icons-react';
import React from 'react'

export const AthleteTimeline = () => {
  return (
    <div className='flex flex-col'>
      <Title order={3}>Finding teammates has never been easier:</Title>
      <Timeline color="orange" active={5} bulletSize={48} lineWidth={2} mt="md">
        <Timeline.Item bullet={<IconUserPlus size={36} />} title="Sign up">
          <Text size="sm">Sign up and create an athlete account</Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconCalendarEvent size={36} />} title="Rent a facility">
          <Text size="sm">Rent a sport facility (or convince your friend to do so)</Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconUsers size={36} />} title="Create or join a slot">
          <Text size="sm">Create your own slot or join a friend&apos;s slot</Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconMessageCircle size={36} />} title="Plan the event">
          <Text size="sm">Use the group chat to plan out the best sports event ever</Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconPray size={36} />} title="Play">
          <Text size="md">Enjoy the game with your new friends</Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
