const userModel = require("../models/userModels")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


// signup callback
const signupController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({ message: 'User Already Exists', success: false })
        }
        const password = req.body.password
        console.log(req.body);

        // encryption
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({ message: `Register Successfully`, success: true })

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Signup Controller ${error.message}` })
    }
}

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: 'User Not found', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid email or password', success: false });
        }
        const token = jwt.sign({ id: user.__id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // success response after token creation
        res.status(200).send({ message: 'Login Success', success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined;
        if (!user) {
            return res.status(200).send({ message: 'User Not found', success: false })
        }
        else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Auth Error', success: false, error });
    }
}

const allEmpController = async (req, res) => {
    try {
        const allEmp = await userModel.find();
        console.log(allEmp);
        res.status(200).send({ message: 'Fetched All data', success: true, data: allEmp })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error', success: false })
    }
}

const sortController = async (req, res) => {
    const { sortBy, sortOrder } = req.query;
    try {
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }

        let sortedData = await userModel.find({}).sort({ name:1 });
        res.status(200).send({ success: false, msg: 'Employee Name sort', data: sortedData });

    } catch (error) {
        console.log('Error fetching employee data:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}


module.exports = { loginController, signupController, authController, allEmpController, sortController }