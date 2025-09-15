import React from 'react';
import versionInfo from '../../version-details.json';

const VersionInfo: React.FC = () => {
  return (
    <div className="text-center text-xs text-gray-500">
      <p>Version: {versionInfo.version}</p>
      <p>Commit: {versionInfo.commitHash}</p>
    </div>
  );
};

export default VersionInfo;