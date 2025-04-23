import React from 'react';

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">🔧 Libra is under maintenance</h1>
      <p className="text-lg mb-6 text-center max-w-xl">
        We're working on something amazing. The site will be back online shortly.
      </p>
      <div className="animate-pulse text-sm text-gray-400">Please check back soon.</div>
    </div>
  );
}
