'use client'

import React, { useEffect, useState } from 'react';
import { Table, Modal, Text, Image, Badge } from '@mantine/core';
import { createClient } from '@/utils/supabase/client';
import RequestAccordion from '@/components/RequestAccordion';

const OfferingsTable = () => {
  const supabase = createClient();
  const [offerings, setOfferings] = useState([]);
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [opened, setOpened] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUserId(data?.user?.id);
      }
    };

    fetchUser();
  }, [supabase]);

  useEffect(() => {
    if (!userId) return;

    const fetchOfferings = async () => {
      const { data, error } = await supabase
        .from('slot')
        .select('*')
        .eq('vendor_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching offerings:', error);
      } else {
        setOfferings(data);
      }
    };

    fetchOfferings();
  }, [userId, supabase]);

  const handleRowClick = (offering) => {
    setSelectedOffering(offering);
    setOpened(true);
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const getSportEmojis = (offering) => {
    let emojis = '';
    if (offering.basketball_available) emojis += '🏀 ';
    if (offering.volleyball_available) emojis += '🏐 ';
    if (offering.football_available) emojis += '⚽ ';
    return emojis.trim();
  };

  return (
    <>
      <div className="overflow-x-auto shadow-2xl">
        <Table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-2xl">
          <thead className="bg-orange-500">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Availability</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offerings.map((offering) => (
              <tr key={offering.offering_id} onClick={() => handleRowClick(offering)} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{offering.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{offering.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatTime(offering.start_time)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatTime(offering.end_time)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge color={offering.is_available ? 'green' : 'gray'}>
                    {offering.is_available ? 'Available' : 'Not Available'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {selectedOffering && (
        <Modal opened={opened} onClose={() => setOpened(false)} title="Offering Details" size="lg" centered>
          <div className="text-center mb-4">
            <Image
              src={selectedOffering.slot_photo ? `${selectedOffering.slot_photo}` : 'https://via.placeholder.com/600x400.png?text=No+Image'}
              height={200}
              alt={selectedOffering.name}
              withPlaceholder
            />
          </div>
          <div className="mb-4">
            <Text fw={700} size="lg">Hours: ⏰ {formatTime(selectedOffering.start_time)} - {formatTime(selectedOffering.end_time)}</Text>
          </div>
          <div className="mb-4">
            <Text size="md">{selectedOffering.description}</Text>
          </div>
          <div className="mb-4">
            <Text size="sm">Sport: {getSportEmojis(selectedOffering)}</Text>
            <Badge color={selectedOffering.is_available ? 'green' : 'gray'}>{selectedOffering.is_available ? 'Available' : 'Not Available'}</Badge>
          </div>
          {selectedOffering.is_available && (
            <div className="mt-4">
              <RequestAccordion
                title="Requests"
                viewAllLink={`/requests/${selectedOffering.offering_id}`}
                requests={selectedOffering.requests || []}
              />
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

const OfferingsPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">Offerings</h1>
      <h3 className="text-md text-center mb-8" > Click on a row to view more </h3>
      <div className="max-w-7xl mx-auto">
        <OfferingsTable />
      </div>
    </div>
  );
};

export default OfferingsPage;
