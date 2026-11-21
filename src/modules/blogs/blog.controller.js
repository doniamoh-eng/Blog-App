
import { Router } from "express"
import * as blogService from "./blog.service.js"
import connection from "../../DB/connection.js"
const router = Router()

// create blog
router.post('/create', blogService.createBlog )

// update blog
router.patch('/update/:blogId', blogService.updateBlog )

// get all blogs
router.get('',blogService.getAllBlogs )

// get specific blog
router.get('/:blogId',blogService.getBlogById)

export default router

