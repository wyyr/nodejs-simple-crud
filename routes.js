const UsersController = require('./controllers/UsersController');

module.exports = (app) => {

    // UsersController
    app.get('/', UsersController.index);
    app.get('/add_user', UsersController.getAddUser);
    app.post('/add_user', UsersController.postAddUser);
    app.get('/:id', UsersController.deleteUser);
    app.get('/edit/:id', UsersController.getEdit);
    app.post('/update/:id', UsersController.postEdit);

}
