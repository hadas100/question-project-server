const router = require('express').Router()
const user = require('../controller/userControll')
const task = require('../controller/questions')

router.post('/newUser', user.saveUser)////!!!!!!!!!!!!!!!
router.post('/updatequestion/:id', task.updateQuestion)
router.get('/getAllUser', user.getAllUser)
router.get('/getUser/:name/:password', user.getUser)////!!!!!!
router.get('/userTasks/:id', user.userTasks)////!!!!!




router.post('/newTask/:id', task.saveTask)////!
router.get('/getAllTask', task.getAllTask)
router.get('/getTask/:id', task.getTask)
router.delete('/deletequestion/:userId/:id', task.deleteQuestion)

module.exports = router

