
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
    return "<li class=\"users-box registered-user text-center pb-3\" data-uid=\"" + 
      __escape(guard((context != null && context['users'] != null) ? context['users']['uid'] : null)) + 
      "\" style=\"width: 102px;\">\n<a href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null && context['users'] != null) ? context['users']['userslug'] : null)) + 
      "\">" + 
      __escape(helper(context, helpers, 'buildAvatar', [guard((context != null) ? context['users'] : null), "64px", guard((context != null) ? context['true'] : null)])) + 
      "</a>\n<div class=\"user-info\">\n<div class=\"text-nowrap text-truncate\">\n<a href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null && context['users'] != null) ? context['users']['userslug'] : null)) + 
      "\">" + 
      __escape(guard((context != null && context['users'] != null) ? context['users']['username'] : null)) + 
      "</a>\n</div>\n" + 
      (guard((context != null) ? context['section_online'] : null) ?
        "\n<div class=\"lastonline\">\n<span class=\"timeago\" title=\"" + 
          __escape(guard((context != null && context['users'] != null) ? context['users']['lastonlineISO'] : null)) + 
          "\"></span>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['section_joindate'] : null) ?
        "\n<div class=\"joindate\">\n<span class=\"timeago\" title=\"" + 
          __escape(guard((context != null && context['users'] != null) ? context['users']['joindateISO'] : null)) + 
          "\"></span>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['section_sort-reputation'] : null) ?
        "\n<div class=\"reputation\">\n<i class=\"fa fa-star\"></i>\n<span>" + 
          __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['users'] != null) ? context['users']['reputation'] : null)])) + 
          "</span>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['section_sort-posts'] : null) ?
        "\n<div class=\"post-count\">\n<i class=\"fa fa-pencil\"></i>\n<span>" + 
          __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['users'] != null) ? context['users']['postcount'] : null)])) + 
          "</span>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['section_flagged'] : null) ?
        "\n<div class=\"flag-count\">\n<i class=\"fa fa-flag\"></i>\n<span><a href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/flags?targetUid=" + 
          __escape(guard((context != null && context['users'] != null) ? context['users']['uid'] : null)) + 
          "\">" + 
          __escape(guard((context != null && context['users'] != null) ? context['users']['flags'] : null)) + 
          "</a></span>\n</div>\n" :
        "") + 
      "\n</div>\n</li>";
  }

  compiled.blocks = {
    
  };

  return compiled;
})
