"use client";
import { useSearchStore } from '@/util/search.Store';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  const setSearch = useSearchStore((state)=>state.setSearch)

  const handleSearch=(e:any)=>{
    setSearch(e.target.value)
  }
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-lg font-bold mb-2 md:mb-0">
          My CRUD
        </div>
        <div className="mb-2 md:mb-0">
          <form className="flex items-center">
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-black"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-4 py-2 border border-l-0 border-gray-300 rounded-r-md"
            >
              &#128269;
            </button>
          </form>
        </div>
        <nav>
          {/* <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6"> */}
            {/* <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Add Item
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul> */}
        </nav>
      </div>
    </header>
  );
}
