const indexRouter = require('./web/index');

const assessmentRoute = require('./api/assessment');
const userRoute = require('./api/user');
const criterionRoute = require('./api/criterion');
const glossaryRoute = require('./api/glossary');
const questionRoute = require('./api/question');
const loginRoute = require('./api/login');

module.exports = {
  /**
   * Recebe o app e configura as rotas da aplicação
   */
  setupRoutes(app) {
    app.use('/', indexRouter);
    app.use('/user', userRoute);
    app.use('/assessment', assessmentRoute);
    app.use('/criterion', criterionRoute);
    app.use('/glossary', glossaryRoute);
    app.use('/question', questionRoute);
    app.use('/login', loginRoute)
  }
}