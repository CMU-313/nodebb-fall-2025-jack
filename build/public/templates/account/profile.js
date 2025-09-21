
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
    return "<div class=\"account\">\n" + 
      (guard((context != null && context['breadcrumbs'] != null) ? context['breadcrumbs']['length'] : null) ?
        "\n<ol class=\"breadcrumb\" itemscope=\"itemscope\" itemprop=\"breadcrumb\" itemtype=\"http://schema.org/BreadcrumbList\">\n" + 
          compiled.blocks['breadcrumbs'](helpers, context, guard, iter, helper) + 
          "\n</ol>\n" :
        "") + 
      "\n<div data-widget-area=\"header\">\n" + 
      compiled.blocks['widgets.header'](helpers, context, guard, iter, helper) + 
      "\n</div>\n<div class=\"cover\" component=\"account/cover\" style=\"background-image: url(" + 
      __escape(guard((context != null) ? context['cover:url'] : null)) + 
      "); background-position: " + 
      __escape(guard((context != null) ? context['cover:position'] : null)) + 
      ";\">\n<div class=\"avatar-wrapper\" data-uid=\"" + 
      __escape(guard((context != null) ? context['uid'] : null)) + 
      "\">\n" + 
      (guard((context != null) ? context['picture'] : null) ?
        "\n<img src=\"" + 
          __escape(guard((context != null) ? context['picture'] : null)) + 
          "\" class=\"avatar avatar-rounded\" style=\"--avatar-size: 128px;\" />\n" :
        "\n<div class=\"avatar avatar-rounded\" style=\"background-color: " + 
          __escape(guard((context != null) ? context['icon:bgColor'] : null)) + 
          "; --avatar-size: 128px;\" title=\"" + 
          __escape(guard((context != null) ? context['username'] : null)) + 
          "\">" + 
          __escape(guard((context != null) ? context['icon:text'] : null)) + 
          "</div>\n") + 
      "\n<span component=\"user/status\" class=\"position-absolute border border-white border-2 rounded-circle status " + 
      __escape(guard((context != null) ? context['status'] : null)) + 
      "\"><span class=\"visually-hidden\">[[global:" + 
      __escape(guard((context != null) ? context['status'] : null)) + 
      "]]</span></span>\n" + 
      (guard((context != null) ? context['loggedIn'] : null) ?
        "\n" + 
          (guard((context != null) ? context['isSelf'] : null) ?
            "" :
            "\n<button class=\"btn-morph persona-fab " + 
              (guard((context != null) ? context['isFollowing'] : null) ?
                "heart" :
                "plus") + 
              "\" title=\"" + 
              (guard((context != null) ? context['isFollowing'] : null) ?
                "[[global:unfollow]]" :
                "[[global:follow]]") + 
              "\">\n<span>\n<span class=\"s1\"></span>\n<span class=\"s2\"></span>\n<span class=\"s3\"></span>\n</span>\n</button>\n") + 
          "\n" :
        "") + 
      "\n</div>\n<div class=\"container\">\n" + 
      (guard((context != null) ? context['allowCoverPicture'] : null) ?
        "\n" + 
          (guard((context != null) ? context['canEdit'] : null) ?
            "\n<div class=\"controls\">\n<a href=\"#\" class=\"upload\"><i class=\"fa fa-fw fa-4x fa-upload\"></i></a>\n<a href=\"#\" class=\"resize\"><i class=\"fa fa-fw fa-4x fa-arrows\"></i></a>\n<a href=\"#\" class=\"remove\"><i class=\"fa fa-fw fa-4x fa-times\"></i></a>\n</div>\n<a href=\"#\" class=\"save\">[[groups:cover-save]] <i class=\"fa fa-fw fa-floppy-o\"></i></a>\n<div class=\"indicator\">[[groups:cover-saving]] <i class=\"fa fa-fw fa-refresh fa-spin\"></i></div>\n" :
            "") + 
          "\n" :
        "") + 
      "\n<div class=\"btn-group account-fab bottom-sheet\">\n<button type=\"button\" class=\"persona-fab dropdown-toggle\" data-bs-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n<i class=\"fa fa-ellipsis-v\"></i>\n</button>\n<ul class=\"dropdown-menu dropdown-menu-end account-sub-links\" role=\"menu\">\n" + 
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
      "\n</ul>\n</div>\n</div>\n</div>\n<div class=\"profile row\">\n<h1 class=\"fullname text-center fs-2 text-secondary fw-light\">" + 
      (guard((context != null) ? context['fullname'] : null) ?
        __escape(guard((context != null) ? context['fullname'] : null)) :
        __escape(guard((context != null) ? context['username'] : null))) + 
      "</h1>\n<div class=\"d-flex gap-2 justify-content-center mb-2\" component=\"user/badges\"></div>\n<h2 class=\"username text-center fs-5\">" + 
      (guard((context != null) ? context['banned'] : null) ?
        "[[user:banned]]" :
        "@" + 
          __escape(guard((context != null) ? context['username'] : null))) + 
      "</h2>\n" + 
      (guard((context != null) ? context['isAdminOrGlobalModeratorOrModerator'] : null) ?
        "\n" + 
          (guard((context != null) ? context['banned'] : null) ?
            "\n<div class=\"text-center\">\n" + 
              (guard((context != null) ? context['banned_until'] : null) ?
                "\n[[user:info.banned-until, " + 
                  __escape(guard((context != null) ? context['banned_until_readable'] : null)) + 
                  "]]\n" :
                "\n[[user:info.banned-permanently]]\n") + 
              "\n</div>\n" :
            "") + 
          "\n" :
        "") + 
      "\n" + 
      (guard((context != null && context['selectedGroup'] != null) ? context['selectedGroup']['length'] : null) ?
        "\n<div class=\"text-center\">\n" + 
          compiled.blocks['selectedGroup'](helpers, context, guard, iter, helper) + 
          "\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['aboutme'] : null) ?
        "\n<div component=\"aboutme\" class=\"text-center aboutme text-secondary w-75 mx-auto text-center\">" + 
          __escape(guard((context != null) ? context['aboutmeParsed'] : null)) + 
          "</div>\n" :
        "") + 
      "\n<div class=\"account-stats fs-1 text-center mb-3\">\n" + 
      (guard((context != null) ? context['reputation:disabled'] : null) ?
        "" :
        "\n<div class=\"stat d-inline-block\" style=\"min-width: 100px;\">\n<div title=\"" + 
          __escape(guard((context != null) ? context['reputation'] : null)) + 
          "\">" + 
          __escape(helper(context, helpers, 'humanReadableNumber', [guard((context != null) ? context['reputation'] : null)])) + 
          "</div>\n<div class=\"stat-label text-xs text-uppercase text-secondary\">[[global:reputation]]</div>\n</div>\n") + 
      "\n<div class=\"stat d-inline-block\" style=\"min-width: 100px;\">\n<div title=\"" + 
      __escape(guard((context != null) ? context['profileviews'] : null)) + 
      "\">" + 
      __escape(helper(context, helpers, 'humanReadableNumber', [guard((context != null) ? context['profileviews'] : null)])) + 
      "</div>\n<div class=\"stat-label text-xs text-uppercase text-secondary\">[[user:profile-views]]</div>\n</div>\n<div class=\"stat d-inline-block\" style=\"min-width: 100px;\">\n<div><a title=\"" + 
      __escape(guard((context != null && context['counts'] != null) ? context['counts']['posts'] : null)) + 
      "\" href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null) ? context['userslug'] : null)) + 
      "/posts\">" + 
      __escape(helper(context, helpers, 'humanReadableNumber', [guard((context != null && context['counts'] != null) ? context['counts']['posts'] : null)])) + 
      "</a></div>\n<div class=\"stat-label text-xs text-uppercase text-secondary\">[[global:posts]]</div>\n</div>\n<div class=\"stat d-inline-block\" style=\"min-width: 100px;\">\n<div><a title=\"" + 
      __escape(guard((context != null && context['counts'] != null) ? context['counts']['followers'] : null)) + 
      "\" href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null) ? context['userslug'] : null)) + 
      "/followers\">" + 
      __escape(helper(context, helpers, 'humanReadableNumber', [guard((context != null && context['counts'] != null) ? context['counts']['followers'] : null)])) + 
      "</a></div>\n<div class=\"stat-label text-xs text-uppercase text-secondary\">[[user:followers]]</div>\n</div>\n<div class=\"stat d-inline-block\" style=\"min-width: 100px;\">\n<div><a title=\"" + 
      __escape(guard((context != null && context['counts'] != null) ? context['counts']['following'] : null)) + 
      "\" href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/user/" + 
      __escape(guard((context != null) ? context['userslug'] : null)) + 
      "/following\">" + 
      __escape(helper(context, helpers, 'humanReadableNumber', [guard((context != null && context['counts'] != null) ? context['counts']['following'] : null)])) + 
      "</a></div>\n<div class=\"stat-label text-xs text-uppercase text-secondary\">[[user:following]]</div>\n</div>\n</div>\n<div class=\"profile-meta text-xs text-uppercase d-flex gap-3 flex-wrap justify-content-center\">\n<div class=\"w-100 d-flex gap-3 justify-content-center\">\n<div>\n<span class=\"stat-label\">[[user:joined]]</span>\n<span class=\"timeago fw-bold\" title=\"" + 
      __escape(guard((context != null) ? context['joindateISO'] : null)) + 
      "\"></span>\n</div>\n<div>\n<span class=\"stat-label\">[[user:lastonline]]</span>\n<span class=\"timeago fw-bold\" title=\"" + 
      __escape(guard((context != null) ? context['lastonlineISO'] : null)) + 
      "\"></span>\n</div>\n</div>\n" + 
      (guard((context != null) ? context['email'] : null) ?
        "\n<div>\n<span class=\"stat-label\">[[user:email]]</span>\n<strong><i class=\"fa fa-eye-slash " + 
          __escape(guard((context != null) ? context['emailClass'] : null)) + 
          "\" title=\"[[user:email-hidden]]\"></i> " + 
          __escape(guard((context != null) ? context['email'] : null)) + 
          "</strong>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['age'] : null) ?
        "\n<div class=\"\">\n<span class=\"stat-label text-secondary \">[[user:age]]</span>\n<span class=\"fw-bold\">" + 
          __escape(guard((context != null) ? context['age'] : null)) + 
          "</span>\n</div>\n" :
        "") + 
      "\n" + 
      compiled.blocks['customUserFields'](helpers, context, guard, iter, helper) + 
      "\n</div>\n</div>\n<hr />\n<div class=\"row\">\n<div class=\"col-12 account-block hidden\">\n<div class=\"account-picture-block text-center\">\n<span>\n<span class=\"account-username\"> " + 
      __escape(guard((context != null) ? context['username'] : null)) + 
      "</span>\n</span>\n" + 
      (guard((context != null) ? context['isSelf'] : null) ?
        "" :
        "\n<a component=\"account/unfollow\" href=\"#\" class=\"btn btn-outline-secondary" + 
          (guard((context != null) ? context['isFollowing'] : null) ?
            "" :
            " hide") + 
          "\">[[user:unfollow]]</a>\n<a component=\"account/follow\" href=\"#\" class=\"btn btn-primary" + 
          (guard((context != null) ? context['isFollowing'] : null) ?
            " hide" :
            "") + 
          "\">[[user:follow]]</a>\n") + 
      "\n</div>\n</div>\n</div>\n" + 
      (guard((context != null && context['groups'] != null) ? context['groups']['length'] : null) ?
        "\n<div class=\"row\">\n<div class=\"col-12 hidden\">\n" + 
          compiled.blocks['groups'](helpers, context, guard, iter, helper) + 
          "\n</div>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null && context['ips'] != null) ? context['ips']['length'] : null) ?
        "\n<div class=\"row\">\n<div class=\"col-12 hidden\">\n<div class=\"card\">\n<h5 class=\"card-header\">\n[[global:recentips]]\n</h5>\n<div class=\"card-body\">\n" + 
          compiled.blocks['ips'](helpers, context, guard, iter, helper) + 
          "\n</div>\n</div>\n</div>\n</div>\n" :
        "") + 
      "\n<div class=\"row\">\n" + 
      (guard((context != null && context['bestPosts'] != null) ? context['bestPosts']['length'] : null) ?
        "\n<div class=\"col-lg-12 col-12\">\n<h1 class=\"fs-3\">[[pages:account/best, " + 
          __escape(guard((context != null) ? context['username'] : null)) + 
          "]]</h1>\n<div class=\"col-12\">\n<ul component=\"posts\" class=\"posts-list list-unstyled\">\n" + 
          compiled.blocks['bestPosts'](helpers, context, guard, iter, helper) + 
          "\n</ul>\n</div>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null && context['latestPosts'] != null) ? context['latestPosts']['length'] : null) ?
        "\n<div class=\"col-lg-12 col-12\">\n<h1 class=\"fs-3\">[[pages:account/latest-posts, " + 
          __escape(guard((context != null) ? context['username'] : null)) + 
          "]]</h1>\n<div class=\"col-12\">\n<ul component=\"posts\" class=\"posts-list list-unstyled\">\n" + 
          compiled.blocks['latestPosts'](helpers, context, guard, iter, helper) + 
          "\n</ul>\n</div>\n</div>\n" :
        "") + 
      "\n</div>\n<div id=\"user-action-alert\" class=\"alert alert-success hide\"></div>\n</div>";
  }

  compiled.blocks = {
    'breadcrumbs': function breadcrumbs(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['breadcrumbs'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<li" + 
          (index === length - 1 ?
            " component=\"breadcrumb/current\"" :
            "") + 
          " itemscope=\"itemscope\" itemprop=\"itemListElement\" itemtype=\"http://schema.org/ListItem\" class=\"breadcrumb-item " + 
          (index === length - 1 ?
            "active" :
            "") + 
          "\">\n<meta itemprop=\"position\" content=\"" + 
          __escape(index) + 
          "\" />\n" + 
          (guard((context != null && context['breadcrumbs'] != null && context['breadcrumbs'][key0] != null) ? context['breadcrumbs'][key0]['url'] : null) ?
            "<a href=\"" + 
              __escape(guard((context != null && context['breadcrumbs'] != null && context['breadcrumbs'][key0] != null) ? context['breadcrumbs'][key0]['url'] : null)) + 
              "\" itemprop=\"item\">" :
            "") + 
          "\n<span itemprop=\"name\">\n" + 
          __escape(guard((context != null && context['breadcrumbs'] != null && context['breadcrumbs'][key0] != null) ? context['breadcrumbs'][key0]['text'] : null)) + 
          "\n" + 
          (index === length - 1 ?
            "\n" + 
              (guard((context != null) ? context['feeds:disableRSS'] : null) ?
                "" :
                "\n" + 
                  (guard((context != null) ? context['rssFeedUrl'] : null) ?
                    "<a target=\"_blank\" href=\"" + 
                      __escape(guard((context != null) ? context['rssFeedUrl'] : null)) + 
                      "\" itemprop=\"item\"><i class=\"fa fa-rss-square\"></i></a>" :
                    "")) + 
              "\n" :
            "") + 
          "\n</span>\n" + 
          (guard((context != null && context['breadcrumbs'] != null && context['breadcrumbs'][key0] != null) ? context['breadcrumbs'][key0]['url'] : null) ?
            "</a>" :
            "") + 
          "\n</li>\n";
      }, function alt() {
        return "";
      });
    },
    'widgets.header': function widgetsheader(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null && context['widgets'] != null) ? context['widgets']['header'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          guard((context != null && context['widgets'] != null && context['widgets']['header'] != null && context['widgets']['header'][key0] != null) ? context['widgets']['header'][key0]['html'] : null) + 
          "\n";
      }, function alt() {
        return "";
      });
    },
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
    },
    'selectedGroup': function selectedGroup(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['selectedGroup'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          (guard((context != null && context['selectedGroup'] != null && context['selectedGroup'][key0] != null) ? context['selectedGroup'][key0]['slug'] : null) ?
            "\n<a href=\"" + 
              __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
              "/groups/" + 
              __escape(guard((context != null && context['selectedGroup'] != null && context['selectedGroup'][key0] != null) ? context['selectedGroup'][key0]['slug'] : null)) + 
              "\" class=\"badge rounded-1 text-uppercase text-truncate\" style=\"max-width: 150px;color:" + 
              __escape(guard((context != null && context['selectedGroup'] != null && context['selectedGroup'][key0] != null) ? context['selectedGroup'][key0]['textColor'] : null)) + 
              ";background-color: " + 
              __escape(guard((context != null && context['selectedGroup'] != null && context['selectedGroup'][key0] != null) ? context['selectedGroup'][key0]['labelColor'] : null)) + 
              ";\"><i class=\"fa " + 
              (guard((context != null && context['selectedGroup'] != null && context['selectedGroup'][key0] != null) ? context['selectedGroup'][key0]['icon'] : null) ?
                __escape(guard((context != null && context['selectedGroup'] != null && context['selectedGroup'][key0] != null) ? context['selectedGroup'][key0]['icon'] : null)) + 
                  (guard((context != null && context['selectedGroup'] != null && context['selectedGroup'][key0] != null) ? context['selectedGroup'][key0]['userTitle'] : null) ?
                    " me-1" :
                    "") :
                "hidden") + 
              "\"></i><span class=\"badge-text\">" + 
              (guard((context != null && context['selectedGroup'] != null && context['selectedGroup'][key0] != null) ? context['selectedGroup'][key0]['userTitle'] : null) ?
                __escape(guard((context != null && context['selectedGroup'] != null && context['selectedGroup'][key0] != null) ? context['selectedGroup'][key0]['userTitle'] : null)) :
                "") + 
              "</span></a>\n" :
            "") + 
          "\n";
      }, function alt() {
        return "";
      });
    },
    'customUserFields': function customUserFields(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['customUserFields'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          (guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['value'] : null) ?
            "\n<div>\n<span class=\"stat-label\">" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['name'] : null)) + 
              "</span>\n" + 
              ((guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['type'] : null) == "input-link") ?
                "\n<a class=\"fw-bold\" href=\"" + 
                  __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['value'] : null)) + 
                  "\" rel=\"nofollow noreferrer\">" + 
                  __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['linkValue'] : null)) + 
                  "</a>\n" :
                "\n<span class=\"fw-bold\">" + 
                  __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['value'] : null)) + 
                  "</span>\n") + 
              "\n</div>\n" :
            "") + 
          "\n";
      }, function alt() {
        return "";
      });
    },
    'groups': function groups(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['groups'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<a href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/groups/" + 
          __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['slug'] : null)) + 
          "\"><span class=\"label group-label inline-block\" style=\"background-color: " + 
          __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['labelColor'] : null)) + 
          ";\">" + 
          (guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['icon'] : null) ?
            "<i class=\"fa " + 
              __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['icon'] : null)) + 
              "\"></i> " :
            "") + 
          __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['userTitle'] : null)) + 
          "</span></a>\n";
      }, function alt() {
        return "";
      });
    },
    'ips': function ips(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['ips'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<div>" + 
          __escape(guard((context != null && context['ips'] != null) ? context['ips'][key0] : null)) + 
          "</div>\n";
      }, function alt() {
        return "";
      });
    },
    'bestPosts': function bestPosts(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['bestPosts'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<li component=\"post\" class=\"posts-list-item row " + 
          (guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null) ? context['bestPosts'][key0]['deleted'] : null) ?
            " deleted" :
            (guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['topic'] != null) ? context['bestPosts'][key0]['topic']['deleted'] : null) ?
                " deleted" :
                "")) + 
          (guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['topic'] != null) ? context['bestPosts'][key0]['topic']['scheduled'] : null) ?
            " scheduled" :
            "") + 
          "\" data-pid=\"" + 
          __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null) ? context['bestPosts'][key0]['pid'] : null)) + 
          "\" data-uid=\"" + 
          __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null) ? context['bestPosts'][key0]['uid'] : null)) + 
          "\">\n<div class=\"col-lg-11 col-sm-10 col-9 post-body pb-3\">\n<a class=\"topic-title text-reset\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/post/" + 
          __escape(helper(context, helpers, 'encodeURIComponent', [guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null) ? context['bestPosts'][key0]['pid'] : null)])) + 
          "\">\n" + 
          (guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null) ? context['bestPosts'][key0]['isMainPost'] : null) ?
            "" :
            "RE: ") + 
          __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['topic'] != null) ? context['bestPosts'][key0]['topic']['title'] : null)) + 
          "\n</a>\n<div component=\"post/content\" class=\"content mb-3\">\n" + 
          __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null) ? context['bestPosts'][key0]['content'] : null)) + 
          "\n</div>\n<div class=\"mb-3\">\n<a class=\"topic-category text-xs fw-bold text-uppercase text-secondary mb-3\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/category/" + 
          __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['category'] != null) ? context['bestPosts'][key0]['category']['slug'] : null)) + 
          "\">[[global:posted-in, " + 
          __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['category'] != null) ? context['bestPosts'][key0]['category']['name'] : null)) + 
          "]]</a>\n" + 
          (guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null) ? context['bestPosts'][key0]['isMainPost'] : null) ?
            "\n" + 
              (guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['topic'] != null && context['bestPosts'][key0]['topic']['tags'] != null) ? context['bestPosts'][key0]['topic']['tags']['length'] : null) ?
                "\n<span class=\"tag-list\">\n" + 
                  iter(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['topic'] != null) ? context['bestPosts'][key0]['topic']['tags'] : null), function each(key1, index, length, value) {
                    var key = key1;
                    return "\n<a href=\"" + 
                      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
                      "/tags/" + 
                      __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['topic'] != null && context['bestPosts'][key0]['topic']['tags'] != null && context['bestPosts'][key0]['topic']['tags'][key1] != null) ? context['bestPosts'][key0]['topic']['tags'][key1]['valueEncoded'] : null)) + 
                      "\"><span class=\"tag tag-item tag-class-" + 
                      __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['topic'] != null && context['bestPosts'][key0]['topic']['tags'] != null && context['bestPosts'][key0]['topic']['tags'][key1] != null) ? context['bestPosts'][key0]['topic']['tags'][key1]['class'] : null)) + 
                      "\">" + 
                      __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['topic'] != null && context['bestPosts'][key0]['topic']['tags'] != null && context['bestPosts'][key0]['topic']['tags'][key1] != null) ? context['bestPosts'][key0]['topic']['tags'][key1]['valueEscaped'] : null)) + 
                      "</span></a>\n";
                  }, function alt() {
                    return "";
                  }) + 
                  "\n</span>\n" :
                "") + 
              "\n" :
            "") + 
          "\n</div>\n<div class=\"post-info\">\n<a href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['user'] != null) ? context['bestPosts'][key0]['user']['userslug'] : null)) + 
          "\">" + 
          __escape(helper(context, helpers, 'buildAvatar', [guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null) ? context['bestPosts'][key0]['user'] : null), "28px", guard((context != null) ? context['true'] : null), "user-img not-responsive"])) + 
          "</a>\n<div class=\"post-author text-secondary text-uppercase\">\n<a class=\"text-reset\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['user'] != null) ? context['bestPosts'][key0]['user']['userslug'] : null)) + 
          "\">" + 
          __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null && context['bestPosts'][key0]['user'] != null) ? context['bestPosts'][key0]['user']['displayname'] : null)) + 
          "</a><br />\n<span class=\"timeago\" title=\"" + 
          __escape(guard((context != null && context['bestPosts'] != null && context['bestPosts'][key0] != null) ? context['bestPosts'][key0]['timestampISO'] : null)) + 
          "\"></span>\n</div>\n</div>\n</div>\n</li>\n";
      }, function alt() {
        return "";
      });
    },
    'latestPosts': function latestPosts(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['latestPosts'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<li component=\"post\" class=\"posts-list-item row " + 
          (guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null) ? context['latestPosts'][key0]['deleted'] : null) ?
            " deleted" :
            (guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['topic'] != null) ? context['latestPosts'][key0]['topic']['deleted'] : null) ?
                " deleted" :
                "")) + 
          (guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['topic'] != null) ? context['latestPosts'][key0]['topic']['scheduled'] : null) ?
            " scheduled" :
            "") + 
          "\" data-pid=\"" + 
          __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null) ? context['latestPosts'][key0]['pid'] : null)) + 
          "\" data-uid=\"" + 
          __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null) ? context['latestPosts'][key0]['uid'] : null)) + 
          "\">\n<div class=\"col-lg-11 col-sm-10 col-9 post-body pb-3\">\n<a class=\"topic-title text-reset\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/post/" + 
          __escape(helper(context, helpers, 'encodeURIComponent', [guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null) ? context['latestPosts'][key0]['pid'] : null)])) + 
          "\">\n" + 
          (guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null) ? context['latestPosts'][key0]['isMainPost'] : null) ?
            "" :
            "RE: ") + 
          __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['topic'] != null) ? context['latestPosts'][key0]['topic']['title'] : null)) + 
          "\n</a>\n<div component=\"post/content\" class=\"content mb-3\">\n" + 
          __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null) ? context['latestPosts'][key0]['content'] : null)) + 
          "\n</div>\n<div class=\"mb-3\">\n<a class=\"topic-category text-xs fw-bold text-uppercase text-secondary mb-3\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/category/" + 
          __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['category'] != null) ? context['latestPosts'][key0]['category']['slug'] : null)) + 
          "\">[[global:posted-in, " + 
          __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['category'] != null) ? context['latestPosts'][key0]['category']['name'] : null)) + 
          "]]</a>\n" + 
          (guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null) ? context['latestPosts'][key0]['isMainPost'] : null) ?
            "\n" + 
              (guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['topic'] != null && context['latestPosts'][key0]['topic']['tags'] != null) ? context['latestPosts'][key0]['topic']['tags']['length'] : null) ?
                "\n<span class=\"tag-list\">\n" + 
                  iter(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['topic'] != null) ? context['latestPosts'][key0]['topic']['tags'] : null), function each(key1, index, length, value) {
                    var key = key1;
                    return "\n<a href=\"" + 
                      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
                      "/tags/" + 
                      __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['topic'] != null && context['latestPosts'][key0]['topic']['tags'] != null && context['latestPosts'][key0]['topic']['tags'][key1] != null) ? context['latestPosts'][key0]['topic']['tags'][key1]['valueEncoded'] : null)) + 
                      "\"><span class=\"tag tag-item tag-class-" + 
                      __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['topic'] != null && context['latestPosts'][key0]['topic']['tags'] != null && context['latestPosts'][key0]['topic']['tags'][key1] != null) ? context['latestPosts'][key0]['topic']['tags'][key1]['class'] : null)) + 
                      "\">" + 
                      __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['topic'] != null && context['latestPosts'][key0]['topic']['tags'] != null && context['latestPosts'][key0]['topic']['tags'][key1] != null) ? context['latestPosts'][key0]['topic']['tags'][key1]['valueEscaped'] : null)) + 
                      "</span></a>\n";
                  }, function alt() {
                    return "";
                  }) + 
                  "\n</span>\n" :
                "") + 
              "\n" :
            "") + 
          "\n</div>\n<div class=\"post-info\">\n<a href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['user'] != null) ? context['latestPosts'][key0]['user']['userslug'] : null)) + 
          "\">" + 
          __escape(helper(context, helpers, 'buildAvatar', [guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null) ? context['latestPosts'][key0]['user'] : null), "28px", guard((context != null) ? context['true'] : null), "user-img not-responsive"])) + 
          "</a>\n<div class=\"post-author text-secondary text-uppercase\">\n<a class=\"text-reset\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['user'] != null) ? context['latestPosts'][key0]['user']['userslug'] : null)) + 
          "\">" + 
          __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null && context['latestPosts'][key0]['user'] != null) ? context['latestPosts'][key0]['user']['displayname'] : null)) + 
          "</a><br />\n<span class=\"timeago\" title=\"" + 
          __escape(guard((context != null && context['latestPosts'] != null && context['latestPosts'][key0] != null) ? context['latestPosts'][key0]['timestampISO'] : null)) + 
          "\"></span>\n</div>\n</div>\n</div>\n</li>\n";
      }, function alt() {
        return "";
      });
    }
  };

  return compiled;
})
