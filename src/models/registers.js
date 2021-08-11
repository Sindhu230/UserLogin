const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");




// Schema...
const employeeSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
   
});



// Secure Password using Hashing...
employeeSchema.pre("save", async function(next) {

    if(this.isModified("password")){
      
        this.password = await bcrypt.hash(this.password, 10);
        
        this.confirmPassword = await bcrypt.hash(this.password, 10);
        
    }
    next();
});


// Collection...
const Register = new mongoose.model("Register", employeeSchema);

// Export...
module.exports = Register;