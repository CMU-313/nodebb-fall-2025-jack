
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
    return "<span component=\"post/tools\" class=\"dropdown bottom-sheet d-inline-block " + 
      (guard((context != null && context['posts'] != null) ? context['posts']['display_post_menu'] : null) ?
        "" :
        "hidden") + 
      "\">\n<a class=\"btn btn-link btn-sm dropdown-toggle\" href=\"#\" data-bs-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><i class=\"fa fa-fw fa-ellipsis-v\"></i></a>\n<ul class=\"dropdown-menu dropdown-menu-end p-1 text-sm\" role=\"menu\"></ul>\n</span>";
  }

  compiled.blocks = {
    
  };

  return compiled;
})
