var express = require("express");
var mongoose = require("mongoose");
var DataModel = require("./models/Data");
const Data = require('./Data');

let myDatabase = function() {
}


myDatabase.prototype.getUsers = function(res) {
  DataModel.find({},function(error,info) {
    if (error)
      return res.json({error:true});
    else {
      let names = [];
//add or modify.  Add code to fill in names array


      return res.json({error:false,names:names});
    }
  })
}

myDatabase.prototype.postData = function(data,res) {
//  let obj = {ident:data.ident,name:data.name};
  let obj = {name:data.name,grade:data.grade};   //added
  DataModel.create(obj,function(error,info) {
      if (error) {
          return res.json({error:true});
      }
      return res.json({error:false});
  });
}

myDatabase.prototype.getData = function(name,res) {

  DataModel.find({name:name},function(error,info) {
      if (error) {
          return res.json({error:true});
      }
      else if (info == null) {
          return res.json({error:true});
      }
      if (info.length == 1)	
          return res.json({error:false,name:name,grade:info[0].grade});
      else
          return res.json({error:true});
   });
}



myDatabase.prototype.putData = function(data,res) {
//  let obj = {ident:data.ident,name:data.name};  
  let obj = {name:data.name,grade:data.grade};   //added
  DataModel.findOneAndUpdate({name:data.name},{grade:data.grade},function(error,oldData) {
    if (error) {
      return res.json({error:true});
    }
    else if (oldData == null) {
      return res.json({error:true});
    }
    return res.json({error:false});
  });
}

myDatabase.prototype.deleteData = function(ident,res) {
    DataModel.remove({ident:ident},function(error,removed) {
        if (error) {
            return res.json({error:true});
        }        
        if (removed.result.n == 0)
            return res.json({error:true});
        return res.json({error:false});
    });
}

module.exports = myDatabase;