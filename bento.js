!function ($) {

    "use strict";

// available searches
    var mySearches = [];
    mySearches.push(function (needle) {
        return doSearch("primobooks", needle);
    });
    mySearches.push(function (needle) {
        return doSearch("primo", needle);
    });
    mySearches.push(function (needle) {
        return doSearch("libguides", needle);
    });
    mySearches.push(function (needle) {
        return doSearch("primoshareok", needle);
    });
    mySearches.push(function (needle) {
        return doSearch("collection", needle);
    });
    mySearches.push(function (needle) {
        return doSearch("site", needle);
    });
    mySearches.push(function (needle) {
        return doSearch("eresource", needle);
    });
    mySearches.push(function (needle) {
        return doSearch("people", needle);
    });

// template search results onto the page
    function displayResults(target, json) {
        var template = $("#resultTemplate").html();
        var searchResults = Mustache.to_html(template, json.data);
        console.log(".oubento_result_" + target);
        $(".oubento_result_" + target).html(searchResults);
    }

// run a search against the gateway
    function doSearch(target, needle) {

        var searchURI = Drupal.settings.oulib_bento.searchURI;
        var resultLimit = Drupal.settings.oulib_bento.resultLimit;

        var myurl = searchURI + "/search?t=" + target + "&q=" + needle + "&n=" + resultLimit;
        $.ajax({
            url: myurl,
            dataType: "jsonp",
            success: function (result) {
                return displayResults(target, result);
            }
        });
    }

// load search specified by query params
    function loadSearch() {
        // may need to polyfill this
        // leaving this commented out for now...may go back and use it later
        // var urlParams = new URLSearchParams(window.location.search);
        var needle = getParameter("onesearch");
        var needleInput = $("#oubento_searchForm input[id=searchInput]").val();
        needle = (needleInput) ? needleInput : needle;
        if(document.getElementById("searchInput")) {
            document.getElementById("searchInput").value = needle;
        }
        if (needle) {
            mySearches.forEach(function (srch) {
                srch(needle);
            });
        }
    }

    // split up the url and grab the search parameters
    function getParameter(paramName) {
        var searchString = window.location.search.substring(1),
            i, val, params = searchString.split("&");

        for (i=0;i<params.length;i++) {
            val = params[i].split("=");
            if (val[0] == paramName) {
                return val[1];
            }
        }
        return null;
    }

// search form handler
    function submitSearch(event) {
        event.preventDefault();
        var needle = $("#oubento_searchForm input[id=searchInput]").val();
        history.pushState({}, "Search", window.location.pathname + "?onesearch=" + needle);
        if (needle) {
            mySearches.forEach(function (srch) {
                srch(needle);
            });
        }

    }


    Drupal.behaviors.bentoSearch = {
        attach: function (context, settings) {
            loadSearch();
            $("#oubento_searchForm").submit(submitSearch);
        }
    };

    Drupal.behaviors.extraSearch = {
        attach: function (context, settings) {
            $('.extra-search', context).click(function (event) {

                // get the parameter value for 'onesearch' (the search term)
                var urlParams;
                (window.onpopstate = function () {
                    var match,
                        pl = /\+/g,  // Regex for replacing addition symbol with a space
                        search = /([^&=]+)=?([^&]*)/g,
                        decode = function (s) {
                            return decodeURIComponent(s.replace(pl, " "));
                        },
                        query = window.location.search.substring(1);

                    urlParams = {};
                    while (match = search.exec(query))
                        urlParams[decode(match[1])] = decode(match[2]);
                })();

                event.preventDefault();

                var searchTerm = urlParams['onesearch'];
                var newLoc = '';

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

    /**
     * This is the function that will create a pop up if the user is leaving
     * the page. I am leaving it here in case someone changes our minds and
     * wants it back no the site. It is not currently being called.
     *
     * @param output_msg
     * @param new_location
     */
    function custom_alert(output_msg, new_location)
    {
        var title_msg = 'OU Libraries';

        output_msg = 'You are leaving the OU Libraries website. Do you' +
            ' want to perform this search on ' + output_msg + '?';

        if (!new_location)
            new_location = 'https://www.libraries.ou.edu';

        var div = $('<p></p>');
        div.html(output_msg).dialog({
            minWidth: 400,
            minHeight: 200,
            title: title_msg,
            resizable: false,
            modal: true,
            open: function (event, ui) {
                var $this = $(this);
                setTimeout(function () {
                    $('#loading-indicator').show();
                    $this.dialog('close');
                    window.location = new_location;
                }, 5000);
            },
            buttons: {
                "Cancel": function()
                {
                    $( this ).dialog( "close" );
                    // cleanup
                    div.remove();
                }
            }
        });
    }

    /**
     * The bento search question mark modals
     *
     * @type {{attach: Drupal.behaviors.oulib_bento.attach}}
     */
    Drupal.behaviors.oulib_bento = {
        attach: function (context, settings) {

            var modal;

            $('.glyph-modal', context).click(function (event) {
                event.preventDefault();

                // Get the modal
                modal = document.getElementById(this.id + '-modal');

                // When the user clicks on the button, open the modal
                modal.style.display = "block";
            });

            // Click the ok button to close the modal
            $('.search-modal-ok', context).click(function (event) {
                event.preventDefault();

                modal.style.display = 'none';
            });

            // click the x to close the modal
            $('.close-modal', context).click(function (event) {
                event.preventDefault();

                modal.style.display = 'none';
            });

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        }
    };


}(jQuery);
