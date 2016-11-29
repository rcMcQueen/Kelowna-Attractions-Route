function createRouteStops(selectedAids){
    var selectedAttr = {"aid":[]};
    for(var i = 0; i < selectedAids.length; i++){
        selectedAttr["aid"].push(selectedAids[i]);
    }
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            data: selectedAttr,
            dataType: 'json',
            url: 'http://159.203.47.53:8080/createRouteStops',
            success: function (data) {
                // inserts a route-stops into the database
            },
            error: function (err) {
                console.log('Error, Ajax call unsuccessful.', err);
            }
        });
    });
}