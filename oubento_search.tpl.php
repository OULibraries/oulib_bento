<form class="form-horizontal" id="oubento_searchForm">
  <div class="form-group">
    <div class="col-sm-10">
      <input type="text" class="form-control input-lg search-bar" placeholder="Search" id="searchInput">
    </div>
    <button  class="col-sm-2 btn btn-default search-bar-btn" type="submit">Search  <span class="glyphicon glyphicon-search"></span></button>
  </div>
</form>

<script id="resultTemplate" type="text">
    {{#hits}}
      <div class="result row">

      {{^image}}
      <div class="col-sm-1 result-icon-div">
      <img class="result-images" src="sites/all/themes/oulib_bootstrap/img/result-icon-{{type}}.png" >
      </div>
      <div class="result-group col-sm-11">
      {{/image}}

      {{#image}}
      <div class="col-sm-3 result-images-div">
      <img class="result-images result-specialist img-thumbnail" src="{{image}}" >
      </div>
      <div class="result-group result-group-specialist col-sm-9">
      {{/image}}
        <p>
          {{#title}}<div class="result-title"><a href="{{{link}}}">{{title}}</a>{{/title}}</div>
          {{#creator}}{{creator}}, {{/creator}}{{#date}}({{date}})</br>{{/date}}
          {{#text}}{{{text}}}</br>{{/text}}
          {{#type}}Material Type: {{type}}</br>{{/type}}
        </p>
        </div>
      </div>
    {{/hits}}
    </br>
      <p><a class="btn btn-default results-total"
      href="{{full}}">{{total}} {{topLabel}}
      Result{{#plural}}{{end}}{{/plural}}</a></p>


</script>
