import { Button, Group, Stack } from '@mantine/core'
import React from 'react'
import { update } from '../LoginModal/LoginModalAction'
import { db } from '@/common/db'

export default function FilterSelector(props: {setIsAuth: (auth: boolean) => void}) {

  const updateItemsList = async () => {
    try {
      const items = await update()
      for (let item of items) {
        await db.items.put(item).catch(e => console.error(e))
        console.log(item)
      }
    } catch(e) {
      props.setIsAuth(false)
      localStorage.setItem('auth', 'false')
    }
  }

  return (
    <Stack>
        <Group justify='center' grow>
            <Button>Reset</Button>
            <Button>Apply</Button>
        </Group>
        <Button onClick={updateItemsList}>Update</Button>
    </Stack>
  )
}
