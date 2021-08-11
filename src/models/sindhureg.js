const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sindhureg", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true

})
var conn = mongoose.connection;

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
    }
    
   
});



// Secure Password using Hashing...
// employeeSchema.pre("save", async function(next) {

//     if(this.isModified("password")){
      
//         this.password = await bcrypt.hash(this.password, 10);
        
//         this.confirmPassword = await bcrypt.hash(this.password, 10);
        
//     }
//     next();
// });


// Collection...
const Register = new mongoose.model("Register", employeeSchema);

// Export...
module.exports = Register;