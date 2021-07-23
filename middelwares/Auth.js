exports.isAuth = (req,res,next)=>{
    if(!req.session?.currentuser?.id) {
        req.session.redirecturl = req.originalUrl
        return res.redirect('/login');
    }
    next()

}