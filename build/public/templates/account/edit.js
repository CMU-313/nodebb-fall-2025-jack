
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
      "\n</ul>\n</div>\n</div>\n</div>\n" + 
      (guard((context != null && context['sso'] != null) ? context['sso']['length'] : null) ?
        "<div>" :
        "") + 
      "\n<div class=\"row\">\n<div class=\"col-md-3 col-sm-4\">\n<div class=\"account-picture-block text-center\">\n<div class=\"row mb-3\">\n<div class=\"col-12 hidden-xs\">\n" + 
      (guard((context != null) ? context['picture'] : null) ?
        "\n<img id=\"user-current-picture\" class=\"avatar avatar-rounded\" style=\"--avatar-size: 128px;\" src=\"" + 
          __escape(guard((context != null) ? context['picture'] : null)) + 
          "\" />\n" :
        "\n<div class=\"avatar avatar-rounded\" style=\"background-color: " + 
          __escape(guard((context != null) ? context['icon:bgColor'] : null)) + 
          "; --avatar-size: 128px;\">" + 
          __escape(guard((context != null) ? context['icon:text'] : null)) + 
          "</div>\n") + 
      "\n</div>\n</div>\n<ul class=\"list-group mb-3\">\n" + 
      (guard((context != null) ? context['allowProfilePicture'] : null) ?
        "\n<li class=\"list-group-item\"><a component=\"profile/change/picture\" href=\"#\" class=\"text-decoration-none text-reset\">[[user:change-picture]]</a></li>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['username:disableEdit'] : null) ?
        "" :
        "\n<li class=\"list-group-item\"><a href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null) ? context['userslug'] : null)) + 
          "/edit/username\" class=\"text-decoration-none text-reset\">[[user:change-username]]</a></li>\n") + 
      "\n" + 
      (guard((context != null) ? context['email:disableEdit'] : null) ?
        "" :
        "\n<li class=\"list-group-item\"><a href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null) ? context['userslug'] : null)) + 
          "/edit/email\" class=\"text-decoration-none text-reset\">[[user:change-email]]</a></li>\n") + 
      "\n" + 
      (guard((context != null) ? context['canChangePassword'] : null) ?
        "\n<li class=\"list-group-item\"><a href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null) ? context['userslug'] : null)) + 
          "/edit/password\" class=\"text-decoration-none text-reset\">[[user:change-password]]</a></li>\n" :
        "") + 
      "\n" + 
      compiled.blocks['editButtons'](helpers, context, guard, iter, helper) + 
      "\n</ul>\n" + 
      (guard((context != null && context['config'] != null) ? context['config']['requireEmailConfirmation'] : null) ?
        "\n" + 
          (guard((context != null) ? context['email'] : null) ?
            "\n" + 
              (guard((context != null) ? context['isSelf'] : null) ?
                "\n<a id=\"confirm-email\" href=\"#\" class=\"btn btn-warning " + 
                  (guard((context != null) ? context['email:confirmed'] : null) ?
                    "hide" :
                    "") + 
                  "\">[[user:confirm-email]]</a><br/><br/>\n" :
                "") + 
              "\n" :
            "") + 
          "\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['allowAccountDelete'] : null) ?
        "\n" + 
          (guard((context != null) ? context['isSelf'] : null) ?
            "\n<a id=\"deleteAccountBtn\" href=\"#\" class=\"btn btn-danger\">[[user:delete-account]]</a><br/><br/>\n" :
            "") + 
          "\n" :
        "") + 
      "\n</div>\n</div>\n<div class=\"" + 
      (guard((context != null && context['sso'] != null) ? context['sso']['length'] : null) ?
        "col-md-5 col-sm-4" :
        "col-md-9 col-sm-8") + 
      "\">\n<form role=\"form\" component=\"profile/edit/form\">\n<div class=\"mb-2\">\n<label class=\"form-label fw-bold\" for=\"fullname\">[[user:fullname]]</label>\n<input class=\"form-control\" type=\"text\" id=\"fullname\" name=\"fullname\" placeholder=\"[[user:fullname]]\" value=\"" + 
      __escape(guard((context != null) ? context['fullname'] : null)) + 
      "\">\n</div>\n<div class=\"mb-2\">\n<label class=\"form-label fw-bold\" for=\"birthday\">[[user:birthday]]</label>\n<input class=\"form-control\" type=\"date\" id=\"birthday\" name=\"birthday\" value=\"" + 
      __escape(guard((context != null) ? context['birthday'] : null)) + 
      "\" placeholder=\"mm/dd/yyyy\">\n</div>\n" + 
      compiled.blocks['customUserFields'](helpers, context, guard, iter, helper) + 
      "\n<div class=\"mb-2\">\n<label class=\"form-label fw-bold\" for=\"groupTitle\">[[user:grouptitle]]</label>\n<div class=\"d-flex flex-column gap-2\" component=\"group/badge/list\">\n" + 
      compiled.blocks['groups'](helpers, context, guard, iter, helper) + 
      "\n</div>\n</div>\n" + 
      (guard((context != null) ? context['allowAboutMe'] : null) ?
        "\n<div class=\"mb-2\">\n<label class=\"form-label fw-bold\" for=\"aboutme\">[[user:aboutme]]</label> <small><label id=\"aboutMeCharCountLeft\"></label></small>\n<textarea class=\"form-control\" id=\"aboutme\" name=\"aboutme\" rows=\"5\">" + 
          __escape(guard((context != null) ? context['aboutme'] : null)) + 
          "</textarea>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['allowSignature'] : null) ?
        "\n" + 
          (guard((context != null) ? context['disableSignatures'] : null) ?
            "" :
            "\n<div class=\"mb-2\">\n<label class=\"form-label fw-bold\" for=\"signature\">[[user:signature]]</label> <small><label id=\"signatureCharCountLeft\"></label></small>\n<textarea class=\"form-control\" id=\"signature\" name=\"signature\" rows=\"5\">" + 
              __escape(guard((context != null) ? context['signature'] : null)) + 
              "</textarea>\n</div>\n") + 
          "\n" :
        "") + 
      "\n<a id=\"submitBtn\" href=\"#\" class=\"btn btn-primary\">[[global:save-changes]]</a>\n</form>\n<hr class=\"visible-xs visible-sm\"/>\n</div>\n" + 
      (guard((context != null && context['sso'] != null) ? context['sso']['length'] : null) ?
        "\n<div class=\"col-md-4 col-sm-4\">\n<label>[[user:sso.title]]</label>\n<div class=\"list-group\">\n" + 
          compiled.blocks['sso'](helpers, context, guard, iter, helper) + 
          "\n</div>\n</div>\n" :
        "") + 
      "\n</div>\n" + 
      (guard((context != null && context['sso'] != null) ? context['sso']['length'] : null) ?
        "</div>" :
        "") + 
      "\n</div>";
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
    'editButtons': function editButtons(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['editButtons'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<li class=\"list-group-item\"><a href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          __escape(guard((context != null && context['editButtons'] != null && context['editButtons'][key0] != null) ? context['editButtons'][key0]['link'] : null)) + 
          "\" class=\"text-decoration-none text-reset\">" + 
          __escape(guard((context != null && context['editButtons'] != null && context['editButtons'][key0] != null) ? context['editButtons'][key0]['text'] : null)) + 
          "</a></li>\n";
      }, function alt() {
        return "";
      });
    },
    'customUserFields': function customUserFields(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['customUserFields'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<div class=\"mb-2\">\n<label class=\"form-label fw-bold\" for=\"" + 
          __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['key'] : null)) + 
          "\">" + 
          __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['name'] : null)) + 
          "</label>\n" + 
          (((guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['type'] : null) == "input-text") || (guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['type'] : null) == "input-link")) ?
            "\n<input class=\"form-control\" type=\"text\" id=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['key'] : null)) + 
              "\" name=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['key'] : null)) + 
              "\" value=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['value'] : null)) + 
              "\">\n" :
            "") + 
          "\n" + 
          ((guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['type'] : null) == "input-number") ?
            "\n<input class=\"form-control\" type=\"number\" id=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['key'] : null)) + 
              "\" name=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['key'] : null)) + 
              "\" value=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['value'] : null)) + 
              "\">\n" :
            "") + 
          "\n" + 
          ((guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['type'] : null) == "input-date") ?
            "\n<input class=\"form-control\" type=\"date\" id=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['key'] : null)) + 
              "\" name=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['key'] : null)) + 
              "\" value=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['value'] : null)) + 
              "\">\n" :
            "") + 
          "\n" + 
          (((guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['type'] : null) == "select") || (guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['type'] : null) == "select-multi")) ?
            "\n<select class=\"form-select\" id=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['key'] : null)) + 
              "\" name=\"" + 
              __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['key'] : null)) + 
              "\" " + 
              ((guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['type'] : null) == "select-multi") ?
                " multiple" :
                "") + 
              ">\n" + 
              iter(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null) ? context['customUserFields'][key0]['select-options'] : null), function each(key1, index, length, value) {
                var key = key1;
                return "\n<option value=\"" + 
                  __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null && context['customUserFields'][key0]['select-options'] != null && context['customUserFields'][key0]['select-options'][key1] != null) ? context['customUserFields'][key0]['select-options'][key1]['value'] : null)) + 
                  "\" " + 
                  (guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null && context['customUserFields'][key0]['select-options'] != null && context['customUserFields'][key0]['select-options'][key1] != null) ? context['customUserFields'][key0]['select-options'][key1]['selected'] : null) ?
                    "selected" :
                    "") + 
                  ">" + 
                  __escape(guard((context != null && context['customUserFields'] != null && context['customUserFields'][key0] != null && context['customUserFields'][key0]['select-options'] != null && context['customUserFields'][key0]['select-options'][key1] != null) ? context['customUserFields'][key0]['select-options'][key1]['value'] : null)) + 
                  "</option>\n";
              }, function alt() {
                return "";
              }) + 
              "\n</select>\n" :
            "") + 
          "\n</div>\n";
      }, function alt() {
        return "";
      });
    },
    'groups': function groups(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['groups'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<div component=\"group/badge/item\" class=\"d-flex gap-2 justify-content-between align-items-center\" data-value=\"" + 
          __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['displayName'] : null)) + 
          "\" data-selected=\"" + 
          __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['selected'] : null)) + 
          "\">\n<a href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/groups/" + 
          __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['slug'] : null)) + 
          "\" class=\"badge rounded-1 text-uppercase text-truncate\" style=\"max-width: 150px;color:" + 
          __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['textColor'] : null)) + 
          ";background-color: " + 
          __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['labelColor'] : null)) + 
          ";\"><i class=\"fa " + 
          (guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['icon'] : null) ?
            __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['icon'] : null)) + 
              (guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['userTitle'] : null) ?
                " me-1" :
                "") :
            "hidden") + 
          "\"></i><span class=\"badge-text\">" + 
          (guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['userTitle'] : null) ?
            __escape(guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['userTitle'] : null)) :
            "") + 
          "</span></a>\n<div class=\"d-flex gap-1\">\n<button component=\"group/toggle/hide\" type=\"button\" class=\"btn btn-ghost btn-sm " + 
          (guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['selected'] : null) ?
            "" :
            "hidden") + 
          "\" title=\"[[user:hide-group-title]]\"><i class=\"fa fa-fw fa-eye\"></i></button>\n<button component=\"group/toggle/show\" type=\"button\" class=\"btn btn-ghost btn-sm " + 
          (guard((context != null && context['groups'] != null && context['groups'][key0] != null) ? context['groups'][key0]['selected'] : null) ?
            "hidden" :
            "") + 
          "\" title=\"[[user:show-group-title]]\"><i class=\"fa fa-fw fa-eye-slash\"></i></button>\n" + 
          (guard((context != null) ? context['allowMultipleBadges'] : null) ?
            "\n<button component=\"group/order/up\" type=\"button\" class=\"btn btn-ghost btn-sm\" title=\"[[user:order-group-up]]\"><i class=\"fa fa-fw fa-chevron-up\"></i></button>\n<button component=\"group/order/down\" type=\"button\" class=\"btn btn-ghost btn-sm\" title=\"[[user:order-group-down]]\"><i class=\"fa fa-fw fa-chevron-down\"></i></button>\n" :
            "") + 
          "\n</div>\n</div>\n";
      }, function alt() {
        return "";
      });
    },
    'sso': function sso(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['sso'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<div class=\"list-group-item\">\n" + 
          (guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['deauthUrl'] : null) ?
            "\n<a data-component=\"" + 
              __escape(guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['component'] : null)) + 
              "\" class=\"btn btn-outline-secondary btn-sm float-end\" href=\"" + 
              __escape(guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['deauthUrl'] : null)) + 
              "\">[[user:sso.dissociate]]</a>\n" :
            "") + 
          "\n<a data-component=\"" + 
          __escape(guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['component'] : null)) + 
          "\" href=\"" + 
          (guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['url'] : null) ?
            __escape(guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['url'] : null)) :
            "#") + 
          "\" target=\"" + 
          (guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['associated'] : null) ?
            "_blank" :
            "_top") + 
          "\">\n" + 
          (guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['icon'] : null) ?
            "<i class=\"fa " + 
              __escape(guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['icon'] : null)) + 
              "\"></i>" :
            "") + 
          "\n" + 
          (guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['associated'] : null) ?
            "[[user:sso.associated]]" :
            "[[user:sso.not-associated]]") + 
          "\n" + 
          __escape(guard((context != null && context['sso'] != null && context['sso'][key0] != null) ? context['sso'][key0]['name'] : null)) + 
          "\n</a>\n</div>\n";
      }, function alt() {
        return "";
      });
    }
  };

  return compiled;
})
