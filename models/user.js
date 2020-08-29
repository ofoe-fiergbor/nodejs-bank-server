const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accounts: [
    {
      id: { type: Schema.Types.ObjectId, ref: "Accounts" },
    },
  ],
});

module.exports = mongoose.model("User", AccountSchema);
