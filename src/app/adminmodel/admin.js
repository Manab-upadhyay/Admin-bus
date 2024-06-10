const mongoose = require('mongoose')
const busadminschema= new mongoose.Schema({
usermail: {type:String},
Password: {type:String},
name:{type:String}

})
const busadmin =  mongoose.models?.busadmin
|| mongoose.model('busadmin', busadminschema);

export default busadmin;
