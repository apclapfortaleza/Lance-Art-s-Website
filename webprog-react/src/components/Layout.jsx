import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans selection:bg-blue-500/30">
      <Navbar />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
