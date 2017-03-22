const express = require('express');
const Userdata = require('mongoose').model('Userdata');

const router = new express.Router();

/**
 * this is just testing for the open api
 */
router.get('/dashboard', (req, res) => {
  // console.log('reached dashboard api')
  Userdata.find({},{username: true,_id: false},(err,users) => {
    res.status(200).json({
      message: "all users",
      users: users.map((x) => {return x.username === "" ? x.username : null})
    })
  })
  // res.status(200).json({
  //   message: "You're authorized to see this secret message."
  // });
});

router.get('/userdata', (req, res) => {
  // console.log('reached api')
  Userdata.find({lookupkey: { $regex : new RegExp("Connor", "i") }} , (err,user) => {
    console.log('got result', user)
    if (err) res.status(400).json({message:"fail"})
    res.status(200).json({
      message: "Last Updated: " + user[0]._id.getTimestamp(),
      user: user
    });
  })
});

module.exports = router;