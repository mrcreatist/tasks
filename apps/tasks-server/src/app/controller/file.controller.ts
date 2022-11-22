import * as fs from 'fs';

const file = 'task-data.json';

export const FILE = {
  read: () => {
    if (!fs.existsSync(file)) FILE.write(null);
    const rawData = fs.readFileSync(file);
    return rawData.length ? JSON.parse(rawData.toString()) : [];
  },
  write: (dataStore) => {
    const data = JSON.stringify(dataStore);
    if (data && data.length) {
      fs.writeFileSync(file, data);
    }
  }
}
