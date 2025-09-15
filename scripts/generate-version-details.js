import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

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

fs.writeFileSync('./public/version-details.json', JSON.stringify(versionInfo, null, 2));

console.log(`version-details.json updated to version ${versionInfo.version} and commit ${versionInfo.commitHash}`);
