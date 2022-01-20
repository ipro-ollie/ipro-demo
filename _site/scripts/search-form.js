(function datePicker() {
    var picker = new HotelDatepicker(document.getElementById("dates"), {
        format: "DD/MM/YYYY",
        infoFormat: "DD/MM/YYYY",
        minNights: 2,
        moveBothMonths: true,
        startOfWeek: "monday",

        onSelectRange: function () {

            var selected_dates = this.getValue().split(" - ");
            var start_date = selected_dates[0];
            var end_date = selected_dates[1];

            document.getElementById("date-start").value = start_date;
            document.getElementById("date-end").value = end_date;
        },
    });
}())

var guesPlaceholder = "Guests";

$(".quantity-plus").click(function (e) {
    e.preventDefault();
    fieldName = $(this).attr("field");
    var currentVal = parseInt($("input[name=" + fieldName + "]").val());

    if (!isNaN(currentVal)) {
        $("input[name=" + fieldName + "]").val(currentVal + 1);
        
        var adultCount = $('input[name="adults"]').val();
        var childCount = $('input[name="children"]').val();
        var infantCount = $('input[name="infants"]').val();
        var guestTotal = parseInt(adultCount) + parseInt(childCount) + parseInt(infantCount);
        $("#guests").empty();
        $("#guests").text(guesPlaceholder + " " + guestTotal);
    } else {
        $("#guests").text(0);
    }
});

$(".quantity-minus").click(function (e) {
    e.preventDefault();
    fieldName = $(this).attr("field");
    var currentVal = parseInt($("input[name=" + fieldName + "]").val());

    if (!isNaN(currentVal) && currentVal > 0) {
        $("input[name=" + fieldName + "]").val(currentVal - 1);
       
        var adultCount = $('input[name="adults"]').val();
        var childCount = $('input[name="children"]').val();
        var infantCount = $('input[name="infants"]').val();
        var guestTotal = parseInt(adultCount) + parseInt(childCount) + parseInt(infantCount);
        console.log(guestTotal);
        $("#guests").empty();
        $("#guests").text(guesPlaceholder + " " + guestTotal);
    } else {
        $("input[name=" + fieldName + "]").val(0);
    }
});
 