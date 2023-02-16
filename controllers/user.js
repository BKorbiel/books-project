import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { ObjectId } from 'mongodb';
import User from "../models/user.js";
import dotenv from 'dotenv';

export const signin = async (req, res) => {
	const {email, password} = req.body;

	try {
		const existingUser = await User.findOne({email});

		if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

		if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

		const token=jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRET_WORD, {expiresIn: "1h"});

		res.status(200).json({result: existingUser, token});
	} catch(error) {
		res.status(500).json({ message: "Something went wrong."});
		console.log(error);
	}
}

export const signup = async (req, res) => {
	const {email, password, firstName, lastName, confirmPassword} = req.body;

	try {
		const existingUser = await User.findOne({email});
		if(existingUser) return res.status(400).json({ message: "User already exists." });

		if (password != confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`, createdAt: new Date().toISOString()});

		const token=jwt.sign({email: result.email, id: result._id}, process.env.SECRET_WORD, {expiresIn: "1h"});

		res.status(200).json({result, token});
	} catch(error) {
		res.status(500).json({ message: "Something went wrong."});
		console.log(error);
	}
}

export const googlesignin = async (req, res) => {
	const {token} = req.body;
	try {
		const decodedToken = jwt_decode(token);

		const {email, name, picture} = decodedToken;

		const existingUser = await User.findOne({email});

		if(!existingUser){
			const result = await User.create({email, name, picture, createdAt: new Date().toISOString()});
			res.status(200).json({result, token});
		}
		else {
			res.status(200).json({result: existingUser, token});
		}


	} catch(error) {
		res.status(500).json({ message: "Something went wrong."});
		console.log(error);
	}
}
