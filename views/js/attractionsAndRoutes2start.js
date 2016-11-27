

function getPopularAttractions(listId) {
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            url: 'http://159.203.47.53:8080/popAttr',
            dataType: 'json',
            success: function (data) { 
                var jsonPopAttr = data;
                var listNode = document.createElement("LI");
                listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
                listNode.setAttribute('onclick', "clickAttr(this);location.href = 'route.html';");
                var imageNode = document.createElement("IMG");
                imageNode.setAttribute('src', 'img/best_dog.jpg');
                imageNode.setAttribute('class', 'w3-left w3-circle');
                imageNode.setAttribute('style', 'width:60px');
                var spanNodeOne = document.createElement('span');
                spanNodeOne.innerHTML = jsonPopAttr[z].name;
                spanNodeOne.setAttribute('class','w3-xlarge');
                var spanNodeTwo = document.createElement("span");
                spanNodeTwo.innerHTML = jsonPopAttr[z].description;
                listNode.appendChild(imageNode);
                listNode.appendChild(spanNodeOne);
                listNode.appendChild(document.createElement("BR"));
                listNode.appendChild(spanNodeTwo);
                document.getElementById(listId).appendChild(listNode);
               	z += 1;
            },
            error: function (err) {
                console.log('Error, Ajax call unsuccessful.', err);
            }
        });
    });
 };

function getRecommendedRoutes(listId,y) {
	$(document).ready(function() {
	$.ajax({
             type: 'GET',
             url: 'http://159.203.47.53:8080/recRoute',
             dataType: 'json',
             success: function(data) {
		var jsonRecRoutes = data;
		var listNode = document.createElement("LI");
		listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
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
		listNode.addEventListener('click',function(){clickRoute(jsonRecRoutes[y].rid,jsonRecRoutes[y].uname);});
		document.getElementById(listId).appendChild(listNode);
		},
             error: function (err) {
                 console.log('Error, Ajax call unsuccessful.', err);
             }
	});
    });
}

function updateAttractions() {
    var selectedAttr = {"type":[]};
    if(document.getElementById("Winery").checked){
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

function passAttraction(listId, aid){
    attractionParam = {"aid": aid};
	if(aid == null)
		return;
	console.log("this shouldnt print");
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            data: attractionParam,
            dataType: 'json',
            url: 'http://159.203.47.53:8080/selectedAttr',
            success: function (data) {
                console.log(JSON.stringify(data))
                // returned is : name, lat, lng, description, rating  ... from the Attraction table
					 var listNode = document.createElement("LI");
                     listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
                     var imageNode = document.createElement("IMG");
                     imageNode.setAttribute('src', 'img/best_dog.jpg');
                     imageNode.setAttribute('class', 'w3-left w3-circle');
                     imageNode.setAttribute('style', 'width:60px');
                     var spanNodeOne = document.createElement('span');
                     spanNodeOne.innerHTML = data[0].name;
                     spanNodeOne.setAttribute('class','w3-xlarge');
                     var spanNodeTwo = document.createElement("span");
                     spanNodeTwo.innerHTML = data[0].description;
                     var spanNodeThree = document.createElement("span");
                     spanNodeThree.innerHTML = 'Rating: ' + data[0].rating + '/5';
                     listNode.appendChild(imageNode);
                     listNode.appendChild(spanNodeOne);
					 listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeThree);
                     listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeTwo);
                     document.getElementById(listId).appendChild(listNode);

                // display attraction to the map
                     buildRouteWithOneAttraction(data);
            },
            error: function (err) {
                console.log('Error, Ajax call unsuccessful.', err);
            }
        });
    });
}

function displayRecommendedRoutes(listId,rid, uname){
    var routeParams = {"rid": rid, "username": uname};
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            data: routeParams,
            dataType: 'json',
            url: 'http://159.203.47.53:8080/showRecRoute',
            success: function (data) {
                console.log(JSON.stringify(data))
                // returns A.name, A.description, A.rating, A.lat, A.lng
            },
            error: function (err) {
                console.log('Error, Ajax call unsuccessful.', err);
            }
        });
    });
}


function getAttractions(listId,offset,x) {
     var attrTypes = {};
     attrTypes = updateAttractions();
     $(document).ready(function () {
         $.ajax({
             type: 'GET',
             data: attrTypes,
             url: 'http://159.203.47.53:8080/makeAttr',
             dataType: 'json',
             success: function (data) {
                 var jsonTypeAttr = data;
                 var dataLength = Object.keys(jsonTypeAttr).length;

                 // reset node content, so new result could be displayed                 

                 // Alternative way:
                 //var node = document.getElementById(listId);
                 //while (node.hasChildNodes()) {
                 //    node.removeChild(node.firstChild);
                 //}
				
                     var listNode = document.createElement("LI");
                     listNode.setAttribute('class', 'w3-padding-16 w3-border-bottom w3-border-white');
                     var imageNode = document.createElement("IMG");
                     imageNode.setAttribute('src', 'img/best_dog.jpg');
                     imageNode.setAttribute('class', 'w3-left w3-circle');
                     imageNode.setAttribute('style', 'width:60px');
                     var spanNodeOne = document.createElement('span');
                     spanNodeOne.innerHTML = jsonTypeAttr[x+offset].name;
                     spanNodeOne.setAttribute('class','w3-xlarge');
                     var spanNodeTwo = document.createElement("span");
                     spanNodeTwo.innerHTML = jsonTypeAttr[x+offset].description;
                     var spanNodeThree = document.createElement("span");
                     spanNodeThree.innerHTML = 'Rating: ' + jsonTypeAttr[x+offset].rating + '/5';
                     listNode.appendChild(imageNode);
                     listNode.appendChild(spanNodeOne);
					listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeThree);
                     listNode.appendChild(document.createElement("BR"));
                     listNode.appendChild(spanNodeTwo);
					 listNode.addEventListener('click',function(){clickAttr(jsonTypeAttr[x+offset].aid);});
                     document.getElementById(listId).appendChild(listNode);
             },
             error: function (err) {
                 console.log('Error, Ajax call unsuccessful.', err);
             }
         });
     });
};