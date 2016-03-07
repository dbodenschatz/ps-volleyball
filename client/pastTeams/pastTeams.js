Template.pastTeams.helpers({
    dateFormat: function() {
        return moment(this.when).format('LL');
    },
    pastTeams: function() {
        var pastGames = PastTeams.find({}, {
            sort: {
                'when': 1
            }
        }).fetch();
        return pastGames;
    },
});
