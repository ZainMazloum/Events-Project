import React, { ReactNode } from 'react';
import Image from 'next/image';
import LogisticsItem from './logistics-item'; 

interface EventDetailsProps {
  title: string;
  date: string;
  address: string;
  image: string;
  imageAlt: string;
  children: ReactNode; 
}

const EventDetails: React.FC<EventDetailsProps> = (props) => {
  const { title, date, address, image, imageAlt, children } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  const addressText = address.replace(', ', '\n');

  return (
    // Wrapper Container: Dark background remains the same
    <div className="min-h-screen bg-gray-900 text-white pt-10 pb-20"> 

      {/* 1. EventSummary JSX (Title) */}
      <section className="w-full max-w-4xl mx-auto py-6 md:py-8 px-4 text-center">
        <h1 className="
          text-3xl md:text-5xl lg:text-6xl 
          font-extrabold 
          text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 
          tracking-tight
        ">
          {title}
        </h1>
      </section>

      {/* 2. EventLogistics JSX (Image, Date, Location) */}
      <section
        className="
          shadow-2xl rounded-2xl 
          bg-gray-800/80 p-8 md:p-12 
          max-w-5xl w-[90%] mx-auto 
          mt-10 
          text-gray-100 
          flex flex-col md:flex-row items-center justify-between gap-10
          border border-blue-700/50 
        "
      >
        {/* Image Container: Updated border color to blue */}
        <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-blue-500/50 shadow-lg shrink-0">
          <Image 
            src={image} 
            alt={imageAlt} 
            width={192} 
            height={192} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        {/* Logistics Items List */}
        <ul className="flex flex-col gap-6 justify-center items-center w-full md:w-auto">
          
          {/* Date Item: Updated text color to cyan/sky blue */}
          <LogisticsItem className="bg-white/10 px-6 py-3 rounded-xl shadow-md backdrop-blur-sm text-lg font-semibold text-cyan-400">
            <time>{humanReadableDate}</time>
          </LogisticsItem>
          
          {/* Location Item: Updated text color to a lighter blue/indigo */}
          <LogisticsItem className="bg-white/10 px-6 py-3 rounded-xl shadow-md backdrop-blur-sm text-lg font-semibold text-sky-400">
            <address className="not-italic whitespace-pre-line text-center">{addressText}</address>
          </LogisticsItem>
        </ul>
      </section>

      {/* 3. EventContent JSX (Description) */}
      <section
        className="
          text-gray-300 
          w-[90%] max-w-4xl 
          mx-auto mt-16 md:mt-24 
          text-center 
          px-4 py-8 
          text-lg leading-relaxed 
          bg-gray-800/60 rounded-xl shadow-lg
        "
      >
        {children}
      </section>
    </div>
  );
};

export default EventDetails;