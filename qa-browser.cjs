const assert = require('node:assert/strict');
const fs = require('node:fs');
const puppeteer = require('puppeteer');
const schema = require('./schema');
const {createApp,generatePdfBuffer} = require('./server');
(async()=>{
 fs.mkdirSync('qa',{recursive:true});
 let fail=false, sends=0, pdf;
 const server=createApp({env:{},mailConfig:{from:'test@example.test',to:'clinic@example.test'},pdfFactory:async data=>{pdf=await generatePdfBuffer(data); return pdf;},emailSender:async()=>{sends++; return fail?{error:{message:'Synthetic mail failure',name:'test_error'}}:{data:{id:'mock-delivery'},error:null};}}).listen(0,'127.0.0.1');
 await new Promise(r=>server.once('listening',r));
 const browser=await puppeteer.launch({headless:true,executablePath:process.env.PUPPETEER_EXECUTABLE_PATH,args:['--no-sandbox']});
 try{
  const page=await browser.newPage(); const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const width of [1440,768,320]){
   await page.setViewport({width,height:1000});
   await page.goto(`http://127.0.0.1:${server.address().port}`,{waitUntil:'networkidle0'});
   const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,rtl:document.documentElement.dir,logo:document.querySelector('.clinic-logo').getBoundingClientRect().toJSON(),copy:document.querySelector('.header-copy').getBoundingClientRect().toJSON(),loaded:document.querySelector('.clinic-logo').naturalWidth,missing:window.MEDICAL_FORM_SCHEMA.fields.filter(f=>!document.getElementById(f.key)).map(f=>f.key)}));
   assert.equal(layout.rtl,'rtl');assert.ok(layout.scroll<=width,JSON.stringify(layout));assert.ok(layout.loaded>0);assert.deepEqual(layout.missing,[]);assert.ok(layout.logo.x>layout.copy.x+layout.copy.width,'Logo stays on the right side');
   await page.screenshot({path:`qa/form-${width}.png`,fullPage:true});
   await page.screenshot({path:`qa/viewport-${width}.png`});
   console.log('Layout verified',width,'logo width',layout.logo.width);
  }
  await page.click('#submit-button'); await page.waitForSelector('#message-dialog[open]');assert.equal(sends,0);await page.click('#dialog-close');
  await page.evaluate(()=>{
   const values={patientName:'בדיקה טכנית',patientPhone:'0521234567',examinedByDoctor:'כן',doctorSpecialty:'פה ולסת',examinationType:'נוירולוגית',vasPainScore:'7',physiotherapistName:'בדיקה בלבד',physiotherapistSignature:'חתימת בדיקה',examinationDate:'2026-10-29'};
   for(const [k,v] of Object.entries(values)){const input=document.getElementById(k);input.value=v;input.dispatchEvent(new Event('input',{bubbles:true}));}
  });
  fail=true;await page.click('#submit-button');await page.waitForSelector('#message-dialog[open]',{timeout:60000});
  assert.ok(await page.evaluate(()=>document.querySelector('#message-dialog').classList.contains('is-error')));await page.click('#dialog-close');
  assert.equal(await page.evaluate(()=>document.getElementById('doctorSpecialty').value),'פה ולסת');
  fail=false;await page.click('#submit-button');await page.waitForSelector('#message-dialog[open]',{timeout:60000});
  assert.equal(await page.evaluate(()=>document.querySelector('#message-dialog').classList.contains('is-error')),false);await page.click('#dialog-close');
  await page.waitForFunction(()=>document.getElementById('patientName').value==='');assert.equal(sends,2);assert.deepEqual(errors,[]);
  fs.writeFileSync('qa/intake-sample.pdf',pdf);
  console.log('Verified required validation, failed-mail preservation, retry, successful reset and zero page errors. Mail transport mocked.');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
