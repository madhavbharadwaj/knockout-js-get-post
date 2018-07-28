$(function (){

function TrainerClass(data) {
     this._id = ko.observable(data._id);
    this.username = ko.observable(data.username);
    this.f_name = ko.observable(data.f_name);
    this.phone = ko.observable(data.phone);
    this.email = ko.observable(data.email);
    this.password = ko.observable(data.password);
    this.editable = ko.observable(false);
}

function viewModel(){
    var self = this;
    self.trainer  = ko.observableArray([]);
    self.newTrainerID = ko.observable();
    self.newTrainerUName = ko.observable();
    self.newTrainerFName = ko.observable();
    self.newTrainerPhone = ko.observable();
    self.newTrainerEmail = ko.observable();
    self.newTrainerPassword = ko.observable();
    

    //Load the initial data
    $.ajax({
        type: 'GET',
        url: 'https://protected-plateau-97422.herokuapp.com/trainer',
        success: function(data) {
         // patient = [{"username":"usn","f_name":"mad","phone":"9845","email":"test@gmail.com","password":"123","id":1}];
         for (var i=0;i<data.count;i++)
         {
         patient = [{"_id":data.trainer[i].trainer_details._id,"username":data.trainer[i].trainer_details.username,"f_name":data.trainer[i].trainer_details.f_name,"phone":data.trainer[i].trainer_details.phone}]
            // Don't return the result, bind it to the viewmodel
           
            ko.utils.arrayForEach(patient, function(fr){
              var frdCls = new TrainerClass(fr)
               self.trainer.push(frdCls);
                
             
           });
         }
         

            $.getJSON("https://protected-plateau-97422.herokuapp.com/trainer", function (data) {
      //console.log(data);
      var counter = 0;
  });        
          }
      });


    self.saveTrainer = function() {
      
        console.log('saved');
        $.ajax({
          type: 'POST',
         
         url: 'https://protected-plateau-97422.herokuapp.com/trainer/signup',

          data: ko.toJS(new TrainerClass({ _id: this.newTrainerID(),username: this.newTrainerUName(), f_name:  this.newTrainerFName(),phone:  this.newTrainerPhone(),email:  this.newTrainerEmail(),password:  this.newTrainerPassword()})),
          success: function(data) {
            console.log("patient added!", data); //the new item is returned with an ID
           location.reload(); 
        
          }
    }
  )
 };


    self.addTrainer = function() {
            self.trainer.push(new TrainerClass({ _id: this.newTrainerID(),username: this.newTrainerUName(), f_name:  this.newTrainerFName(),phone:  this.newTrainerPhone(),email:  this.newTrainerEmail(),password:  this.newTrainerPassword()}));
            self.saveTrainer();
            self.newTrainerID("");
            self.newTrainerUName("");
            self.newTrainerFName("");
            self.newTrainerPhone("");
            self.newTrainerEmail("");
            
    };

    self.removeTrainer = function(trainer) { self.trainer.remove(trainer), self.deleteTrainer(trainer) };

    self.deleteTrainer = function(trainer) {

        var deletionString = 'https://protected-plateau-97422.herokuapp.com/trainer/' + trainer._id();
        console.log(deletionString);
        $.ajax({
          type: 'DELETE',
          url: deletionString,
          success: function() {
            console.log('deleted macha');
            location.reload(); 
            
          }
    })};

  self.updateTrainer = function(trainer) {
    //alert(1);
    //var x = data.trainer[i].trainer_details.username
    var updateString = 'https://protected-plateau-97422.herokuapp.com/trainer/id/' + trainer._id();
   // console.log(this.name());
    $.ajax({
    type: 'PUT',
    //data: ko.toJS(new TrainerClass({ f_name: "maddy",phone:"123"})),
    data: ko.toJS(new TrainerClass({username: this.username(), f_name: this.f_name(), phone: this.phone()})),
    url: updateString,
    success: function() {
      //no data...just a success (200) status code
     
      console.log('Trainer Updated Successfully!');
      location.reload(); 
    }
  })};


} //viewModel

//logic to get data from api
/*
$(document).ready(function () {
  $('#action-button').click(function() {
  $.getJSON("https://rocky-reaches-97928.herokuapp.com/trainer", function (data) {
    
      //console.log(data);
      var counter = 0;
      for (var i=0;i<data.count;i++)
      {
      //  console.log(data.trainer[i]._id);
       // $('#table').append("<th>" + data.trainer[i]._id + "<th> "+data.trainer[i].f_name +"<br/>");
       $("#grid1 tbody").append("<tr><td>"+data.trainer[i]._id+" </td> <td>"+data.trainer[i].f_name+" </td> <td>"+data.trainer[i].m_name+" </td><td>"+data.trainer[i].l_name+" </td><td>"+data.trainer[i].phone+" </td><td>"+data.trainer[i].creation_time+" </td><td>"+data.trainer[i].lastLogin+" </td></tr>");
      }
        
     // var seasonsul = array_to_ul(seasons_ar);
     // $('#seasons').append(seasons_ar);
  });
});
});*/
ko.applyBindings(new viewModel());

});


