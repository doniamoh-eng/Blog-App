

export const createBlog =(req,res)=>{
    const {title,content,userId}=req.body

    // check if user already exist

    const query = "SELECT * FROM users WHERE id=? AND deleted_at IS NULL;"
    connection.execute( query,[userId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"error fetching users", error:err.message})
        
        if(results.length === 0)
            return res.status(404).json({message:"user not found"})
        

        // create blog
        const insertQuery=`INSERT INTO blogs(title,content,userId) VALUES (?,?,?);`
        connection.execute(insertQuery ,[title,content,userId],(err,results)=>{
            if (err)
                return res.status(500).json({message:'error creating user',error: err.message })

            if (results.affectedRows === 0)                 
                return res.status(404).json({message:"fail to create blog"})

            return res.status(201).json({message:'blog created successfully', results })

        })
    })
}


export const updateBlog =(req,res)=>{
    const{blogId}=req.params
    const{title,content,userId}=req.body
    // check if user exists
    const checkUserQuery =`SELECT * FROM users WHERE id=? AND deleted_at IS NULL;`
    connection.execute( checkUserQuery,[userId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"database  error ", error:err.message})
        
        if(results.length === 0)
            return res.status(404).json({message:"user not found"})

        // check if blog exists
        const checkBlogQuery =`SELECT * FROM blogs WHERE id=? AND deleted_at IS NULL;`
        connection.execute( checkBlogQuery,[blogId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"database  error ", error:err.message})
        
        if(results.length === 0)
            return res.status(404).json({message:"blog not found"})

        // user is the owner of the blog
        if (results[0].userId !== userId){ 
            // to check if the userId coming from the DB not equal the userId coming from req.body
            return res.status(401).json({message:"unauthorized to update this blog"})
        } else{
            // update blog
            const updatedBlogQuery= `UPDATE blogs SET title=?, content=? WHERE id=? AND deleted_at IS NULL ;`
            connection.execute( updatedBlogQuery,[title,content,blogId],(err,results)=>{
        if (err) 
            return res
            .status(500)
            .json({message:"error fetching users", error:err.message})
        
        if(results.affectedRows === 0)
            return res.status(404).json({message:"fail to update blogs"})
        
        return res.status(200).json({message:'blogs updated successfully',users:results})
    })
        
        }
        
    })
        
    })
}

export const getAllBlogs =(req,res)=>{
    const selectQuery=`SELECT * FROM blogs WHERE deleted_at IS NULL`
    connection.execute(selectQuery,(err,results)=>{
        if (err)
            return res.status(500).json({message:"database error",error:err.message})
        return res.status(200).json({message:'blogs fetched successfully', results})
    })
}

export const getBlogById =(req,res)=>{
    const {blogId}=req.params

    const selectQuery=`SELECT * FROM blogs WHERE id=? AND deleted_at IS NULL`
    connection.execute(selectQuery,[blogId],(err,results)=>{
        if (err)
            return res.status(500).json({message:"database error",error:err.message})

        if (results.length === 0) 
            return res.status(404).json({message:"blog not found"})

        return res.status(200).json({message:'blogs fetched successfully', results})
    })
}