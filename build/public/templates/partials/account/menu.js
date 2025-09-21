
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
    return "<div class=\"btn-group account-fab bottom-sheet\">\n<button type=\"button\" class=\"persona-fab dropdown-toggle\" data-bs-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n<i class=\"fa fa-ellipsis-v\"></i>\n</button>\n<ul class=\"dropdown-menu dropdown-menu-end account-sub-links\" role=\"menu\">\n" + 
      (guard((context != null) ? context['loggedIn'] : null) ?
        "\n" + 
          (guard((context != null) ? context['isSelf'] : null) ?
            "" :
            "\n" + 
              (guard((context != null) ? context['banned'] : null) ?
                "" :
                "\n" + 
                  (guard((context != null) ? context['canChat'] : null) ?
                    "\n<li class=\"" + 
                      (guard((context != null) ? context['hasPrivateChat'] : null) ?
                        "" :
                        "hidden") + 
                      "\">\n<a class=\"dropdown-item\" component=\"account/chat\" href=\"#\" role=\"menuitem\">[[user:chat-with, " + 
                      __escape(guard((context != null) ? context['username'] : null)) + 
                      "]]</a>\n</li>\n<li>\n<a class=\"dropdown-item\" component=\"account/new-chat\" href=\"#\" role=\"menuitem\">[[user:new-chat-with, " + 
                      __escape(guard((context != null) ? context['username'] : null)) + 
                      "]]</a>\n</li>\n" :
                    "") + 
                  "\n<li>\n<a " + 
                  (guard((context != null) ? context['flagId'] : null) ?
                    "hidden" :
                    "") + 
                  " class=\"dropdown-item\" component=\"account/flag\" href=\"#\" role=\"menuitem\">[[user:flag-profile]]</a>\n</li>\n<li>\n<a " + 
                  (guard((context != null) ? context['flagId'] : null) ?
                    "" :
                    "hidden") + 
                  " class=\"dropdown-item\" component=\"account/already-flagged\" href=\"#\" role=\"menuitem\" data-flag-id=\"" + 
                  __escape(guard((context != null) ? context['flagId'] : null)) + 
                  "\">[[user:profile-flagged]]</a>\n</li>\n<li>\n<a class=\"dropdown-item " + 
                  (guard((context != null) ? context['isBlocked'] : null) ?
                    "hidden" :
                    "") + 
                  "\" component=\"account/block\" href=\"#\" role=\"menuitem\">[[user:block-user]]</a>\n</li>\n<li>\n<a class=\"dropdown-item " + 
                  (guard((context != null) ? context['isBlocked'] : null) ?
                    "" :
                    "hidden") + 
                  "\" component=\"account/unblock\" href=\"#\" role=\"menuitem\">[[user:unblock-user]]</a>\n</li>\n<li role=\"separator\" class=\"dropdown-divider\"></li>\n") + 
              "\n") + 
          "\n" :
        "") + 
      "\n<li>\n<a class=\"dropdown-item\" href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null) ? context['userslug'] : null)) + 
      "\" class=\"d-inline-block\" id=\"profile\" role=\"menuitem\">[[user:profile]]</a>\n</li>\n" + 
      (guard((context != null) ? context['canEdit'] : null) ?
        "\n<li><a class=\"dropdown-item\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null) ? context['userslug'] : null)) + 
          "/edit\" role=\"menuitem\">[[user:edit]]</a></li>\n<li><a class=\"dropdown-item\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null) ? context['userslug'] : null)) + 
          "/settings\" role=\"menuitem\">[[user:settings]]</a></li>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['isSelf'] : null) ?
        "" :
        "\n" + 
          ((guard((context != null) ? context['canBan'] : null) || guard((context != null) ? context['canMute'] : null)) ?
            "\n<li role=\"separator\" class=\"dropdown-divider\"></li>\n<li class=\"dropdown-header\">[[user:admin-actions-label]]</li>\n" :
            "") + 
          "\n" + 
          (guard((context != null) ? context['canBan'] : null) ?
            "\n<li class=\"" + 
              (guard((context != null) ? context['banned'] : null) ?
                "hide" :
                "") + 
              "\">\n<a class=\"dropdown-item\" component=\"account/ban\" href=\"#\" role=\"menuitem\">[[user:ban-account]]</a>\n</li>\n<li class=\"" + 
              (guard((context != null) ? context['banned'] : null) ?
                "" :
                "hide") + 
              "\">\n<a class=\"dropdown-item\" component=\"account/unban\" href=\"#\" role=\"menuitem\">[[user:unban-account]]</a>\n</li>\n" :
            "") + 
          "\n" + 
          (guard((context != null) ? context['canMute'] : null) ?
            "\n<li class=\"" + 
              (guard((context != null) ? context['muted'] : null) ?
                "hide" :
                "") + 
              "\">\n<a class=\"dropdown-item\" component=\"account/mute\" href=\"#\" role=\"menuitem\">[[user:mute-account]]</a>\n</li>\n<li class=\"" + 
              (guard((context != null) ? context['muted'] : null) ?
                "" :
                "hide") + 
              "\">\n<a class=\"dropdown-item\" component=\"account/unmute\" href=\"#\" role=\"menuitem\">[[user:unmute-account]]</a>\n</li>\n" :
            "") + 
          "\n" + 
          (guard((context != null) ? context['isAdmin'] : null) ?
            "\n<li>\n<a component=\"account/delete-account\" href=\"#\" class=\"dropdown-item\" role=\"menuitem\">[[user:delete-account-as-admin]]</a>\n<a component=\"account/delete-content\" href=\"#\" class=\"dropdown-item\" role=\"menuitem\">[[user:delete-content]]</a>\n<a component=\"account/delete-all\" href=\"#\" class=\"dropdown-item\" role=\"menuitem\">[[user:delete-all]]</a>\n</li>\n" :
            "") + 
          "\n") + 
      "\n<li role=\"separator\" class=\"dropdown-divider\"></li>\n<li><a class=\"dropdown-item d-flex justify-content-between align-items-center\" href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null) ? context['userslug'] : null)) + 
      "/following\" role=\"menuitem\">[[user:following]] <span class=\"badge bg-secondary rounded-pill ms-2\" title=\"" + 
      __escape(guard((context != null && context['counts'] != null) ? context['counts']['following'] : null)) + 
      "\">" + 
      __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['counts'] != null) ? context['counts']['following'] : null)])) + 
      "</span></a></li>\n<li><a class=\"dropdown-item d-flex justify-content-between align-items-center\" href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null) ? context['userslug'] : null)) + 
      "/followers\" role=\"menuitem\">[[user:followers]] <span class=\"badge bg-secondary rounded-pill ms-2\" title=\"" + 
      __escape(guard((context != null && context['counts'] != null) ? context['counts']['followers'] : null)) + 
      "\">" + 
      __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['counts'] != null) ? context['counts']['followers'] : null)])) + 
      "</span></a></li>\n" + 
      (guard((context != null) ? context['canEdit'] : null) ?
        "\n<li><a class=\"dropdown-item d-flex justify-content-between align-items-center\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null) ? context['userslug'] : null)) + 
          "/blocks\" role=\"menuitem\">[[user:blocks]] <span class=\"badge bg-secondary rounded-pill ms-2\" title=\"" + 
          __escape(guard((context != null && context['counts'] != null) ? context['counts']['blocks'] : null)) + 
          "\">" + 
          __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['counts'] != null) ? context['counts']['blocks'] : null)])) + 
          "</span></a></li>\n" :
        "") + 
      "\n<li role=\"separator\" class=\"dropdown-divider\"></li>\n<li><a class=\"dropdown-item d-flex justify-content-between align-items-center\" href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null) ? context['userslug'] : null)) + 
      "/topics\" role=\"menuitem\">[[global:topics]] <span class=\"badge bg-secondary rounded-pill ms-2\" title=\"" + 
      __escape(guard((context != null && context['counts'] != null) ? context['counts']['topics'] : null)) + 
      "\">" + 
      __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['counts'] != null) ? context['counts']['topics'] : null)])) + 
      "</span></a></li>\n<li><a class=\"dropdown-item d-flex justify-content-between align-items-center\" href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null) ? context['userslug'] : null)) + 
      "/posts\" role=\"menuitem\">[[global:posts]] <span class=\"badge bg-secondary rounded-pill ms-2\" title=\"" + 
      __escape(guard((context != null && context['counts'] != null) ? context['counts']['posts'] : null)) + 
      "\">" + 
      __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['counts'] != null) ? context['counts']['posts'] : null)])) + 
      "</span></a></li>\n<li><a class=\"dropdown-item d-flex justify-content-between align-items-center\" href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null) ? context['userslug'] : null)) + 
      "/groups\" role=\"menuitem\">[[global:header.groups]] <span class=\"badge bg-secondary rounded-pill ms-2\" title=\"" + 
      __escape(guard((context != null && context['counts'] != null) ? context['counts']['groups'] : null)) + 
      "\">" + 
      __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['counts'] != null) ? context['counts']['groups'] : null)])) + 
      "</span></a></li>\n" + 
      (guard((context != null) ? context['canEdit'] : null) ?
        "\n<li><a class=\"dropdown-item d-flex justify-content-between align-items-center\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null) ? context['userslug'] : null)) + 
          "/categories\" role=\"menuitem\">[[user:watched-categories]] <span class=\"badge bg-secondary rounded-pill ms-2\" title=\"" + 
          __escape(guard((context != null && context['counts'] != null) ? context['counts']['categoriesWatched'] : null)) + 
          "\">" + 
          __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['counts'] != null) ? context['counts']['categoriesWatched'] : null)])) + 
          "</span></a></li>\n" + 
          (guard((context != null) ? context['isSelf'] : null) ?
            "\n<li><a class=\"dropdown-item d-flex justify-content-between align-items-center\" href=\"" + 
              __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
              "/user/" + 
              __escape(guard((context != null) ? context['userslug'] : null)) + 
              "/tags\" role=\"menuitem\">\n[[user:watched-tags]] <span class=\"badge bg-secondary rounded-pill ms-2\" title=\"" + 
              __escape(guard((context != null && context['counts'] != null) ? context['counts']['tagsWatched'] : null)) + 
              "\">" + 
              __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['counts'] != null) ? context['counts']['tagsWatched'] : null)])) + 
              "</span></a></li>\n" :
            "") + 
          "\n<li><a class=\"dropdown-item d-flex justify-content-between align-items-center\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null) ? context['userslug'] : null)) + 
          "/uploads\" role=\"menuitem\">[[global:uploads]] <span class=\"badge bg-secondary rounded-pill ms-2\" title=\"" + 
          __escape(guard((context != null && context['counts'] != null) ? context['counts']['uploaded'] : null)) + 
          "\">" + 
          __escape(helper(context, helpers, 'formattedNumber', [guard((context != null && context['counts'] != null) ? context['counts']['uploaded'] : null)])) + 
          "</span></a></li>\n" :
        "") + 
      "\n" + 
      compiled.blocks['profile_links'](helpers, context, guard, iter, helper) + 
      "\n</ul>\n</div>";
  }

  compiled.blocks = {
    'profile_links': function profile_links(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['profile_links'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          (index === 0 ?
            "\n<li role=\"separator\" class=\"dropdown-divider\"></li>\n" :
            "") + 
          "\n<li id=\"" + 
          __escape(guard((context != null && context['profile_links'] != null && context['profile_links'][key0] != null) ? context['profile_links'][key0]['id'] : null)) + 
          "\" class=\"plugin-link " + 
          (guard((context != null && context['profile_links'] != null && context['profile_links'][key0] != null) ? context['profile_links'][key0]['public'] : null) ?
            "public" :
            "private") + 
          "\"><a class=\"dropdown-item\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null) ? context['userslug'] : null)) + 
          "/" + 
          __escape(guard((context != null && context['profile_links'] != null && context['profile_links'][key0] != null) ? context['profile_links'][key0]['route'] : null)) + 
          "\">" + 
          (guard((context != null && context['profile_links'] != null && context['profile_links'][key0] != null) ? context['profile_links'][key0]['icon'] : null) ?
            "<i class=\"fa fa-fw " + 
              __escape(guard((context != null && context['profile_links'] != null && context['profile_links'][key0] != null) ? context['profile_links'][key0]['icon'] : null)) + 
              "\"></i> " :
            "") + 
          __escape(guard((context != null && context['profile_links'] != null && context['profile_links'][key0] != null) ? context['profile_links'][key0]['name'] : null)) + 
          "</a></li>\n";
      }, function alt() {
        return "";
      });
    }
  };

  return compiled;
})
