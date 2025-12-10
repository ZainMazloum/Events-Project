import React from 'react'
import { getFeaturedEvents } from '@/helpers/api-util'
import EventList from '@/components/EventsList'
export const revalidate = 3600;
export const metadata = {
  title:"NextJS Events",
  description : "Such a good events"
}
const HomePage =  async () => {
  const featuredEvents = await getFeaturedEvents();
  return (
    <div>
    <EventList items = {featuredEvents} />
    </div>
  )
}

export default HomePage
