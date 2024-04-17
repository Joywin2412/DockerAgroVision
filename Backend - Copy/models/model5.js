const mongoose = require("mongoose");
const chatModel = mongoose.Schema(
  {
    idx: { type: String },
    response: {type :Array},
  },
  { timestamps: true }
);
module.exports = mongoose.model("Intent", chatModel);
