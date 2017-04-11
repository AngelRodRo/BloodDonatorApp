var models = require('../../index');

var posts = require('../seeds/posts');
var Post = models.Post;
var generator = require('../helpers/iterator');
var _ = require('underscore');

var randomLatLng = function() {

	var r = 10000/111300 // = 100 meters
	  , y0 = -12.045216
	  , x0 = -77.044046
	  , u = Math.random()
	  , v = Math.random()
	  , w = r * Math.sqrt(u)
	  , t = 2 * Math.PI * v
	  , x = w * Math.cos(t)
	  , y1 = w * Math.sin(t)
	  , x1 = x / Math.cos(y0)

	  var latitude = newY = y0 + y1
	  var longitude = newX = x0 + x1

	  return {
	  	latitude:latitude,
	  	longitude:longitude
	  }
}

var i = 1;
posts = _.map(posts,function(post) {
	var latLng = randomLatLng()
	post.latitude = latLng.latitude;
	post.longitude = latLng.longitude;
	post.lastName = i;
	post.address += i;
	post.email = `angel${i}@gmail.com`;

	i++;

	return post;
})

module.exports = generator(posts,Post,'POST');



