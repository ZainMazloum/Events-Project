"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
const Navbar = () => {
    const pathname = usePathname();
    const [menuOpen , setMenuOpen] = useState(false) ;
    const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
  ];
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between mb-6">
        <Link href="/" className="text-2xl font-bold text-indigo-200 hover:text-indigo-300 transition duration-150">Store</Link>
        {/* Desktop links */}
        <ul className='hidden md:flex gap-8 text-sm font-medium'>
            {navLinks.map((link) => {
                return(
                    <li key={link.path}>
                        <Link className={`hover:text-indigo-400 transition ${pathname === link.path ? "text-indigo-400" : "text-white"}`} href={link.path}>{link.name}</Link>
                    </li>
                )
            })}
        </ul>

        {/* Mobile button - visible on small screens */}
        <button aria-label="Toggle menu" className='md:hidden text-white text-xl' onClick={() => setMenuOpen(!menuOpen)}>☰</button>

        {/* Mobile dropdown menu (renders only on small screens) */}
        {menuOpen && (
            <div className='absolute top-16 right-6 bg-gray-900 rounded-lg shadow-lg p-4 md:hidden'>
                <ul className='flex flex-col gap-4 text-sm font-medium'>
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link href={link.path}
                                className={`block hover:text-indigo-400 transition ${pathname === link.path ? "text-indigo-400" : "text-white"}`} onClick={() => setMenuOpen(false)}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )}
        </nav>
  )
}

export default Navbar
