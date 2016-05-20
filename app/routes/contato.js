function verificarAutenticacao(req, res, next){
    if(req.isAuthenticated()){
      return next();
  } else {
      res.status('401').json('Acesso não autorizado');
  }
};

module.exports = function (app) {
    var controller = app.controllers.contatos;
    var authService = require('../services/authService');

    app.route('/contatos')
        .get(authService().isAuthenticated, controller.findAll)
        .post(authService().isAuthenticated, controller.create)
        .put(authService().isAuthenticated, controller.update);

    app.route('/contatos/:id')
        .get(authService().isAuthenticated, controller.findOne)
        .delete(authService().isAuthenticated, controller.delete);


}