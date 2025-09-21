
(function (factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  }
})(function () {
  function compiled(helpers, context, guard, iter, helper) {
    var __escape = helpers.__escape;
    var value = context;
    return "<form component=\"search/form\" id=\"search-form\" class=\"d-flex justify-content-end align-items-center\" role=\"search\" method=\"GET\">\n<div component=\"search/fields\" class=\"hidden\" id=\"search-fields\">\n<div class=\"input-group flex-nowrap\">\n<input autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"[[global:search]]\" name=\"query\" value=\"\">\n<a href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/search\" class=\"btn btn-outline-secondary\" aria-label=\"[[search:type-to-search]]\">\n<i class=\"fa fa-gears fa-fw\"></i>\n</a>\n</div>\n<div id=\"quick-search-container\" class=\"quick-search-container dropdown-menu d-block mt-2 hidden\">\n<div class=\"form-check filter-category mb-2 ms-4\">\n<input class=\"form-check-input\" type=\"checkbox\" checked>\n<label class=\"form-check-label name\"></label>\n</div>\n<div class=\"text-center loading-indicator\"><i class=\"fa fa-spinner fa-spin\"></i></div>\n<div class=\"quick-search-results-container\"></div>\n</div>\n<button type=\"submit\" class=\"btn btn-outline-secondary hide\">[[global:search]]</button>\n</div>\n<div class=\"nav-item\" title=\"[[global:search]]\"><a component=\"search/button\" id=\"search-button\" href=\"#\" class=\"nav-link\" aria-label=\"[[global:search]]\"><i class=\"fa fa-search fa-fw\"></i></a></div>\n</form>";
  }

  compiled.blocks = {
    
  };

  return compiled;
})
