'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Table, Avatar, ScrollArea, Text, SegmentedControl, Loader, Center, Group } from '@mantine/core';
import Link from 'next/link';
import { IconInfoCircle } from '@tabler/icons-react';
import classes from './SegmentedControl.module.css';

const UserSlots = () => {
  const supabase = createClient();
  const [ownedSlots, setOwnedSlots] = useState([]);
  const [joinedSlots, setJoinedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('Owned Slots');

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      const { data: user } = await supabase.auth.getUser();

      console.log(user.user.id);

      const { data: ownedSlotsData, error: ownedSlotsError } = await supabase
      .from('slot_member')
      .select('*, slot (*)')
      .eq('athlete_id', user.user.id)
      .eq('is_owner', true);

      const { data: joinedSlotsData, error: joinedSlotsError } = await supabase
        .from('slot_member')
        .select('*, slot (*)')
        .eq('athlete_id', user.user.id)
        .eq('is_owner', false);

      if (ownedSlotsError) console.error('Error fetching owned slots:', ownedSlotsError);
      if (joinedSlotsError) console.error('Error fetching joined slots:', joinedSlotsError);

      setOwnedSlots(ownedSlotsData || []);
      setJoinedSlots(joinedSlotsData || []);
      setLoading(false);
    };

    fetchSlots();
  }, [supabase]);

  const renderTableRows = (slots) => {
    return slots.map((item) => (
      <Table.Tr key={item.slot.slot_id}>
        <Table.Td>
          <Link href={`/athlete/slot/${item.slot.slot_id}`}>
            <Group gap="sm">
              <Avatar size={26} src={item.slot.slot_photo || 'https://via.placeholder.com/26'} radius={26} />
              <Text size="sm" fw={500}>
                {item.slot.name}
              </Text>
            </Group>
          </Link>
        </Table.Td>
        <Table.Td>
          {item.slot.basketball_available && '🏀 '}
          {item.slot.football_available && '⚽ '}
          {item.slot.volleyball_available && '🏐 '}
        </Table.Td>
        <Table.Td>
          {item.slot.monday_available && 'M '}
          {item.slot.tuesday_available && 'T '}
          {item.slot.wednesday_available && 'W '}
          {item.slot.thursday_available && 'T '}
          {item.slot.friday_available && 'F '}
          {item.slot.saturday_available && 'S '}
          {item.slot.sunday_available && 'S '}
        </Table.Td>
        <Table.Td>{item.slot.address}</Table.Td>
        <Table.Td>{item.slot.start_time} - {item.slot.end_time}</Table.Td>
      </Table.Tr>
    ));
  };

  const renderTable = (slots, title) => {
    return (
      <>
        {slots.length > 0 ? (
          <ScrollArea>
            <Table miw={800} verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Slot</Table.Th>
                  <Table.Th>Sport</Table.Th>
                  <Table.Th>Days</Table.Th>
                  <Table.Th>Address</Table.Th>
                  <Table.Th>Time</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{renderTableRows(slots)}</Table.Tbody>
            </Table>
          </ScrollArea>
        ) : (
          <Center className="flex flex-col items-center mt-8 min-h-[500px] justify-center align-center items-center">
            <IconInfoCircle size={64} />
            <Text>No slots available</Text>
          </Center>
        )}
      </>
    );
  };

  return (
    <div className="container mx-auto py-8 min-h-[800px]">
      <SegmentedControl
        data={['Owned Slots', 'Joined Slots']}
        onChange={setSelectedSection}
        classNames={classes}
        radius="lg"
      />
      {loading ? (
        <Center className="h-64">
          <Loader color="orange" size="xl" />
        </Center>
      ) : (
        <div className="mt-4 bg-gray-100">
          {selectedSection === 'Owned Slots' ? renderTable(ownedSlots, 'Owned Slots') : renderTable(joinedSlots, 'Joined Slots')}
        </div>
      )}
    </div>
  );
};

export default UserSlots;
