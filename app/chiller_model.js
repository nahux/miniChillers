var mongoose = require('mongoose');

//Modelo de datos
var chillerSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	img: String,
	desc: String,
	precio: String,
	specs: {
		cap_enfri1:[String,String,String],
		cap_enfri2:[String,String,String],
		motor_comp:[String,String,String],
		motor_bomb:[String,String,String],
		tipo_refri:[String,String,String],
		max_flu_re:[String,String,String],
		diam_tub:[String,String,String],
		motor_vent:[String,String,String],
		cap_tanque:[String,String,String],
		dimension:[String,String,String],
		voltaje:[String,String,String],
		peso:[String,String,String]
	}
});
module.exports = mongoose.model('chillers',chillerSchema);
