const Question = require('../modules/question')
const User = require('../modules/user')
const ObjectId = require('mongoose').Types.ObjectId;


const saveTask = async (req, res) => {//add question
    let currentTask = new Question(req.body);
    const savedTask = await currentTask.save()
    let currentUser = await User.findById(req.params.id)
    currentUser.historyQuestions.push(savedTask);
    currentUser.save();
    res.status(200).json({ myTask: currentTask });
}

const deleteQuestion = async (req, res) => {//delete question
    try {
        console.log(req.params.id);
        // const question = await Question.findByIdAndDelete(req.params.id)
        const user = await User.findById(req.params.userId)
        user.historyQuestions = user.historyQuestions.filter((q) => q != req.params.id);
        const updatedUser = await user.save()
        console.log("question delete");
        res.status(200).json({ user: { ...updatedUser._doc, id: updatedUser._doc._id.toString() } });
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}






// const saveTask = async (req, res) => {
//     let currentTask = new Question(req.body);
//     let currentUser =  User.findById(req.body.userId).then(()=>{
//         console.log(currentUser)
//         console.log(currentTask)})
//         currentTask.save().then
//         (currentTask => {
//             try {
//                 currentUser.questions.push(currentTask)
//                 res.status(200).json({ task: currentTask })
//             } catch (error) {
//                 console.log(error);
//             }
//         })
// }

// const saveTask = async (req, res) => {
//     let currentTask = new Question(req.body);
//     try{
//         let currentUser = await User.findById(req.body.userId).then(()=>{ 
//             console.log(currentUser)
//             console.log(currentTask)})
//        .then(currentTask.save().then
//         ((currentTask )=> {
//             try {
//                 currentUser.questions.push(currentTask)
//                 res.status(200).json({ task: currentTask })
//             } catch (error) {
//                 console.log(error);
//             }
//         })

//     )
// }}


const getAllTask = async (req, res) => {
    try {
        const task = await Question.find()
        res.status(200).json({ allTask: task })
    } catch (error) {
        res.status(400).send('error')
    }
}

const getTaskById = async (qid) => {//to get question for delete function
    try {
      const task = await Question.findById(qid);
        return task;
    } catch (error) {
        console.log(error);
        return {};
    }
}

const getTask = async (req, res) => { //to get question by id
    console.log(req.params.id)
    try {
        const task = await Question.findById(req.params.id)
        res.status(200).json({ myTask: task })
    } catch (error) {
        console.log(error);
        res.status(400).send('error')
    }
}

// const theUserOfTask = async (req, res) => {
//     try {
//         const father = await Question.findById(req.params.id).
//             populate({ path: 'userId' })
//         console.log(father);
//         res.status(200).json({ myTask: father })
//     } catch (error) {
//         console.log(error);
//     }
// }


// const theUserOfTask = async (req, res) => {
//     try {
//         const f = await User.findById(req.params.id)
//         console.log(f);
//         const father = await Question.populate({ path: 'userId' })
//         console.log(father);
//         res.status(200).json({ myTask: father })
//     } catch (error) {
//         console.log(error);
//     }
// }

// const allTaskOfUser = async (req, res) => {
//     try{
//         const user = User.findById(req.params.id)
//     } catch (error) {
//         console.log(error)
//     }
// }




const updateQuestion = async (req, res) => {// to update a question
    try {
        const question = await Question.findOneAndUpdate
            ({ "_id": req.params.id }, { "question": req.body.question })
        console.log(question)
        res.status(200).json({ myQuestionUpdate: question })
    } catch (error) {
        console.log(error);
        res.status(400).send('error!!!')
    }
}


module.exports = { saveTask, getAllTask, getTask,  deleteQuestion, getTaskById, updateQuestion }