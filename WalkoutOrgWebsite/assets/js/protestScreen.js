var config = {
	apiKey: "AIzaSyBV4bkE1F93KM0gyeKfMve1BzES8WC1moo",
	authDomain: "walkoutorrrg.firebaseapp.com",
	databaseURL: "https://walkoutorrrg.firebaseio.com",
	projectId: "walkoutorrrg",
	storageBucket: "",
	messagingSenderId: "832751515426"
};
var w = 0;
var woo = 0;
firebase.initializeApp(config);
var database = firebase.database();
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Give the parameter a variable name
var dynamicContent = getParameterByName('dc');
console.log(dynamicContent);

function searchforDesc(v1){
  for(var i=0;i<v1.length;v++){
    if(v1[0] == dynamicContent)return i;
  }
  return 0;
  }

function buttonfnc(){
var names = [];

var descriptions = [];

    database.ref().on("value", function(snapshot){
      //console.log(snapshot);
      //names.push(snapshot.child("one").child("Name").val());
      //descriptions.push(snapshot.child("one").child("Description").val());
      snapshot.forEach(function(childSnapshot){
        //if(childs.indexOf(childSnapshot.child("message").val()) == -1){
        childSnapshot.forEach(function(wSnapshot){

          console.log(wSnapshot.child("text").val());
          names.push(wSnapshot.child("Name").val());
          descriptions.push(wSnapshot.child("Description").val());
        });
          //woo++;

        //}
      });
    });
    var tokenNumber = searchforDesc(names);
    console.log(tokenNumber);
    console.log("des"+ descriptions);
    var finalString = "";
    finalString = "<h2>"+dynamicContent+"</h2><p>"+descriptions[tokenNumber]+"</p>";
    //if(woo == 0)
    //var fragment = create(finalString);
    //document.getElementById("body").appendChild(fragment);
    if(woo == 2){
        $(document).ready(function() {
        $('header').append(finalString);
      });
    }
console.log(woo);
woo++;
if(woo ==1)buttonfnc();
}

function emailNotify(){
  alert("Protest participants have been notified");

}

function mediaEmail() {
  alert("Associated Press, CBS, Fox News, NBC's local affiliates have been notified");
}


/*
console.log(tokenNumber);
console.log("des"+ descriptions);
var finalString = "<h2>"+dynamicContent+"</h2><p>"+descriptions[tokenNumber]+"</p>"
//var fragment = create(finalString);
//document.getElementById("body").appendChild(fragment);
$(document).ready(function() {
    $('header').append(finalString);
  });
*/
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
        return frag;
    }
