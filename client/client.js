Meteor.startup(function() {
    Meteor.subscribe('userData');
});

// Global Helpers
Template.registerHelper("isAdmin", function (param2) {
    return Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'default-group');
});

Template.registerHelper("isSuperAdmin", function (param2) {
    return Roles.userIsInRole(Meteor.userId(), ['super-admin'], 'default-group');
});

Template.registerHelper("isCordova", function (param2) {
    return Meteor.isCordova;
});

Template.registerHelper("dateFormat", function (param2) {
    return moment(this.when).format('LL');
});



Template.hello.rendered = function() {
    var clipboard = new Clipboard('.btn-copy');
    clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        Materialize.toast('Copied to clipboard!', 4000);
        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
        Materialize.toast('Error coping!', 4000);
    });
}

Template.hello.helpers({

    onSuccess: function() {
        var id = this._id;
        return function(res, val) {
            Meteor.call('changeUserTitle', val, id, function(err, data) {
                if (err) {
                    console.error(err);
                    Materialize.toast('Error!', 4000);
                }
                Materialize.toast('Changed title', 4000);
            });
        }
    },

    isActive: function() {
        return Meteor.user().profile.active;
    }
});

Template.hello.events({

    'click #endSeason': function(e) {
        e.preventDefault();
        Meteor.call('endSeason', function(err, status) {
            if (err) {
                Materialize.toast('Error!', 4000);
                console.error(err);
            }

            if (status) {
                Materialize.toast('Cleared everything!', 4000);
            } else {
                Materialize.toast('Did nothing...', 4000);
            }
        });
    },
    'click #teamsModal': function(e) {
        e.preventDefault();
        $('#modal1').openModal();
    },
    'click #endSeasonModalBtn': function(e) {
        e.preventDefault();
        $('#endSeasonModal').openModal();
    },
    'click #createTeams': function(e) {
        e.preventDefault();
        if (Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'default-group')) {
            Meteor.call('createTeams', function(err, message) {
                if (err) {
                    Materialize.toast('error', 4000);
                    console.error(err);
                } else {
                    Materialize.toast(message, 4000);
                }
            });
        } else {
            Materialize.toast('Need to be an admin', 4000);
        }
    },
    'click #createTeamsOptimized': function(e) {
        e.preventDefault();
        if (Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'default-group')) {
            Meteor.call('createTeamsOptimized', function(err, message) {
                if (err) {
                    Materialize.toast('error', 4000);
                    console.error(err);
                } else {
                    Materialize.toast(message, 4000);
                }
            });
        } else {
            Materialize.toast('Need to be an admin', 4000);
        }
    }
});
