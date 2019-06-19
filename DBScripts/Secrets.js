var fs = require('fs');

function getPassword() {
    return fs.readFileSync('../.devcontainer/postgres-password.secret', 'utf8');
}

function getUser() {
    return fs.readFileSync('../.devcontainer/postgres-user.secret', 'utf8');
}

module.exports.getPassword = getPassword;
module.exports.getUser = getUser;