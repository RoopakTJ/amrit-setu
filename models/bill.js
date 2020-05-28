const mongoose = require("mongoose");
const BillSchema = mongoose.Schema({
  customerName: String,
  phoneNumber: Number,
  BillFetchStatus: {
    type: String,
    default: "AVAILABLE",
  },
});

module.exports = mongoose.model("bill", BillSchema);
