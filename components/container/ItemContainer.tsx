import { Stack } from '@mantine/core';
import ItemDisplayCard from '../ItemDisplayCard/ItemDisplayCard';
import { useEffect, useState } from 'react';
import { find } from '@/common/db';
import { GeneralItem } from '@/@type/DlsiteItem.types';
export default function ItemContainer() {
  const [displayItems, setDisplayItems] = useState<GeneralItem[]>([])

  useEffect(() => {
    (async () => {
      setDisplayItems(await find(50));
    })();
  }, [])

  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      justify="flex-start"
    >
      {
        displayItems.map(item => {
          return <ItemDisplayCard item={item} key={item.workno}/>
        })
      }
    </Stack>
  );
}