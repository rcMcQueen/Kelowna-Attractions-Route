$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'http://159.203.47.53:8080/displayProfile',
        dataType: 'json',
        success: displayProfileInformation,
        error: function (err) {
          throw err;
        }
    });
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
