const express = require("express");
const { loginController, signupController, authController, allEmpController, sortController } = require("../controllers/userCtrl");
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router = express.Router();

// routes
// LOGIN || POST
router.post('/login', loginController)

//  ALL EMPLLOYEE DATA|| GET
router.get('/allemployee', allEmpController)
router.get('/orderby', sortController)

// SIGNUP || POST
router.post('/signup', signupController)
module.exports = router

// Auth || POST
router.post('/getUserData', authMiddleware, authController);
module.exports = router