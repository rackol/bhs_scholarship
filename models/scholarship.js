var mongoose=require('mongoose');
var Scholarship=require('./scholarship')
var Schema = mongoose.Schema;

var scholarshipSchema=new Schema({
    name:String,
    link:String,
    amount: String,
    gpa: String,
    due: Date,
    mvn: Array,
    gender: Array,
    religion: Array,
    interests: Array,
    race: Array,
    other: Array,
    type: Array,
});

var Scholarship=mongoose.model('Scholarship', scholarshipSchema);
module.exports=Scholarship;