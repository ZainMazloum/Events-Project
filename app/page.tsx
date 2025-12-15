import React from 'react'
import { getFeaturedEvents } from '@/helpers/api-util'
import EventList from '@/components/EventsList'

export const revalidate = 3600;
export const metadata = {
  title:"NextJS Events",
  description : "Such a good events"
}

const HomePage = async () => {
  const featuredEvents = await getFeaturedEvents();
  
  return (
    <div className="p-4"> 
      
      {/* 💡 MODIFIED TITLE: Centered and styled */}
      <h1 className="text-4xl font-extrabold text-indigo-200 mb-8 mt-6 text-center">
        Featured Events:
      </h1>
      
      <EventList items={featuredEvents} />
    </div>
  )
}

export default HomePage