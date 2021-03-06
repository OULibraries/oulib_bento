<?php
/**
 * Template Variables
 *
 * $silo silo from which to load results
 */
drupal_add_js(drupal_get_path('module', 'oulib_bento') . '/bento.js');
if ($silo == 'extrasearch') { ?>
  <div class="container-fluid">
    <div class="row">
      <p>
        Perform this search on another platform (will leave libraries website).
      </p>
      <a class="col-md-2 extra-search" id="search-scholar-icon" rel="ext"
         target="_blank"		 
         href="https://scholar.google.com"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_google_scholar.png" title="Google Scholar: Search scholarly literature from a variety of disciplines." alt="Google Scholar"></a>

      <a class="col-md-2 extra-search" id="search-threed-icon" rel="ext"
         target="_blank"
         href="https://sketchfab.com"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_3D_models.png" title="Sketchfab: Search for 3D models." alt="Sketchfab"></a>

      <a class="col-md-2 extra-search" id="search-worldcat-icon" rel="ext"
         target="_blank"
         href="https://ou.worldcat.org"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_worldcat.png" title="OCLC WorldCat: Search thousands of libraries around the world." alt="OCLC Worldcat"></a>

      <a class="col-md-2 extra-search" id="search-dpla-icon" rel="ext"
         target="_blank"
         href="https://dp.la"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_dpla.png" title="Digital Public Library of America: Search America’s galleries, libraries, archives, and museums." alt="Digital Public Library of America"></a>

      <a class="col-md-2 extra-search" id="search-hathitrust-icon" rel="ext"
         target="_blank"
         href="https://babel.hathitrust.org"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_hathitrust.png" title="HathiTrust: Search digitized content from research libraries." alt="HathiTrust"></a>
		  
      <a class="col-md-2 extra-search" id="search-opentextbooks-icon" rel="ext"
         target="_blank"
         href="http://open.umn.edu/opentextbooks/"><img
          src="/sites/all/modules/oulib_bento/img/icon_otl.png" title="Open Textbook Library: Search for open-licensed peer-reviewed textbooks." alt="Open Textbook Library"></a>
    </div>
  </div>

  <p>&nbsp;</p>
  <?php
}
else {
  ?>
  <div class="oubento_result_<?php echo $silo; ?>">
  </div>

<?php }

