var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function getPopularAttractions() {
     $(document).ready(function () {
         $.ajax({
             type: 'GET',
             url: 'http://159.203.47.53:8080/popAttr',
             dataType: 'json',
             success: function (data) {
                 data = JSON.stringify(data);
                 console.log(data);
             },
             error: function (data) {
                 console.log('Error, Ajax call unsuccessful.', data);
             }
         });
     });
 };

function getRecommendedRoutes() {
     $(document).ready(function () {
         $.ajax({
             type: 'GET',
             url: 'http://159.203.47.53:8080/recRoute',
             dataType: 'json',
             success: function (data) {
                 data = JSON.stringify(data);
                 console.log(data);
             },
             error: function (data) {
                 console.log('Error, Ajax call unsuccessful.', data);
             }
         });
     });
 };

function updateAttractions() {
    var selectedAttr = {"type":[]};
    if(document.getElementById("Winery").checked){
        //selectedAttr["type"] = "Winery";
        selectedAttr["type"].push("Winery");
    }
    if(document.getElementById("Hiking Trail").checked){
        selectedAttr["type"].push("Hiking Trail");
    }
    if(document.getElementById("Historical/Museum").checked){
        selectedAttr["type"].push("Historical/Museum");
    }
    if(document.getElementById("Park").checked){
        selectedAttr["type"].push("Park");
    }
    if(document.getElementById("Farm/Orchard").checked){
        selectedAttr["type"].push("Farm/Orchard");
    }
    if(document.getElementById("Entertainment").checked){
        selectedAttr["type"].push("Entertainment");
    }
    return selectedAttr;
}

function getAttractions() {
     var attrTypes = {};
     attrTypes = updateAttractions();

     $(document).ready(function () {
         $.ajax({
             type: 'GET',
             data: attrTypes,
             url: 'http://159.203.47.53:8080/makeAttr',
             dataType: 'json',
             success: function (data) {
                 data = JSON.stringify(data);
                 console.log(data);
             },
             error: function (err) {
                 console.log('Error, Ajax call unsuccessful.', err);
             }
         });
     });
};
