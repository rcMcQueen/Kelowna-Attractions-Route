function createRouteStops(selectedAids){
    var selectedAttr = {"aid":selectedAids};
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            data: selectedAttr,
            dataType: 'json',
            url: 'http://159.203.47.53:8080/createRouteStops',
            success: function (data) {
              $document.getElementById("savedText").innerHTML('Successfully updated record!');
            },
            error: function (err) {
              $document.getElementById("savedText").innerHTML('Error! Route not saved!');
            }
        });
    });
}
