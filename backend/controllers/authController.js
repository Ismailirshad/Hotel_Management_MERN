import express from 'express'
import User from '../schema/userSchema';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(500).json({ message: "User alreadt exits" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            samSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        const { _id } = user;
        res.status(201).json({ message: "User created successfully", user: { _id, name, email } })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = req.cookies;
        // Checks user already loggedIn or not ?
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const existUser = await User.findById(decoded.id);
                if (existUser && existUser.email == email) {
                    return res.status(200).json({ message: "User already logged In" })
                }
            } catch (error) {
                console.log("Invalid or expired token")
            }
        }

        const user = await User.findOne({ email })
        if (!user) return res.status(404).send({ message: "User does not exists" });
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid Credentials" })

        const newtoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', newtoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            samSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        res.status(200).json({ message: "User logged in successfully", user: { _id, name, email } })
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            samSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict'
        });
        res.status(200).json({ message: "User logged out successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}