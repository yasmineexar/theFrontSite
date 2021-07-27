exports.isAuth = (req, res, next) => {
    if (!req.session?.currentuser?.id) {
        console.log('user: ', req.session.currentuser)
        req.session.redirecturl = req.originalUrl
        return res.redirect('/login');
    }
    next()

}