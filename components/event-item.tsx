
import React from "react";
import Link from "next/link";
import Image from "next/image"
// Define the prop types
interface EventItemProps {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
}

const EventItem: React.FC<EventItemProps> = ({ id, title, image, date, location }) => {
  // Converts the date string into a human-readable format like "October 19, 2025"
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Replaces commas in the address with newlines for better readability
  const formattedAddress = location.replace(/, /g, "\n");

  // Dynamic route for each event
  const exploreLink = `/events/${id}`;

  return (
    <li className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Image src={image} alt={title} width={250} height={160} className="w-full md:w-1/3 object-cover h-56 md:h-64" />
      {/* <img
        src={image}
        alt={title}
        className="w-full md:w-1/3 object-cover h-56 md:h-64"
      /> */}

      <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

          <div className="text-gray-500 text-sm mb-1">
            <time>{humanReadableDate}</time>
          </div>

          <div className="text-gray-600 whitespace-pre-line text-sm">
            <address>{formattedAddress}</address>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={exploreLink}
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Explore Event
          </Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
