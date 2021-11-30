const showsRoutes = require('./shows');

const constructorMethod = (app) => {
    app.use('/', showsRoutes);

    app.use('*', (req, res) => {

        res.status(404).json({ error: 'Not found'});
    });
};

module.exports = constructorMethod;