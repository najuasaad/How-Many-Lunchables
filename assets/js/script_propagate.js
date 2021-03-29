function propagateRepList(array) {
    //clears and shows list
    $(".dropdown-menu").empty()
    $("#repList").removeClass("hiddenItem").addClass("shownItem")

    array.forEach(function(val) {
        $(".dropdown-toggle").text(chosenStateInitials + " Representatives:")
        $(".dropdown-menu").append($("<a>").addClass("dropdown-option").attr("value", val.cid).attr("href", "#repStatus").attr("style", "display:block;").text(val.name))
    })
}

function propagateRecentSearch () {
    $("#recentSearches").empty()

    // altenate display if no saves present
    if (localSave.length === 0) {
        $("#recentSearches")
        .append($("<div>").addClass("empty-search")
            .append($("<h3>").text("No Recent Searches")
            )
        )
    }
    else {
        localSave.forEach(function(val, index) {
            $("#recentSearches")
            .append($("<div>").addClass("recent-search-card col px-md-1 btn").attr("value", index)
                .append($("<img>").attr("src", val.image)
                )
                .append($("<h3>").text(val.name)
                )
            )
        })
    }
}


function propagateResultList () {
    $("#resultList").empty()
    $("#resultContainer").removeClass("hiddenItem").addClass("shownItem")

    //caluclations and append all in one
    $("#resultList")
    .append($("<p>").text(`${repName} from ${chosenStateName}, could buy ${(Math.trunc(repWorth/itemPrice*100)/100).toLocaleString()} using their net worth.`)
    )
    .append($("<p>").text(`The average constituent in ${chosenStateName} could buy ${(Math.trunc(chosenStateNetWorth/itemPrice*100)/100).toLocaleString()}`)
    )
}




