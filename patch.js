(function() {
    var _require = require;

    require = function(deps, callback){
        var args = Array.prototype.slice.call(arguments, 0);
        // _require.apply(this, args);
    }

    require = (function(){
        return function(){
            var args = Array.prototype.slice.call(arguments, 0);
            return _require.apply(this, args);
        };
    })();


    require.getDeps = function(){
        return {};
    }


})();
