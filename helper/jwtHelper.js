import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"

export const creattoken =  (id) => {
    try {
       
        const token =  JWT.sign({ id }, process.env.SECRET_KEY,{expiresIn:"90d"});
      
        return token; 
    } catch (error) {
        console.error('Error creating token:', error);
        throw new Error('Failed to create token');
    }
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
    try {
        // Check if both parameters exist
        if (!plainPassword || !hashedPassword) {
            throw new Error("Both plainPassword and hashedPassword are required");
        }

        // Compare the passwords
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error("Error in verifyPassword:", error.message);
        return false;
    }
};

 