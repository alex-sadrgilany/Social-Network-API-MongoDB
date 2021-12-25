const {
    Schema,
    model,
    Types
} = require("mongoose");
const formatDate = require("../utils/formatDate");

// creating the reactions subdocument schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: [true, "Your reaction cannot be blank!"],
            maxLength: 280
        },
        username: {
            type: String,
            required: [true, "Please enter the username for this reaction!"]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // utilizing a getter function to format the inherent Date output to something more readable
            get: createdAtVal => formatDate(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// creating the thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, "Your thought cannot be blank!"],
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // utilizing a getter function to format the inherent Date output to something more readable
            get: createdAtVal => formatDate(createdAtVal)
        },
        username: {
            type: String,
            required: [true, "Please enter the username for this thought!"]
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

// creating a virtual field that displays how many reactions each thought has
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;