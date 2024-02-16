'use client'
import AppLayout from '@/components/layout/AppLayout';
import ItemContainer from '@/components/container/ItemContainer';
import LoginModal from '@/components/LoginModal/LoginModal';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <AppLayout>
      {/* <Welcome />
      <ColorSchemeToggle /> */}
      <ItemContainer data={data}/>
    </AppLayout>
  );
}
