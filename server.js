var express = require('express');
var bodyParser= require('body-parser');
var cors=require('cors');
var methodOverride = require('method-override');
var app = express();
var jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var autoIncrement = require('mongodb-autoincrement');
var db;

app.use(cors()); // To run 2 local servers without conflict
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());

var LocalUrl = 'mongodb://localhost:27017/mydb';

MongoClient.connect(LocalUrl,function(err,database){
    // ... start the servers
    assert.equal(null,err); // err handler
    db = database;
    app.listen(process.env.PORT || 3000,function(){
        console.log('Server listening on 3000');
    });
});

// Unprotect routes
app.get('/bills',function(req,res){    
    //db.collection('bills').find({companyId:req.decoded.companyId}).toArray(function(err,result){
    db.collection('bills').find({companyId:1}).toArray(function(err,result){   
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); // To Postman by http://localhost:3000/bills GET
        }
    });     
});

// Company signup
app.post('/companies',function(req,res){     
    autoIncrement.getNextSequence(db,'companies',function(err,autoIndex){
        if(err){
            res.send(500,err.message);
        }else{            
            console.log('Next: '+autoIndex);
            var document = { companyId:autoIndex,
                                    email:req.body.email,
                                    pass:req.body.pass,
                                    admin:req.body.admin,
                                    comercialcompanyname:req.body.comercialcompanyname,
                                    fiscalcompanyname:req.body.fiscalcompanyname,
                                    addres:req.body.addres,
                                    postalcode:req.body.postalcode,
                                    city:req.body.city,
                                    nif:req.body.nif,
                                    phones:{mobil:req.body.mobil,work:req.body.work}};
            db.collection('companies').save(document,function(err,result){
                if(err){
                    res.send(500,err.message);
                }else{   
                    console.log('saved to database');        
                    res.json(result);
                }
            });
        }
    });     
});

app.post('/authenticate',function(req,res){    
    // find the company
    db.collection('companies').findOne({email:req.body.email},function(err,result){
        if(err){
            res.send(500,err.message);
        }else{
            if (!result) {
                res.json({success:false,message:'Authentication failed. Company not found.'});
            }else{
                if (result.pass!=req.body.pass){
                    res.json({success:false,message:'Authentication failed. Wrong password.'});
                }else{
                    console.log('Token create');
                    console.log(result);
                    // create a token
                    var token = jwt.sign({companyId:result.companyId,admin:result.admin},'En un lugar de la mancha',{});        
                    // return the information including token as JSON
                    res.json({success:true,message:'Enjoy your token!',token:token,
                                comercialcompanyname:result.comercialcompanyname,
                                fiscalcompanyname:result.fiscalcompanyname,
                                addres:result.addres,postalcode:result.postalcode,
                                city:result.city,nif:result.nif,mobil:result.phones.mobil,
                                work:result.phones.work
                    });                
                }              
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
        return res.status(403).send({success:false,message:'No authenticate token provided.'});      
    }
});

// A partir de aqui no se ejecutan las rutas si no hay token...
// From here the routes are not executed if there is no authenticate token ...

app.get('/',function(req,res){
    console.log('Company Id: '+req.decoded.companyId);
    res.send('Hello World');
});

// List of companies 
app.get('/companies',function(req,res){    
    db.collection('companies').find().toArray(function(err,result){
        if(err){
            res.send(500,err.message);
        }else{        
            if (req.decoded.admin=='yes'){
                res.json(result); // To Postman by http://localhost:3000/companies GET
            }else{
                res.json({success:false,message:'Operation allowed only for administrators'}); 
            }            
        }
    });     
});

app.put('/companies',function(req,res){    
    console.log('Put');    
    console.log(req.decoded.companyId);
    var document = {companyId:req.decoded.companyId,email:req.body.email,pass:req.body.pass,admin:req.body.admin,
                            comercialcompanyname:req.body.comercialcompanyname,fiscalcompanyname:req.body.fiscalcompanyname,
                            addres:req.body.addres,postalcode:req.body.postalcode,city:req.body.city,nif:req.body.nif,
                            phones:{mobil:req.body.mobil,work:req.body.work}};    
    db.collection('companies').update({companyId:req.decoded.companyId},document,function(err,result){
        if(err){
            res.send(500,err.message);
        }else{   
            console.log('saved to database');
            console.log(result);
            res.json(result);
        }
    });    
});

// Clients
app.post('/newclient',function(req,res){     
    autoIncrement.getNextSequence(db,'clients',function(err,autoIndex){
        assert.equal(null,err);
        console.log('Next: '+autoIndex);
        var document = {clientId:autoIndex,companyId:req.decoded.companyId,email:req.body.email,
                                comercialnameclient:req.body.comercialnameclient,fiscalnameclient:req.body.fiscalnameclient,
                                addresclient:req.body.addresclient,postalcodeclient:req.body.postalcodeclient,cityclient:req.body.cityclient,
                                nifclient:req.body.nifclient,phones:{mobilphoneclient:req.body.mobilphoneclient,workphoneclient:req.body.workphoneclient},
                                personalcontactclient:req.body.personalcontactclient};
        db.collection('clients').save(document,function(err,result){
            assert.equal(null,err);    
            console.log('saved client to database');        
            res.json({ClientCode:autoIndex,CompanyCode:req.decoded.companyId});
        });
    });     
});

app.put('/updateclient',function(req,res){     
    
    console.log('ClientId = '+req.body.clientId);
    console.log('Comercial name = '+req.body.comercialnameclient);
    
    var document = {clientId:parseInt(req.body.clientId),companyId:req.decoded.companyId,email:req.body.email,
                            comercialnameclient:req.body.comercialnameclient,fiscalnameclient:req.body.fiscalnameclient,
                            addresclient:req.body.addresclient,postalcodeclient:req.body.postalcodeclient,cityclient:req.body.cityclient,
                            nifclient:req.body.nifclient,phones:{mobilphoneclient:req.body.mobilphoneclient,workphoneclient:req.body.workphoneclient},
                            personalcontactclient:req.body.personalcontactclient};
    db.collection('clients').update({clientId:parseInt(req.body.clientId)},document,function(err,result){
        if(err){
            res.send(500,err.message);
        }else{   
            console.log('update to database');
            console.log(result);
            res.json(result);
        }
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

app.post('/searchclients',function(req,res){     
    
    var cCad = req.body.orderresult;
    var mysort = {}; 
    mysort[cCad] = 1;    
    
    var cCad2 = req.body.contentsearchclient;
    
    if (cCad=='clientId'){
        cCad2=parseInt(cCad2);        
    }      
    
    var ObjToFind = {};
    ObjToFind['companyId']=req.decoded.companyId;    
    ObjToFind[cCad]={$gte:cCad2};
    
    if (cCad=='mobilphoneclient'){
        cCad = "phones.mobilphoneclient";
        ObjToFind = {};
        ObjToFind['companyId']=req.decoded.companyId;    
        ObjToFind[cCad]={$gte:cCad2};
        mysort = {};
        mysort = {"phones.mobilphoneclient":1};
        console.log(ObjToFind);
        console.log(mysort);
    }
    
    if (cCad=='workphoneclient'){
        cCad = "phones.workphoneclient";
        ObjToFind = {};
        ObjToFind['companyId']=req.decoded.companyId;    
        ObjToFind[cCad]={$gte:cCad2};
        mysort = {};
        mysort = {"phones.workphoneclient":1};
        console.log(ObjToFind);
        console.log(mysort);
    }
        
    db.collection('clients').find(ObjToFind).sort(mysort).toArray(function(err,result){
    
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); // To Postman by http://localhost:3000/searchclients GET
        }
    });     
});

app.post('/searchclientsfilter',function(req,res){     
    
    var cCad = req.body.orderresult;
    
    if (cCad=="mobilphoneclient") {
        cCad = "phones.mobilphoneclient";
    }else if (cCad=="workphoneclient") {
        cCad = "phones.workphoneclient";
    }
    console.log('Orden:'+cCad);    
    var mysort = {}; 
    mysort[cCad] = 1;
    console.log(mysort);
    
    var cCad2 = req.body.contentsearchclient;
    var regex;
    if (cCad=='clientId'){
        cCad2=parseInt(cCad2);
        console.log(cCad2);
        regex = cCad2;
    }else{
        regex = new RegExp(cCad2);
    }        
    
    var ObjToFind = {};
    ObjToFind['companyId']=req.decoded.companyId;    
    ObjToFind[cCad]=regex;    
    
    db.collection('clients').find(ObjToFind).sort(mysort).toArray(function(err,result){
    
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); 
        }
    });     
});

app.delete('/deleteclient',function(req,res){
    db.collection('clients').remove({clientId:parseInt(req.body.clientId)},function(err,result){
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); 
        }
    });
}); 

// Products
app.post('/newproduct',function(req,res){     
    autoIncrement.getNextSequence(db,'products',function(err,autoIndex){
        assert.equal(null,err);
        console.log('Next: '+autoIndex);
        var document = {productId:autoIndex,companyId:req.decoded.companyId,stock:req.body.stock,name:req.body.name,price:req.body.price,tax:req.body.tax,discount:req.body.discount};
        db.collection('products').save(document,function(err,result){
            assert.equal(null,err);    
            console.log('saved to database');        
            res.json({ProductCode:autoIndex,CompanyCode:req.decoded.companyId});
        });
    });     
});

app.put('/updateproduct',function(req,res){     
    console.log('ProductId = '+req.body.productId);
    console.log('Product name = '+req.body.name);                            
    var document = {productId:parseInt(req.body.productId),companyId:req.decoded.companyId,stock:req.body.stock,name:req.body.name,price:req.body.price,tax:req.body.tax,discount:req.body.discount};
    db.collection('products').update({productId:parseInt(req.body.productId)},document,function(err,result){
        if(err){
            res.send(500,err.message);
        }else{   
            console.log('update to database');
            console.log(result);
            res.json({ProductCode:req.body.productId,CompanyCode:req.decoded.companyId});
        }
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

app.post('/fillProduct',function(req,res){    
    console.log(parseInt(req.body.productCode))
    db.collection('products').findOne({ $and: [ { productId:parseInt(req.body.productCode) }, { companyId:req.decoded.companyId } ] } ,function(err,result){
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); 
        }
    });     
});

app.post('/searchproducts',function(req,res){     
    
    var cCad = req.body.orderresult;
    console.log('Orden:'+cCad);    
    var mysort = {};     
    
    var cCad2 = req.body.contentsearchproduct;
    
    if (cCad=='productId'){
        cCad2=parseInt(cCad2);
        console.log(cCad2);
    }
    
    if (cCad=='productName'){
        cCad='name';
        console.log(cCad);
    }
    
    mysort[cCad] = 1;
    console.log(mysort);
    
    var ObjToFind = {};
    ObjToFind['companyId']=req.decoded.companyId;    
    ObjToFind[cCad]={$gte:cCad2};    
    
    db.collection('products').find(ObjToFind).sort(mysort).toArray(function(err,result){
    
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); // To Postman by http://localhost:3000/searchproducts GET
        }
    });     
});

app.post('/searchproductsfilter',function(req,res){     
    
    var cCad = req.body.orderresult;
        
    var cCad2 = req.body.contentsearchproduct;
    var regex;
    if (cCad=='productId'){
        cCad2=parseInt(cCad2);
        console.log(cCad2);
        regex = cCad2;
    }else{
        cCad = 'name';
        regex = new RegExp(cCad2);
    }
    
    var mysort = {}; 
    mysort[cCad] = 1;
    console.log(mysort);
    
    var ObjToFind = {};
    ObjToFind['companyId']=req.decoded.companyId;    
    ObjToFind[cCad]=regex;    
    
    db.collection('products').find(ObjToFind).sort(mysort).toArray(function(err,result){
    
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); 
        }
    });
    
});

app.delete('/deleteproduct',function(req,res){
    db.collection('products').remove({productId:parseInt(req.body.productId)},function(err,result){
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); // To Postman by http://localhost:3000/products DELETE req.body.productId
        }
    });
}); 

// Bills
app.post('/savebill',function(req,res){     
    autoIncrement.getNextSequence(db,'bills',function(err,autoIndex){
        assert.equal(null,err);
        if(err){
            res.send(500,err.message);
        }
        console.log('Next: '+autoIndex);
        var document = {billId:autoIndex,companyId:req.decoded.companyId,clientId:req.body.clientId,clientName:req.body.clientName,date:req.body.date,detail:req.body.detail}; 
        db.collection('bills').save(document,function(err,result){
            assert.equal(null,err);
            if(err){
                res.send(500,err.message);
            }else{
                console.log('saved to database');        
                res.json(result); // See README.md for detail extructure...and how to work with Postman
            }        
        });
    });
    //console.log(req.body.test)
});










app.delete('/bills',function(req,res){
    db.collection('bills').remove({billId:parseInt(req.body.billId)},function(err,result){
        if(err){
            res.send(500,err.message);
        }else{        
            console.log(result);
            res.json(result); // To Postman by http://localhost:3000/bills DELETE req.body.billId
        }
    });
});    