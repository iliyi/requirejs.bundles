#requirejs.bundles#


A extensions used to set [config.bundles](http://www.requirejs.org/docs/api.html#config-bundles) for requirejs automatic.


##introduction##
This extensions add a `bundles()` function to the `require` object. Pass the deps array to this function, it will 
automatic set the `config.bundles` for requirejs, so that the dependence will be load in one request.

It works with require.js 2.1.10 or later.

##Configuration##
It has a config object named `.bundleConfig` at the require.config() object.
<pre>
    {
        noBundle : true, // Switch to no bundle mode. default: `false`
        host : baseUrl  // the url concat host. defalut: `baseUrl host`
    }
</pre>

##example##

<pre>
	define(
    	<b>require.bundles(</b>['jquery','<b>comb!</b>mods/a, <b>comb!</b>mods/b', '<b>comb!1:</b>mods/c, <b>comb!1:</b>mods/c']<b>)</b>,
    	
    	function($, a, b, c, d){
            // mod a & mod b will be load from a combine url like http://example.com/c/=/mods/a.js,/mods/b.js
            // same as mod c & mod d will be another bundles
    	}
	);
</pre>
