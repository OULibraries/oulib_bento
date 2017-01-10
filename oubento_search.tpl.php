<form class="form-horizontal" id="oubento_searchForm">
  <div class="form-group">
    <div class="col-sm-10">
      <input type="text" class="form-control" placeholder="Search" id="searchInput">
    </div>
    <button  class="col-sm-1 btn btn-default" type="submit">Submit! <span class="glyphicon glyphicon-search"></span></button>
  </div>
</form>

<script id="resultTemplate" type="text">
    {{#hits}}
      <div class="result">
      <p class="result-icon-{{type}}">
      </p>
        <p>
          {{#title}}<p><a href="{{{link}}}">{{title}}</a>{{/title}}</br>
          {{#creator}}{{creator}}, {{/creator}}{{#date}}({{date}})</br>{{/date}}
          {{#text}}{{text}}</br>{{/text}}
          {{#type}}Type:{{type}}</br>{{/type}}
        </p>
      </div>
    {{/hits}}
      <p><a class="btn btn-default results-total" href="{{full}}">{{#plural}}{{all}}{{/plural}} {{total}} {{topLabel}}{{#plural}}{{end}}{{/plural}}</a></p>


</script>