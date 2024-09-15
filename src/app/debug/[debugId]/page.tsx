'use client'

import { useParams } from 'next/navigation';

export default function DebugPage() {
  const params = useParams();
  const debugId = params?.debugId ?? 'default';

  console.log('Debug ID:', debugId);

  return (
    <div>
      <h1>Debug Page</h1>
      <p>Debug ID: {debugId}</p>
    </div>
  );
}