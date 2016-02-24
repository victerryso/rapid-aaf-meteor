if (Meteor.isClient) {

  Template.home.helpers({
    loginURL: "https://rapid.test.aaf.edu.au/jwt/authnrequest/research/WzY9RP9P7Yck2ucx1QCBGw"
  });

  Template.user.helpers({
    user: function () {
      if (this.user && this.user.profile) {
        user = JSON.stringify(this.user.profile)
        user = user.replace(/\,/g, '<br>')
        user = user.replace(/\{|\}|\"/g, '')
        return user
      }
    }
  })

}
