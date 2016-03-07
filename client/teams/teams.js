Template.teams.helpers({
    team1: function() {
        var team = Team1.find({}).fetch();
        if (team.length === 1 && team[0].hasOwnProperty('team')) {
            if (_.findWhere(team[0].team, {
                    _id: Meteor.userId()
                })) {} else {}
            return {
                'team': team[0].team,
                'points': team[0].points,
                'teamPercentage': team[0].teamPercentage,
                'random': team[0].random
            };
        } else {
            return {
                'team': [],
                'points': 0,
                'teamPercentage': 0,
                'random': null
            };
        }
    },
    team2: function() {
        var team = Team2.find({}).fetch();
        if (team.length === 1 && team[0].hasOwnProperty('team')) {
            if (_.findWhere(team[0].team, {
                    _id: Meteor.userId()
                })) {} else {}
            return {
                'team': team[0].team,
                'points': team[0].points,
                'teamPercentage': team[0].teamPercentage,
                'random': team[0].random
            };
        } else {
            return {
                'team': [],
                'points': 0,
                'teamPercentage': 0,
                'random': null
            };
        }
    },
});

Template.teams.events({
    'click #team1Clear': function(e) {
        Meteor.call('clearTeam1', function(err, status) {
            if (err) {
                Materialize.toast('Error!', 4000);
                console.error(err);
            } else {
                if (status) {
                    Materialize.toast('Clear Home Team!', 4000);
                } else {
                    Materialize.toast('Did nothing...', 4000);
                }
            }
        });
    },
    'click #team2Clear': function(e) {
        Meteor.call('clearTeam2', function(err, status) {
            if (err) {
                Materialize.toast('Error!', 4000);
                console.error(err);
            } else {
                if (status) {
                    Materialize.toast('Clear Away Team!', 4000);
                } else {
                    Materialize.toast('Did nothing...', 4000);
                }
            }
        });
    },
    'click #removePlayer': function(e) {
        e.preventDefault();
        var teamId = $(e.currentTarget).attr("team-id");
        Meteor.call('removePlayer', {
            'id': this._id,
            'teamId': teamId
        }, function(err, status) {
            if (err) {
                Materialize.toast('Error!', 4000);
            }
            if (status) {
                Materialize.toast('Player Removed!', 4000);
            } else {
                Materialize.toast('Shit if I number...', 4000);
            }
        });
    },
    'click #team1Win': function(e) {
        e.preventDefault();
        Meteor.call('markTeam1Win');
        Materialize.toast('Home Team Won!', 4000);
    },
    'click #team2Win': function(e) {
        e.preventDefault();
        Meteor.call('markTeam2Win');
        Materialize.toast('Away Team Won!', 4000);
    }
})
