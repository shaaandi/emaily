const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send('Papa is here')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log('Server listening')
});