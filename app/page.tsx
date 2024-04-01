'use client'
import AppLayout from '@/components/layout/AppLayout';
import ItemContainer from '@/components/container/ItemContainer';

export default function HomePage() {
  return (
    <AppLayout>
      {/* <Welcome />
      <ColorSchemeToggle /> */}
      <ItemContainer/>
    </AppLayout>
  );
}
