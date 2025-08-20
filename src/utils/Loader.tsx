import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    const timeout = setTimeout(() => setVisible(true), 6);

    return () => {
      document.body.classList.remove('no-scroll');
      clearTimeout(timeout);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'
        } bg-white/[.03] backdrop-blur-sm`}
    >
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
        </div>
        <p className="text-white mt-4">Processing, please wait...</p>
      </div>
    </div>,
    document.body
  );
};

export default Loader;
