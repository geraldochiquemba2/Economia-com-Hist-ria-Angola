const puppeteer = require('puppeteer');
const path = require('path');

const pages = [
  'index.html', 
  'explorar.html', 
  'quiz.html', 
  'forum.html', 
  'discussao.html', 
  'perfil.html', 
  'admin.html', 
  'admin-estudantes.html', 
  'admin-conteudos.html', 
  'admin-relatorios.html', 
  'admin-forum.html'
];
const directoryInfo = 'file:///' + __dirname.replace(/\\/g, '/');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set PC viewport
  await page.setViewport({ width: 1440, height: 1080 });

  for (const file of pages) {
    const url = `${directoryInfo}/${file}`;
    console.log(`Capturing ${url}...`);
    
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Take full page screenshot
    const screenshotPath = path.join(__dirname, `Figma_${file.split('.')[0]}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    console.log(`Saved screenshot to ${screenshotPath}`);
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
})();
