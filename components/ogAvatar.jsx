'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { Button, Text, LoadingOverlay, Group } from '@mantine/core';

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (url) downloadImage(url);
  }, [url]);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
      setAvatarUrl(URL.createObjectURL(file));
    } catch (error) {
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <LoadingOverlay visible={uploading} overlayBlur={2} />
      <div className="flex flex-col items-center space-y-2 cursor-pointer" onClick={() => document.getElementById('single').click()}>
        {avatarUrl ? (
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full"
            style={{ height: size, width: size, objectFit: 'cover' }}
          />
        ) : (
          <div
            className="bg-gray-200 flex items-center justify-center rounded-full"
            style={{ height: size, width: size }}
          >
            <Text>No Image</Text>
          </div>
        )}
        <input
          style={{ visibility: 'hidden', position: 'absolute' }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
        <Button variant="outline" color="orange" onClick={() => document.getElementById('single').click()}>
          {uploading ? 'Uploading ...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
}