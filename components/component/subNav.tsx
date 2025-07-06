// components/SubNav.tsx
'use client'
// components/SubNav.tsx
import React, { useEffect, useRef, useState } from 'react';
import { NavigationMenuDemo } from './navigation-menu';

const SubNav: React.FC = () => {
  const subNavRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [originalPosition, setOriginalPosition] = useState(0);

  useEffect(()=>{
    if (subNavRef.current) {
        setOriginalPosition(subNavRef.current.offsetTop);
      }else{
          return;
      }
  },[]);

  useEffect(() => {
    

    const handleScroll = () => {
      if (subNavRef.current) {
        const currentScrollY = window.scrollY;

        if (currentScrollY > originalPosition - 100) {
          setIsSticky(true);
          
        } else {
          setIsSticky(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, originalPosition]);

  return (
    <div ref={subNavRef} className={`w-full bg-transparent py-2 transition-all duration-300 ${isSticky ? 'fixed top-[64px] bg-gray-900/50 backdrop-blur-md shadow-md' : ''}`}>
      <div className="pt-10 flex justify-center">
            <NavigationMenuDemo />
          </div>
    </div>
  );
};

export default SubNav;
