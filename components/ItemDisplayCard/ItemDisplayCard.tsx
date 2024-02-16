import { GeneralItem } from '@/@type/DlsiteItem.types'
import React from 'react'

export default function ItemDisplayCard(prop: {work: GeneralItem}) {
  return (
    <div>{prop.work.workno}</div>
  )
}
