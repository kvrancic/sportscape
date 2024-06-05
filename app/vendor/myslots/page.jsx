import React from 'react';
import OfferingsTable from './OfferingsTable';
import Link from 'next/link';

const OfferingsPage = () => {
  return (
    <div className=" p-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <Link href="/dashboard" className="flex items-center bg-orange-500 duration-300 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
            </svg>
            Return to Dashboard
        </Link>
      </div>
      <div className="max-w-7xl mx-auto">
        <OfferingsTable />
      </div>
    </div>
  );
};

export default OfferingsPage;