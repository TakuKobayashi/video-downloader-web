'use client';

import { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import axios from 'axios';

export default function Home() {
  const [inputUrl, setInputUrl] = useState('');
  const onLoadVideoInfo = async (url: string) => {
    const form = new FormData();
    form.append('url', url);
    const response = await axios.post('/api/downloader', form);
    console.log(response.data);
  };
  return (
    <main>
      <div>
        <Input
          variant='outline'
          placeholder='youtube url'
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <Button colorScheme='blue' onClick={() => onLoadVideoInfo(inputUrl)}>
          Download
        </Button>
      </div>
    </main>
  );
}
