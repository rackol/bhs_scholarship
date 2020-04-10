var data = require("../routes/data.js");

module.exports=function(app) {
    var currentScholarship;
    var Scholarship=require('../models/scholarship.js');


app.get('/', function(req, res) {
        Scholarship.find({}, function(err,scholarships) {
            res.render('login.ejs',{results:scholarships})
        })

});

app.post('/login',function(req,res){
    if ((req.body.userName=="MJacobs"||req.body.userName=="DAn"||req.body.userName=="JHammon")&&req.body.password=="1980Allston"){
        //add(res);
        res.render("counselor.ejs",{userObject:Scholarship})
    }else(
        res.render("login.ejs")
    )
});

app.post('/scholarships',function(req,res){
    res.render("search.ejs")
});

app.post('/add',function(req,res){
    Scholarship.findOne({name:req.body.name},function(err,scholarship){
        if(scholarship){
           currentScholarship=scholarship;
           res.render("counselor.ejs",{userObject:scholarship})
        }else{
            var s=new Scholarship({name:req.body.name, link:req.body.link, gender:req.body.gender, race:req.body.race,
                religion:req.body.religion, other:req.body.other, interests:req.body.interests, 
                gpa:req.body.gpa, type:req.body.type, mvn:req.body.mvn, amount:req.body.amount, due:req.body.due})
            s.save(function(err,scholarship){
                currentScholarship=scholarship;
                res.render("counselor.ejs",{userObject:Scholarship});
            })
        }
    })
});

app.post('/edit',function(req,res){
    res.render("edit.ejs",{name:0})
});

app.post('/show', function(req, res) {
    Scholarship.find({},function(err,scholarships){
        res.render('seeAll.ejs',{results:scholarships})
    })
});

app.post('/change',function(req,res){
    Scholarship.findOne({name:req.body.name},function(err,scholarship){
        if(scholarship){
            scholarship.due=new Date(req.body.due)
            scholarship.save(function(err,newUser){
                res.render('edit.ejs',{name:1},{userObject:scholarship})
            })
        }else{
            res.render("edit.ejs",{name:2})
        }
    })
});

app.post('/search',function(req,res){
    var goodS=[];
    Scholarship.find({},function(err,scholarships){
        for(a=0;a<scholarships.length;a++){
            var i=scholarships[a];
            var now=new Date();
            var date=new Date(i.due); 
            if(now<date){
                if(!req.body.race||!req.body.religion||!req.body.other||!req.body.interests||!req.body.gender){
                    res.render("search.ejs")
                }else{
                    if(i.race==""||findCommon(req.body.race,i.race)==true){
                        if(i.gpa==""||req.body.gpa>=i.gpa){
                            if(i.religion==""||findCommon(req.body.religion,i.religion)==true){
                                if(i.type==""||req.body.type==i.type){
                                    if((i.mvn==""||req.body.mvn==i.mvn)||i.mvn=="merit"){
                                        if(i.interests==""||findCommon(req.body.interests,i.interests)==true){
                                            if(i.gender==""||findCommon(req.body.gender,i.gender)==true){
                                                if(i.other==""||findCommon(req.body.other,i.other)==true||i.other.indexOf("visa")>-1&&req.body.other.indexOf("citizen")>-1){
                                                    goodS.push(i);
                                                }
                                            }
                                        }
                                    }
                                } 
                            }
                        }
                    }
                }
            } 
        }
        res.render("list.ejs",{goodS:goodS})
    })       
});

function findCommon(body,s){
    var num=0;
    
    if(typeof body=="string"){
        body=[body];
    }
    for (var a=0; a<s.length; a++){
        if(body.indexOf(s[a])>-1){
            num++;
        }
    }
    if(num==s.length){
        return true;
    }
}

function add(res){
    for(i=0;i<data.length;i++){
        var s=new Scholarship(data[i])
        s.save(function(err,scholarship){
            currentScholarship=scholarship;
            res.render("login.ejs",{userObject:scholarship})
        })
    }
}        
}