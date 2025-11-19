import React from 'react'
// The utility is now correctly imported from the asynchronous helper file
import { getFeaturedEvents } from '@/helpers/api-util';
import EventList from '@/components/event-list';
import NewsletterRegistration from '@/components/input/newsletter-registration';

// 💡 NEW: Export the revalidate constant to enable Incremental Static Regeneration (ISR).
// This tells Next.js to check for new data every hour (3600 seconds) after the build.
// export const revalidate = 3600;
// export const metadata = {
//   title: 'NextJS Events',
//   description: 'Such a good events',
// };
export const revalidate = 3600;
export const metadata = {
  title:"NextJS Events",
  description : "Such a good events"
}

// 💡 FIX: The component is now declared as 'async'
const Home = async () => {
  // 💡 FIX: Use 'await' to resolve the Promise returned by getFeaturedEvents()
  const featuredEvents = await getFeaturedEvents();
  
  // NOTE: You don't need to handle loading states or errors here (use try/catch 
  // in api-util.ts and Next.js will handle the 500 error on the server).

  return (
    <div>
      <NewsletterRegistration />
      <EventList items = {featuredEvents}/>
    </div>
  )
}

export default Home;
