import bcrypt from "bcrypt";
import mongoose from "./mongoose";
const Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
);

const SALT_WORK_FACTOR = 10;

UserSchema.pre("save", function(next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash) {
        if (err) {
            return next(err);
        }

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    let user = this;
    bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

const User = mongoose.model("User", UserSchema);

export default User;
