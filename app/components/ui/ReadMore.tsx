'use client';

import { useState } from 'react';
import parse from 'html-react-parser';

interface ReadMoreProps {
  text: string;
  maxLength?: number;
}

const ReadMore = ({ text, maxLength = 185 }: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text) return null;
  
  if (text.length <= maxLength) {
    return <p className='text-[16px]'>{parse(text)}</p>;
  }

  const truncatedText = isExpanded ? text : `${text.substring(0, maxLength)}...`;

  return (
    <div>
      <p className='text-[16px]'>{parse(truncatedText)} <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[16px] hover:underline mt-1 text-sm font-bold underline"
      >
        {isExpanded ? 'Show less' : 'Read more'}
      </button></p>
    </div>
  );
};

export default ReadMore;
