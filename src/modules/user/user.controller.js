
import { Router } from "express"

import * as userService from "./user.service.js"
import connection from "../../DB/connection.js"
const router = Router()

// sign up
router.post('/signup', userService.signUp)

// login
router.post('/login', userService.login)

// get profile and derived attribute (calculate age from DOB)
router.get('/profile/:userId',userService.getProfile)

// update user
router.patch('/update/:userId',userService.updateUser)

// hard delete (to delete users at all from the database)
router.delete('/delete/:userId',userService.hardDeleteUser)

// soft delete (make the delete using deleted_at colume it temperay remove like archive)
// to activate the archive consept (i have to make sure that any End point (API) work on active user not archived one ) ======> by using (AND deleted_at IS NULL) while selecting the user

router.patch('/soft-delete/:userId',userService.softDeleteUser)

// search users
router.get('/search',userService.searchUsers)

export default router