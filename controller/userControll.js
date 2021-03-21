const Question = require('../modules/question');
const QuestionController = require('./questions');
const User = require('../modules/user')

const saveUser = async (req, res) => {  // sing up user
    let currentUser = new User(req.body);
    console.log(currentUser)

    currentUser.save(function (err, user) {
        if (err)
            res.status(400).send(err);
        else
            res.status(200).json({ user: user })
    })
}

const getAllUser = async (req, res) => {
    try {
        console.log("getallusers!!")
        const user = await User.find()
        res.status(200).json({ allUser: user })

    } catch (error) {
        res.status(400).send('error')
    }
}
//!!!!!!!!!!!!!!!!!!!חשוב מאוד!!!!!!!!!!!!!!!!1
// const getUser = async (req, res) => {
//     console.log(req.params.id)
//     try {
//         const user = await User.findById(req.params.id)
//         res.status(200).json({ myUser: {...user,    id: user._id.toSting()} })
//     } catch (error) {
//         res.status(400).send('error')
//     }
// }

const getUser = async (req, res) => { //login user
    console.log(req.params.id)
    try {
        const user = await User.findOne({ name: req.params.name, password: req.params.password })
        if (user) {
            res.status(200).json({ myUser: user })
        } else {
            res.status(404).send()
        }
    } catch (error) {
        res.status(500).send('error')
    }
}

// const getUserTask = async (req, res) => {
//     console.log(req.params.id)
//     try {
//         const user = await User.findById(req.params.id)

//         res.status(200).json({ myUser: { ...user, id: user._id.toSting() } }) 
//     } catch (error) {
//         res.status(400).send('error')
//     }
// }

// const getUserQuestions = async (req, res) => {
//     try {
//         // console.log("hello");
//         const userId = req.params.id;
//         const user = await User.findById(userId)
//         const father = Question.populated({ path: 'User', match: 'User.historyQuestions.push();' })
//         res.status(200).json({ theTask: father })
//         // User.historyQuestions.push(theTask)
//         // const questions = user.historyQuest.ions;
//         // questions.push(new Question({ id: 2, answer: "ew", question: "sssd", value: "sdsa", airdate: "cc", user: "wefwrqew " }));
//         console.log(questions);
//         res.json(questions)
//     } catch (error) {
//         console.log(error)
//     }
// }



const userTasks = async (req, res) => {  // to get the question of user
    console.log(req.params.id)
    try {
        const questions = await User.findById(req.params.id).
            populate({ path: 'Questions' });
        console.log(questions);
        const userQuestions = [];
        for (let i = 0; i < questions.historyQuestions.length; i++) {
            const fullQuestion = await QuestionController.getTaskById(questions.historyQuestions[i]);
            if (fullQuestion !== null)
                userQuestions.push({ ...fullQuestion._doc, id: fullQuestion._doc._id.toString() });
        }
        console.log(userQuestions)
        res.status(200).json({ myTask: questions, userQuestions })
    } catch (error) {
        console.log(error);
        res.status(400).send('error')
    }
}


module.exports = { saveUser, getAllUser, getUser, userTasks};