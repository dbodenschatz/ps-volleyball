Template.activeSwitch.helpers({
    'change #activeSelect': function(e) {
        e.preventDefault();
        var newValue = $(e.target).is(":checked");
        Meteor.call('changeStatus', newValue);
    }
});
