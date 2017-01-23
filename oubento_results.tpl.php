<?php
/**
 * Template Variables
 *
 * $silo silo from which to load results
 */
drupal_add_js('/bento.js');
drupal_add_js(drupal_get_path('module', 'oulib_bento') . '/bento.js');
if ($silo == 'extrasearch') { ?>
  <div class="container-fluid">
    <div class="row">
      <a class="col-md-2 extra-search" id="search-scholar-icon"
         href="https://scholar.google.com"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_google_scholar.png"></a>

      <a class="col-md-2 extra-search" id="search-threed-icon"
         href="https://sketchfab.com"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_3D_models.png"></a>

      <a class="col-md-2 extra-search" id="search-worldcat-icon"
         href="https://ou.worldcat.org"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_worldcat.png"></a>

      <a class="col-md-2 extra-search" id="search-dpla-icon"
         href="https://dp.la"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_dpla.png"></a>

      <a class="col-md-2 extra-search" id="search-hathitrust-icon"
         href="https://babel.hathitrust.org"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_hathitrust.png"></a>

      <div class="col-md-2"><img
          src="/sites/all/themes/oulib_bootstrap/img/icon_more.png"></div>
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

