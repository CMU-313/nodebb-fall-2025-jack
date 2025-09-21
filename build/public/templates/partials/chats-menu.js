
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
    return (guard((context != null && context['config'] != null) ? context['config']['loggedIn'] : null) ?
        "\n<ul class=\"nav nav-pills\">\n<li class=\"nav-item\">\n<a class=\"nav-link text-decoration-none\" href=\"#\" data-bs-target=\"#notifications\" data-bs-toggle=\"tab\"><span class=\"counter unread-count\" component=\"notifications/icon\" data-content=\"" + 
          __escape(guard((context != null && context['unreadCount'] != null) ? context['unreadCount']['notification'] : null)) + 
          "\"></span> <i class=\"fa fa-fw fa-bell\"></i></a>\n</li>\n" + 
          (guard((context != null && context['config'] != null) ? context['config']['disableChat'] : null) ?
            "" :
            "\n<li class=\"nav-item\">\n<a class=\"nav-link text-decoration-none\" href=\"#\" data-bs-target=\"#chats\" data-bs-toggle=\"tab\"><i class=\"counter unread-count\" component=\"chat/icon\" data-content=\"" + 
              __escape(guard((context != null && context['unreadCount'] != null) ? context['unreadCount']['chat'] : null)) + 
              "\"></i> <i class=\"fa fa-fw fa-comment\"></i></a>\n</li>\n") + 
          "\n<li class=\"nav-item\">\n<a class=\"nav-link active text-decoration-none\" href=\"#\" data-bs-target=\"#profile\" data-bs-toggle=\"tab\">\n" + 
          __escape(helper(context, helpers, 'buildAvatar', [guard((context != null) ? context['user'] : null), "24px", guard((context != null) ? context['true'] : null), "user-icon"])) + 
          "\n</a>\n</li>\n</ul>\n<div class=\"tab-content\">\n<div class=\"tab-pane fade show active\" id=\"profile\">\n<section class=\"menu-section\" data-section=\"profile\">\n<ul class=\"menu-section-list dropdown-menu show text-bg-dark w-100 border-0\" component=\"header/usercontrol\"></ul>\n</section>\n</div>\n<div class=\"tab-pane fade\" id=\"notifications\">\n<section class=\"menu-section text-bg-dark px-1\" data-section=\"notifications\">\n<ul class=\"menu-section-list notification-list-mobile list-unstyled\" component=\"notifications/list\"></ul>\n<div class=\"menu-section-list text-center p-3\"><a href=\"" + 
          __escape(guard((context != null) ? context['relative_path'] : null)) + 
          "/notifications\">[[notifications:see-all]]</a></div>\n</section>\n</div>\n" + 
          (guard((context != null && context['config'] != null) ? context['config']['disableChat'] : null) ?
            "" :
            "\n<div class=\"tab-pane fade\" id=\"chats\">\n<section class=\"menu-section text-bg-dark px-1\" data-section=\"chats\">\n<ul class=\"menu-section-list chat-list list-unstyled\" component=\"chat/list\">\n</ul>\n<div class=\"menu-section-list text-center p-3\"><a class=\"navigation-link\" href=\"" + 
              __escape(guard((context != null) ? context['relative_path'] : null)) + 
              "/user/" + 
              __escape(guard((context != null && context['user'] != null) ? context['user']['userslug'] : null)) + 
              "/chats\">[[modules:chat.see-all]]</a></div>\n</section>\n</div>\n") + 
          "\n</div>\n" :
        "");
  }

  compiled.blocks = {
    
  };

  return compiled;
})
