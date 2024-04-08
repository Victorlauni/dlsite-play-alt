import { Button, Checkbox, CheckboxGroup, Chip, ChipGroup, Group, Stack, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { fetchCat, update } from '../LoginModal/LoginModalAction'
import { db } from '@/common/db'

export default function FilterSelector(props: {setIsAuth: (auth: boolean) => void}) {
  const [cat, setCat] = useState<string[]>([])
  const [type, setType] = useState<string>("sound")

  useEffect(() => {
    (async () => {
      const isItemFetched = await db.items.count() > 0;
      if (!isItemFetched) await updateItemsList()
    })()
  }, [])

  const updateItemsList = async () => {
    try {
      const items = await update()
      for (let item of items) {
        await db.items.put(item).catch(e => console.error(e))
        console.log(item)
      }

      await updateItemsCat()
      console.log("Update Completed.")
    } catch(e) {
      props.setIsAuth(false)
      localStorage.setItem('auth', 'false')
    }
  }

  const updateItemCat = async (workno: string) => {
    const cats = await fetchCat(workno)
    await db.workCats.put({workno: workno, cat: cats})
    console.log(`${workno} completed.`)
  }

  const updateItemsCat = async () => {
    const totalItems = await db.items.count()
    const asyncThreads = 10
    for (let i = 0; i < totalItems; i += asyncThreads) {
      let listOfKey: string[] = []
      let asyncList = []
      await db.items.offset(i).limit(asyncThreads).primaryKeys(keys => listOfKey = keys)
      for (let key of listOfKey) {
        asyncList.push(updateItemCat(key))
      }
      await Promise.all(asyncList)
    }
  }

  return (
    <Stack>
        <CheckboxGroup value={cat} onChange={setCat} label="Work Categories">
          <Group>
            <Checkbox value="test" label="test"/>
          </Group>
        </CheckboxGroup>
        <Text>Work Type</Text>
        <ChipGroup value={type} onChange={setType} multiple={false}>
          <Chip value="sound">ASMR</Chip>
        </ChipGroup>
        <Group justify='center' grow>
            <Button>Reset</Button>
            <Button>Apply</Button>
        </Group>
        <Button onClick={updateItemsList}>Update</Button>
    </Stack>
  )
}
