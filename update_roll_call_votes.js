var get_roll_call_votes = require('./get_roll_call_votes');

var congress_number_list = [115];
var chamber_name_list = ["house", "senate"];
var session_number_list = [1, 2];
var total_votes = 200;

async function update_roll_call_votes()
{
	for (var i = 0; i < congress_number_list.length; i++)
	{
		var congress_number = congress_number_list[i];

		for (var j = 0; j < chamber_name_list.length; j++)
		{
			var chamber_name = chamber_name_list[j];

            for(var k = 0; k < session_number_list.length; k++)
            {
                var session_number = session_number_list[k];

                await store_roll_call_votes(congress_number, chamber_name, session_number, total_votes);
            }
		}
	}
}

async function store_roll_call_votes(congress_number, chamber_name, session_number, total_votes)
{
	// Obtain data using ProPublica Congress API through NPM Package: propublica-congress-node
	var votes = await get_roll_call_votes(congress_number, chamber_name, session_number, total_votes);
	
	// Store on MongoDB
	setTimeout(function(){
		const MongoClient = require('mongodb').MongoClient;
		const uri = "mongodb+srv://admin:FpendLQVXlZzy2ad@cluster-aophb.mongodb.net/test?retryWrites=true";
		var client = new MongoClient(uri, { useNewUrlParser: true });

		client.connect(err => {
			// get handle on database
			const db = client.db("TrackYourCongressman");
			// get handle on table
			var collection_name = congress_number + "_" + chamber_name + "_" + session_number + "_votes";
			var collection = db.collection(collection_name);
			// insert data
			votes.forEach(function(vote)
			{
				collection.updateOne({_id: vote._id}, {$set: vote}, {upsert: true}, 
					function(err, res){ if (err) console.log(err);});
			});
            setTimeout(function()
            {
                console.log("Updated Votes of Session: "+session_number+" of "+chamber_name+" of Congress: "+congress_number);
            },100000);
			// close connection to database
			client.close();
		});
	},110000);
	
}

update_roll_call_votes();