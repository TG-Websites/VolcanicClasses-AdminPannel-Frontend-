import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const getCommitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch (e) {
    console.error('Error getting commit hash', e);
    return '';
  }
};

const versionInfo = {
  version: packageJson.version,
  commitHash: getCommitHash(),
};

const filePath = path.resolve(__dirname, 'src/components/common/VersionInfo.tsx');

const fileContent = `import React from 'react';

const VersionInfo: React.FC = () => {
  return (
    <div className="text-center text-xs text-gray-500">
      <p>Version: ${versionInfo.version}</p>
      <p>Commit: ${versionInfo.commitHash}</p>
    </div>
  );
};

export default VersionInfo;
`;

fs.writeFileSync(filePath, fileContent);

console.log(`VersionInfo.tsx updated to version ${versionInfo.version} and commit ${versionInfo.commitHash}`);
