var getBusinessDays = (function() {

    isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
    
    isDate = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Date]';
    };

    var oneDay = 86400000; //milliseconds    
    return (function(firstDate, secondDate, holidays){
        if (!isArray(holidays))
            holidays = [];
            
        if (!isDate(firstDate))
            firstDate = new Date(firstDate);
            
        if (!isDate(secondDate))
            secondDate = new Date(secondDate);

        var startDate = new Date(Math.floor(Math.min(firstDate, secondDate) / oneDay) * oneDay);
        var endDate = new Date(Math.floor(Math.max(firstDate, secondDate) / oneDay) * oneDay);

        var days = (endDate - startDate) / oneDay;
        days -= Math.floor(days / 7) * 2;
        
        var firstDay = startDate.getDay();
        var lastDay = endDate.getDay();
        
        if (!(firstDay > 0 && firstDay < lastDay && (lastDay > 0 && lastDay < 6))) {
            
            if (firstDay == 0)
                days--;
            
            if (lastDay == 0)
                days--;
            else if (firstDay > lastDay)
                days -= Math.min(7 - (lastDay - firstDay), 2);
        }

        for (var i = 0; i < holidays.length; i++) {
            var holiday = holidays[i];
            holiday = new Date(((isDate(holiday) ? holiday : new Date(holiday)) / oneDay) * oneDay);
            if (holiday >= startDate && holiday <= endDate && 0 < holiday.getDay() && holiday.getDay() < 6)
                days--;
        }
        
        return days;
    });    
}());