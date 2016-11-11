 function getPopularAttractions() {
     $(document).ready(function () {
         $.ajax({
             type: 'GET',
             url: 'http://localhost:8888/',
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

 