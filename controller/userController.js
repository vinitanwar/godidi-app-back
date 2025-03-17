import { creattoken, verifyPassword } from "../helper/jwtHelper.js";
import Admin from "../model/adminModel.js";
import Message from "../model/messageModel.js";

import User from "../model/userModel.js";
import bcrypt from 'bcrypt';


export const addUser = async (req, res) => {
    try {
      const { name, number, gender, location, address, service } = req.body;
      console.log(req.body)
  
      if (!name || !number   || !address || !service) {
        return res.status(400).json({ message: "Enter all fields", success: false });
      }
  
      const user = await User.create({ name,number, gender, location, address, service });
      const admin = await Admin.findOne();
  
      if (!admin) {
        return res.status(500).json({ message: "Admin not found", success: false });
      }
  
      await Message.create({ adminId: admin._id, userId: user._id });
  
    //   res.cookie("godiduser", createToken(user._id), {
    //     path: "/",
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "None",
    //     expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    //   });
  
      return res.status(201).json({ success: true, message: "User added", user });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  };
  


export const loginadmin = async (req, res) => {
    try {
        const { number, password } = req.body;

        console.log(req.body)

        if (!number || !password) {
            return res.status(400).json({ message: "Enter all fields", success: false });
        }

        const admin = await Admin.findOne({ number });

        console.log(admin)


        if (!admin) {
            return res.status(404).json({ message: "Admin not found", success: false });
        }

        console.log("Stored Password:", admin.password);
        console.log("Entered Password:", password);

        const verify = await verifyPassword(password, admin.password);
        
        if (!verify) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }

        return res.cookie("godiditokenadmin", creattoken(admin._id), {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        }).status(200).json({ success: true, message: "Login successful", admin });

    } catch (error) {
        console.error("Error in loginadmin:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const newuser = async (req, res) => {
    try {


      
        const users = await User.find({});

        return res.status(200).json({ success: true, users });
       
    } catch (error) {
        console.error("Error in loginadmin:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};




export const getuser=async(req,res)=>{
    try {
 
        const users = await User.find({});

   
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found", success: false });
        }


        return res.status(200).json({ success: true, users });

    } catch (error) {
        console.error("Error in getuser:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
 



// Function to hash the password
export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};



export const signupadmin = async (req, res) => {
  try {
      const { name, number, password } = req.body;

      // Check if all fields are provided
      if (!name || !number || !password) {
          return res.status(400).json({ message: "Enter all fields", success: false });
      }



      // Check if the admin already exists
      const existingAdmin = await Admin.findOne({ number });

      if (existingAdmin) {
          return res.status(400).json({ message: "Admin already exists", success: false });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await hashPassword(password);

      // Create a new admin
      const newAdmin = new Admin({
          name,
          number,
          password: hashedPassword,
      });

      // Save the admin to the database
      await newAdmin.save();

      // Return success response
      return res.status(201).json({ success: true, message: "Admin created successfully", admin: newAdmin });

  } catch (error) {
      console.error("Error in signupadmin:", error);
      return res.status(500).json({ success: false, message: error.message });
  }
};


