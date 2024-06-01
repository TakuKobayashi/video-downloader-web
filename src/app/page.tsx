import { Button, Input } from '@chakra-ui/react';

export default function Home() {
  return (
    <main>
      <div>
        <Input variant='outline' placeholder='youtube url' />
        <Button colorScheme='blue'>Download</Button>
      </div>
    </main>
  );
}
