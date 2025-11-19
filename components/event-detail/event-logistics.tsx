 
import React from 'react';
// AddressIcon and DateIcon imports removed
import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';
import Image from 'next/image';
// 1. Define the props interface (remains the same)
interface EventLogisticsProps {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
}

const EventLogistics: React.FC<EventLogisticsProps> = (props) => {
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  const addressText = address.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
      <Image src={image} alt={imageAlt} width={300} height={300} />
      </div>
      <ul className={classes.list}>
        {/* 2. Remove the 'icon' prop from LogisticsItem */}
        <LogisticsItem >
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        {/* 2. Remove the 'icon' prop from LogisticsItem */}
        <LogisticsItem>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;