const mongoose = require(`mongoose`);
const uniqueValidator = require(`mongoose-unique-validator`);

let Schema = mongoose.Schema;

let validRole ={
    values: [`ADMIN_ROLE`, `USER_ROLE`],
    message: '{VALUE} is not a valid role'
    }

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: validRole
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    },
    google: {
        type: Boolean,
        required: false,
        default: false
    }
});

userSchema.plugin(uniqueValidator, {message: '{PATH} Must be unique'})

userSchema.methods.toJSON = function() {
    let person = this;
    let personObject = person.toObject();
    delete personObject.password;

    return personObject;
}

module.exports = mongoose.model('User', userSchema);

