import { GeneralItem } from '@/@type/DlsiteItem.types'
import React from 'react'

export default function ItemDisplayCard(props: {item: GeneralItem}) {
  return (
    <div>{props.item.workno}</div>
  )
}
