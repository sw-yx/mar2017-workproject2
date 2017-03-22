const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const UserdataSchema = new mongoose.Schema({
  user_id: {
    type: String,
    index: { unique: true }
  },
  email: String,
  username: String,
  first_name: String,
  last_name: String,
  organization: String,
  lookupkey: String,
  customer_flag: String,

  date_joined: Date,
  last_activity_date: Date,
  
  // alltime: Number,
  // userbucket_alltime: Number,
  // last_1w: Number,
  // userbucket_1w: Number,
  // last_2w: Number,
  // userbucket_2w: Number,
  // last_1m: Number,
  // userbucket_1m: Number,
  // first_1w: Number,
  // trialbucket_1w: Number,
  // trialbucket_2w: Number,
  // first_1m: Number,
  // trialbucket_1m: Number,
  comps_alltime: Number,
  comps_last1w: Number,
  comps_last_2w: Number,
  comps_last_1m: Number,
  comps_first_1w: Number,
  comps_first_2w: Number,
  comps_first_1m: Number,
  docsearch_alltime: Number,
  docsearch_last1w: Number,
  docsearch_last_2w: Number,
  docsearch_last_1m: Number,
  docsearch_first_1w: Number,
  docsearch_first_2w: Number,
  docsearch_first_1m: Number,
  edt_alltime: Number,
  edt_last1w: Number,
  edt_last_2w: Number,
  edt_last_1m: Number,
  edt_first_1w: Number,
  edt_first_2w: Number,
  edt_first_1m: Number,
  email_alltime: Number,
  email_last1w: Number,
  email_last_2w: Number,
  email_last_1m: Number,
  email_first_1w: Number,
  email_first_2w: Number,
  email_first_1m: Number,
  email_sent_alltime: Number,
  email_sent_last1w: Number,
  email_sent_last_2w: Number,
  email_sent_last_1m: Number,
  email_sent_first_1w: Number,
  email_sent_first_2w: Number,
  email_sent_first_1m: Number,
  excel_alltime: Number,
  excel_last1w: Number,
  excel_last_2w: Number,
  excel_last_1m: Number,
  excel_first_1w: Number,
  excel_first_2w: Number,
  excel_first_1m: Number,
  general_alltime: Number,
  general_last1w: Number,
  general_last_2w: Number,
  general_last_1m: Number,
  general_first_1w: Number,
  general_first_2w: Number,
  general_first_1m: Number,
  ipad_alltime: Number,
  ipad_last1w: Number,
  ipad_last_2w: Number,
  ipad_last_1m: Number,
  ipad_first_1w: Number,
  ipad_first_2w: Number,
  ipad_first_1m: Number,
  iphone_alltime: Number,
  iphone_last1w: Number,
  iphone_last_2w: Number,
  iphone_last_1m: Number,
  iphone_first_1w: Number,
  iphone_first_2w: Number,
  iphone_first_1m: Number,
  mosaic_alltime: Number,
  mosaic_last1w: Number,
  mosaic_last_2w: Number,
  mosaic_last_1m: Number,
  mosaic_first_1w: Number,
  mosaic_first_2w: Number,
  mosaic_first_1m: Number,
  notebook_alltime: Number,
  notebook_last1w: Number,
  notebook_last_2w: Number,
  notebook_last_1m: Number,
  notebook_first_1w: Number,
  notebook_first_2w: Number,
  notebook_first_1m: Number,
  plotter_alltime: Number,
  plotter_last1w: Number,
  plotter_last_2w: Number,
  plotter_last_1m: Number,
  plotter_first_1w: Number,
  plotter_first_2w: Number,
  plotter_first_1m: Number,
  rts_alltime: Number,
  rts_last1w: Number,
  rts_last_2w: Number,
  rts_last_1m: Number,
  rts_first_1w: Number,
  rts_first_2w: Number,
  rts_first_1m: Number,
  stream_alltime: Number,
  stream_last1w: Number,
  stream_last_2w: Number,
  stream_last_1m: Number,
  stream_first_1w: Number,
  stream_first_2w: Number,
  stream_first_1m: Number,
  sum_alltime: Number,
  sum_last1w: Number,
  sum_last_2w: Number,
  sum_last_1m: Number,
  sum_first_1w: Number,
  sum_first_2w: Number,
  sum_first_1m: Number,
  watchlist_manager_alltime: Number,
  watchlist_manager_last1w: Number,
  watchlist_manager_last_2w: Number,
  watchlist_manager_last_1m: Number,
  watchlist_manager_first_1w: Number,
  watchlist_manager_first_2w: Number,
  watchlist_manager_first_1m: Number,
});

module.exports = mongoose.model('Userdata', UserdataSchema, 'userdatas');