// components/time-counter.tsx
'use client';

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function TimeSincePublication({ publishDate }: { publishDate: Date }) {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      const diff = now.getTime() - publishDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTimeElapsed();
    
    const interval = setInterval(calculateTimeElapsed, 1000);
    
    return () => clearInterval(interval);
  }, [publishDate]);

  const formatTime = () => {
    const { days, hours, minutes, seconds } = timeElapsed;
    
    if (days > 0) {
      return `Hace ${days} día${days > 1 ? 's' : ''}, ${hours} hora${hours > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `Hace ${hours} hora${hours > 1 ? 's' : ''}, ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}, ${seconds} segundo${seconds > 1 ? 's' : ''}`;
    } else {
      return `Hace ${seconds} segundo${seconds > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-medium">
      <Clock className="w-4 h-4" />
      <span>{formatTime()}</span>
    </div>
  );
}