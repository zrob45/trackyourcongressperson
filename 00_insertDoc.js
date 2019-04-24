const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<ss2k@mit.edu>:<SSmitcee2018#>@cluster0-pbjpc.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
	// get handle on database
	const db = client.db("test");

	// create documents table
	const collection = db.collection('documents');

	var document = {
	       name :'peter',
	       email:'peter@mit.du',
	       age  :'18'
	};

	collection.insertOne(document, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
	});

	client.close();
});
