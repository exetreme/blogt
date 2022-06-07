const mongoose =require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/blog')
    .then(()=> console.log("db conected"))
    .catch((err)=> console.log("db conect faild", err.message || err))
    