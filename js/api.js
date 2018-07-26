$(function (){

function TrainerClass(data) {
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
    self.newTrainerUName = ko.observable();
    self.newTrainerFName = ko.observable();
    self.newTrainerPhone = ko.observable();
    self.newTrainerEmail = ko.observable();
    self.newTrainerPassword = ko.observable();
    

    //Load the initial data
    $.ajax({
        type: 'GET',
        url: 'https://rocky-reaches-97928.herokuapp.com/trainer',
        success: function(data) {
          /*patient = [{"username":"usn","f_name":"mad","phone":"9845","email":"test@gmail.com","password":"123","id":1}];    
            // Don't return the result, bind it to the viewmodel
            
            ko.utils.arrayForEach(patient, function(fr){
               var frdCls = new TrainerClass(fr)
                self.trainer.push(frdCls);
            });*/


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
           
            
           // var mappedTrainer = ko.mapping.fromJS(trainers);
            //self.trainer(mappedTrainer());
          }
      });


    self.saveTrainer = function() {
        console.log('saved');
        $.ajax({
          type: 'POST',
         
         url: 'https://rocky-reaches-97928.herokuapp.com/trainer/signup',

          data: ko.toJS(new TrainerClass({ username: this.newTrainerUName(), f_name:  this.newTrainerFName(),phone:  this.newTrainerPhone(),email:  this.newTrainerEmail(),password:  this.newTrainerPassword()})),
          success: function(data) {
            console.log("patient added!", data); //the new item is returned with an ID
          }
    })};


    self.addTrainer = function() {
            self.trainer.push(new TrainerClass({ username: this.newTrainerUName(), f_name:  this.newTrainerFName(),phone:  this.newTrainerPhone(),email:  this.newTrainerEmail(),password:  this.newTrainerPassword()}));
            self.saveTrainer();
            self.newTrainerUName("");
            self.newTrainerFName("");
            self.newTrainerPhone("");
            self.newTrainerEmail("");
            
    };

    /*self.removeTrainer = function(trainer) { self.trainer.remove(trainer), self.deleteTrainer(trainer) };

    self.deleteTrainer = function(trainer) {
        var deletionString = 'https://rocky-reaches-97928.herokuapp.com/trainer/' + trainer.id();
        console.log(deletionString);
        $.ajax({
          type: 'DELETE',
          url: deletionString,
          success: function() {
            //no data...just a success (200) status code
            console.log('Trainer Deleted Successfully!');
          }
    })};
  // self.toggleEdit = function(trainer){
  //   self.showEdit(!self.showEdit());
  // }
  self.updateTrainer = function(trainer) {
    var updateString = 'https://rocky-reaches-97928.herokuapp.com/trainer/' + trainer.id();
    console.log(this.name());
    $.ajax({
    type: 'PUT',
    data: ko.toJS(new TrainerClass({username: this.username(), f_name: this.f_name(), phone: this.phone(),email:this.email(),password:this.password()})),
    url: updateString,
    success: function() {
      //no data...just a success (200) status code
      console.log('Trainer Updated Successfully!');
    }
  })};
*/

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


