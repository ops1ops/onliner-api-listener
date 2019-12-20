const express = require('express');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.set('json spaces', 4);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});
let i = 0;
setInterval(async () => {
  const {data} = await axios.get('https://catalog.onliner.by/sdapi/catalog.api/search/videocard');
  console.log(data)
  console.log(i++);
}, 2000);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));