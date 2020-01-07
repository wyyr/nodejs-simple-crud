const formidable = require('formidable'),
    mv = require('mv'),
    fs = require('fs');

module.exports = {
    formDataUpload: (req, dir) => {
        let form = new formidable.IncomingForm();
        return new Promise((resolve, reject) => {
            form.parse(req, (err, fields, file) => {
                if (err) reject(err);
                let oldPath = file.image.path;
                let newPath = __dirname + '/../public' + dir + file.image.name;
                mv(oldPath, newPath, (err) => {
                    if (err) reject(err);
                    let newPath = dir + file.image.name;

                    console.log('File upload successfully: ' + newPath + ' | ' + new Date().toTimeString());

                    fields.image = newPath;

                    resolve(fields);
                });
            });
        });
    },
    insertData: (db, table, result) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${table} SET ?`, result, (error) => {
                if (error) reject(error);

                resolve('/');
            });
        });
    },
    updateData: (db, table, result, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${table} SET ? WHERE id = ?`, [result, id], (error) => {
                if (error) reject(error);

                resolve('/');
            });
        });
    },
    removeImage: (file) => {
        return new Promise((resolve, reject) => {
            let path = __dirname + '/../public' + file;
            fs.exists(path, (exists) => {
                if (exists) {
                    fs.unlinkSync(path)
                    resolve(exists);
                } else {
                    resolve(1);
                }
            })
        });
    },
    deleteData: (db, table, id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err) => {
                if (err) reject(err);

                resolve('/');
            })
        });
    },
    getAllData: (db, table) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${table}`, (err, results) => {
                if (err) reject(err);
                results.forEach((data, i) => data.no = i += 1);

                resolve(results);
            });
        });
    },
    firstData: (db, table, id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${table} WHERE id = ? LIMIT 1`, [id], (err, results) => {
                if (err) reject(err);

                resolve(results[0]);
            })
        });
    }
}