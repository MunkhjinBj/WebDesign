import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import cssnano from 'cssnano';
import { minify } from 'terser';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minify CSS
const cssFilePath = path.join(__dirname, 'frontend', 'index.css');
const cssOutputPath = path.join(__dirname, 'dist', 'index.min.css');

fs.readFile(cssFilePath, 'utf8', (err, css) => {
  if (err) throw err;
  postcss([cssnano])
    .process(css, { from: cssFilePath, to: cssOutputPath })
    .then(result => {
      fs.writeFile(cssOutputPath, result.css, () => true);
      if (result.map) {
        fs.writeFile(cssOutputPath + '.map', result.map.toString(), () => true);
      }
    });
});

// Minify JS
/* const jsFilePath = path.join(__dirname, 'frontend', 'app.js');
const jsOutputPath = path.join(__dirname, 'dist', 'app.min.js');

fs.readFile(jsFilePath, 'utf8', (err, js) => {
  if (err) throw err;
  minify(js).then(result => {
    fs.writeFile(jsOutputPath, result.code, () => true);
    if (result.map) {
      fs.writeFile(jsOutputPath + '.map', result.map, () => true);
    }
  });
}); */