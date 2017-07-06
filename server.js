var express = require('express');
var bodyParser= require('body-parser');
var methodOverride = require('method-override');
var app = express();
var jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var autoIncrement = require('mongodb-autoincrement');
var db;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());

var LocalUrl = 'mongodb://localhost:27017/mydb';
var RemoteUrl = 'mongodb://heroku_868pmk7c:kjf96ivatgru7hlebi04tf63r8@ds147052.mlab.com:47052/heroku_868pmk7c';

MongoClient.connect(RemoteUrl,function(err,database){
    // ... start the servers
    assert.equal(null,err); // err handler
    db = database;
    app.listen(process.env.PORT || 3000,function(){
        console.log('Server listening on 3000');
    });
});

// Company signup
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

app.post('/authenticate',function(req,res){
    // find the company
    db.collection('companies').findOne({email:req.body.email},function(err,result){
        if(err){
            res.send(500,err.message);
        }
        if (!result) {
            res.json({success:false,message:'Authentication failed. Company not found.'});
        }else{
            if (result.pass!=req.body.pass){
                res.json({success:false,message:'Authentication failed. Wrong password.'});
            }else{                
                // create a token
                var token = jwt.sign({companyId:result.companyId},'En un lugar de la mancha',{});        
                // return the information including token as JSON
                res.json({success:true,message:'Enjoy your token!',token:token});                
            }              
        }              
    });
});

// route middleware to verify a token
app.use(function(req,res,next){
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];  
    // decode token
    if (token){  
        // verifies secret and checks exp
        jwt.verify(token,'En un lugar de la mancha',function(err,decoded){      
            if (err) {
                return res.json({success:false,message:'Failed to authenticate token.'});    
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });  
    } else {  
        // if there is no token return an error
        return res.status(403).send({success:false,message:'No token provided.'});      
    }
});

// A partir de aqui no se ejecutan las rutas si no hay token...
// From here the routes are not executed if there is no token ...

app.get('/',function(req,res){
    console.log('Company Id: '+req.decoded.companyId);
    res.send('Hello World');
});

// List of companies allowed to login company
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
        var document = {clientId:autoIndex,companyId:req.decoded.companyId,email:req.body.email,pass:req.body.pass,firstname:req.body.firstname,secondname:req.body.secondname,phone:req.body.phone};
        db.collection('clients').save(document,function(err,result){
            assert.equal(null,err);    
            console.log('saved to database');        
            res.json(result);
        });
    });     
});

app.get('/clients',function(req,res){    
    db.collection('clients').find({companyId:req.decoded.companyId}).toArray(function(err,result){
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
        var document = {productId:autoIndex,companyId:req.decoded.companyId,stock:req.body.stock,name:req.body.name,price:req.body.price,tax:req.body.tax};
        db.collection('products').save(document,function(err,result){
            assert.equal(null,err);    
            console.log('saved to database');        
            res.json(result);
        });
    });     
});

app.get('/products',function(req,res){    
    db.collection('products').find({companyId:req.decoded.companyId}).toArray(function(err,result){
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
        var document = {billId:autoIndex,companyId:req.decoded.companyId,date:req.body.date,detail:req.body.detail};
        db.collection('bills').save(document,function(err,result){
            assert.equal(null,err);    
            console.log('saved to database');        
            res.json(result); // See README.md for detail extructure...and how to work with Postman
        });
    });     
});

app.get('/bills',function(req,res){    
    db.collection('bills').find({companyId:req.decoded.companyId}).toArray(function(err,result){
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); // To Postman by http://localhost:3000/bills GET
        }
    });     
});