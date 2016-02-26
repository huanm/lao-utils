/**
 * 工具集
 * @author giscafer
 */
!(function(name, definition) {
    var hasDefine = typeof define === 'funciton',
        hasExports = typeof module !== 'undefined' && module.exports;
    if (hasDefine) {
        //AMD/CMD
        define(difinition);
    } else if (hasExports) {
        //Node.js
        module.exports = definition();
    } else {
        this[name] = definition();
    }
})('laoUtils', function() {
    var LaoUtils = function() {};
    /**
     * ES5中使用全等===会出现以下情况
     * +0 === -0 //true
     * NaN === NaN // false
     * 此方法可以弥补这个缺陷
     * @param   {Mixed}   x
     * @param   {Mixed}   y
     */
    LaoUtils.prototype.is = function(x, y) {
        if (x === y) {
            // 针对+0 不等于 -0的情况
            return x !== 0 || 1 / x === 1 / y;
        }
        // 针对NaN的情况
        return x !== x && y !== y;
    };
    /**
     * 是否为整数
     * 
     * @param   {Mixed}    value
     * @return  {Boolean} 
     */
    LaoUtils.prototype.isInteger = function(value) {
        return typeof value === 'number' && isFinite(value) &&
            value > -9007199254740992 && value < 9007199254740992 &&
            Math.floor(value) === value;
    };
    /**
     * 是否为数字
     * 
     * @param   {Mixed}    value
     * @return  {Boolean} 
     */
    LaoUtils.prototype.isNumber = function(value) {
        return (!isNaN(value) && typeof value === 'number');
    };
    /**
     * 是否为NaN
     * 
     * @param   {Mixed}    value
     * @return  {Boolean} 
     */
    LaoUtils.prototype.isNaN = function(value) {
        return (typeof value === 'number' && isNaN(value));
    };
    /**
     * 格式化日期时间
     * thanks for fullCalender.js
     * @param {String} format
     * @param {String|Number|Date} timestamp
     * @param {Obejct} options
     * @return {String}
     */
    LaoUtils.prototype.date = function(format, timestamp,options) {
        var defaults = {
            yearNames: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        };
        var jsdate, _format = "yyyy-MM-dd";

        /**
         * ISO 8601.
         */
        function iso8601Week(date) {
            var time;
            var checkDate = new Date(date.getTime());

            // Find Thursday of this week starting on Monday
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

            time = checkDate.getTime();
            checkDate.setMonth(0); // Compare with Jan 1
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
        }

        var zeroPad = function(n) {
            return (n < 10 ? '0' : '') + n;
        };

        var dateFormatters = {
            s: function(d) {
                return d.getSeconds()
            },
            ss: function(d) {
                return zeroPad(d.getSeconds())
            },
            m: function(d) {
                return d.getMinutes()
            },
            mm: function(d) {
                return zeroPad(d.getMinutes())
            },
            h: function(d) {
                return d.getHours() % 12 || 12
            },
            hh: function(d) {
                return zeroPad(d.getHours() % 12 || 12)
            },
            H: function(d) {
                return d.getHours()
            },
            HH: function(d) {
                return zeroPad(d.getHours())
            },
            d: function(d) {
                return d.getDate()
            },
            dd: function(d) {
                return zeroPad(d.getDate())
            },
            ddd: function(d, o) {
                return o.dayNamesShort[d.getDay()]
            },
            dddd: function(d, o) {
                return o.dayNames[d.getDay()]
            },
            DDDD: function(d, o) {
                var dayDate = Number(d.getDate()) + '';
                if (dayDate.length === 1) {
                    var res = o.yearNames[dayDate];
                } else {
                    var res = o.yearNames[dayDate.substring(0, 1)] + '' + o.yearNames[dayDate.substring(1, 2)]
                }
                return res + '日';
            },
            M: function(d) {
                return d.getMonth() + 1
            },
            MM: function(d) {
                return zeroPad(d.getMonth() + 1)
            },
            MMM: function(d, o) {
                return o.monthNamesShort[d.getMonth()]
            },
            MMMM: function(d, o) {
                return o.monthNames[d.getMonth()]
            },
            yy: function(d) {
                return (d.getFullYear() + '').substring(2)
            },
            yyyy: function(d) {
                return d.getFullYear()
            },
            YYYY: function(d, o) {
                var fullyear = (d.getFullYear() + '');
                return (o.yearNames[fullyear.substring(0, 1)] + '' + o.yearNames[fullyear.substring(1, 2)] +
                    o.yearNames[fullyear.substring(2, 3)] + o.yearNames[fullyear.substring(3, 4)] + '年')
            },
            t: function(d) {
                return d.getHours() < 12 ? 'a' : 'p'
            },
            tt: function(d) {
                return d.getHours() < 12 ? 'am' : 'pm'
            },
            T: function(d) {
                return d.getHours() < 12 ? 'A' : 'P'
            },
            TT: function(d) {
                return d.getHours() < 12 ? 'AM' : 'PM'
            },
            u: function(d) {
                return formatDate(d, "yyyy-MM-dd'T'HH:mm:ss'Z'")
            },
            S: function(d) {
                var date = d.getDate();
                if (date > 10 && date < 20) {
                    return 'th';
                }
                return ['st', 'nd', 'rd'][date % 10 - 1] || 'th';
            },
            w: function(d, o) { // local
                return o.weekNumberCalculation(d);
            },
            W: function(d) { // ISO
                return iso8601Week(d);
            }
        };
        /**
         * @param   {Date}      date1   the first date to formatting.
         * @param   {Date}      date2   the second date to formatting.
         * @param   {String}    format  MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}
         * @param   {Object}   options
         */
        var formatDates = function(format, date1, date2, options) {
            options = options || defaults;
            var date = date1,
                otherDate = date2,
                i, len = format.length,
                c,
                i2, formatter,
                res = '';
            for (i = 0; i < len; i++) {
                c = format.charAt(i);
                if (c == "'") {
                    for (i2 = i + 1; i2 < len; i2++) {
                        if (format.charAt(i2) == "'") {
                            if (date) {
                                if (i2 == i + 1) {
                                    res += "'";
                                } else {
                                    res += format.substring(i + 1, i2);
                                }
                                i = i2;
                            }
                            break;
                        }
                    }
                } else if (c == '(') {
                    for (i2 = i + 1; i2 < len; i2++) {
                        if (format.charAt(i2) == ')') {
                            var subres = formatDate(date, format.substring(i + 1, i2), options);
                            if (parseInt(subres.replace(/\D/, ''), 10)) {
                                res += subres;
                            }
                            i = i2;
                            break;
                        }
                    }
                } else if (c == '[') {
                    for (i2 = i + 1; i2 < len; i2++) {
                        if (format.charAt(i2) == ']') {
                            var subformat = format.substring(i + 1, i2);
                            var subres = formatDate(date, subformat, options);
                            if (subres != formatDate(otherDate, subformat, options)) {
                                res += subres;
                            }
                            i = i2;
                            break;
                        }
                    }
                } else if (c == '{') {
                    date = date2;
                    otherDate = date1;
                } else if (c == '}') {
                    date = date1;
                    otherDate = date2;
                } else {
                    for (i2 = len; i2 > i; i2--) {
                        if (formatter = dateFormatters[format.substring(i, i2)]) {
                            if (date) {
                                res += formatter(date, options);
                            }
                            i = i2 - 1;
                            break;
                        }
                    }
                    if (i2 == i) {
                        if (date) {
                            res += c;
                        }
                    }
                }
            }
            return res;
        };
        /**
         * @param   {Date}        date    the date to formatting.
         * @param   {String}      format 
         *  'MMMM yyyy','dddd, MMM d, yyyy',"yyyy年MM月dd日","yyyy-MM-dd"
         * 'dddd M/d','ddd M/d','ddd'……
         * @param   {Object}     options 
         */
        this.formatDate = function(format, timestamp, options) {
            jsdate = (timestamp === undefined ? new Date() : // Not provided
                (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
                new Date(timestamp) //int ms
            );
            return formatDates(format, jsdate, null, options);
        };
        return this.formatDate(format, timestamp, options);
    };
    return new LaoUtils();
});