# get-business-days
Calculate business days between two dates.

## Usage:
```javascript
getBusinessDays(fromDate, tillDate, options)
```

## Parameters

*fromDate*
Date object or any object which could be passed to Date contructor (number of milliseconds or valid date string).

*tillDate*
Date object or any object which could be passed to Date contructor.

*options*
An object containing calculation options:
*options.holidays* is array of Date objects or any object which could be passed to Date constructor. Public holiday dates, which will be removed from resulting count.
*options.exclusive* a boolean value to specify calculation method. By default, between today and tomorrow are two business days. If *exclusive* option is set, tomorrow will be excluded, and return value will be 1.

## Return value
A Number, representing count of business days between *fromDate* and *tillDate* with respect of specified *options.holidays* and calculation method.
