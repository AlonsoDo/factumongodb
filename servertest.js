var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var insertDocument = function(db, callback) {
   db.collection('restaurants').save( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

//Query for All Documents in a Collection
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

// Query by a Top Level Field
/*var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find( { "borough": "Manhattan" } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

//Query by a Field in an Embedded Document
/*var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find( { "address.zipcode": "10075" } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

//Query by a Field in an Array
/*var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find( { "grades.grade": "B" } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

// Para mas Queries https://docs.mongodb.com/getting-started/node/query/
// Mas... https://docs.mongodb.com/getting-started/node/update/
// Mas... https://docs.mongodb.com/getting-started/node/remove/

/*var updateRestaurants = function(db, callback) {
   db.collection('restaurants').update(
      { "restaurant_id" : "41704620" },
      { $set: { "address.street": "East 31st Street" } },
      function(err, results) {
        console.log(results);
        callback();
   });
};*/

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err,db){
    assert.equal(null,err);
    console.log("Connected correctly to server.");
    /*insertDocument(db, function() {
      db.close();
    }); */
    findRestaurants(db, function() {
      db.close();
    });
    /*updateRestaurants(db, function() {
      db.close();
  });*/
});
