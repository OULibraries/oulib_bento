!function ($) {

"use strict";

// available searches
var mySearches = [];
mySearches.push( function(needle) { return doSearch("primobooks", needle); });
mySearches.push( function(needle) { return doSearch("primo", needle); });
mySearches.push( function(needle) { return doSearch("libguides", needle); });
mySearches.push( function(needle) { return doSearch("primoshareok", needle); });
mySearches.push( function(needle) { return doSearch("collection", needle); });
mySearches.push( function(needle) { return doSearch("site", needle); });

// template search results onto the page
function displayResults(target, json){
    var template = $("#resultTemplate").html();
    var searchResults = Mustache.to_html(template, json.data);
    console.log(".oubento_result_"+target);
    $(".oubento_result_"+target ).html(searchResults);
}

// run a search against the gateway
function doSearch(target, needle) {

    var searchURI = Drupal.settings.oulib_bento.searchURI;
    var resultLimit = Drupal.settings.oulib_bento.resultLimit;

    var myurl=searchURI + "/search?t="+target+"&q="+needle+"&n=" + resultLimit;
    $.ajax({
	url: myurl,
	dataType: "jsonp",
	success: function (result){  return displayResults(target, result);}
    });
}

// load search specified by query params
function loadSearch(){
    // may need to polyfill this
    var urlParams = new URLSearchParams(window.location.search);
    var needle = urlParams.get("onesearch");
    var needle=$( "#oubento_searchForm input[id=searchInput]" ).val();
    if(needle) {
	mySearches.forEach( function(srch) { srch(needle); });
    }
}

// search form handler
function submitSearch ( event ) {
   event.preventDefault();
    var needle=$( "#oubento_searchForm input[id=searchInput]" ).val();
    history.pushState({}, "Search", window.location.pathname + "?onesearch=" +needle );
    if(needle) {
	mySearches.forEach( function(srch) { srch(needle); });
    }

}



Drupal.behaviors.bentoSearch = {
    attach: function(context, settings) {
	loadSearch();
	$("#oubento_searchForm").submit( submitSearch);
    }
};

Drupal.behaviors.oulib_bento = {
    attach: function (context, settings) {
        $('.extra-search', context).click(function (event) {

            // get the parameter value for 'onesearch' (the search term)
            var urlParams;
            (window.onpopstate = function () {
                var match,
                    pl     = /\+/g,  // Regex for replacing addition symbol with a space
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                    query  = window.location.search.substring(1);

                urlParams = {};
                while (match = search.exec(query))
                    urlParams[decode(match[1])] = decode(match[2]);
            })();

            event.preventDefault();

            var searchTerm = urlParams['onesearch'];

            switch (this.id) {
                case 'search-scholar-icon':
                    window.location = 'https://scholar.google.com/scholar?q=' + searchTerm;
                    break;
                case 'search-threed-icon':
                    window.location = 'https://sketchfab.com/search?q=' + searchTerm;
                    break;
                case 'search-worldcat-icon':
                    window.location = 'http://ou.worldcat.org/search?qt=wc_org_ou&q=' + searchTerm;
                    break;
                case 'search-dpla-icon':
                    window.location = 'https://dp.la/search?utf8=%E2%9C%93&q=' + searchTerm;
                    break;
                case 'search-hathitrust-icon':
                    window.location = 'https://babel.hathitrust.org/cgi/ls?field1=ocr;q1=' + searchTerm + ';a=srchls;lmt=ft';
                    break;
                default:
                    alert('No link given.');
            }
        });
    }
};



}(jQuery);
