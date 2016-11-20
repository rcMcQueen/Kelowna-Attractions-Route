function updateAttractions() {
	var selectedAttr = {"type":[]};
	if(document.getElementById("Winery").checked){
		<!--selectedAttr["type"] = "Winery";
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