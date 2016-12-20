!function ($) {

"use strict";

// available searches
var mySearches = [];
mySearches.push( function(needle) { return doSearch("primobooks", needle); });
mySearches.push( function(needle) { return doSearch("primo", needle); });
mySearches.push( function(needle) { return doSearch("libguides", needle); });
mySearches.push( function(needle) { return doSearch("primoshareok", needle); });
mySearches.push( function(needle) { return doSearch("collection", needle); });

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
    $( "#oubento_searchForm > input:first" ).val(needle);
    if(needle) {
	mySearches.forEach( function(srch) { srch(needle); });
    }
}

// search form handler
function submitSearch ( event ) {
   event.preventDefault();
    var needle=$( "#oubento_searchForm > input:first" ).val();
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
}





}(jQuery);
