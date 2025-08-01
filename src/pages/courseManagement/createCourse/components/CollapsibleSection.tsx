import { useState } from 'react';
import { VscFileSubmodule } from "react-icons/vsc";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, children, defaultOpen = false }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg overflow-hidden  hover:outline  hover:outline-brand-500">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 focus:ring-2 focus:ring-brand-500 transition-all"
      >
        <div className="flex items-center gap-2 text-gray-800">
          <VscFileSubmodule className="text-xl" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 space-y-2">
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-sm mt-1" />
                <div className="flex-1">{child}</div>
              </div>
            ))
          ) : (
            <div className="flex items-start gap-2">
              <div className="flex-1">{children}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
