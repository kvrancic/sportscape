'use client'

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useForm } from '@mantine/form';
import { TextInput, Rating, Radio, Group, Stack, NumberInput, Button, Space, Textarea, Text, Container, Title, SimpleGrid } from '@mantine/core';
import { IconUser, IconBuildingStore, IconBallBasketball, IconBallFootball, IconBallVolleyball } from '@tabler/icons-react';
import Avatar from '@/components/Avatar';
import './FinalizeProfile.module.css';
import { useRouter } from 'next/navigation'

export default function FinishProfile({ user }) {
  const supabase = createClient();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  const form = useForm({
    initialValues: {
      name: '',
      profilePicture: '',
      accountType: '',
      age: null,
      height: null,
      weight: null,
      aboutMe: '',
      basketballSkill: 0,
      footballSkill: 0,
      volleyballSkill: 0,
    },

    validate: {
      name: (value) => (value ? null : 'Name is required'),
      accountType: (value) => (value ? null : 'Account type is required'),
      age: (value, values) => (values.accountType === 'athlete' && (!value || value <= 0) ? 'Age is required and must be positive' : null),
      height: (value, values) => (values.accountType === 'athlete' && (!value || value <= 0) ? 'Height is required and must be positive' : null),
      weight: (value, values) => (values.accountType === 'athlete' && (!value || value <= 0) ? 'Weight is required and must be positive' : null),
      basketballSkill: (value, values) => (values.accountType === 'athlete' && (value < 1 || value > 5) ? 'Skill level must be between 1 and 5' : null),
      footballSkill: (value, values) => (values.accountType === 'athlete' && (value < 1 || value > 5) ? 'Skill level must be between 1 and 5' : null),
      volleyballSkill: (value, values) => (values.accountType === 'athlete' && (value < 1 || value > 5) ? 'Skill level must be between 1 and 5' : null),
    },
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const { error: profileError } = await supabase.from('profile').upsert({
        id: user.id,
        name: values.name,
        picture_url: avatarUrl,
        type: values.accountType,
      });

      if (profileError) throw profileError;

      if (values.accountType === 'athlete') {
        const { error: athleteError } = await supabase.from('athlete').upsert({
          athlete_id: user.id,
          age: values.age,
          height: values.height,
          weight: values.weight,
          about: values.aboutMe,
          basketball_skill: values.basketballSkill,
          football_skill: values.footballSkill,
          volleyball_skill: values.volleyballSkill,
        });

        if (athleteError) throw athleteError;
      } else if (values.accountType === 'vendor') {
        const { error: vendorError } = await supabase.from('vendor').upsert({
          vendor_id: user.id,
        });

        if (vendorError) throw vendorError;
      }

      alert('Profile updated!');
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating the data!', error);
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-2xl bg-white">
        <Title className="text-2xl font-bold mb-4 text-center text-orange-600">Complete Your Profile</Title>
        <Space h="lg" />
        <Text className="text-center mb-6 text-gray-600">Please complete your profile setup to start using the platform.</Text>

        <Space h="20" />
        
        <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col space-y-4">
          <TextInput
            label="Name"
            placeholder="Enter your name"
            {...form.getInputProps('name')}
            required
            classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
          />
          
          <Avatar
            uid={user.id}
            url={avatarUrl}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              form.setFieldValue('profilePicture', url);
            }}
          />
          {form.errors.profilePicture && (
            <Text color="red" size="xs">{form.errors.profilePicture}</Text>
          )}

          <Radio.Group
            label="Choose your account type"
            {...form.getInputProps('accountType')}
            required
          >
            <Stack pt="md" gap="xs">
              <Radio value="athlete" label={<Group><IconUser color="orange" fontSize="1.5rem" /> Athlete</Group>} />
              <Radio value="vendor" label={<Group><IconBuildingStore color="orange" fontSize="1.5rem" /> Vendor</Group>} />
            </Stack>
          </Radio.Group>

          {form.values.accountType === 'athlete' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NumberInput
                  label="Age"
                  placeholder="Enter your age"
                  {...form.getInputProps('age')}
                  classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
                />
                <NumberInput
                  label="Height (cm)"
                  placeholder="Enter your height"
                  {...form.getInputProps('height')}
                  classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
                />
                <NumberInput
                  label="Weight (kg)"
                  placeholder="Enter your weight"
                  {...form.getInputProps('weight')}
                  classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
                />
              </div>
              <Textarea
                label="About Me"
                placeholder="Tell us about yourself"
                {...form.getInputProps('aboutMe')}
                classNames={{ input: 'focus:border-orange-500 focus:ring-orange-500' }}
              />
              <SimpleGrid cols={1} spacing="md">
                <div className="flex flex-col items-center">
                  <Text>Basketball Skill Level</Text>
                  <Rating
                    value={form.values.basketballSkill}
                    onChange={(value) => form.setFieldValue('basketballSkill', value)}
                    emptySymbol={<IconBallBasketball size="2rem" />}
                    fullSymbol={<IconBallBasketball color="orange" size="2.5rem" />}
                    classNames={{
                      root: 'focus:ring-orange-500',
                    }}
                    required
                  />
                  {form.errors.basketballSkill && (
                    <Text color="red" size="xs">{form.errors.basketballSkill}</Text>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <Text>Football Skill Level</Text>
                  <Rating
                    value={form.values.footballSkill}
                    onChange={(value) => form.setFieldValue('footballSkill', value)}
                    emptySymbol={<IconBallFootball size="2rem" />}
                    fullSymbol={<IconBallFootball color="orange" size="2.5rem" />}
                    classNames={{
                      root: 'focus:ring-orange-500',
                    }}
                    required
                  />
                  {form.errors.footballSkill && (
                    <Text color="red" size="xs">{form.errors.footballSkill}</Text>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <Text>Volleyball Skill Level</Text>
                  <Rating
                    value={form.values.volleyballSkill}
                    onChange={(value) => form.setFieldValue('volleyballSkill', value)}
                    emptySymbol={<IconBallVolleyball size="2rem" />}
                    fullSymbol={<IconBallVolleyball color="orange" size="2.5rem" />}
                    classNames={{
                      root: 'focus:ring-orange-500',
                    }}
                    required
                  />
                  {form.errors.volleyballSkill && (
                    <Text color="red" size="xs">{form.errors.volleyballSkill}</Text>
                  )}
                </div>
              </SimpleGrid>
            </div>
          )}

          <Space h="lg" />

          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 focus:ring-orange-500 focus:ring-offset-orange-200" loading={loading}>
            Finish Setup
          </Button>
        </form>
      </div>
    </Container>
  );
}
