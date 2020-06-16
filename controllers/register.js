const handleRegister = (req,res, db, bcrypt, saltRounds)=>{
   
    const {email, name, password} = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        
        console.log(hash)
        
        db.transaction(trx =>{
            trx.insert({
                hash: hash,
                email:email
            })
            .into('login')
            .returning('email')
            .then(loginEmail =>{
                return trx('users')
                .returning('*')
                .insert({
                    email:loginEmail[0],
                    name:name,
                    joined: new Date(),
                    
                })
                .then(user=>{
                   res.json(user[0]) 
                })  
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'))
    
    });


   
    
    /* BCRYPT
    bcrypt.hash(password, saltRounds, function(err, hash) {
        console.log(hash)
    });
    database.users.push({
        id:'125',
        name:name,
        email:email,
        //password:password,
        entries:0,
        joined: new Date()
    });
    
    res.json(database.users[database.users.length-1]);
    */
}

module.exports = {
    handleRegister: handleRegister
}