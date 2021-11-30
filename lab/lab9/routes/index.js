const fibonacciRoutes = require('./fibonacci');

const constructorMethod = (app) => {
  app.use('/', fibonacciRoutes);
  /*
  app.use('*', (req, res) => {
    res.redirect('/fibonacci/static');
  });
  */
};

module.exports = constructorMethod;
