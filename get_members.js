
var get_members = async function(congress_number, chamber_name){

    var Congress = require('propublica-congress-node');
    var congress_client = new Congress('Jwv1iT56aP72MtbpW30wgyJOnhET6mPEV4nhkiHX');

    var member_list = []

    congress_client.memberLists(
        {
            congressNumber: congress_number,
            chamber: chamber_name
        }).then(function(res) 
        {
            res.results[0].members.forEach(function(member)
            {
                var modified_member = {};

                modified_member._id = member.id;
                modified_member.title = member.title;
                modified_member.first_name = member.first_name;
                modified_member.middle_name = member.middle_name;
                modified_member.last_name = member.last_name;
                modified_member.suffix = member.suffix;
                modified_member.gender = member.gender;
                modified_member.party = member.party;
                modified_member.url = member.url;
                modified_member.in_office = member.in_office;
                modified_member.total_votes = member.total_votes;
                modified_member.missed_votes = member.missed_votes;
                modified_member.total_present = member.total_present;
                modified_member.missed_votes_pct = member.missed_votes_pct;
                modified_member.votes_with_party_pct = member.votes_with_party_pct;
                modified_member.state = member.state;

                if (chamber_name == "senate")
                {
                    modified_member.state_rank = member.state_rank;
                }
                else if (chamber_name == "house")
                {
                    modified_member.district = member.district;
                }
                member_list.push(modified_member);
            });
        });

    return member_list;
}

module.exports = get_members