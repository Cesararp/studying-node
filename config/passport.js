var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    mongoose = require('mongoose');

module.exports = function(){

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: 'ce3757d882aadb0a8812',
        clientSecret: '077aa5f5bba99182c2528ae3888c31dda94b205b',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    }, function(accessToken, refreshToken, profile, done) {

        Usuario.findOrCreate(
            { "login" : profile.username},
            { "nome" : profile.username},
            function(erro, usuario) {
                if(erro) {
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }));

    // indica ao passport para serializar apenas o _id do usuário, para não onerar a memória
    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });

    // recebe o _id do usuario armazenado na sessão e realiza a desserialização
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
            .then(function(usuario) {
                done(null, usuario);
            });
    });

};