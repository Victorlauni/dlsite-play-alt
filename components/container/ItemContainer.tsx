import { Stack, Button } from '@mantine/core';
import ItemDisplayCard from '../ItemDisplayCard/ItemDisplayCard';
export default function ItemContainer(prop: {data: any[]}) {
  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      justify="flex-start"
    >
      {
        prop.data.map(i => <ItemDisplayCard work={i}/>)
      }
      <Button variant="default">1</Button>
      <Button variant="default">2</Button>
      <Button variant="default">3</Button>
    </Stack>
  );
}