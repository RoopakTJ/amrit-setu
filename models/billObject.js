const mongoose = require("mongoose");

const BillObjectSchema = mongoose.Schema({
  value: Number,
  billId: Number,
  generatedOn: {
    type: Date,
    default: Date.now,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bill",
  },
  recurrence: {
    type: String,
    default: "ONE-TIME",
  },
  amountExactness: {
    type: String,
    default: "EXACT",
  },
});

module.exports = mongoose.model("billObjects", BillObjectSchema);

// WHEN THE CONSUMER SAYS THAT A BILL HAS BEEN PAID, AND HE NEEDS TO DELETE AN
/* //GET BACK ALL THE POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
//SUBMITS A POST
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
//SPECIFIC POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
//DELETE POST

router.delete("/:id", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.id });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE A SPECIFIC POST

router.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/fetch/:id", async (req, res) => {}); */
