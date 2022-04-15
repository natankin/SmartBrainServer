export const handleSignIn=(req,res,db,bcrypt)=>{
    const {email,password}=req.body;
    db.select('*').from('login').where('email','=',email)
    .then(data=>{
        const valid=bcrypt.compareSync(password, data[0].hash)
        if(valid){
            db.select('*').from('users').where('email','=',email)
            .then(user=>res.json(user[0]))
         }
         else{
             res.status(400).json('wrong credentials')
         }
    })
    .catch(err=>res.status(400).json('bad credentials'))
}