var get_members = require('./get_members');

var congress_number_list = ["115","116"];
var chamber_name_list = ["house", "senate"];

async function update_members()
{
	for (var i = 0; i < congress_number_list.length; i++)
	{
		var congress_number = congress_number_list[i];

		for (var j = 0; j < chamber_name_list.length; j++)
		{
			var chamber_name = chamber_name_list[j];

			await store_member_list(congress_number, chamber_name);
		}
	}
}

async function store_member_list(congress_number, chamber_name)
{
	// Obtain data using ProPublica Congress API through NPM Package: propublica-congress-node
	var members = await get_members(congress_number, chamber_name);

	// Store on MongoDB
	setTimeout(function(){
		const MongoClient = require('mongodb').MongoClient;
		const uri = "mongodb+srv://admin:FpendLQVXlZzy2ad@cluster-aophb.mongodb.net/test?retryWrites=true";
		var client = new MongoClient(uri, { useNewUrlParser: true });

		client.connect(err => {
			// get handle on database
			const db = client.db("TrackYourCongressman");
			// get handle on table
			var collection_name = congress_number + "_" + chamber_name + "_members";
			var collection = db.collection(collection_name);
			// insert data
			members.forEach(function(member)
			{
				collection.updateOne({_id: member._id}, {$set: member}, {upsert: true}, 
					function(err, res){ if (err) console.log(err);});
			});
			console.log("Updated Members of "+chamber_name+" of Congress: "+congress_number);
			// close connection to database
			client.close();
		});
	},3000);
}

update_members();