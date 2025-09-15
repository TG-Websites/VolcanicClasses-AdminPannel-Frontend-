import React from 'react';
import VersionInfo from '../components/common/VersionInfo';

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4 px-6 text-center">
      <VersionInfo />
    </footer>
  );
};

export default AppFooter;
