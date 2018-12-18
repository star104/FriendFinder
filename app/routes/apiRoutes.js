//* A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//* A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic

var friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var newFriend = req.body;
        var lowestDifference = null;
        var bestMatch;
        for( var i = 0; i < friends.length; i++){
            var currentFriend = friends[i];
            var totalDifference = 0;
            for(var j = 0; j < newFriend.scores.length; j++) {
                var diff = Math.abs(currentFriend.scores[j]) - Math.abs(newFriend.scores[j]);
                totalDifference += diff
            }

            if(totalDifference < lowestDifference || lowestDifference == null) {
                lowestDifference = totalDifference;
                bestMatch = currentFriend;
            }

        }
        // var totalScore = 0;
        // var minScore   = 40;
        // var bestMatch = 0;

        // for (var i = 0; i< req.body.scores.length; i++)
        // {
        //    totalScore += parseFloat(req.body.scores[i]);
        // }
        // req.body.totalScore = totalScore;
 
        // for (var j = 0; j<friends.length; j++)
        // {
        //   var tmpScore = Math.abs(totalScore - friends[j].totalScore);
        //   if (tmpScore<minScore)
        //   {
        //      minScore = tmpScore;
        //      bestMatch = j;
        //   }
        // }

        friends.push(req.body);

        // console.log(bestMatch);
        // console.table(friends[bestMatch]);
        
        res.json(bestMatch);

    });


   

};