const express = require("express");
const router = express.Router();
const Post = require("../models/posts.js");
const Bill = require("../models/bill.js");
const BillObject = require("../models/billObject.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const verify = require("./verifyToken.js");
const serverless = require("serverless-http");

//ROUTES

// JWT AUTH PART
// USER REGISTRATION

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newsavedUser = await user.save();
    const token = jwt.sign({ _id: newsavedUser._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (error) {
    res.json({ message: error });
  }
});

//SETU GET ALL CUSTOMER AND THEIR BILLS HERE
router.get("/fetch", verify, async (req, res) => {
  try {
    const customers = await Bill.find({});
    res.status(200).send(customers);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC POST
router.get("/fetch/:id", verify, async (req, res) => {
  try {
    const x = await Bill.find({ phoneNumber: req.params.id });

    if (x.length === 0) {
      res.json({
        status: "404",
        success: "false",
        error: {
          code: "customer not found",
          title: "customer not found",
          detail: "The requested customer was not found in the system",
        },
      });
    }
    const y = x[0]._id;
    const z = await BillObject.find({ customer: y });
    if (z.length === 0) {
      x[0].BillFetchStatus = "NO_OUTSTANDING";
      console.log(x);
    }
    var Fetch_Customer = {
      status: "200",
      success: "true",
      CustomerDetails: x,
      BillDetails: z,
    };
    res.json({ Fetch_Customer });
  } catch (err) {
    res.json(err);
  }
});

//SETU POST CUSTOMER DATA onto DB HERE

router.post("/fetch", verify, async (req, res) => {
  const newBill = new Bill(req.body);
  try {
    const savedBill = await newBill.save();
    res.json(savedBill);
  } catch (err) {
    res.json({ message: err });
  }
});

//BILLS
// GET ALL BILLS
router.get("/getBills", verify, async (req, res) => {
  const b = await BillObject.find({});
  res.json(b);
});

// POST A BILL
router.post("/getBills", verify, async (req, res) => {
  const c = new BillObject(req.body);
  try {
    const d = await c.save();
    res.json(d).status(200);
  } catch (error) {
    res.json({ message: error });
  }
});

// WHEN CUSTOMER SAYS THAT THE BILL HAS BEEN PAID, SO DELETE THE BILL AND RETURN WITH THE RECEIPT

router.delete("/fetchReceipt/:id", verify, async (req, res) => {
  try {
    const i = await BillObject.find({ billId: req.params.id });
    if (i.length === 0) {
      res.json({
        status: "404",
        code: "Bill does not exist",
        detail: "Bill with this Billid does not exist in the system",
      });
    }
    console.log(i);
    const k = i[0];
    console.log(k);
    await BillObject.remove({ billId: req.params.id });
    const n = makeid(5);
    res.json({
      status: "200",
      success: "true",
      paidAmount: k,
      receiptID: n,
      BillID: req.params.id,
      billDate: Date.now,
    });
  } catch (err) {
    res.json({ message: err });
  }
});
// Function to make receipt
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = serverless(router);
