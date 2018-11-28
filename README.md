#about requirejs.bundles

A extensions used to set [config.bundles](http://www.requirejs.org/docs/api.html#config-bundles) for requirejs automatically.


##Introduction

This extensions add a `bundles()` function to the `require` object. Pass the deps array to this function, it will automatic set the `config.bundles` for requirejs, so that the dependence will be load in one request.


##Configuration

It has a config object named `.bundleConfig` at the require.config() object.
<pre>
    {
        noBundle : true, // Switch to no bundle mode. default: `false`
        host : baseUrl  // the url concat host. defalut: `baseUrl host`
    }
</pre>

##Restrictions

* It works with require.js 2.1.10 or later.
* Do not used in multiversion contexts RequireJS.


##Example

<pre>
	define(
    	<b>require.bundles(</b>['jquery','<b>bundle!</b>mods/a, <b>bundle!</b>mods/b', '<b>bundle!1:</b>mods/c, <b>bundle!1:</b>mods/c']<b>)</b>,
    	
    	function($, a, b, c, d){
            // mod a &amp; mod b will be load from a combine url like http://example.com/c/=/mods/a.js,/mods/b.js
            // same as mod c &amp; mod d will be another bundles
    	}
	);
</pre>

