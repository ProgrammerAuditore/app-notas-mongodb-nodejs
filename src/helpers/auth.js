const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    req.flash('error_msg', 'No autorizado.');
    res.redirect('/users/singin');
}

module.exports = helpers;