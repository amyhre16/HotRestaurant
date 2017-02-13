// run callback function when page is finished loading
$(document).ready(function() {
    alert("Hello world");
    /*
        event listener that waits for the element with id add-btn to be clicked
        when it's clicked, run the callback function
    */
    $(document).on("click", '#add-btn', function() {
        // grab the this information from the form and store it in the table object
        var table = {
            name: $("#name").val().trim(),
            phone: $("#number").val().trim(),
            email: $("#email").val().trim(),
            unique: $("#unique").val().trim()
        };

        // grab the domain from the url
        var currentURL = window.location.origin;

        /*
            ajax post request with currentURL concatenated with the post route
            send the table object
            when the request is finished, run the callback function
        */
        $.post(currentURL + "/../../makeReservation", table, function(data) {
            // if data has the reservation property, then let the user know that they've gotten a table
            if(data.reservation != undefined){
                // alert("you got a table");
                $('#reservationModal').modal('toggle');
            }
            // if data has waiting property, let the user know that they've been added to the waiting list
            else if (data.waiting != undefined) {
                // alert("you are on waiting list");
                $('#waitingListModal').modal('toggle');
            }
        });

        // empty out the 
        $("#name").val("");
        $("#number").val("");
        $("#email").val("");
        $("#unique").val("");
        
        // return false to keep page from refreshing
        return false;
    });
});