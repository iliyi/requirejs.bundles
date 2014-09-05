(function(exports) {
    var bundles = [];

    /**
     * 提取bundles数据, 并将传入的depsArray恢复为requirejs的合法参数
     */ 
    function getBundles(deps) {
        var b = [], m, i, idx,
            reg = /^bundle\!(?:(\d)(?:\:))?(.*)$/;

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
        var i, k, u,
            conf = {},
            o = {}, 
            p = {};

        if (bundles.length === 0) {
            return;
        }
        for (i = 0; i < bundles.length; i++) {
            u = getCombUrl(bundles[i]);
            k = 'bundles_' + url2hash(u);
            o[k] = bundles[i];
            p[k] = u;
        }

        conf = {
            bundles : o,
            paths : p
        };

        require.config(conf);
    }

    /**
     * 借一段time33算法，根据url生成bundle key
     */
    function url2hash(str){
        var hash = 5381;
        str = str || '';

        for(var i=0, len=str.length; i<len; ++i){
            hash += (hash << 5) + str.charAt(i).charCodeAt();
        }

        return hash & 0x7fffffff;
    }

    /**
     * 生成合并拉取url 
     * 有效格式 http://{imgcache}/c/=/url1.js,url2.js.url3.js
     */

    function getCombUrl(bundle){
        var i, url = [], 
            c = require.s.contexts._.config,
            args, baseUrl, host,
            curl;
        
        // todo 在多contexts中可能不支持.
        args = c.urlArgs;
        baseUrl = c.baseUrl;
        host = c.bundleHost.replace(/\/$/, '');

        if (args) {
            require.config({urlArgs : ''});
        }

        for ( i = 0; i < bundle.length; i++ ) {
            url.push(require.toUrl(bundle[i]).split(host)[1] + '.js');
        }
        
        if (args) {
            require.config({
                urlArgs : args
            });
        }

        curl = host + '/c/=' + url.join(',').replace(/\.js$/, '');

        // 各浏览器的url有最大长度上限，这里取最小的IE阀值2083为上限做警告
        if (curl.length >= 2083) {
            console && console.log('bundled query url too long');
        }
        return curl;
    }


    exports.bundles = function(depsArray) {
        var c = require.s.contexts._.config;
        bundles = getBundles(depsArray);

        if (!c.noBundle) {
            setBundles(bundles);
        }
        return depsArray;
    }

})(require||this||window);
