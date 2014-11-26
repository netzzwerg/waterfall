(function() {
    'use strict';

    var addButton = function() {
        $('button').off('click');
        setTimeout(function() {
            $('button').last().after('<button></button>');
            $('button').last().on('click', addButton);
        }, 50);
    };

    $('button').on('click', addButton);

    /*
    $('button').last().trigger('click');
    $('button').last().trigger('click');
    $('button').last().trigger('click');
    $('button').last().trigger('click');
    $('button').last().trigger('click');
    */

    waterfall([
        function(callback) {
            $('button').last().trigger('click');
            setTimeout(function() {
                callback(null, 2);
            }, 51);
        },
        function(counter, callback) {
            $('button').last().trigger('click');
            setTimeout(function() {
                callback(null, counter+1);
            }, 51);
        },
        function(counter, callback) {
            $('button').last().trigger('click');
            setTimeout(function() {
                callback(null, counter+1);
            }, 51);
        },
        function(counter, callback) {
            try {
                window.ninja.name;
            } catch(e) {
                callback(e);
            }
        }
    ], function(err, result) {
        console.log(err);
        console.log(result);
    });


}());