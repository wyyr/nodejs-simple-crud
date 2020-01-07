const db = require('../db'),
    helper = require('../helpers/helper'),
    formDataUpload = helper.formDataUpload,
    insertData = helper.insertData,
    updateData = helper.updateData,
    deleteData = helper.deleteData,
    getAllUser = helper.getAllData,
    detail = helper.firstData,
    removeImage = helper.removeImage;

//* table
const table = 'users';

module.exports = {
    index: (req, res) => {
        getAllUser(db, table)
            .then(results => res.render('index', { users: results }));
    },
    getAddUser: (req, res) => {
        res.render('add_user');
    },
    postAddUser: (req, res) => {

        formDataUpload(req, '/uploads/')
            .then(data => insertData(db, table, data))
            .then(success => res.redirect(success))
            .catch(e => new Error(e));

    },
    deleteUser: (req, res) => {
        let id = req.params.id;

        detail(db, table, id)
            .then(data => removeImage(data.image))
            .then(() => deleteData(db, table, id))
            .then(success => res.redirect(success))
            .catch(e => new Error(e));
    },
    getEdit: (req, res) => {
        let id = req.params.id;

        detail(db, table, id)
            .then(results => res.render('edit_user', { user: results }))
            .catch(e => new Error(e));
    },
    postEdit: (req, res) => {
        let id = req.params.id;

        detail(db, table, id)
            .then(data => removeImage(data.image))
            .then(() => formDataUpload(req, '/uploads/'))
            .then(data => updateData(db, table, data, id))
            .then(success => res.redirect(success))
            .catch(e => new Error(e));
    }
}