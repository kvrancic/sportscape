'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useForm } from '@mantine/form';
import { TextInput, MultiSelect, Button, Textarea, Container, Title, Text, Group } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { IconClock, IconMapPin, IconList, IconUser, IconTeapot } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import GoogleAddressSearch from '@/components/GoogleAddressSearch';

export function OfferingForm({ user }) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const placeholderImage = 'https://via.placeholder.com/600x400.png?text=Upload+an+Image';

  const form = useForm({
    initialValues: {
      name: '',
      address: '',
      coordinates: { lat: '', lng: '' },
      offeringPhoto: '',
      description: '',
      startTime: '',
      endTime: '',
      dow: [],
      sportType: [],
    },

    validate: {
      name: (value) => (value ? null : 'Name is required'),
      description: (value) => (value ? null : 'Description is required'),
      startTime: (value) => (value ? null : 'Start time is required'),
      endTime: (value) => (value ? null : 'End time is required'),
      dow: (value) => (value.length > 0 ? null : 'At least one day is required'),
      sportType: (value) => (value.length > 0 ? null : 'At least one sport type is required'),
    },
  });

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from('offerings').download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (form.values.offeringPhoto) downloadImage(form.values.offeringPhoto);
  }, [form.values.offeringPhoto]);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uuidv4()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('offerings').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { publicURL, error: urlError } = await supabase.storage.from('offerings').getPublicUrl(filePath);
      if (urlError) {
        throw urlError;
      }

      setAvatarUrl(publicURL);
      form.setFieldValue('offeringPhoto', filePath);
    } catch (error) {
      alert('Error uploading photo!');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const offeringId = uuidv4();

      const daysAvailable = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const dayAvailability = daysAvailable.reduce((acc, day) => {
        acc[`${day.toLowerCase()}_available`] = values.dow.includes(day);
        return acc;
      }, {});

      const sportTypes = ['Basketball 🏀', 'Football ⚽', 'Volleyball 🏐'];
      const sportAvailability = sportTypes.reduce((acc, sport) => {
        acc[`${sport.split(' ')[0].toLowerCase()}_available`] = values.sportType.includes(sport);
        return acc;
      }, {});

      const { error: offeringError } = await supabase.from('slot').insert({
        slot_id: offeringId,
        vendor_id: user.id,
        name: values.name,
        address: values.address,
        lat: values.coordinates.lat,
        lng: values.coordinates.lng,
        created_at: new Date().toISOString(),
        is_available: true,
        slot_photo: 'https://duelkbjyxfgctjrijjoe.supabase.co/storage/v1/object/public/offerings/' + values.offeringPhoto,
        description: values.description,
        start_time: values.startTime,
        end_time: values.endTime,
        ...dayAvailability,
        ...sportAvailability,
      });

      if (offeringError) throw offeringError;

      alert('Offering created successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating offering!', error);
      alert('Error creating offering!');
    } finally {
      setLoading(false);
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sportTypes = ['Basketball 🏀', 'Football ⚽', 'Volleyball 🏐'];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <Container size="lg" className="bg-white rounded-lg shadow-2xl p-6 space-y-6 xl:min-w-[800px]">
        <Title className="text-3xl font-bold text-center text-orange-600">Create New Offering</Title>
        <Text className="text-center text-gray-600">Fill out the details to create a new offering.</Text>

        <div className="relative">
          {avatarUrl ? (
            <div className="relative w-full h-[400px] rounded-md shadow-md">
              <img src={avatarUrl} alt="Offering Photo" className="w-full h-full object-cover rounded-md" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <input
                  style={{ visibility: 'hidden', position: 'absolute' }}
                  type="file"
                  id="single"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />
                <label htmlFor="single">
                  <Button component="span" className="bg-orange-500 hover:bg-orange-600">
                    {uploading ? 'Uploading ...' : 'Replace Photo'}
                  </Button>
                </label>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
              <Text className="text-gray-400">No Image Uploaded</Text>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <input
                  style={{ visibility: 'hidden', position: 'absolute' }}
                  type="file"
                  id="single"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />
                <label htmlFor="single">
                  <Button component="span" className="bg-orange-500 hover:bg-orange-600">
                    {uploading ? 'Uploading ...' : 'Upload Offering Photo'}
                  </Button>
                </label>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
          <TextInput
            label="Name"
            placeholder="Enter the name of the offering"
            {...form.getInputProps('name')}
            required
            classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
          />
          <div>
            <div className='flex gap-2 text-sm'>
              <IconMapPin size={16} />
              <p className="ml-2 text-sm font-medium">Address</p>
            </div>
            <GoogleAddressSearch onSelect={(val) => {
              form.setFieldValue('address', val.address);
              form.setFieldValue('coordinates', val.coordinates);
            }} />
          </div>
          <Textarea
            label="Description"
            placeholder="Enter a description for the offering"
            {...form.getInputProps('description')}
            required
            autosize
            minRows={4}
            classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
          />
          <Group grow>
            <TimeInput
              label="Start Time"
              placeholder="Select start time"
              icon={<IconClock size={16} />}
              {...form.getInputProps('startTime')}
              required
              classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
            />
            <TimeInput
              label="End Time"
              placeholder="Select end time"
              icon={<IconClock size={16} />}
              {...form.getInputProps('endTime')}
              required
              classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
            />
          </Group>
          <MultiSelect
            label="Day of the Week"
            placeholder="Select days"
            data={daysOfWeek}
            {...form.getInputProps('dow')}
            required
            classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
          />
          <MultiSelect
            label="Sport Type"
            placeholder="Select sports"
            data={sportTypes}
            {...form.getInputProps('sportType')}
            required
            classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
          />

          <div className="flex justify-end">
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 focus:ring-orange-500 focus:ring-offset-orange-200" loading={loading}>
              Create Offering
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
