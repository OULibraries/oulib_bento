<form id="oubento_searchForm">
   <input type="text" >
   <button type="submit" >Submit!</button>
</form>

<script id="resultTemplate" type="text">
      <ul>
  {{#hits}}
      <li><p><a href="{{{link}}}">{{title}}</a></p>
      <p>{{text}}</p>
      </li>
      {{/hits}}
      </ul>
      <p>For all {{total}} results, go to the <a href="{{full}}">search page</a>.
</script>