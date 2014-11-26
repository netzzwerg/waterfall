(function(global) {

    // based on https://github.com/es128/async-waterfall
    var makeIterator = function(tasks) {
        var makeCallback = function(index) {
            var fn = function() {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function() {
                return (index < tasks.length - 1) ? makeCallback(index + 1) : null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    var waterfall = function(tasks, callback) {
        var wrapIterator = function(iterator) {
            return function(err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function() {};
                } else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    } else {
                        args.push(callback);
                    }
                    setTimeout(function() {
                        iterator.apply(null, args);
                    }, 0);
                }
            };
        };
        wrapIterator(makeIterator(tasks))();
    };

    global.waterfall = waterfall;

}(window));