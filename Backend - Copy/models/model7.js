const mongoose = require("mongoose");
const userPostModel = mongoose.Schema(
    {
        post_id: { type: String },
        liked_user_id: { type: Array },
        disliked_user_id: { type: Array },
    },
    { timestamps: true }
);
module.exports = mongoose.model("userPost", userPostModel);
