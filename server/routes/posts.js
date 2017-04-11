var express = require('express');
var router = express.Router();
var postController = require('../controllers/post');

router.route('/:id')
		.get(postController.getOne)
		.put(postController.update)
		.delete(postController.delete)


router.get('/:id/edit/',postController.getOne);

router.route('/')
		.get(postController.list)
		.post(postController.create);

module.exports = router;