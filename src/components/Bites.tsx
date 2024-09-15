import Bite from "./Bite";
import { headers } from 'next/headers';
import { BiteType } from './Bite';

export default async function Bites() {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  
  const apiUrl = `${protocol}://${host}/api/bites`;
  
  const response = await fetch(apiUrl, { cache: 'no-store' });
  const bites = await response.json();

  return (
    <div className="social-feed w-full max-w-[640px]">
      {bites?.map((bite: BiteType, index: number) => (
            <Bite
              bite={bite}
              key={index}
              showButtons={false}
              showTitles={false}
            />
          ))}
    </div>
    
  );
}
