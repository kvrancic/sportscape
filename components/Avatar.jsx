'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { LoadingOverlay, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

export default function Avatar({ uid, url, size, onUpload, editingAllowed = true }) {
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
    if (!editingAllowed) return;

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
    <div className="relative group">
      <LoadingOverlay visible={uploading} overlayBlur={2} />
      <div className="relative flex flex-col items-center space-y-2 cursor-pointer">
        {avatarUrl ? (
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full hover:opacity-75"
            style={{ height: size, width: size, objectFit: 'cover' }}
            onClick={editingAllowed ? () => document.getElementById('single').click() : null}
          />
        ) : (
          <div
            className="bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-200"
            style={{ height: size, width: size }}
            onClick={editingAllowed ? () => document.getElementById('single').click() : null}
          >
            <p className='font-bold justify-center text-center'>Click here to upload</p>
          </div>
        )}
        {editingAllowed && (
          <input
            style={{ visibility: 'hidden', position: 'absolute' }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        )}
      </div>
    </div>
  );
}
