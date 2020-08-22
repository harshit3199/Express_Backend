const express= require('express');
const path=require('path');
const nodemailer=require('nodemailer');
const app=express();
const bodyParser= require('body-parser');
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/about', (req,res)=>{
  res.sendFile(path.join(__dirname,'about.html'));
});
app.get('/contact', (req,res)=>{
  res.sendFile(path.join(__dirname, 'contact.html'));
});
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'404.html'));
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/sendmail',(req,res)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harshit.yaduka@gmail.com',
      pass: 'Harshit@3199'
    }
  });

  var mailOptions = {
    from: 'harshit.yaduka@gmail.com',
    to: req.body.email,
    subject: 'Sending Email using Node.js'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

})
const PORT= 5000;
app.listen(PORT,()=> console.log(`Server Started in port ${PORT}`));
