<form id="oubento_searchForm">
  <input type="text">
  <button type="submit">Submit!</button>
</form>

<script id="resultTemplate" type="text">
    {{#hits}}
      <div>
        <p>
          {{#title}}<p><a href="{{{link}}}">{{title}}</a>{{/title}}</br>
          {{#creator}}{{creator}}, {{/creator}}{{#date}}({{date}})</br>{{/date}}
          {{#text}}{{text}}</br>{{/text}}
          {{#type}}Type:{{type}}</br>{{/type}}
        </p>
      </div>
    {{/hits}}
      <p><a href="{{full}}">{{#plural}}{{all}}{{/plural}} {{total}} {{topLabel}}{{#plural}}{{end}}{{/plural}}</a></p>


</script>