const mongoose = require("mongoose");
const postModel = mongoose.Schema(
    {
        profile: {
            type: Buffer,

        },
        username: { type: String },
        timestamp: {
            type: Date,
            default: Date.now
        },
        description: { type: String },
        fileType: { type: String },
        fileData: { type: Buffer },
        likes: { type: Number },

    },
    { timestamps: true }
);
module.exports = mongoose.model("post", postModel);
