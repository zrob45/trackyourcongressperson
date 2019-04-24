var $ = require("jquery");

$.ajax({
         url: "https://api.propublica.org/congress/v1/members/senate/RI/current.json",
         type: "GET",
         dataType: 'json',
         headers: {'X-API-Key': 'lc9p4z5bQzKc9KHaCvE2U7qFOrdU9GF04qegdgKP'}
       }).done(function(data){
       console.log(data)
       });