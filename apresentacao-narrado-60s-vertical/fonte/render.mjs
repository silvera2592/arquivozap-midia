import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const S = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1080,height:1920}, deviceScaleFactor:1 });
await p.goto('file://'+S+'/build/deck.html', {waitUntil:'load'});
await p.evaluate(()=>document.fonts.ready);
await p.waitForTimeout(600);
 await p.evaluate(()=>window.__fit && window.__fit());
 await p.waitForTimeout(200);
for (let i=1;i<=12;i++){
  const id = 's'+String(i).padStart(2,'0');
  const el = await p.$('#'+id);
  await el.screenshot({path:`${S}/out/${id}.png`});
}
await b.close();
console.log('done');
