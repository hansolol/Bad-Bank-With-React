const MongoClient = require ('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

//connect to mongo

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {

    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }; 
    console.log('Connected to database');
   
    //connecting to myproject database   
    db = client.db('myproject');
});

//create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection ('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function (err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// return all users
function all(){
    return new Promise((resolve, reject) =>{
        const customers = db    
            .collection('users')
            .find({})
            .toArray(function(err, docs){
                err ? reject(err) : resolve(docs);
            });
    });
}

module.exports = {create,all};