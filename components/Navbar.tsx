"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen , setMenuOpen] = useState(false);
  const navLinks = [
    {name : "Home" , href : "/"},
    {name : "Events" , href : "/events"},
  ];
  return (
<nav className='bg-black text-white px-6 py-4 flex items-center justify-between mb-6'>
<Link href = "/" className = "text-2xl font-bold text-indigo-200 hover:text-indigo-300 transition">Store</Link>
<ul className='hidden md:flex gap-8 text-sm font-medium'>
  {navLinks.map((link) => {
    return (
      <li key={link.href}>
        <Link className={`hover:text-indigo-400 transition ${pathname === link.href ? "text-indigo-400" : "text-white"}`} href={link.href}>{link.name}</Link>
      </li>
    )
  })}
</ul>
<button className='md:hidden text-white text-xl' onClick={() => setMenuOpen(!menuOpen)}>☰</button>
{menuOpen && (
  <div className='absolute top-16 right-6 bg-gray-900 rounded-lg shadow-lg p-4 md:hidden'>
    <ul className='flex flex-col gap-4 text-sm font-medium'>
{navLinks.map((link) => (
  <li key={link.href}>
    <Link href={link.href}
    className={`block hover:text-indigo-400 transition ${pathname === link.href ? "text-indigo-400" : "text-white"}`} onClick={() => setMenuOpen(false)}>{link.name}</Link>
  </li>
))}
    </ul>
  </div>
)}
</nav>
  )
}

export default Navbar