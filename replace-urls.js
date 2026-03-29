import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The 12 custom images added to the root directory
const images = [
  "/blake-verdoorn-cssvEZacHvQ-unsplash.jpg",
  "/condor-wei-HKUOwPiO4z0-unsplash.jpg",
  "/dr-muhammad-amer-TXJEdxs5Hh4-unsplash.jpg",
  "/fa-creation-XRoH4UMAE9g-unsplash.jpg",
  "/ffaamunchy-IxhT8pyjveY-unsplash.jpg",
  "/kalen-emsley-Bkci_8qcdvQ-unsplash.jpg",
  "/luke-richardson-dI7vfR1Bqcg-unsplash.jpg",
  "/paul-crook-vWpXyrKa0lU-unsplash.jpg",
  "/qasim-nagori-1x3qakkpzZU-unsplash.jpg",
  "/rohit-tandon-9wg5jCEPBsw-unsplash.jpg",
  "/zain-raza-BuEBAiZ5DSo-unsplash.jpg",
  "/zain-raza-vfJKqrzYwqo-unsplash.jpg"
];

// Regex to capture the base Unsplash URL without the ?w=...&q=... 
// because data.js has ?w=600 and also ?w=1920 for the *same* photo.
// We want to map the base ID to the same local photo.
const unsplashIdRegex = /https:\/\/images\.unsplash\.com\/(photo-[A-Za-z0-9\-_]+)(\?[A-Za-z0-9=&_]+)?/g;

// First pass: Find all unique unsplash photo IDs and map them to our local images
const urlMapping = {};
let imageIndex = 0;

function assignMapping(content) {
  let match;
  unsplashIdRegex.lastIndex = 0;
  while ((match = unsplashIdRegex.exec(content)) !== null) {
    const photoId = match[1]; // e.g. "photo-1612...88ed..."
    if (!urlMapping[photoId]) {
      urlMapping[photoId] = images[imageIndex];
      imageIndex = (imageIndex + 1) % images.length;
    }
  }
}

const dir = path.join(__dirname, 'src');

function findUniqueUrls(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findUniqueUrls(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      assignMapping(fs.readFileSync(fullPath, 'utf8'));
    }
  }
}

findUniqueUrls(dir);
console.log(`Mapped ${Object.keys(urlMapping).length} unique unsplash photos mapping to 12 local files.`);

// Second pass: Replace the URLs globally
function replaceDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Reset lastIndex for safety
      unsplashIdRegex.lastIndex = 0;
      
      let changed = false;
      const newContent = content.replace(unsplashIdRegex, (match, photoId) => {
        changed = true;
        return urlMapping[photoId];
      });

      if (changed) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Replaced in: ${fullPath}`);
      }
    }
  }
}

replaceDirectory(dir);
console.log("Done updating all image URLs to the new local files safely.");
