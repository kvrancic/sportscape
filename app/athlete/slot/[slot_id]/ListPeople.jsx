'use client';

import { Avatar, Badge, Table, Group, Text } from '@mantine/core';
import React from 'react';
import Link from 'next/link';

const ListPeople = ({ people }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const rows = people.map((person) => (
    <Table.Tr key={person.athlete_id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={person.profile.picture_url || 'https://via.placeholder.com/40'} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              <Link href={`/athlete/profile/${person.athlete_id}`} className="text-blue-500 hover:underline">
                {person.profile.name}
              </Link>
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>{formatDate(person.joined_at)}</Table.Td>
      <Table.Td>
        {person.is_owner ? (
          <Badge variant="light">
            Owner
          </Badge>
        ) : (
          <Badge color="gray" variant="light">
            Member
          </Badge>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Person</Table.Th>
            <Table.Th>Joined</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default ListPeople;
