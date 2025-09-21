
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
    return "<!DOCTYPE html>\n<html lang=\"" + 
      __escape(helper(context, helpers, 'localeToHTML', [guard((context != null) ? context['userLang'] : null), guard((context != null) ? context['defaultLang'] : null)])) + 
      "\" " + 
      (guard((context != null) ? context['languageDirection'] : null) ?
        "data-dir=\"" + 
          __escape(guard((context != null) ? context['languageDirection'] : null)) + 
          "\" style=\"direction: " + 
          __escape(guard((context != null) ? context['languageDirection'] : null)) + 
          ";\"" :
        "") + 
      ">\n<head>\n<title>" + 
      __escape(guard((context != null) ? context['browserTitle'] : null)) + 
      "</title>\n" + 
      compiled.blocks['metaTags'](helpers, context, guard, iter, helper) + 
      "\n<link rel=\"stylesheet\" type=\"text/css\" href=\"" + 
      __escape(guard((context != null) ? context['relative_path'] : null)) + 
      "/assets/client" + 
      (guard((context != null) ? context['bootswatchSkin'] : null) ?
        "-" + 
          __escape(guard((context != null) ? context['bootswatchSkin'] : null)) :
        "") + 
      ((guard((context != null) ? context['languageDirection'] : null) == "rtl") ?
        "-rtl" :
        "") + 
      ".css?" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['cache-buster'] : null)) + 
      "\" />\n" + 
      compiled.blocks['linkTags'](helpers, context, guard, iter, helper) + 
      "\n<script>\nvar config = JSON.parse('" + 
      guard((context != null) ? context['configJSON'] : null) + 
      "');\nvar app = {\nuser: JSON.parse('" + 
      guard((context != null) ? context['userJSON'] : null) + 
      "')\n};\ndocument.documentElement.style.setProperty('--panel-offset', `${localStorage.getItem('panelOffset') || 0}px`);\n</script>\n" + 
      (guard((context != null) ? context['useCustomHTML'] : null) ?
        "\n" + 
          guard((context != null) ? context['customHTML'] : null) + 
          "\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['useCustomCSS'] : null) ?
        "\n<style>" + 
          guard((context != null) ? context['customCSS'] : null) + 
          "</style>\n" :
        "") + 
      "\n</head>\n<body class=\"" + 
      __escape(guard((context != null) ? context['bodyClass'] : null)) + 
      " skin-" + 
      (guard((context != null) ? context['bootswatchSkin'] : null) ?
        __escape(guard((context != null) ? context['bootswatchSkin'] : null)) :
        "noskin") + 
      "\">\n<nav id=\"menu\" class=\"slideout-menu hidden\">\n<section class=\"menu-section\" data-section=\"navigation\">\n<ul class=\"menu-section-list text-bg-dark list-unstyled\"></ul>\n</section>\n</nav>\n<nav id=\"chats-menu\" class=\"slideout-menu hidden\">\n" + 
      (guard((context != null && context['config'] != null) ? context['config']['loggedIn'] : null) ?
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
        "") + 
      "\n</nav>\n<main id=\"panel\" class=\"slideout-panel\">\n<nav class=\"navbar sticky-top navbar-expand-lg bg-light header border-bottom py-0\" id=\"header-menu\" component=\"navbar\">\n<div class=\"container-lg justify-content-start flex-nowrap\">\n<div class=\"d-flex align-items-center me-auto\" style=\"min-width: 0px;\">\n<button type=\"button\" class=\"navbar-toggler border-0\" id=\"mobile-menu\">\n<i class=\"fa fa-lg fa-fw fa-bars unread-count\" ></i>\n<span component=\"unread/icon\" class=\"notification-icon fa fa-fw fa-book unread-count\" data-content=\"" + 
      __escape(guard((context != null && context['unreadCount'] != null) ? context['unreadCount']['mobileUnread'] : null)) + 
      "\" data-unread-url=\"" + 
      __escape(guard((context != null && context['unreadCount'] != null) ? context['unreadCount']['unreadUrl'] : null)) + 
      "\"></span>\n</button>\n<div class=\"d-inline-flex align-items-center\" style=\"min-width: 0px;\">\n" + 
      (guard((context != null) ? context['brand:logo'] : null) ?
        "\n<a class=\"navbar-brand\" href=\"" + 
          (guard((context != null) ? context['brand:logo:url'] : null) ?
            __escape(guard((context != null) ? context['brand:logo:url'] : null)) :
            __escape(guard((context != null) ? context['relative_path'] : null)) + 
              "/") + 
          "\">\n<img alt=\"" + 
          __escape(guard((context != null) ? context['brand:logo:alt'] : null)) + 
          "\" class=\"" + 
          __escape(guard((context != null) ? context['brand:logo:display'] : null)) + 
          " forum-logo d-inline-block align-text-bottom\" src=\"" + 
          __escape(guard((context != null) ? context['brand:logo'] : null)) + 
          "?" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['cache-buster'] : null)) + 
          "\" />\n</a>\n" :
        "") + 
      "\n" + 
      (guard((context != null && context['config'] != null) ? context['config']['showSiteTitle'] : null) ?
        "\n<a class=\"navbar-brand text-truncate\" href=\"" + 
          (guard((context != null) ? context['title:url'] : null) ?
            __escape(guard((context != null) ? context['title:url'] : null)) :
            __escape(guard((context != null) ? context['relative_path'] : null)) + 
              "/") + 
          "\">\n" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['siteTitle'] : null)) + 
          "\n</a>\n" :
        "") + 
      "\n</div>\n</div>\n" + 
      ((guard((context != null && context['config'] != null) ? context['config']['searchEnabled'] : null) && guard((context != null && context['user'] != null && context['user']['privileges'] != null) ? context['user']['privileges']['search:content'] : null)) ?
        "\n<div class=\"navbar-search visible-xs\">\n<form action=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/search\" method=\"GET\">\n<button type=\"button\" class=\"btn btn-link\"><i class=\"fa fa-lg fa-fw fa-search\" title=\"[[global:header.search]]\"></i></button>\n<input autocomplete=\"off\" type=\"text\" class=\"form-control hidden\" name=\"term\" placeholder=\"[[global:search]]\"/>\n<button class=\"btn btn-primary hidden\" type=\"submit\"></button>\n<input type=\"text\" class=\"hidden\" name=\"in\" value=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['searchDefaultInQuick'] : null)) + 
          "\" />\n</form>\n<div class=\"quick-search-container dropdown-menu d-block mt-2 hidden\">\n<div class=\"quick-search-results-container\"></div>\n</div>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null && context['config'] != null) ? context['config']['loggedIn'] : null) ?
        "\n<button type=\"button\" class=\"navbar-toggler border-0\" id=\"mobile-chats\">\n<span component=\"notifications/icon\" class=\"notification-icon fa fa-fw fa-bell-o unread-count\" data-content=\"" + 
          __escape(guard((context != null && context['unreadCount'] != null) ? context['unreadCount']['notification'] : null)) + 
          "\"></span>\n<span component=\"chat/icon\" class=\"notification-icon fa fa-fw fa-comments unread-count\" data-content=\"" + 
          __escape(guard((context != null && context['unreadCount'] != null) ? context['unreadCount']['chat'] : null)) + 
          "\"></span>\n" + 
          __escape(helper(context, helpers, 'buildAvatar', [guard((context != null) ? context['user'] : null), "32px", guard((context != null) ? context['true'] : null)])) + 
          "\n</button>\n" :
        "") + 
      "\n<div component=\"navbar/title\" class=\"visible-xs hidden\">\n<span></span>\n</div>\n<div id=\"nav-dropdown\" class=\"collapse navbar-collapse d-none d-lg-block\">\n<ul id=\"main-nav\" class=\"navbar-nav me-auto mb-2 mb-lg-0\">\n" + 
      compiled.blocks['navigation'](helpers, context, guard, iter, helper) + 
      "\n</ul>\n<ul class=\"navbar-nav mb-2 mb-lg-0 hidden-xs\">\n<li class=\"nav-item\">\n<a href=\"#\" id=\"reconnect\" class=\"nav-link hide\" title=\"[[global:reconnecting-message, " + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['siteTitle'] : null)) + 
      "]]\">\n<i class=\"fa fa-check\"></i>\n</a>\n</li>\n</ul>\n" + 
      ((guard((context != null && context['config'] != null) ? context['config']['searchEnabled'] : null) && guard((context != null && context['user'] != null && context['user']['privileges'] != null) ? context['user']['privileges']['search:content'] : null)) ?
        "\n<div class=\"navbar-nav mb-2 mb-lg-0 position-relative\">\n<form component=\"search/form\" id=\"search-form\" class=\"d-flex justify-content-end align-items-center\" role=\"search\" method=\"GET\">\n<div component=\"search/fields\" class=\"hidden\" id=\"search-fields\">\n<div class=\"input-group flex-nowrap\">\n<input autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"[[global:search]]\" name=\"query\" value=\"\">\n<a href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/search\" class=\"btn btn-outline-secondary\" aria-label=\"[[search:type-to-search]]\">\n<i class=\"fa fa-gears fa-fw\"></i>\n</a>\n</div>\n<div id=\"quick-search-container\" class=\"quick-search-container dropdown-menu d-block mt-2 hidden\">\n<div class=\"form-check filter-category mb-2 ms-4\">\n<input class=\"form-check-input\" type=\"checkbox\" checked>\n<label class=\"form-check-label name\"></label>\n</div>\n<div class=\"text-center loading-indicator\"><i class=\"fa fa-spinner fa-spin\"></i></div>\n<div class=\"quick-search-results-container\"></div>\n</div>\n<button type=\"submit\" class=\"btn btn-outline-secondary hide\">[[global:search]]</button>\n</div>\n<div class=\"nav-item\" title=\"[[global:search]]\"><a component=\"search/button\" id=\"search-button\" href=\"#\" class=\"nav-link\" aria-label=\"[[global:search]]\"><i class=\"fa fa-search fa-fw\"></i></a></div>\n</form>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['maintenanceHeader'] : null) ?
        "\n<ul class=\"navbar-nav me-0 mb-2 mb-lg-0\"></ul>\n<li class=\"nav-item\">\n<a href=\"" + 
          __escape(guard((context != null) ? context['relative_path'] : null)) + 
          "/login\">\n<i class=\"fa fa-sign-in fa-fw d-block d-sm-none\"></i>\n<span>[[global:login]]</span>\n</a>\n</li>\n</ul>\n" :
        "\n" + 
          (guard((context != null && context['config'] != null) ? context['config']['loggedIn'] : null) ?
            "\n<ul id=\"logged-in-menu\" class=\"navbar-nav me-0 mb-2 mb-lg-0 align-items-center\">\n<li class=\"nav-item notifications dropdown d-none d-sm-block\" component=\"notifications\" title=\"[[global:header.notifications]]\">\n<a data-bs-toggle=\"dropdown\" href=\"#\" role=\"button\" class=\"nav-link position-relative\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-label=\"[[global:header.notifications]]\">\n<i component=\"notifications/icon\" class=\"fa fa-fw " + 
              (guard((context != null && context['unreadCount'] != null) ? context['unreadCount']['notification'] : null) ?
                "fa-bell" :
                "fa-bell-o") + 
              " unread-count\" data-content=\"" + 
              __escape(guard((context != null && context['unreadCount'] != null) ? context['unreadCount']['notification'] : null)) + 
              "\"></i>\n</a>\n<ul class=\"notifications-dropdown dropdown-menu dropdown-menu-end p-1 shadow\" role=\"menu\">\n<li>\n<div component=\"notifications/list\" class=\"list-container notification-list overscroll-behavior-contain pe-1 ff-base ghost-scrollbar\">\n<div class=\"mb-2 p-1\">\n<div class=\"d-flex gap-1 justify-content-between\">\n<div class=\"d-flex gap-2 flex-grow-1 placeholder-wave\">\n<div class=\"placeholder\" style=\"width: 32px; height: 32px;\"></div>\n<div class=\"flex-grow-1\">\n<div class=\"d-flex flex-column\">\n<div class=\"text-sm\">\n<span class=\"placeholder placeholder-sm col-4\"></span>\n<span class=\"placeholder placeholder-sm col-6\"></span>\n<span class=\"placeholder placeholder-sm col-7\"></span>\n<span class=\"placeholder placeholder-sm col-2\"></span>\n<span class=\"placeholder placeholder-sm col-5\"></span>\n</div>\n<div class=\"text-xs\">\n<div class=\"placeholder placeholder-xs col-6\"></div>\n</div>\n</div>\n</div>\n</div>\n<div>\n<button class=\"mark-read btn btn-ghost btn-sm d-flex align-items-center justify-content-center flex-grow-0 flex-shrink-0 p-1\" style=\"width: 1.5rem; height: 1.5rem;\">\n<i class=\"unread fa fa-2xs fa-circle text-primary\"></i>\n</button>\n</div>\n</div>\n</div>\n</div>\n</li>\n<li class=\"dropdown-divider\"></li>\n<li>\n<div class=\"d-flex justify-content-center gap-1 flex-wrap\">\n<a role=\"button\" href=\"#\" class=\"btn btn-sm btn-light mark-all-read flex-fill text-nowrap text-truncate ff-secondary\"><i class=\"fa fa-check-double\"></i> [[notifications:mark-all-read]]</a>\n<a class=\"btn btn-sm btn-primary flex-fill text-nowrap text-truncate ff-secondary\" href=\"" + 
              __escape(guard((context != null) ? context['relative_path'] : null)) + 
              "/notifications\"><i class=\"fa fa-list\"></i> [[notifications:see-all]]</a>\n</div>\n</li>\n</ul>\n</li>\n" + 
              (guard((context != null) ? context['canChat'] : null) ?
                "\n<li class=\"nav-item chats dropdown\" title=\"[[global:header.chats]]\">\n<a class=\"nav-link\" data-bs-toggle=\"dropdown\" href=\"" + 
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
                  "/chats\"><i class=\"fa fa-comments\"></i> [[modules:chat.see-all]]</a>\n</div>\n</li>\n</ul>\n</li>\n" :
                "") + 
              "\n<li id=\"user_label\" class=\"nav-item dropdown px-3\" title=\"[[global:header.profile]]\">\n<a href=\"#\" for=\"user-control-list-check\" data-bs-toggle=\"dropdown\" id=\"user_dropdown\" role=\"button\" component=\"header/avatar\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" + 
              __escape(helper(context, helpers, 'buildAvatar', [guard((context != null) ? context['user'] : null), "32px", guard((context != null) ? context['true'] : null)])) + 
              "\n<span id=\"user-header-name\" class=\"d-block d-sm-none\">" + 
              __escape(guard((context != null && context['user'] != null) ? context['user']['username'] : null)) + 
              "</span>\n</a>\n<input type=\"checkbox\" class=\"hidden\" id=\"user-control-list-check\" aria-hidden=\"true\">\n<ul id=\"user-control-list\" component=\"header/usercontrol\" class=\"overscroll-behavior-contain user-dropdown dropdown-menu dropdown-menu-end shadow p-1 text-sm ff-base\" role=\"menu\">\n<li>\n<a class=\"dropdown-item rounded-1 d-flex align-items-center gap-2\" component=\"header/profilelink\" href=\"" + 
              __escape(guard((context != null) ? context['relative_path'] : null)) + 
              "/user/" + 
              __escape(guard((context != null && context['user'] != null) ? context['user']['userslug'] : null)) + 
              "\" role=\"menuitem\" aria-label=\"[[user:profile]]\">\n<span component=\"user/status\" class=\"flex-shrink-0 border border-white border-2 rounded-circle status " + 
              __escape(guard((context != null && context['user'] != null) ? context['user']['status'] : null)) + 
              "\"><span class=\"visually-hidden\">[[global:" + 
              __escape(guard((context != null && context['user'] != null) ? context['user']['status'] : null)) + 
              "]]</span></span>\n<span class=\"fw-semibold\" component=\"header/username\">" + 
              __escape(guard((context != null && context['user'] != null) ? context['user']['username'] : null)) + 
              "</span>\n</a>\n</li>\n<li role=\"presentation\" class=\"dropdown-divider\"></li>\n<li><h6 class=\"dropdown-header text-xs\">[[global:status]]</h6></li>\n<li>\n<a href=\"#\" class=\"dropdown-item rounded-1 user-status d-flex align-items-center gap-2 " + 
              (guard((context != null && context['user'] != null) ? context['user']['online'] : null) ?
                "selected" :
                "") + 
              "\" data-status=\"online\" role=\"menuitem\">\n<span component=\"user/status\" class=\"flex-shrink-0 border border-white border-2 rounded-circle status online\"></span>\n<span class=\"flex-grow-1\">[[global:online]]</span>\n</a>\n</li>\n<li>\n<a href=\"#\" class=\"dropdown-item rounded-1 user-status d-flex align-items-center gap-2 " + 
              (guard((context != null && context['user'] != null) ? context['user']['away'] : null) ?
                "selected" :
                "") + 
              "\" data-status=\"away\" role=\"menuitem\">\n<span component=\"user/status\" class=\"flex-shrink-0 border border-white border-2 rounded-circle status away\"></span>\n<span class=\"flex-grow-1\">[[global:away]]</span>\n</a>\n</li>\n<li>\n<a href=\"#\" class=\"dropdown-item rounded-1 user-status d-flex align-items-center gap-2 " + 
              (guard((context != null && context['user'] != null) ? context['user']['dnd'] : null) ?
                "selected" :
                "") + 
              "\" data-status=\"dnd\" role=\"menuitem\">\n<span component=\"user/status\" class=\"flex-shrink-0 border border-white border-2 rounded-circle status dnd\"></span>\n<span class=\"flex-grow-1\">[[global:dnd]]</span>\n</a>\n</li>\n<li>\n<a href=\"#\" class=\"dropdown-item rounded-1 user-status d-flex align-items-center gap-2 " + 
              (guard((context != null && context['user'] != null) ? context['user']['offline'] : null) ?
                "selected" :
                "") + 
              "\" data-status=\"offline\" role=\"menuitem\">\n<span component=\"user/status\" class=\"flex-shrink-0 border border-white border-2 rounded-circle status offline\"></span>\n<span class=\"flex-grow-1\">[[global:invisible]]</span>\n</a>\n</li>\n<li role=\"presentation\" class=\"dropdown-divider\"></li>\n<li>\n<a class=\"dropdown-item\" href=\"" + 
              __escape(guard((context != null) ? context['relative_path'] : null)) + 
              "/user/" + 
              __escape(guard((context != null && context['user'] != null) ? context['user']['userslug'] : null)) + 
              "/bookmarks\" role=\"menuitem\">\n<i class=\"fa fa-fw fa-bookmark\"></i> <span>[[user:bookmarks]]</span>\n</a>\n</li>\n<li>\n<a class=\"dropdown-item\" component=\"header/profilelink/edit\" href=\"" + 
              __escape(guard((context != null) ? context['relative_path'] : null)) + 
              "/user/" + 
              __escape(guard((context != null && context['user'] != null) ? context['user']['userslug'] : null)) + 
              "/edit\" role=\"menuitem\">\n<i class=\"fa fa-fw fa-edit\"></i> <span>[[user:edit-profile]]</span>\n</a>\n</li>\n<li>\n<a class=\"dropdown-item\" component=\"header/profilelink/settings\" href=\"" + 
              __escape(guard((context != null) ? context['relative_path'] : null)) + 
              "/user/" + 
              __escape(guard((context != null && context['user'] != null) ? context['user']['userslug'] : null)) + 
              "/settings\" role=\"menuitem\">\n<i class=\"fa fa-fw fa-gear\"></i> <span>[[user:settings]]</span>\n</a>\n</li>\n" + 
              (guard((context != null) ? context['showModMenu'] : null) ?
                "\n<li role=\"presentation\" class=\"dropdown-divider\"></li>\n<li><h6 class=\"dropdown-header\">[[pages:moderator-tools]]</h6></li>\n<li>\n<a class=\"dropdown-item\" href=\"" + 
                  __escape(guard((context != null) ? context['relative_path'] : null)) + 
                  "/flags\" role=\"menuitem\">\n<i class=\"fa fa-fw fa-flag\"></i> <span>[[pages:flagged-content]]</span>\n</a>\n</li>\n<li>\n<a class=\"dropdown-item\" href=\"" + 
                  __escape(guard((context != null) ? context['relative_path'] : null)) + 
                  "/post-queue\" role=\"menuitem\">\n<i class=\"fa fa-fw fa-list-alt\"></i> <span>[[pages:post-queue]]</span>\n</a>\n</li>\n" + 
                  (guard((context != null) ? context['registrationQueueEnabled'] : null) ?
                    "\n<li>\n<a class=\"dropdown-item\" href=\"" + 
                      __escape(guard((context != null) ? context['relative_path'] : null)) + 
                      "/registration-queue\" role=\"menuitem\">\n<i class=\"fa fa-fw fa-list-alt\"></i> <span>[[pages:registration-queue]]</span>\n</a>\n</li>\n" :
                    "") + 
                  "\n<li>\n<a class=\"dropdown-item\" href=\"" + 
                  __escape(guard((context != null) ? context['relative_path'] : null)) + 
                  "/ip-blacklist\" role=\"menuitem\">\n<i class=\"fa fa-fw fa-ban\"></i> <span>[[pages:ip-blacklist]]</span>\n</a>\n</li>\n" :
                "\n" + 
                  (guard((context != null) ? context['postQueueEnabled'] : null) ?
                    "\n<li>\n<a class=\"dropdown-item\" href=\"" + 
                      __escape(guard((context != null) ? context['relative_path'] : null)) + 
                      "/post-queue\" role=\"menuitem\">\n<i class=\"fa fa-fw fa-list-alt\"></i> <span>[[pages:post-queue]]</span>\n</a>\n</li>\n" :
                    "") + 
                  "\n") + 
              "\n<li role=\"presentation\" class=\"dropdown-divider\"></li>\n<li component=\"user/logout\">\n<form method=\"post\" action=\"" + 
              __escape(guard((context != null) ? context['relative_path'] : null)) + 
              "/logout\">\n<input type=\"hidden\" name=\"_csrf\" value=\"" + 
              __escape(guard((context != null && context['config'] != null) ? context['config']['csrf_token'] : null)) + 
              "\">\n<input type=\"hidden\" name=\"noscript\" value=\"true\">\n<button type=\"submit\" class=\"dropdown-item\" role=\"menuitem\">\n<i class=\"fa fa-fw fa-sign-out\"></i><span> [[global:logout]]</span>\n</button>\n</form>\n</li>\n</ul>\n</li>\n</ul>\n" :
            "\n<ul id=\"logged-out-menu\" class=\"navbar-nav me-0 mb-2 mb-lg-0 align-items-center\">\n" + 
              (guard((context != null) ? context['allowRegistration'] : null) ?
                "\n<li class=\"nav-item\">\n<a class=\"nav-link\" href=\"" + 
                  __escape(guard((context != null) ? context['relative_path'] : null)) + 
                  "/register\">\n<i class=\"fa fa-pencil fa-fw d-inline-block d-sm-none\"></i>\n<span>[[global:register]]</span>\n</a>\n</li>\n" :
                "") + 
              "\n<li class=\"nav-item\">\n<a class=\"nav-link\" href=\"" + 
              __escape(guard((context != null) ? context['relative_path'] : null)) + 
              "/login\">\n<i class=\"fa fa-sign-in fa-fw d-inline-block d-sm-none\"></i>\n<span>[[global:login]]</span>\n</a>\n</li>\n</ul>\n") + 
          "\n") + 
      "\n</div>\n</div>\n</nav>\n<script>\nconst rect = document.getElementById('header-menu').getBoundingClientRect();\nconst offset = Math.max(0, rect.bottom);\ndocument.documentElement.style.setProperty('--panel-offset', offset + `px`);\n</script>\n<div class=\"container-lg pt-3\" id=\"content\">\n<noscript>\n<div class=\"alert alert-danger\">\n<p>\nYour browser does not seem to support JavaScript. As a result, your viewing experience will be diminished, and you have been placed in <strong>read-only mode</strong>.\n</p>\n<p>\nPlease download a browser that supports JavaScript, or enable it if it's disabled (i.e. NoScript).\n</p>\n</div>\n</noscript>\n" + 
      (guard((context != null) ? context['noScriptMessage'] : null) ?
        "\n<noscript>\n<div class=\"alert alert-info\">\n<p>\n" + 
          __escape(guard((context != null) ? context['noScriptMessage'] : null)) + 
          "\n</p>\n</div>\n</noscript>\n" :
        "");
  }

  compiled.blocks = {
    'metaTags': function metaTags(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['metaTags'] : null), function each(key0, index, length, value) {
        var key = key0;
        return __escape(helper(context, helpers, 'buildMetaTag', [guard(value)]));
      }, function alt() {
        return "";
      });
    },
    'linkTags': function linkTags(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['linkTags'] : null), function each(key0, index, length, value) {
        var key = key0;
        return __escape(helper(context, helpers, 'buildLinkTag', [guard(value)]));
      }, function alt() {
        return "";
      });
    },
    'navigation': function navigation(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['navigation'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          (helper(context, helpers, 'displayMenuItem', [context, index]) ?
            "\n<li class=\"nav-item " + 
              __escape(guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['class'] : null)) + 
              (guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['dropdown'] : null) ?
                " dropdown" :
                "") + 
              "\" title=\"" + 
              __escape(guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['title'] : null)) + 
              "\">\n<a class=\"nav-link navigation-link " + 
              (guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['dropdown'] : null) ?
                "dropdown-toggle" :
                "") + 
              "\"\n" + 
              (guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['dropdown'] : null) ?
                " href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" " :
                " href=\"" + 
                  __escape(guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['route'] : null)) + 
                  "\"") + 
              " " + 
              (guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['id'] : null) ?
                "id=\"" + 
                  __escape(guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['id'] : null)) + 
                  "\"" :
                "") + 
              (guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['targetBlank'] : null) ?
                " target=\"_blank\"" :
                "") + 
              ">\n" + 
              (guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['iconClass'] : null) ?
                "\n<i class=\"fa fa-fw " + 
                  __escape(guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['iconClass'] : null)) + 
                  "\" data-content=\"" + 
                  __escape(guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['content'] : null)) + 
                  "\"></i>\n" :
                "") + 
              "\n" + 
              (guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['text'] : null) ?
                "\n<span class=\"" + 
                  __escape(guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['textClass'] : null)) + 
                  "\">" + 
                  __escape(guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['text'] : null)) + 
                  "</span>\n" :
                "") + 
              "\n" + 
              (guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['dropdown'] : null) ?
                "\n<i class=\"fa fa-caret-down\"></i>\n" :
                "") + 
              "\n</a>\n" + 
              (guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['dropdown'] : null) ?
                "\n<ul class=\"dropdown-menu p-1\" role=\"menu\">\n" + 
                  __escape(guard((context != null && context['navigation'] != null && context['navigation'][key0] != null) ? context['navigation'][key0]['dropdownContent'] : null)) + 
                  "\n</ul>\n" :
                "") + 
              "\n</li>\n" :
            "") + 
          "\n";
      }, function alt() {
        return "";
      });
    }
  };

  return compiled;
})
