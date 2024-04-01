import { Stack, Button } from '@mantine/core';
import ItemDisplayCard from '../ItemDisplayCard/ItemDisplayCard';
import { useCallback, useEffect, useState } from 'react';
import { db, find } from '@/common/db';
import { GeneralItem } from '@/@type/DlsiteItem.types';
export default function ItemContainer() {
  const [displayItems, setDisplayItems] = useState<GeneralItem[]>([])

  useEffect(() => {
    (async () => {
      setDisplayItems(await find(10));
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
      <Button variant="default">1</Button>
      <Button variant="default">2</Button>
      <Button variant="default">3</Button>
    </Stack>
  );
}