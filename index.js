const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

// Synchronous method
// const textIn = fs.readFileSync("./txt/input.txt", 'utf-8');

// console.log(textIn);

// const textOut = `This is what we know about avocados: ${textIn}. \n This file was created at ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log(fs.readFileSync('./txt/output.txt','utf-8'));

// Asynchronous Method

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1)=>{
//     if(err) { console.log('Error 💥')};
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err,data3)=>{
//             console.log(data3);

//         fs.writeFile('./txt/final.txt', `${data2} \n ${data3}`, 'utf-8', err=> {
//             if(err) {console.log('FATHA 🤪')};
//         })
//     })
//     })
// });
// console.log('Reading Files...wet');

//////////////////// SERVER ///////////////////////////////

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const replaceTemplate = require('./modules/replaceTemplate');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  const head = {
    'Content-type': 'text/html',
    'my-custom-header': 'tudududururururooooooo tudududorooorooooo',
  };
  //overview page
  if (pathname === '/' || pathname === '/overview') {
    const cardsHtml = dataObj
      .map((el) => {
        return replaceTemplate(templateCard, el);
      })
      .join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.writeHead(200, head);
    res.end(output);

    //product page
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.writeHead(201, head);
    res.end(output);
  } // api
  else if (pathname === '/api') {
    res.writeHead(201, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    //not found
    res.writeHead(404, head);
    res.end('<h1>Page not Found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server Started on port 8000');
});

// jUsT pRaTiCiNg

// const afile = fs.readFileSync(`${__dirname}/txt/final.txt`, 'utf-8');

// const server2 = http.createServer((req,res)=>{
//     const {pathname} = url.parse(req.url,true)
//     if(pathname === '/f'){
//         res.end(afile);
//     } else{
//         res.end("404")
//     }
// });
// server2.listen(5000, "127.0.0.1", ()=>{
//     console.log("server at 5000");
// })
