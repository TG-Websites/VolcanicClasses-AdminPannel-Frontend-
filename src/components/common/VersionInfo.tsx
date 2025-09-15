import React, { useState, useEffect } from 'react';

const VersionInfo: React.FC = () => {
  const [versionInfo, setVersionInfo] = useState({ version: '', commitHash: '' });

  useEffect(() => {
    fetch('/version-details.json')
      .then((response) => response.json())
      .then((data) => setVersionInfo(data))
      .catch((error) => console.error('Error fetching version details:', error));
  }, []);

  return (
    <div className="text-center text-xs text-gray-500">
      <p>Version: {versionInfo.version}</p>
      <p>Commit: {versionInfo.commitHash}</p>
    </div>
  );
};

export default VersionInfo;
