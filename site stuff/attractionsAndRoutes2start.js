 function getPopularAttractions() {
     $(document).ready(function () {
         $.ajax({
             type: 'GET',
             url: 'http://localhost:8888/popAttr',
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
             url: 'http://localhost:8888/recRoute',
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


 function getAttractionTypes() {
     $(document).ready(function () {
         $.ajax({
             type: 'GET',
             data: attrTypes,
             url: 'http://localhost:8888/makeAttr',
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

 