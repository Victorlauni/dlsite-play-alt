import { GeneralItem } from '@/@type/DlsiteItem.types'
import { getWorkUrl } from '@/common/const'
import { AspectRatio, Group, Image, Stack, Text } from '@mantine/core'
import React from 'react'

export default function ItemDisplayCard(props: {item: GeneralItem}) {
  return (
    <Group wrap='nowrap' onClick={() => {window.open(getWorkUrl(props.item.workno), "_black")}} style={{border: "1px solid #555"}}>
      <AspectRatio ratio={1} w="20%">
        <Image src={props.item.work_files.main} h="100%" radius={"md"} loading='lazy'/>
      </AspectRatio>
      <Stack w="80%">
        <Text>{props.item.name.ja_JP}</Text>
        <Text>{props.item.maker.name.ja_JP}</Text>
      </Stack>
    </Group>
  )
}
