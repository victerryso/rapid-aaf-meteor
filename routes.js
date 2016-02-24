Router.route('/', {
  name: 'home'
});

Router.route('user', {
  path: '/:id',
  data: function() {
    return { user: Meteor.users.findOne(this.params.id) }
  }
});

Router.route('auth', {
  path: '/auth/jwt',
  where: 'server',
  action: function() {

    var assertion = this.request.body.assertion;
    var secret    = "hya8)rohan$_jp6*z8wa!3a8)9n=a(#d2j%06xxujrz*rlnrs7";
    var key       = 'https://aaf.edu.au/attributes'
    var token     = jwt.decode(assertion, secret);
    var email     = token[key].mail

    console.log(token);

    user = Accounts.findUserByEmail(email)

    if (user) {

      var userId = user._id
      var modifier = { $set: { profile: token[key] } }
      Meteor.users.update(userId, modifier)

    } else {

      var params = {
        email: email,
        password: 'qwerty',
        profile: token[key]
      }

      var userId = Accounts.createUser(params)
    }

    this.response.writeHead(302, { 'Location': '/' + userId });
    this.response.end();

  }
});
