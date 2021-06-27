module.exports = (db, query, values) => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};