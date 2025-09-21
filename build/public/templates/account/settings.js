
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
    return "<div class=\"account\">\n<div class=\"account\">\n" + 
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
      "\n</ul>\n</div>\n</div>\n</div>\n<div class=\"row\">\n<div class=\"col-12 col-md-6\">\n" + 
      (guard((context != null) ? context['disableCustomUserSkins'] : null) ?
        "" :
        "\n<h4>[[user:select-skin]]</h4>\n<div class=\"card card-body mb-3\">\n<select class=\"form-select\" id=\"bootswatchSkin\" data-property=\"bootswatchSkin\">\n" + 
          compiled.blocks['bootswatchSkinOptions'](helpers, context, guard, iter, helper) + 
          "\n</select>\n</div>\n") + 
      "\n" + 
      (guard((context != null) ? context['allowUserHomePage'] : null) ?
        "\n<h4>[[user:select-homepage]]</h4>\n<div class=\"card card-body mb-3\">\n<div class=\"mb-2\">\n<select class=\"form-select\" id=\"homePageRoute\" data-property=\"homePageRoute\">\n<option value=\"none\">None</option>\n" + 
          compiled.blocks['homePageRoutes'](helpers, context, guard, iter, helper) + 
          "\n</select>\n<p class=\"form-text mb-0\">[[user:homepage-description]]</p>\n</div>\n<div id=\"homePageCustomContainer\" class=\"mb-2\" style=\"display: none;\">\n<label for=\"homePageCustom\" class=\"form-label\">[[user:custom-route]]</label>\n<input type=\"text\" class=\"form-control\" data-property=\"homePageCustom\" id=\"homePageCustom\" value=\"" + 
          __escape(guard((context != null && context['settings'] != null) ? context['settings']['homePageRoute'] : null)) + 
          "\"/>\n<p class=\"form-text\">[[user:custom-route-help]]</p>\n</div>\n</div>\n" :
        "") + 
      "\n<h4>[[global:privacy]]</h4>\n<div class=\"card card-body mb-3\">\n" + 
      (guard((context != null) ? context['hideEmail'] : null) ?
        "" :
        "\n<div class=\"form-check mb-2\">\n<input id=\"showemail\" class=\"form-check-input\" type=\"checkbox\" data-property=\"showemail\" " + 
          (guard((context != null && context['settings'] != null) ? context['settings']['showemail'] : null) ?
            "checked " :
            "") + 
          "/>\n<label for=\"showemail\" class=\"form-check-label\">[[user:show-email]]</label>\n</div>\n") + 
      "\n" + 
      (guard((context != null) ? context['hideFullname'] : null) ?
        "" :
        "\n<div class=\"form-check mb-2\">\n<input id=\"showfullname\" class=\"form-check-input\" type=\"checkbox\" data-property=\"showfullname\" " + 
          (guard((context != null && context['settings'] != null) ? context['settings']['showfullname'] : null) ?
            "checked" :
            "") + 
          "/>\n<label for=\"showfullname\" class=\"form-check-label\">[[user:show-fullname]]</label>\n</div>\n") + 
      "\n" + 
      (guard((context != null && context['config'] != null) ? context['config']['disableChat'] : null) ?
        "" :
        "\n<div class=\"form-check mb-2\">\n<input id=\"disableIncomingMessages\" class=\"form-check-input\" type=\"checkbox\" data-property=\"disableIncomingMessages\" " + 
          (guard((context != null && context['settings'] != null) ? context['settings']['disableIncomingMessages'] : null) ?
            "checked" :
            "") + 
          "/>\n<label for=\"disableIncomingMessages\" class=\"form-check-label\">[[user:disable-incoming-chats]]</label>\n</div>\n<div class=\"d-flex flex-column mb-3\">\n<label class=\"form-label text-sm\" for=\"chatAllowListAdd\">[[user:chat-allow-list]]</label>\n<div component=\"chat/allow/list\" class=\"d-flex flex-wrap gap-2 mb-2\">\n" + 
          compiled.blocks['settings.chatAllowListUsers'](helpers, context, guard, iter, helper) + 
          "\n</div>\n<input type=\"text\" class=\"form-control form-control-sm\" id=\"chatAllowListAdd\" placeholder=\"[[user:chat-list-add-user]]\"/>\n</div>\n<div class=\"d-flex flex-column mb-3\">\n<label class=\"form-label text-sm\" for=\"chatAllowListAdd\">[[user:chat-deny-list]]</label>\n<div component=\"chat/deny/list\" class=\"d-flex flex-wrap gap-2 mb-2\">\n" + 
          compiled.blocks['settings.chatDenyListUsers'](helpers, context, guard, iter, helper) + 
          "\n</div>\n<input type=\"text\" class=\"form-control form-control-sm\" id=\"chatDenyListAdd\" placeholder=\"[[user:chat-list-add-user]]\"/>\n</div>\n") + 
      "\n</div>\n<h4>[[user:browsing]]</h4>\n<div class=\"card card-body mb-3\">\n<div class=\"form-check mb-2\">\n<input id=\"openOutgoingLinksInNewTab\" class=\"form-check-input\" type=\"checkbox\" data-property=\"openOutgoingLinksInNewTab\" " + 
      (guard((context != null && context['settings'] != null) ? context['settings']['openOutgoingLinksInNewTab'] : null) ?
        "checked" :
        "") + 
      "/>\n<label for=\"openOutgoingLinksInNewTab\" class=\"form-check-label\">[[user:open-links-in-new-tab]]</label>\n</div>\n" + 
      (guard((context != null) ? context['inTopicSearchAvailable'] : null) ?
        "\n<div class=\"form-check mb-2\">\n<input id=\"topicSearchEnabled\" class=\"form-check-input\" type=\"checkbox\" data-property=\"topicSearchEnabled\" " + 
          (guard((context != null && context['settings'] != null) ? context['settings']['topicSearchEnabled'] : null) ?
            "checked" :
            "") + 
          "/>\n<label for=\"topicSearchEnabled\" class=\"form-check-label\">[[user:enable-topic-searching]]</label>\n</div>\n<p class=\"form-text\">[[user:topic-search-help]]</p>\n" :
        "") + 
      "\n<div class=\"form-check mb-2\">\n<input id=\"updateUrlWithPostIndex\" class=\"form-check-input\" type=\"checkbox\" data-property=\"updateUrlWithPostIndex\" " + 
      (guard((context != null && context['settings'] != null) ? context['settings']['updateUrlWithPostIndex'] : null) ?
        "checked" :
        "") + 
      "/>\n<label for=\"updateUrlWithPostIndex\" class=\"form-check-label\">[[user:update-url-with-post-index]]</label>\n</div>\n<div class=\"form-check\">\n<input id=\"scrollToMyPost\" class=\"form-check-input\" type=\"checkbox\" data-property=\"scrollToMyPost\" " + 
      (guard((context != null && context['settings'] != null) ? context['settings']['scrollToMyPost'] : null) ?
        "checked" :
        "") + 
      "/>\n<label for=\"scrollToMyPost\" class=\"form-check-label\">[[user:scroll-to-my-post]]</label>\n</div>\n</div>\n<h4>[[global:pagination]]</h4>\n<div class=\"card card-body mb-3\">\n<div class=\"form-check mb-2\">\n<input id=\"usePagination\" type=\"checkbox\" class=\"form-check-input\" data-property=\"usePagination\" " + 
      (guard((context != null && context['settings'] != null) ? context['settings']['usePagination'] : null) ?
        "checked" :
        "") + 
      ">\n<label for=\"usePagination\" class=\"form-check-label\">[[user:paginate-description]]</label>\n</div>\n<div class=\"mb-3\">\n<label for=\"topicsPerPage\" class=\"form-label\">[[user:topics-per-page]] ([[user:max-items-per-page, " + 
      __escape(guard((context != null) ? context['maxTopicsPerPage'] : null)) + 
      "]])</label>\n<input id=\"topicsPerPage\" type=\"text\" class=\"form-control\" data-property=\"topicsPerPage\" value=\"" + 
      __escape(guard((context != null && context['settings'] != null) ? context['settings']['topicsPerPage'] : null)) + 
      "\">\n</div>\n<div>\n<label for=\"postsPerPage\" class=\"form-label\">[[user:posts-per-page]] ([[user:max-items-per-page, " + 
      __escape(guard((context != null) ? context['maxPostsPerPage'] : null)) + 
      "]])</label>\n<input id=\"postsPerPage\" type=\"text\" class=\"form-control\" data-property=\"postsPerPage\" value=\"" + 
      __escape(guard((context != null && context['settings'] != null) ? context['settings']['postsPerPage'] : null)) + 
      "\">\n</div>\n</div>\n<h4>[[global:sort]]</h4>\n<div class=\"card card-body mb-3\">\n<div class=\"mb-2\">\n<label for=\"categoryTopicSort\" class=\"form-label\">[[user:category-topic-sort]]</label>\n<select id=\"categoryTopicSort\" class=\"form-select\" data-property=\"categoryTopicSort\">\n<option value=\"recently_replied\" " + 
      ((guard((context != null && context['settings'] != null) ? context['settings']['categoryTopicSort'] : null) == "recently_replied") ?
        "selected" :
        "") + 
      ">[[topic:recently-replied]]</option>\n<option value=\"recently_created\" " + 
      ((guard((context != null && context['settings'] != null) ? context['settings']['categoryTopicSort'] : null) == "recently_created") ?
        "selected" :
        "") + 
      ">[[topic:recently-created]]</option>\n<option value=\"most_posts\" " + 
      ((guard((context != null && context['settings'] != null) ? context['settings']['categoryTopicSort'] : null) == "most_posts") ?
        "selected" :
        "") + 
      ">[[topic:most-posts]]</option>\n<option value=\"most_votes\" " + 
      ((guard((context != null && context['settings'] != null) ? context['settings']['categoryTopicSort'] : null) == "most_votes") ?
        "selected" :
        "") + 
      ">[[topic:most-votes]]</option>\n<option value=\"most_views\" " + 
      ((guard((context != null && context['settings'] != null) ? context['settings']['categoryTopicSort'] : null) == "most_views") ?
        "selected" :
        "") + 
      ">[[topic:most-views]]</option>\n</select>\n</div>\n<div>\n<label for=\"topicPostSort\" class=\"form-label\">[[user:topic-post-sort]]</label>\n<select id=\"topicPostSort\" class=\"form-select\" data-property=\"topicPostSort\">\n<option value=\"oldest_to_newest\" " + 
      ((guard((context != null && context['settings'] != null) ? context['settings']['topicPostSort'] : null) == "oldest_to_newest") ?
        "selected" :
        "") + 
      ">[[topic:oldest-to-newest]]</option>\n<option value=\"newest_to_oldest\" " + 
      ((guard((context != null && context['settings'] != null) ? context['settings']['topicPostSort'] : null) == "newest_to_oldest") ?
        "selected" :
        "") + 
      ">[[topic:newest-to-oldest]]</option>\n<option value=\"most_votes\" " + 
      ((guard((context != null && context['settings'] != null) ? context['settings']['topicPostSort'] : null) == "most_votes") ?
        "selected" :
        "") + 
      ">[[topic:most-votes]]</option>\n</select>\n</div>\n</div>\n" + 
      (guard((context != null) ? context['disableEmailSubscriptions'] : null) ?
        "" :
        "\n<h4>[[global:email]]</h4>\n<div class=\"card card-body mb-3\">\n<div class=\"mb-2\">\n<label class=\"form-label\" for=\"dailyDigestFreq\">[[user:digest-label]]</label>\n<select class=\"form-select\" id=\"dailyDigestFreq\" data-property=\"dailyDigestFreq\" autocomplete=\"off\">\n" + 
          compiled.blocks['dailyDigestFreqOptions'](helpers, context, guard, iter, helper) + 
          "\n</select>\n<p class=\"form-text\">[[user:digest-description]]</p>\n</div>\n</div>\n") + 
      "\n" + 
      compiled.blocks['customSettings'](helpers, context, guard, iter, helper) + 
      "\n</div>\n<div class=\"col-12 col-md-6\">\n<h4>[[global:language]]</h4>\n<div class=\"card card-body mb-3\">\n<select data-property=\"userLang\" class=\"form-select\">\n" + 
      compiled.blocks['languages'](helpers, context, guard, iter, helper) + 
      "\n</select>\n</div>\n" + 
      (guard((context != null) ? context['isAdmin'] : null) ?
        "\n" + 
          (guard((context != null) ? context['isSelf'] : null) ?
            "\n<h4>[[user:acp-language]]</h4>\n<div class=\"card card-body mb-3\">\n<select id=\"acpLang\" data-property=\"acpLang\" class=\"form-select\">\n" + 
              compiled.blocks['acpLanguages'](helpers, context, guard, iter, helper) + 
              "\n</select>\n</div>\n" :
            "") + 
          "\n" :
        "") + 
      "\n<h4>[[topic:watch]]</h4>\n<div class=\"card card-body mb-3\">\n<div class=\"form-check mb-2\">\n<input id=\"followTopicsOnCreate\" class=\"form-check-input\" type=\"checkbox\" data-property=\"followTopicsOnCreate\" " + 
      (guard((context != null && context['settings'] != null) ? context['settings']['followTopicsOnCreate'] : null) ?
        "checked " :
        "") + 
      "/>\n<label for=\"followTopicsOnCreate\" class=\"form-check-label\">[[user:follow-topics-you-create]]</label>\n</div>\n<div class=\"form-check mb-2\">\n<input id=\"followTopicsOnReply\" class=\"form-check-input\" type=\"checkbox\" data-property=\"followTopicsOnReply\" " + 
      (guard((context != null && context['settings'] != null) ? context['settings']['followTopicsOnReply'] : null) ?
        "checked" :
        "") + 
      "/>\n<label for=\"followTopicsOnReply\" class=\"form-check-label\">[[user:follow-topics-you-reply-to]]</label>\n</div>\n<div class=\"\">\n<label for=\"categoryWatchState\" class=\"form-label\">[[user:default-category-watch-state]]</label>\n<select id=\"categoryWatchState\" class=\"form-select\" data-property=\"categoryWatchState\">\n<option value=\"tracking\" " + 
      (guard((context != null && context['categoryWatchState'] != null) ? context['categoryWatchState']['tracking'] : null) ?
        "selected" :
        "") + 
      ">[[category:tracking]]</option>\n<option value=\"notwatching\" " + 
      (guard((context != null && context['categoryWatchState'] != null) ? context['categoryWatchState']['notwatching'] : null) ?
        "selected" :
        "") + 
      ">[[category:not-watching]]</option>\n<option value=\"ignoring\" " + 
      (guard((context != null && context['categoryWatchState'] != null) ? context['categoryWatchState']['ignoring'] : null) ?
        "selected" :
        "") + 
      ">[[category:ignoring]]</option>\n</select>\n</div>\n</div>\n<h4>[[user:notifications]]</h4>\n<div class=\"card card-body mb-3\">\n" + 
      compiled.blocks['notificationSettings'](helpers, context, guard, iter, helper) + 
      "\n<div class=\"row\">\n<div class=\"col-7\">\n<label for=\"upvote-notif-freq\">[[user:upvote-notif-freq]]</label>\n</div>\n<div class=\"mb-2 col-5\">\n<select class=\"form-select\" id=\"upvote-notif-freq\" name=\"upvote-notif-freq\" data-property=\"upvoteNotifFreq\">\n" + 
      compiled.blocks['upvoteNotifFreq'](helpers, context, guard, iter, helper) + 
      "\n</select>\n</div>\n</div>\n</div>\n</div>\n</div>\n<div class=\"form-actions\">\n<a id=\"submitBtn\" href=\"#\" class=\"btn btn-primary\">[[global:save-changes]]</a>\n</div>\n</div>";
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
    'bootswatchSkinOptions': function bootswatchSkinOptions(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['bootswatchSkinOptions'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<option value=\"" + 
          __escape(guard((context != null && context['bootswatchSkinOptions'] != null && context['bootswatchSkinOptions'][key0] != null) ? context['bootswatchSkinOptions'][key0]['value'] : null)) + 
          "\" " + 
          (guard((context != null && context['bootswatchSkinOptions'] != null && context['bootswatchSkinOptions'][key0] != null) ? context['bootswatchSkinOptions'][key0]['selected'] : null) ?
            "selected" :
            "") + 
          ">" + 
          __escape(guard((context != null && context['bootswatchSkinOptions'] != null && context['bootswatchSkinOptions'][key0] != null) ? context['bootswatchSkinOptions'][key0]['name'] : null)) + 
          "</option>\n";
      }, function alt() {
        return "";
      });
    },
    'homePageRoutes': function homePageRoutes(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['homePageRoutes'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<option value=\"" + 
          __escape(guard((context != null && context['homePageRoutes'] != null && context['homePageRoutes'][key0] != null) ? context['homePageRoutes'][key0]['route'] : null)) + 
          "\" " + 
          (guard((context != null && context['homePageRoutes'] != null && context['homePageRoutes'][key0] != null) ? context['homePageRoutes'][key0]['selected'] : null) ?
            "selected=\"1\"" :
            "") + 
          ">" + 
          __escape(guard((context != null && context['homePageRoutes'] != null && context['homePageRoutes'][key0] != null) ? context['homePageRoutes'][key0]['name'] : null)) + 
          "</option>\n";
      }, function alt() {
        return "";
      });
    },
    'settings.chatAllowListUsers': function settingschatAllowListUsers(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null && context['settings'] != null) ? context['settings']['chatAllowListUsers'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<div component=\"chat/allow/list/user\" data-uid=\"" + 
          __escape(guard((context != null && context['settings'] != null && context['settings']['chatAllowListUsers'] != null && context['settings']['chatAllowListUsers'][key0] != null) ? context['settings']['chatAllowListUsers'][key0]['uid'] : null)) + 
          "\" class=\"d-flex px-2 py-1 rounded-1 text-bg-light gap-2 align-items-center text-sm\">\n" + 
          __escape(helper(context, helpers, 'buildAvatar', [guard(value), "16px", guard((context != null) ? context['true'] : null)])) + 
          " " + 
          __escape(guard((context != null && context['settings'] != null && context['settings']['chatAllowListUsers'] != null && context['settings']['chatAllowListUsers'][key0] != null) ? context['settings']['chatAllowListUsers'][key0]['username'] : null)) + 
          "\n<button component=\"chat/allow/delete\" data-uid=\"" + 
          __escape(guard((context != null && context['settings'] != null && context['settings']['chatAllowListUsers'] != null && context['settings']['chatAllowListUsers'][key0] != null) ? context['settings']['chatAllowListUsers'][key0]['uid'] : null)) + 
          "\" class=\"btn btn-light btn-sm py-0\"><i class=\"fa fa-times fa-xs text-danger\"></i></button>\n</div>\n";
      }, function alt() {
        return "";
      });
    },
    'settings.chatDenyListUsers': function settingschatDenyListUsers(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null && context['settings'] != null) ? context['settings']['chatDenyListUsers'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<div component=\"chat/deny/list/user\" data-uid=\"" + 
          __escape(guard((context != null && context['settings'] != null && context['settings']['chatDenyListUsers'] != null && context['settings']['chatDenyListUsers'][key0] != null) ? context['settings']['chatDenyListUsers'][key0]['uid'] : null)) + 
          "\" class=\"d-flex px-2 py-1 rounded-1 text-bg-light gap-2 align-items-center text-sm\">\n" + 
          __escape(helper(context, helpers, 'buildAvatar', [guard(value), "16px", guard((context != null) ? context['true'] : null)])) + 
          " " + 
          __escape(guard((context != null && context['settings'] != null && context['settings']['chatDenyListUsers'] != null && context['settings']['chatDenyListUsers'][key0] != null) ? context['settings']['chatDenyListUsers'][key0]['username'] : null)) + 
          "\n<button component=\"chat/deny/delete\" data-uid=\"" + 
          __escape(guard((context != null && context['settings'] != null && context['settings']['chatDenyListUsers'] != null && context['settings']['chatDenyListUsers'][key0] != null) ? context['settings']['chatDenyListUsers'][key0]['uid'] : null)) + 
          "\" class=\"btn btn-light btn-sm py-0\"><i class=\"fa fa-times fa-xs text-danger\"></i></button>\n</div>\n";
      }, function alt() {
        return "";
      });
    },
    'dailyDigestFreqOptions': function dailyDigestFreqOptions(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['dailyDigestFreqOptions'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<option value=\"" + 
          __escape(guard((context != null && context['dailyDigestFreqOptions'] != null && context['dailyDigestFreqOptions'][key0] != null) ? context['dailyDigestFreqOptions'][key0]['value'] : null)) + 
          "\" " + 
          (guard((context != null && context['dailyDigestFreqOptions'] != null && context['dailyDigestFreqOptions'][key0] != null) ? context['dailyDigestFreqOptions'][key0]['selected'] : null) ?
            "selected=\"1\"" :
            "") + 
          ">" + 
          __escape(guard((context != null && context['dailyDigestFreqOptions'] != null && context['dailyDigestFreqOptions'][key0] != null) ? context['dailyDigestFreqOptions'][key0]['name'] : null)) + 
          "</option>\n";
      }, function alt() {
        return "";
      });
    },
    'customSettings': function customSettings(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['customSettings'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<h4>" + 
          __escape(guard((context != null && context['customSettings'] != null && context['customSettings'][key0] != null) ? context['customSettings'][key0]['title'] : null)) + 
          "</h4>\n<div class=\"card card-body mb-3\">\n" + 
          __escape(guard((context != null && context['customSettings'] != null && context['customSettings'][key0] != null) ? context['customSettings'][key0]['content'] : null)) + 
          "\n</div>\n";
      }, function alt() {
        return "";
      });
    },
    'languages': function languages(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['languages'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<option value=\"" + 
          __escape(guard((context != null && context['languages'] != null && context['languages'][key0] != null) ? context['languages'][key0]['code'] : null)) + 
          "\" " + 
          (guard((context != null && context['languages'] != null && context['languages'][key0] != null) ? context['languages'][key0]['selected'] : null) ?
            "selected" :
            "") + 
          ">" + 
          __escape(guard((context != null && context['languages'] != null && context['languages'][key0] != null) ? context['languages'][key0]['name'] : null)) + 
          " (" + 
          __escape(guard((context != null && context['languages'] != null && context['languages'][key0] != null) ? context['languages'][key0]['code'] : null)) + 
          ")</option>\n";
      }, function alt() {
        return "";
      });
    },
    'acpLanguages': function acpLanguages(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['acpLanguages'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<option value=\"" + 
          __escape(guard((context != null && context['acpLanguages'] != null && context['acpLanguages'][key0] != null) ? context['acpLanguages'][key0]['code'] : null)) + 
          "\" " + 
          (guard((context != null && context['acpLanguages'] != null && context['acpLanguages'][key0] != null) ? context['acpLanguages'][key0]['selected'] : null) ?
            "selected" :
            "") + 
          ">" + 
          __escape(guard((context != null && context['acpLanguages'] != null && context['acpLanguages'][key0] != null) ? context['acpLanguages'][key0]['name'] : null)) + 
          " (" + 
          __escape(guard((context != null && context['acpLanguages'] != null && context['acpLanguages'][key0] != null) ? context['acpLanguages'][key0]['code'] : null)) + 
          ")</option>\n";
      }, function alt() {
        return "";
      });
    },
    'notificationSettings': function notificationSettings(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['notificationSettings'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<div class=\"row mb-3\">\n<div class=\"col-7\">\n<label for=\"" + 
          __escape(guard((context != null && context['notificationSettings'] != null && context['notificationSettings'][key0] != null) ? context['notificationSettings'][key0]['name'] : null)) + 
          "\">" + 
          __escape(guard((context != null && context['notificationSettings'] != null && context['notificationSettings'][key0] != null) ? context['notificationSettings'][key0]['label'] : null)) + 
          "</label>\n</div>\n<div class=\"mb-2 col-5\">\n<select class=\"form-select\" id=\"" + 
          __escape(guard((context != null && context['notificationSettings'] != null && context['notificationSettings'][key0] != null) ? context['notificationSettings'][key0]['name'] : null)) + 
          "\" data-property=\"" + 
          __escape(guard((context != null && context['notificationSettings'] != null && context['notificationSettings'][key0] != null) ? context['notificationSettings'][key0]['name'] : null)) + 
          "\">\n<option value=\"none\" " + 
          (guard((context != null && context['notificationSettings'] != null && context['notificationSettings'][key0] != null) ? context['notificationSettings'][key0]['none'] : null) ?
            "selected" :
            "") + 
          ">[[notifications:none]]</option>\n<option value=\"notification\" " + 
          (guard((context != null && context['notificationSettings'] != null && context['notificationSettings'][key0] != null) ? context['notificationSettings'][key0]['notification'] : null) ?
            "selected" :
            "") + 
          ">[[notifications:notification-only]]</option>\n<option value=\"email\" " + 
          (guard((context != null && context['notificationSettings'] != null && context['notificationSettings'][key0] != null) ? context['notificationSettings'][key0]['email'] : null) ?
            "selected" :
            "") + 
          ">[[notifications:email-only]]</option>\n<option value=\"notificationemail\" " + 
          (guard((context != null && context['notificationSettings'] != null && context['notificationSettings'][key0] != null) ? context['notificationSettings'][key0]['notificationemail'] : null) ?
            "selected" :
            "") + 
          ">[[notifications:notification-and-email]]</option>\n</select>\n</div>\n</div>\n";
      }, function alt() {
        return "";
      });
    },
    'upvoteNotifFreq': function upvoteNotifFreq(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['upvoteNotifFreq'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<option value=\"" + 
          __escape(guard((context != null && context['upvoteNotifFreq'] != null && context['upvoteNotifFreq'][key0] != null) ? context['upvoteNotifFreq'][key0]['name'] : null)) + 
          "\" " + 
          (guard((context != null && context['upvoteNotifFreq'] != null && context['upvoteNotifFreq'][key0] != null) ? context['upvoteNotifFreq'][key0]['selected'] : null) ?
            "selected" :
            "") + 
          ">\n[[user:upvote-notif-freq." + 
          __escape(guard((context != null && context['upvoteNotifFreq'] != null && context['upvoteNotifFreq'][key0] != null) ? context['upvoteNotifFreq'][key0]['name'] : null)) + 
          "]]\n</option>\n";
      }, function alt() {
        return "";
      });
    }
  };

  return compiled;
})
