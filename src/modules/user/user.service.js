export const signUp =(req,res)=>{
    const {first_name,last_name,email,password,DOB,gender,confirmPassword,}=req.body
    if (password !== confirmPassword) {
        return res .status(400).json({message:'password mismatch'})
    }

    

    const query = "SELECT * FROM users WHERE email=?"
    connection.execute( query,[email],(err,results)=>{
        if (err) {
            return res
            .status(500)
            .json({message:"error fetching users", error:err.message})
        }
        if(results.length>0){
            return res.status(409).json({message:"user already exists"})
        }

        // create user
        const insertQuery=`INSERT INTO users (first_name,last_name,email,password,DOB,gender) VALUES (?,?,?,?,?,?)`
        connection.execute(insertQuery ,[first_name,last_name,email,password,DOB,gender],(err,results)=>{
            if (err){
                return res.status(500).json({message:'error creating user',error: err.message })
            }
            return res.status(201).json({message:'user created successfully',userId:results.insertId})

        })
    })
}

export const login =(req,res)=>{
    const {email,password}=req.body

    const query = "SELECT * FROM users WHERE email=? AND password=?"
    connection.execute( query,[email ,password],(err,results)=>{
        if (err) {
            return res
            .status(500)
            .json({message:"error fetching users", error:err.message})
        }
        if(results.length === 0){
            return res.status(404).json({message:"Invalid email or password"})
        }

        
        res.status(200).json({message:'users logged in successfully',users:results})

        
    })
}

export const getProfile =(req,res)=>{
 
    const {userId} =req.params

    // check if user exists
    // sql have built in functions 
    // ex of some methods YEAR (2000-10-01) ====>it will give me result (2000)
    // CURDATE() ===> METHOD THAT GIVE ME CURRENT DATE 
    
    const checkQuery =`SELECT first_name,last_name,email,password,gender,DOB ,YEAR(CURDATE())-YEAR(DOB) AS age FROM users where id=?;`
    connection.execute( checkQuery,[userId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"error fetching users", error:err.message})
        
        if(results.length === 0)
            return res.status(404).json({message:"Invalid email or password"})
        

        
        res.status(200).json({message:'users logged in successfully',users:results})
    })

}

export const updateUser =(req,res)=>{
    const{userId}=req.params
    const{first_name,last_name,gender,DOB}=req.body
    // check if user exists
    const checkQuery =`SELECT * FROM users WHERE id=? AND deleted_at IS NULL;`
    connection.execute( checkQuery,[userId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"database  error ", error:err.message})
        
        if(results.length === 0)
            return res.status(404).json({message:"user not found"})

        // UPDATE USER

        const updateQuery= `UPDATE users SET first_name=?, last_name=?, gender=?, DOB=? WHERE id=? ;`
        connection.execute( updateQuery,[first_name,last_name,gender,DOB,userId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"error fetching users", error:err.message})
        
        if(results.affectedRows === 0)
            return res.status(404).json({message:"fail to update user"})
        
        return res.status(200).json({message:'users updated successfully',users:results})

    })


        
    })


}

export const hardDeleteUser =(req,res)=>{
    const{userId}=req.params
   
    // check if user exists
    const checkQuery =`SELECT * FROM users WHERE id=?;`
    connection.execute( checkQuery,[userId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"database  error ", error:err.message})
        
        if(results.length === 0)
            return res.status(404).json({message:"user not found"})

        // delete USER

        const deleteQuery= `DELETE FROM users WHERE id=? ;`
        connection.execute( deleteQuery,[userId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"DB error ", error:err.message})
        
        if(results.affectedRows === 0)
            return res.status(404).json({message:"fail to DELETE user"})
        
        return res.status(200).json({message:'users deleted successfully',users:results})

    })


        
    })


}

export const softDeleteUser =(req,res)=>{
    const{userId}=req.params
    // check if user exists
    const checkQuery =`SELECT * FROM users WHERE id=? AND deleted_at IS NULL;`
    connection.execute( checkQuery,[userId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"database  error ", error:err.message})
        
        if(results.length === 0)
            return res.status(404).json({message:"user not found"})

        // UPDATE USER

        const updateQuery= `UPDATE users SET deleted_at=NOW() WHERE id=? ;`
        connection.execute( updateQuery,[userId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"error fetching users", error:err.message})
        
        if(results.affectedRows === 0)
            return res.status(404).json({message:"fail to soft delete user"})
        
        return res.status(200).json({message:'users soft deleted successfully',users:results})

    })


        
    })


}

export const searchUsers =(req,res)=>{
    const {search}=req.query
    // ali
    // like %a% or %a or a%
    const searchQuery =`SELECT * FROM users WHERE first_name LIKE ?;`
    connection.execute(searchQuery,[`%${search}%`],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"database  error ", error:err.message})
        
        if(results.length === 0)
            return res.status(404).json({message:"users not found"})

        return res.status(200).json({message:'users fetched successfully',users:results})
    })
    
}