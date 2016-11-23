var getBusinessDays = (function() {

    isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
    
    isDate = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Date]';
    };

    var oneDay = 86400000; //milliseconds    

    return (function(firstDate, secondDate, options){
    
        options = options || {holidays: [], exclusive: true};

        if (!isDate(firstDate))
            firstDate = new Date(firstDate);
            
        if (!isDate(secondDate))
            secondDate = new Date(secondDate);

        var startDate = new Date(Math.floor(Math.min(firstDate, secondDate) / oneDay) * oneDay);
        var endDate = new Date(Math.floor(Math.max(firstDate, secondDate) / oneDay) * oneDay);

        var days = (endDate - startDate) / oneDay;
        if (!options.exclusive)
            days++;
            
        days -= Math.floor(days / 7) * 2;
        
        var firstDay = startDate.getDay();
        var lastDay = endDate.getDay();
        
        if (options.exclusive) {
            if (firstDay != lastDay) {
                if (firstDay < lastDay) {
                    if (firstDay == 0)
                        days--;
                } else {
                    if (lastDay != 0)
                        days--;
                    days--;
                }                
            }
        } else {
            if (firstDay != ((lastDay + 1) % 7)) { // If non-whole week, calculate the rest.
                if (firstDay <= lastDay) { // The rest doesn't cross weekend (SAT-SUN)
                    if (firstDay == 0 || lastDay == 6) // Only one day could be SAT or SUN. If first = SUN and last = SAT it won't go here due to first "if" (weekend is already counted).
                        days--;
                } else {
                    days -= 2; // In this case we should always remove whole weekend
                }
            }
        }
        
        if (!isArray(options.holidays))
            options.holidays = [];

        for (var i = 0; i < options.holidays.length; i++) {
            var holiday = options.holidays[i];
            holiday = new Date(((isDate(holiday) ? holiday : new Date(holiday)) / oneDay) * oneDay);
            if (holiday >= startDate && holiday <= endDate && 0 < holiday.getDay() && holiday.getDay() < 6)
                days--;
        }
        
        return days;
    });
}());