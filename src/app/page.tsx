// src/app/page.tsx

'use client';

import { Button } from 'devsoo-storybook-design-system';

export default function Home() {
  return (
    <>
      <Button variant="primary" size="lg" onClick={() => alert('하이')}>
        안녕
      </Button>
    </>
  );
}
