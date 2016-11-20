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

 var attrTypes = {};
 $.getScript("attrTypes.js", function() {
     attrTypes = updateAttractions();
 });

 function getAttractionTypes() {
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

 function getSelectedAttractions() {
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