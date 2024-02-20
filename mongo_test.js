const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {

    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    
    console.log('Connected to database');

    // Database Name
    const dbName = 'myproject';
    const db = client.db(dbName);

    // New user
    const name = 'user' + Math.floor(Math.random() * 10000);
    const email = name + '@mit.edu';

    // Insert into customers collection
    const collection = db.collection('customers');
    const doc = { name, email };
    collection.insertOne(doc, function(err, result) {
        if (err) {
            console.error('Error inserting document:', err);
            return;
        }
        console.log('Document inserted');
    });

    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs){
            console.log('Collection:', docs);
            // clean up
            client.close();
        });
});


