import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, 'src');

const replacements = [
  // Dark overlays and gradients (Heroes)
  { regex: /#073d26/ig, replacement: '#003135' },
  { regex: /#0a5535/ig, replacement: '#013d42' },
  { regex: /#0d6940/ig, replacement: '#024950' },
  { regex: /#115e3a/ig, replacement: '#024950' },
  { regex: /rgba\(7,61,38,/ig, replacement: 'rgba(0,49,53,' },

  // Packages Hero blue/slate -> Teal
  { regex: /#0f2240/ig, replacement: '#002225' },
  { regex: /#1a3050/ig, replacement: '#01363a' },
  { regex: /#1e3a5f/ig, replacement: '#014950' },
  { regex: /rgba\(15,34,64,/ig, replacement: 'rgba(0,34,37,' },

  // Blog Hero purple -> Teal
  { regex: /#1e1b4b/ig, replacement: '#002225' },
  { regex: /#3730a3/ig, replacement: '#01363a' },
  { regex: /rgba\(30,27,75,/ig, replacement: 'rgba(0,34,37,' },

  // Base Green -> Sea Blue
  { regex: /#1a7a4a/ig, replacement: '#024950' },
  { regex: /#22a55f/ig, replacement: '#0FA4AF' },

  // Base Amber -> Rust
  { regex: /#d4881a/ig, replacement: '#964734' },
  { regex: /#f0a030/ig, replacement: '#b05742' },
  { regex: /#fbbf24/ig, replacement: '#964734' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(dir);
console.log("Done replacing colors.");
