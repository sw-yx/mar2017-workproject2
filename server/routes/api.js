const express = require('express');
const Userdata = require('mongoose').model('Userdata');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  Userdata.find({},{username: true,_id: false},(err,users) => {
    res.status(200).json({
      message: "all users",
      users: users.filter(x => x != "")
    })
  })
  // res.status(200).json({
  //   message: "You're authorized to see this secret message."
  // });
});

router.get('/userdata/:searchterm', (req, res) => {
  // console.log('req',req);
  Userdata.find({lookupkey: { $regex : new RegExp(req.params.searchterm, "i") }} , (err,user) => {
    if (err) res.status(400).json({message:"fail"})
    // console.log(req.params.searchterm, user);
    const ts = user.length>0 ? user[0]._id.getTimestamp() : 'error in retriving timestamp';
    res.status(200).json({
      message: "last modified: " + ts,
      userdata: user
    });
  })
});

module.exports = router;