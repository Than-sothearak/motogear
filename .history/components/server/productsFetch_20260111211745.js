import React from 'react'
import { ProductsPageComponent } from '../frontend/ProductsPageComponent'

export const ProductsFetch = async () => {
  return (
    <div><ProductsPageComponent  products={JSON.parse(JSON.stringify(products))}/></div>
  )
}
