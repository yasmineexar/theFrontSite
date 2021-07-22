exports.isAuth = (req,res,next)=>{
    console.log(req.session)
    if(!req.session?.currentuser?.id) return res.redirect('/login');
    next()

}