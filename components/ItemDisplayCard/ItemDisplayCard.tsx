import { AspectRatio, Badge, Group, Image, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { GeneralItem } from '@/@type/DlsiteItem.types';
import { WORK_CATEGORY_NAME, getWorkUrl } from '@/common/const';
import { db } from '@/common/db';

export default function ItemDisplayCard(props: { item: GeneralItem }) {
  const [cats, setCats] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      await db.workCats
        .get(props.item.workno)
        .then((cat) =>
          setCats(
            cat?.cat.map((catNo) => WORK_CATEGORY_NAME[catNo]).filter((cat) => cat != undefined) ??
              []
          )
        );
    })();
  }, []);
  return (
    <Group
      wrap="nowrap"
      onClick={() => {
        window.open(getWorkUrl(props.item.workno), '_black');
      }}
      style={{ cursor: 'pointer' }}
      mb="10px"
      bg="rgba(55, 55, 55, 0.3)"
    >
      <AspectRatio ratio={4 / 3} w="min(20%, 250px)">
        <Image src={props.item.work_files.main} h="100%" radius="md" loading="lazy" />
      </AspectRatio>
      <Stack w="80%">
        <Text fw={700}>{props.item.name.ja_JP}</Text>
        <Text c="dimmed">{props.item.maker.name.ja_JP}</Text>
        <Group>
          {cats.map((cat) => (
            <Badge variant="outline">{cat}</Badge>
          ))}
        </Group>
      </Stack>
    </Group>
  );
}
