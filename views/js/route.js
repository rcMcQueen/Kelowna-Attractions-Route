function createRouteStops(selectedAids){
    var selectedAttr = {"aid":selectedAids};
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            data: selectedAttr,
            dataType: 'json',
            url: 'http://159.203.47.53:8080/createRouteStops',
            success: function (data) {
                // inserts a route-stops into the database
                // returns nothing, so no need to display anything on the website
            },
            error: function (err) {
                console.log('Error, Ajax call unsuccessful.', err);
            }
        });
    });
}
