const express = require('express');
// instantiate a router -- this will hold all the logic
// for the URLs + methods for this resource
const router = express.Router();
// import Bookmark model
const Bookmark = require('../models/Bookmark');

// localhost:8000/api/bookmarks
// GET: Index route
router.get('/', (req, res) => {
	// find all the bookmarks in the db
	Bookmark.find({}).then((bookmarks) => {
		// send them back as json
		return res.json(bookmarks);
	});
});

// localhost:8000/api/bookmarks/:id
// GET: Show route
router.get('/:id', (req, res) => {
	Bookmark.findById(req.params.id, (err, bookmark) => {
		if (err) {
			return res.sendStatus(404);
		} else {
			return res.json(bookmark);
		}
	});
});

router.post('/', (req, res) => {
	Bookmark.create(req.body, (err, bookmark) => {
		if (err) {
			return res.sendStatus(400);
		} else {
			//send back 201 created status and the newly created bookmarka
			return res.status(201).json(bookmark);
		}
	});
});

router.put('/:id', (req, res) => {
	Bookmark.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, bookmark) => {
			if (err) {
				return res.sendStatus(400);
			} else {
				return res.json(bookmark);
			}
		}
	);
});

router.delete('/:id', async (req, res) => {
	await Bookmark.findByIdAndDelete(req.params.id, (err, bookmark) => {
		if (err) {
			return res.sendStatus(400);
		} else {
			return res.json(bookmark);
		}
	});
});
// Export this router object so that it is accessible when we require the file elsewhere
module.exports = router;
