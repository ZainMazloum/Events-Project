"use client"; // 👈 Required since we use React hooks & event handlers

import { useRef, FormEvent } from "react";
import { useRouter } from "next/navigation"; // 💡 NEW: Import useRouter for client-side navigation

// 💡 FIX: The component no longer needs the EventsSearchProps interface
// since it handles navigation internally.

export default function EventsSearch() {
  const router = useRouter(); // 💡 NEW: Initialize the router
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  function submitHandler(event: FormEvent) {
    event.preventDefault();

    const selectedYear = yearInputRef.current?.value;
    const selectedMonth = monthInputRef.current?.value;

    if (selectedYear && selectedMonth) {
      // 💡 FIX: Direct navigation using router.push
      const fullPath = `/events/${selectedYear}/${selectedMonth}`;
      router.push(fullPath); 
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-5xl mx-auto">
      <div className="flex gap-6 justify-center">
        <div className="flex flex-col">
          <label htmlFor="year" className="mb-1 text-sm font-medium text-gray-700">Year</label>
          <select 
            id="year" 
            ref={yearInputRef} 
            className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="month" className="mb-1 text-sm font-medium text-gray-700">Month</label>
          <select 
            id="month" 
            ref={monthInputRef} 
            className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="mt-4 bg-indigo-600 text-white font-semibold tracking-wide px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.01]"
      >
        Find Events
      </button>
    </form>
  );
}

