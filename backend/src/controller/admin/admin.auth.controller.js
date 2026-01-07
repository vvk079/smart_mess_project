const adminModel = require('../../models/admin.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function registerAdmin(req, res) {

    let { fullName, email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (admin) {
        return res.status(400).json({
            message: "user is already existed"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await adminModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    })

    return res.status(201).json({
        message: "admin is created"
    })





}


async function loginadmin(req, res) {

    let { email, password } = req.body

    const admin = await adminModel.findOne({ email });

    if (!admin) {
        return res.status(501).json({
            message: "user not existed"
        });
    }

    if (!admin.password) {
        return res.status(502).json({
            message: "password is not stored in database"
        });
    }

    const ispasswordvalid = await bcrypt.compare(password, admin.password);

    if (!ispasswordvalid) {
        return res.status(400).json({
            message: "invalid password"
        });
    }

    const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    })

    return res.status(201).json({
        message: "login succesfully"
    })
}

async function logoutadmin(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
    });

    return res.status(200).json({
        message: "Logout successful"
    });
}


module.exports = {
    registerAdmin,
    loginadmin,
    logoutadmin,
}