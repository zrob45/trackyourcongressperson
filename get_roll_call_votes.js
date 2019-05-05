var get_votes = async function(congress_number, chamber_name, session_number, total_votes)
{
    var vote_list = [];

    for (var i = 1; i <= total_votes; i++)
    {
        var vote_number = i;

        await push_vote(vote_list, congress_number, chamber_name, session_number, vote_number);
    }

    return vote_list;
}

var push_vote = async function(vote_list, congress_number, chamber_name, session_number, vote_number){

    var Congress = require('propublica-congress-node');
    var congress_client = new Congress('lc9p4z5bQzKc9KHaCvE2U7qFOrdU9GF04qegdgKP');

    congress_client.votesRollCall(
        {
            congressNumber: congress_number,
            chamber: chamber_name,
            sessionNumber: session_number,
            rollCallNumber: vote_number

        }).then(function(res) 
        {
            res.results.votes._id = res.results.votes.vote.roll_call
            vote_list.push(res.results.votes);
        });
}

module.exports = get_votes