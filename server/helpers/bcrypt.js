const bcryptjs = require('bcryptjs');
let salt = bcryptjs.genSaltSync(10);

module.exports = { 
    encrypt(password) {
        return bcryptjs.hashSync(password, salt);
    },
    decrypt(password, hashedPassword) {
        return bcryptjs.compareSync(password, hashedPassword);
    }
}