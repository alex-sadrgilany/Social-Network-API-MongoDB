const {
    Schema,
    model
} = require("mongoose");

// creating the user schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "A username is required!"],
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, "An email is required!"],
            match: [/.+@.+\..+/, "Please enter a valid e-mail address!"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// creating a virtual field that displays how many friends a user has in their friends list array
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;