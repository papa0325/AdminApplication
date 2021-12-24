const Team = require('../models/team')
const create = async (req, res) => {
    let request = req.body.toString();
    const { email, teamname } = JSON.parse(request)
    let team = await Team.find({ 
        "teamadmin": email, 
        "teamname":"My team" 
    }, function(err, result){
        if(err) {
            console.log(err);
            return null
        }
        return result;
    });
    if (team.length !== 0){
        return res.status(200).json({ 
            msg: "created team with such email and name already" 
        });
    }
    let member = await Team.findOne({
        "teammember": { $elemMatch: 
            {"confirmed": true , 
            "email": email}
        }}, function(err, result) {
            if (err) {
                console.log(err);
                return null
            }
            return result
        });
    if (member) {
        return res.status(200).send("already exist")
    }
    newteam = new Team ({
        'teamname': teamname,
        'teamadmin':email,
        "teammember": [{
            email,
            confirmed: true
        }]
    })
    newteam.save()
    .then(() => {
        res.status(200).json({
            name: "My team", 
            src: "", raw:""
        })
    })
    .catch(err => {
        res.status(500).json({ 
            msg: "Server Error" 
        })
    })
}

const update = async (req, res) => {
    let request = req.body.toString();
    const { currentname, updatename, updatesrc } = JSON.parse(request)
    // Find team data with current name
    let teamData = await Team.findOne({
        "teamname":currentname}, 
        function (err, result) {
            if (err) {
                console.log(err)
                return null
            }
            return result
        }
    ) 
    if (!teamData) {
        res.status(200).send("No Such team exist")
        return
    }
    //update team name and logo source to updatename and logo source
    Team.updateOne(
        {"teamname":currentname},
        {
            $set: {
                "teamname":updatename,
                "teamsrc":updatesrc
            }
        }, function(err, resp) {
            if (err) res.status(500).json({
                msg: "Server Error"
            })
            else {
                res.status(200).json({
                    name:updatename, 
                    src: updatesrc,
                    raw:""
                })
            }
        }
    )
}

const get = async (req, res) => {
    console.log("sagasdf")
    let request = req.body.toString();
    const { email } = JSON.parse(request)
    let team = await Team.find({ 
        "teamadmin": email 
    }, function(err, result) {
        if (err) {
            console.log(err)
            return null
        }
        return result
    })
    if (team) res.status(200).send(team)
    else res.status(200).json({ 
        name: "My team", 
        src: "", 
        raw:""
    })
}

const getbyname = async (req, res) => {
    let name = req.query.teamname
    let team = await Team.findOne({
        "teamname":name
    })
    if (team) res.status(200).json({
        name:team.teamname, 
        src:team.teamsrc, 
        raw:""
    })
}
module.exports = { create, update, get, getbyname }