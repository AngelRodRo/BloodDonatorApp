var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Model for Donors
var postSchema = new Schema({
	firstName: {
		type:String,
		required:true
	},
	lastName: {
		type:String,
		required:true
	},
	contactNumber:String,
	email: {
		type:String,
		required:true
	},
	address: { 
		type:String,
		required:true
	},
	bloodGroup: {
		type:String,
		required:true
	},
	latitude:{
		type:Number,
		required:true
	},
	longitude:{
		type:Number,
		required:true
	},
	ip: {
		type:String
	}
});

postSchema.pre('save',(next)=>{
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
})

module.exports = mongoose.model('Post',postSchema);