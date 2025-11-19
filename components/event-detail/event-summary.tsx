import React from "react";

interface EventSummaryProps {
  title: string;
}

const EventSummary: React.FC<EventSummaryProps> = ({ title }) => {
  return (
    <section className="w-full max-w-4xl mx-auto py-6 md:py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
        {title}
      </h1>
    </section>
  );
};

export default EventSummary;
