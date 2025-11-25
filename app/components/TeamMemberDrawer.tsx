'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface TeamMemberDrawerProps {
  member: {
    id: string;
    fullName: string;
    designation: string;
    description: Document;
    imageUrl: string;
  };
}

export default function TeamMemberDrawer({ member }: TeamMemberDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group text-center relative">
      {/* Clickable Card */}
      <div 
        className="cursor-pointer transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden">
          <Image
            src={member.imageUrl ? `https:${member.imageUrl}` : '/placeholder-user.jpg'}
            alt={member.fullName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{member.fullName}</h3>
          <p className="text-[#f6b417] font-medium">{member.designation}</p>
          <div className="mt-2">
            <span className="text-sm text-gray-500 hover:text-[#f6b417] transition-colors">
              {isOpen ? 'View Less' : 'View More'}
            </span>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`fixed right-0 top-0 h-full w-full max-w-md bg-white transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{member.fullName}</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close drawer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={member.imageUrl ? `https:${member.imageUrl}` : '/placeholder-user.jpg'}
                alt={member.fullName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <h3 className="text-xl font-semibold text-[#f6b417] mb-4">{member.designation}</h3>
            
            <div className="prose max-w-none text-gray-700">
              {documentToReactComponents(member.description, {
                renderNode: {
                  'paragraph': (_node, children) => <p className="mb-4">{children}</p>,
                  'text': (node) => {
                    // Handle text node with proper typing
                    const text = (node as any).value || '';
                    return text.split('\n').map((line: string, i: number, arr: string[]) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ));
                  }
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
