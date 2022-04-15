export const handleRegister=(req, res, db, bcrypt)=>{
    const { name, email, password } = req.body;
    if(!name||!email||!password){
        return res.status(400).json('Cannot blank')
    }
    var hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0].email,
                        joined: new Date()
                    })
                    .then(user => res.json(user[0]));
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(err => res.status(400).json('email already exist'));
}