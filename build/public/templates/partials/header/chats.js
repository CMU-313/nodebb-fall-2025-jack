
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
    return "<a class=\"nav-link\" data-bs-toggle=\"dropdown\" href=\"" + 
      __escape(guard((context != null) ? context['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null && context['user'] != null) ? context['user']['userslug'] : null)) + 
      "/chats\" data-ajaxify=\"false\" id=\"chat_dropdown\" component=\"chat/dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n<i component=\"chat/icon\" class=\"fa " + 
      (guard((context != null && context['unreadCount'] != null) ? context['unreadCount']['chat'] : null) ?
        "fa-comment" :
        "fa-comment-o") + 
      " fa-fw unread-count\" data-content=\"" + 
      __escape(guard((context != null && context['unreadCount'] != null) ? context['unreadCount']['chat'] : null)) + 
      "\"></i> <span class=\"d-inline d-sm-none\">[[global:header.chats]]</span>\n</a>\n<ul class=\"dropdown-menu dropdown-menu-end p-1\" aria-labelledby=\"chat_dropdown\" role=\"menu\">\n<li>\n<ul component=\"chat/list\" class=\"list-unstyled chat-list chats-list ghost-scrollbar pe-1\">\n<div class=\"rounded-1\">\n<div class=\"d-flex gap-1 justify-content-between\">\n<div class=\"dropdown-item p-2 d-flex gap-2 placeholder-wave\">\n<div class=\"main-avatar\">\n<div class=\"placeholder\" style=\"width: 32px; height: 32px;\"></div>\n</div>\n<div class=\"d-flex flex-grow-1 flex-column w-100\">\n<div class=\"text-xs\"><div class=\"placeholder col-3\"></div></div>\n<div class=\"text-sm\"><div class=\"placeholder col-11\"></div></div>\n<div class=\"text-xs\"><div class=\"placeholder col-4\"></div></div>\n</div>\n</div>\n<div>\n<button class=\"mark-read btn btn-ghost btn-sm d-flex align-items-center justify-content-center flex-grow-0 flex-shrink-0 p-1\" style=\"width: 1.5rem; height: 1.5rem;\">\n<i class=\"unread fa fa-2xs fa-circle text-primary\"></i>\n</button>\n</div>\n</div>\n</div>\n</ul>\n</li>\n<li class=\"dropdown-divider\"></li>\n<li>\n<div class=\"d-flex justify-content-center gap-1 flex-wrap\">\n<a class=\"btn btn-light btn-sm mark-all-read flex-fill text-nowrap\" href=\"#\" component=\"chats/mark-all-read\"><i class=\"fa fa-check-double\"></i> [[modules:chat.mark-all-read]]</a>\n<a class=\"btn btn-primary btn-sm flex-fill text-nowrap\" href=\"" + 
      __escape(guard((context != null) ? context['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null && context['user'] != null) ? context['user']['userslug'] : null)) + 
      "/chats\"><i class=\"fa fa-comments\"></i> [[modules:chat.see-all]]</a>\n</div>\n</li>\n</ul>";
  }

  compiled.blocks = {
    
  };

  return compiled;
})
