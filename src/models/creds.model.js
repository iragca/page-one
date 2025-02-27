import mongoose from "mongoose";
import bcrypt from "bcrypt";

const credentialSchema = new mongoose.Schema({
   username: {
         type: String,
         required: true,
         unique: true,
         trim: true
   },
   password: {
         type: String,
         required: true,
         minlength: 8
   }
});

//middleware for password hashing
credentialSchema.pre('save', async function (next){
    if (this.isModified('password')){
        try{
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error){
            return next(error);
        }
    }
    next();
});

//middleware for verification
credentialSchema.methods.isValidPassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};


export default mongoose.model('Credential', credentialSchema);