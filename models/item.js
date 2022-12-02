const mongoose =require('mongoose')
const Schema=mongoose.Schema


const TacheShema= new Schema({
	name: {
		type: String,
		
		},
	
	date: {
		type:Date,
		default:Date.now
	}


})
module.exports=Item=mongoose.model('items',TacheShema)