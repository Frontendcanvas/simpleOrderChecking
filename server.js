 require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express()
const port = process.env.PORT || 4000
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/twitter',(req,res)=>{
    res.send('Hello Twitter!');
})
app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})