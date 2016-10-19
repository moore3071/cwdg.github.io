var ordinal = function(mday) {
    var strMday = String(mday);
    var determinator = strMday[strMday.length - 1];

    if (determinator == '1') {
        return strMday + "st";
    } else if (determinator == '2') {
        return strMday + "nd";
    } else if (determinator == '3') {
        return strMday + "rd";
    } else {
        return strMday + "th";
    }
}

var thatReallyBadTimeFunction = function(date) {
    // http://swizec.com/blog/javascripts-lack-of-strftime/swizec/3164
    var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December' ];
    var weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

    return weekdays[date.getDay()] + ", " +
        months[date.getMonth()] + " " +
        ordinal(date.getDate()) + ", " + (1900 + date.getYear());
}

var toLocalTime = function(date) {
    var tzOffset = new Date().getTimezoneOffset() * 60 * 1000;  // Get user's timezone offset, convert to milliseconds
    return new Date(Date.parse(date) + tzOffset);               // Parse date (UTC), convert to local time
}

var updateMeeting = function() {
    // Get all meetings
    var meetings = [{"date":"2016-10-18","topic":"React (JavaScript Framework)","speaker":"Wes from CoverMyMeds"},{"date":"2016-10-25","topic":"Backend  Stuff","speaker":"Paul Tela (subject to change)"},{"date":"2016-11-01","topic":"tentative","speaker":"N/A"},{"date":"2016-11-17","topic":"Oktoberfest","speaker":"Glowing Pumpkin"}];
    // Find the next meeting whose datetime, based on the end-of-day, is greater than the current datetime
    var nextMeeting = meetings.find(function(e) {
        return toLocalTime(e.date + "T23:59:59") >= new Date();
    });

    // If such a meeting is found, display it
    if (nextMeeting) {
        document.getElementById("next-meeting-date").innerHTML =
            thatReallyBadTimeFunction(toLocalTime(nextMeeting.date));
        document.getElementById("meeting-topic").innerHTML = nextMeeting.topic;
        document.getElementById("meeting-speaker").innerHTML = nextMeeting.speaker;
    }
}

document.addEventListener("DOMContentLoaded", updateMeeting);
