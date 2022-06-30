// import Bookmark model
const Bookmark = require('../models/Bookmark');

const bookmarks = require('./seeds.json');


Bookmark.insertMany(bookmarks)
    .then((res)=>{
        // if sucessful, log the newly created bookmarks
        console.log(res);
    })
    // if theres an error, log the error
    .catch((err)=> console.log(err))
    // lastly, hangup the data base connection
    .finally(()=> process.exit());
 