//global variables that define page state
var chosenStateName
var chosenStateInitials
var chosenStateNetWorth
var repWorth
var repName

var itemPrice

//parse local storage or create new array
var localSave = JSON.parse(localStorage.getItem("localSave"))
if (localSave === null) {
    localSave = []
}

//create recent search on load
propagateRecentSearch()

//sets choosenStateInitials etc
$("#map").on("click", function() {

    //sets current display state
    $("#repList").addClass("hiddenItem").removeClass("shownItem")
    $("#resultContainer").addClass("hiddenItem").removeClass("shownItem")
    $("#itemChoice").addClass("hiddenItem").removeClass("shownItem")

    //this html element is constantly updated within the map based on posistion of click on the entire div of the map
    chosenStateName = $(".tt_name_sm").text()

    //navigating through object in html5usmapv4.0_branded/mapdata to match state name to a value and then use its key 
    Object.values(simplemaps_usmap_mapdata.state_specific).forEach(function(object, index) {
        if (object.name == $(".tt_name_sm").text()) {
            chosenStateInitials = (Object.keys(simplemaps_usmap_mapdata.state_specific)[index])
        }
    })

    //setting state net worth by matching intials to object located in statenetworth.js
    stateNetWorthVar.forEach( function(object) {
        if (object.stateAb.includes(chosenStateInitials)) {
            chosenStateNetWorth = object.netWorth
        }
    })

    //empty list prior to call
    $("#repStatus").empty()

    //located in api.js
    apiStateCall(chosenStateInitials)
})

//listens for click on representative
$(".dropdown-menu").on("click", ".dropdown-option", function() {
    //passes in CID stored in html value as well as rep name
    apiCidCall($(this).attr("value"), $(this).text())   
})


$('#buttonHome').on("click", ".btn", function() {
    //uses clicked image src as chosen item's src
    $('#chosenImage').empty()
    $('#chosenImage').append($("<img>").attr("src", $(this).children("img").attr("src"))
    )

    //variables found in costcomparision net worth 
    //sets item price to match current states average house price 
    if ($(this).attr("id") === "itemHouse") {
        itemHouse.forEach(function(object) {
            if (object.stateAb.includes(chosenStateInitials)) {
                itemPrice = object.cost
            }
        })
    }
    //sets item price to lunchable or tesla
    else { 
        itemPrice = eval($(this).attr("id")) 
    }
    propagateResultList ()
})


$("#recentSearches").on("click", ".recent-search-card", function() {

    //redefines global variables
    chosenStateName = localSave[$(this).attr("value")].stateName
    chosenStateInitials = localSave[$(this).attr("value")].stateInitials
    chosenStateNetWorth = localSave[$(this).attr("value")].stateNetWorth
    repName = localSave[$(this).attr("value")].name
    repWorth = localSave[$(this).attr("value")].netHigh

    //resets display
    $("#resultList").empty()
    $("#chosenImage").empty()
    $("#repList").removeClass("hiddenItem").addClass("shownItem")
    $("#itemChoice").removeClass("hiddenItem").addClass("shownItem")
    $("#resultContainer").addClass("hiddenItem").removeClass("shownItem")
    $("#repStatus").empty()
    $("#repStatus").append($("<p>").text(`${repName} is available for comparison.`)).addClass("available").removeClass("unavailable")

    //recreates replist through API call
    apiStateCall(chosenStateInitials)
})




//push object to localSave and calls propagateResult
function pushToStorage(objectPush) {

    //pushes object into first slot of array if it does not already exist
    if (!checkSave(objectPush)) {
        localSave.unshift(objectPush)

        //deletes(pops) last save in array if new array has 5
        if (localSave.length > 4) {
            localSave.pop()
        }
        localStorage.setItem("localSave", JSON.stringify(localSave))
        localSave = JSON.parse(localStorage.getItem("localSave"))

        //left over global variables that still need to be defined
        repName = localSave[0].name
        repWorth = localSave[0].netHigh

        propagateRecentSearch() 
    }  
}
//checks if save already exsists based on object.name
function checkSave(objectPush) {
    for (i = 0; i < localSave.length; i++) {
        if (localSave[i].name === objectPush.name) {
            return true
        }
    }
    return false
} 
    

