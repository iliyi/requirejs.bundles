(function(exports) {
    var bundles = [];

    /**
     * 提取bundles数据, 并将传入的depsArray恢复为requirejs的合法参数
     */ 
    function getBundles(deps) {
        var b = [], m, i, idx,
            reg = /^comb\!(?:(\d)(?:\:))?(.*)$/;

        for (i = 0; i < deps.length; i++) {

            if (m = deps[i].match(reg)) {
                idx = m[1] || 0;

                if (!b[idx]) {
                    b[idx] = [];
                }
                deps[i] = m[2];
                b[idx].push(m[2]);
            }
        }

        return b;
    }

    /**
     * 写入bundles配置和对应的path配置
     */ 
    function setBundles(bundles){
        var i, k,
            o = {}, 
            p = {};

        if (bundles.length === 0) {
            return;
        }
        for (i = 0; i < bundles.length; i++) {
            k = 'bundles_' + Math.random().toString().split('.')[1];
            o[k] = bundles[i];
            p[k] = getCombUrl(bundles[i]);

            // console.log(getCombUrl(bundles[i]));
        }

        require.config({
            bundles : o,
            paths : p
        });
    }

    /**
     * 生成合并拉取url 
     * 有效格式 http://{imgcache}/c/=/url1.js,url2.js.url3.js
     */
    function getCombUrl(bundle){
        var i, url = [], args,
        
        // do not use RequireJS multiversion support/contexts..
        args = require.s.contexts._.config.urlArgs;

        if (args) {
            require.config({urlArgs : ''});
        }

        for ( i = 0; i < bundle.length; i++ ) {
            url.push(require.toUrl(bundle[i]) + '.js');
        }
        
        if (args) {
            require.config({
                urlArgs : args
            });     
        }

        return '/c/=' + url.join(',').replace(/\.js$/, '');
    }


    exports.bundles = function(depsArray) {
        bundles = getBundles(depsArray);
        setBundles(bundles);
        return depsArray;
    }

})(require||this||window);