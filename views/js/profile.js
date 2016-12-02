// Fetches basic profile information
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'http://159.203.47.53:8080/displayProfile',
        dataType: 'json',
        success: displayProfileInformation,
        error: function (err) {
          console.log(err);
        }
    });
});

// Fetches stored routes
$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'http://159.203.47.53:8080/displaySavedRoute',
    dataType: 'json',
    success: displaySavedRoute,
    error: function (err) {
      console.log("Ajax unsuccessful", err);
    }
  })
});

function displayProfileInformation(data) {
  document.getElementById('username').innerHTML = data[0].uname;
  document.getElementById('email').innerHTML = data[0].email;
  if (data[0].first_name != 'null') {
    document.getElementById('firstName').innerHTML = data[0].first_name;
  }
  if (data[0].last_name != 'null') {
    document.getElementById('lastName').innerHTML = data[0].last_name;
  }
}

function displaySavedRoute(data) {
  var jsonRecRoutes = data;
  if (data) {
   for(var y = 0; y < data.length; y++) {
     var listNode = document.createElement("LI");
     listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white w3-blue');
     var imageNode = document.createElement("IMG");
     imageNode.setAttribute('src', 'img/best_dog.jpg');
     imageNode.setAttribute('class', 'w3-left w3-circle');
     imageNode.setAttribute('style', 'width:60px');
     var spanNodeOne = document.createElement('span');
     spanNodeOne.innerHTML = jsonRecRoutes[y].name;
     spanNodeOne.setAttribute('class','w3-xlarge');
     var spanNodeTwo = document.createElement("span");
     spanNodeTwo.innerHTML = jsonRecRoutes[y].description;
     listNode.appendChild(imageNode);
     listNode.appendChild(spanNodeOne);
     listNode.appendChild(document.createElement("BR"));
     listNode.appendChild(spanNodeTwo);
     //listNode.addEventListener('click',function(){clickRoute(jsonRecRoutes[y].rid,jsonRecRoutes[y].uname);});
     document.getElementById("savedAttrList").appendChild(listNode);
   }
 }
 else {
   $("#savedAttrList").html('You have no saved routes!');
    $("#savedAttrList").addClass("alert alert-danger");
 }
}
