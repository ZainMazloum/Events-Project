// 1. Rename the interface for clarity and proper capitalization
export interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image: string;
    isFeatured: boolean;
}

// 2. Define DUMMY_EVENTS as an ARRAY of the Event interface
export const DUMMY_EVENTS: Event[] = [
    // Your initial event, fixed with correct object syntax
    {
        id: 'e1',
        title: 'Programming for Everyone',
        description: 'Learn the basics of coding with interactive examples and hands-on projects.',
        location: '123 Main Street, Tech City',
        date: '2025-05-12',
        image: '/images/coding-event.jpg',
        isFeatured: false
    },
    
    // --- Added Dummy Events ---

    {
        id: 'e2',
        title: 'Networking & Startup Summit',
        description: 'Meet investors and founders, and discuss the future of tech. Free drinks and snacks provided!',
        location: 'Grand Convention Hall, Silicon Valley',
        date: '2025-08-25',
        image: '/images/coding-event.jpg',
        isFeatured: true // Featured event
    },
    {
        id: 'e3',
        title: 'Mastering TypeScript & Next.js',
        description: 'A deep dive into type safety and modern full-stack development using Next.js 15.',
        location: 'Online Webinar',
        date: '2025-10-01',
        image: '/images/coding-event.jpg',
        isFeatured: true // Featured event
    },
    {
        id: 'e4',
        title: 'Intro to UI/UX Design',
        description: 'Learn the fundamental principles of user interface and user experience design from industry experts.',
        location: 'Creative Hub Studio, Design District',
        date: '2025-11-20',
        image: '/images/coding-event.jpg',
        isFeatured: false
    },
    {
        id: 'e5',
        title: 'AI & Machine Learning Workshop',
        description: 'Hands-on training building simple neural networks. No prior AI knowledge required!',
        location: '404 Research Way, Data Town',
        date: '2026-01-05',
        image: '/images/coding-event.jpg',
        isFeatured: false
    }
];
export function getFeaturedEvents(): Event[] {
    // Returns an array of Event objects that are featured
    return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents(): Event[] {
    // Returns the entire array of Event objects
    return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter: { year: number; month: number }): Event[] {
    
    // Destructure the year and month from the argument
    const { year, month } = dateFilter;
    
const filteredEvents: Event[] = DUMMY_EVENTS.filter((event) => {
        const eventDate = new Date(event.date);

        // Convert event month (0-indexed) and filter month (1-indexed)
        const eventYear = eventDate.getFullYear();
        const eventMonth = eventDate.getMonth(); // 0 = Jan, 11 = Dec

        // The logic for filtering months is correct: month - 1 converts the
        // 1-based input month (e.g., 8 for August) to the 0-based index (7).
        return eventYear === year && eventMonth === month - 1;
    });

    return filteredEvents;
}
export default function getEventById(id : string){
    return DUMMY_EVENTS.find((event) => event.id === id)
}