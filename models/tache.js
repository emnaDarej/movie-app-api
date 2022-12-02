const mongoose =require('mongoose')
const Schema=mongoose.Schema


const TacheShema= new Schema({
	_id: Schema.Types.ObjectId,
	description: {
		type: String,
	},
    remarque: {
        type: String,
    },
    status: {
        type: Number,
    },
	
	date_creation: {
		type:Date,
		default:Date.now
	},
    deleted: {
		type: Boolean,
		default:0
	}


})
module.exports=Item=mongoose.model('tache',TacheShema)