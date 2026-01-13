import React from 'react'
import HeroVideo from '../frontend/HeroVideo'
import { Content } from '@/models/Content'

export const HeroSection = async () => {
    const content = await Content.findOne()
    const hero = JSON.parse(JSON.stringify(content.hero))
  return (
    <div><HeroVideo hero={hero} /></div>
  )
}
