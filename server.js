var express = require('express');
var bodyParser= require('body-parser');
var methodOverride = require('method-override');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var autoIncrement = require('mongodb-autoincrement');
var db;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());

var LocalUrl = 'mongodb://localhost:27017/mydb';

MongoClient.connect(LocalUrl,function(err,database){
    // ... start the servers
    assert.equal(null,err); // err handler
    db = database;
    app.listen(3000,function(){
        console.log('Server listening on 3000');
    });
});

app.get('/',function(req,res){
    res.send('Hello World');
});

// Company
app.post('/companies',function(req,res){     
    autoIncrement.getNextSequence(db,'companies',function(err,autoIndex){
        assert.equal(null,err);
        console.log('Next: '+autoIndex);
        var document = {companyId:autoIndex,email:req.body.email,pass:req.body.pass,companyname:req.body.companyname,phones:[{mobil:req.body.mobil,work:req.body.work}]};
        db.collection('companies').save(document,function(err,result){
            assert.equal(null,err);    
            console.log('saved to database');        
            res.json(result);
        });
    });     
});

app.get('/companies',function(req,res){    
    db.collection('companies').find().toArray(function(err,result){
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); // To Postman by http://localhost:3000/companies GET
        }
    });     
});

// Clients
app.post('/clients',function(req,res){     
    autoIncrement.getNextSequence(db,'clients',function(err,autoIndex){
        assert.equal(null,err);
        console.log('Next: '+autoIndex);
        var document = {clientId:autoIndex,companyId:req.body.companyId,email:req.body.email,pass:req.body.pass,firstname:req.body.firstname,secondname:req.body.secondname};
        db.collection('clients').save(document,function(err,result){
            assert.equal(null,err);    
            console.log('saved to database');        
            res.json(result);
        });
    });     
});

app.get('/clients',function(req,res){    
    db.collection('clients').find().toArray(function(err,result){
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); // To Postman by http://localhost:3000/clients GET
        }
    });     
});

// Products
app.post('/products',function(req,res){     
    autoIncrement.getNextSequence(db,'products',function(err,autoIndex){
        assert.equal(null,err);
        console.log('Next: '+autoIndex);
        var document = {productId:autoIndex,companyId:req.body.companyId,stock:req.body.stock,name:req.body.name,price:req.body.price,tax:req.body.tax};
        db.collection('products').save(document,function(err,result){
            assert.equal(null,err);    
            console.log('saved to database');        
            res.json(result);
        });
    });     
});

app.get('/products',function(req,res){    
    db.collection('products').find().toArray(function(err,result){
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); // To Postman by http://localhost:3000/products GET
        }
    });     
});

// Bills
app.post('/bills',function(req,res){     
    autoIncrement.getNextSequence(db,'bills',function(err,autoIndex){
        assert.equal(null,err);
        console.log('Next: '+autoIndex);
        var document = {billId:autoIndex,companyId:req.body.companyId,date:req.body.date,detail:req.body.detail};
        db.collection('bills').save(document,function(err,result){
            assert.equal(null,err);    
            console.log('saved to database');        
            res.json(result); // See README.md for detail extructure...and how to work with Postman
        });
    });     
});

app.get('/bills',function(req,res){    
    db.collection('bills').find().toArray(function(err,result){
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); // To Postman by http://localhost:3000/bills GET
        }
    });     
});