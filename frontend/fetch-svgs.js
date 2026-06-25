const fs = require('fs');
const path = require('path');
const https = require('https');

const svgs = {
  'github.svg': 'https://www.svgrepo.com/show/512317/github-142.svg',
  'google-drive.svg': 'https://www.svgrepo.com/show/452218/google-drive.svg',
  'slack.svg': 'https://www.svgrepo.com/show/452102/slack.svg',
  'gmail.svg': 'https://www.svgrepo.com/show/452213/gmail.svg',
  'trello.svg': 'https://www.svgrepo.com/show/349532/trello.svg',
  'airtable.svg': 'https://www.svgrepo.com/show/353383/airtable.svg',
  'dropbox.svg': 'https://www.svgrepo.com/show/475645/dropbox-color.svg',
  'calendar.svg': 'https://www.svgrepo.com/show/353803/google-calendar.svg',
  'notion.svg': 'https://www.svgrepo.com/show/354124/notion-icon.svg'
};

const outputDir = path.join(__dirname, 'assets', 'plugins');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (Status: ${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${path.basename(dest)}`);
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  for (const [filename, url] of Object.entries(svgs)) {
    try {
      await download(url, path.join(outputDir, filename));
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
}

run();
