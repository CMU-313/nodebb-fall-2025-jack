
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
    return ((!guard((context != null) ? context['index'] : null) && guard((context != null && context['widgets'] != null && context['widgets']['mainpost-header'] != null) ? context['widgets']['mainpost-header']['length'] : null)) ?
        "\n<div data-widget-area=\"mainpost-header\">\n" + 
          compiled.blocks['widgets.mainpost-header'](helpers, context, guard, iter, helper) + 
          "\n</div>\n" :
        "") + 
      "\n<div class=\"clearfix post-header\">\n<div class=\"icon float-start\">\n<a href=\"" + 
      (guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['userslug'] : null) ?
        __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['userslug'] : null)) :
        "#") + 
      "\">\n" + 
      __escape(helper(context, helpers, 'buildAvatar', [guard((context != null && context['posts'] != null) ? context['posts']['user'] : null), "48px", guard((context != null) ? context['true'] : null), "", "user/picture"])) + 
      "\n" + 
      (guard((context != null && context['user'] != null) ? context['user']['isLocal'] : null) ?
        "\n<span component=\"user/status\" class=\"position-absolute top-100 start-100 border border-white border-2 rounded-circle status " + 
          __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['status'] : null)) + 
          "\"><span class=\"visually-hidden\">[[global:" + 
          __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['status'] : null)) + 
          "]]</span></span>\n" :
        "\n<span component=\"user/locality\" class=\"position-absolute top-100 start-100 lh-1 border border-white border-2 rounded-circle small\" title=\"[[global:remote-user]]\">\n<span class=\"visually-hidden\">[[global:remote-user]]</span>\n<i class=\"fa fa-globe\"></i>\n</span>\n") + 
      "\n</a>\n</div>\n<small class=\"d-flex\">\n<div class=\"d-flex align-items-center gap-1 flex-wrap w-100\">\n<strong class=\"text-nowrap\" itemprop=\"author\" itemscope itemtype=\"https://schema.org/Person\">\n<meta itemprop=\"name\" content=\"" + 
      __escape(guard((context != null && context['user'] != null) ? context['user']['username'] : null)) + 
      "\">\n" + 
      (guard((context != null && context['user'] != null) ? context['user']['userslug'] : null) ?
        "<meta itemprop=\"url\" content=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null && context['user'] != null) ? context['user']['userslug'] : null)) + 
          "\">" :
        "") + 
      "\n<a href=\"" + 
      (guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['userslug'] : null) ?
        __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/user/" + 
          __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['userslug'] : null)) :
        "#") + 
      "\" data-username=\"" + 
      __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['username'] : null)) + 
      "\" data-uid=\"" + 
      __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['uid'] : null)) + 
      "\">" + 
      __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['displayname'] : null)) + 
      "</a>\n</strong>\n" + 
      compiled.blocks['posts.user.selectedGroups'](helpers, context, guard, iter, helper) + 
      "\n" + 
      (guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['banned'] : null) ?
        "\n<span class=\"badge bg-danger\">[[user:banned]]</span>\n" :
        "") + 
      "\n<span class=\"visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block\">\n" + 
      (guard((context != null && context['posts'] != null) ? context['posts']['toPid'] : null) ?
        "\n<a component=\"post/parent\" class=\"btn btn-sm btn-ghost py-0 px-1 text-xs hidden-xs\" data-topid=\"" + 
          __escape(guard((context != null && context['posts'] != null) ? context['posts']['toPid'] : null)) + 
          "\" href=\"" + 
          __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
          "/post/" + 
          __escape(helper(context, helpers, 'encodeURIComponent', [guard((context != null && context['posts'] != null) ? context['posts']['toPid'] : null)])) + 
          "\"><i class=\"fa fa-reply\"></i> @" + 
          (guard((context != null && context['posts'] != null && context['posts']['parent'] != null && context['posts']['parent']['user'] != null) ? context['posts']['parent']['user']['userslug'] : null) ?
            __escape(guard((context != null && context['posts'] != null && context['posts']['parent'] != null && context['posts']['parent']['user'] != null) ? context['posts']['parent']['user']['username'] : null)) :
            "[[global:guest]]") + 
          "</a>\n" :
        "") + 
      "\n<span>\n" + 
      (guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['custom_profile_info'] != null) ? context['posts']['user']['custom_profile_info']['length'] : null) ?
        "\n&#124;\n" + 
          compiled.blocks['posts.user.custom_profile_info'](helpers, context, guard, iter, helper) + 
          "\n" :
        "") + 
      "\n</span>\n</span>\n<div class=\"d-flex align-items-center gap-1 flex-grow-1 justify-content-end\">\n<span>\n<i component=\"post/edit-indicator\" class=\"fa fa-pencil-square" + 
      (guard((context != null && context['privileges'] != null) ? context['privileges']['posts:history'] : null) ?
        " pointer" :
        "") + 
      " edit-icon " + 
      (guard((context != null && context['posts'] != null && context['posts']['editor'] != null) ? context['posts']['editor']['username'] : null) ?
        "" :
        "hidden") + 
      "\"></i>\n<span data-editor=\"" + 
      __escape(guard((context != null && context['posts'] != null && context['posts']['editor'] != null) ? context['posts']['editor']['userslug'] : null)) + 
      "\" component=\"post/editor\" class=\"hidden\">[[global:last-edited-by, " + 
      __escape(guard((context != null && context['posts'] != null && context['posts']['editor'] != null) ? context['posts']['editor']['username'] : null)) + 
      "]] <span class=\"timeago\" title=\"" + 
      __escape(helper(context, helpers, 'isoTimeToLocaleString', [guard((context != null && context['posts'] != null) ? context['posts']['editedISO'] : null), guard((context != null && context['config'] != null) ? context['config']['userLang'] : null)])) + 
      "\"></span></span>\n<span class=\"visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block\">\n<a class=\"permalink text-muted\" href=\"" + 
      __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
      "/post/" + 
      __escape(helper(context, helpers, 'encodeURIComponent', [guard((context != null && context['posts'] != null) ? context['posts']['pid'] : null)])) + 
      "\"><span class=\"timeago\" title=\"" + 
      __escape(guard((context != null && context['posts'] != null) ? context['posts']['timestampISO'] : null)) + 
      "\"></span></a>\n</span>\n</span>\n<span class=\"bookmarked\"><i class=\"fa fa-bookmark-o\"></i></span>\n</div>\n</div>\n</small>\n</div>\n<br />\n<div class=\"content\" component=\"post/content\" itemprop=\"text\">\n" + 
      __escape(guard((context != null && context['posts'] != null) ? context['posts']['content'] : null)) + 
      "\n</div>\n<div class=\"post-footer\">\n" + 
      (guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['signature'] : null) ?
        "\n<div component=\"post/signature\" data-uid=\"" + 
          __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['uid'] : null)) + 
          "\" class=\"post-signature\">" + 
          __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['signature'] : null)) + 
          "</div>\n" :
        "") + 
      "\n<div class=\"clearfix\">\n" + 
      (guard((context != null) ? context['hideReplies'] : null) ?
        "" :
        "\n<a component=\"post/reply-count\" data-target-component=\"post/replies/container\" href=\"#\" class=\"threaded-replies user-select-none float-start text-muted " + 
          ((!guard((context != null) ? context['replies'] : null) || helper(context, helpers, 'shouldHideReplyContainer', [guard(value)])) ?
            "hidden" :
            "") + 
          "\">\n<span component=\"post/reply-count/avatars\" class=\"avatars d-inline-flex gap-1 align-items-top hidden-xs " + 
          (guard((context != null && context['posts'] != null && context['posts']['replies'] != null) ? context['posts']['replies']['hasMore'] : null) ?
            "hasMore" :
            "") + 
          "\">\n" + 
          compiled.blocks['posts.replies.users'](helpers, context, guard, iter, helper) + 
          "\n" + 
          (guard((context != null && context['posts'] != null && context['posts']['replies'] != null) ? context['posts']['replies']['hasMore'] : null) ?
            "\n<span><i class=\"fa fa-ellipsis\"></i></span>\n" :
            "") + 
          "\n</span>\n<span class=\"replies-count small\" component=\"post/reply-count/text\" data-replies=\"" + 
          __escape(guard((context != null && context['posts'] != null && context['posts']['replies'] != null) ? context['posts']['replies']['count'] : null)) + 
          "\">" + 
          __escape(guard((context != null && context['posts'] != null && context['posts']['replies'] != null) ? context['posts']['replies']['text'] : null)) + 
          "</span>\n<span class=\"replies-last hidden-xs small\">[[topic:last-reply-time]] <span class=\"timeago\" title=\"" + 
          __escape(guard((context != null && context['posts'] != null && context['posts']['replies'] != null) ? context['posts']['replies']['timestampISO'] : null)) + 
          "\"></span></span>\n<i class=\"fa fa-fw fa-chevron-down\" component=\"post/replies/open\"></i>\n</a>\n") + 
      "\n<small class=\"d-flex justify-content-end align-items-center gap-1\" component=\"post/actions\">\n<!-- This partial intentionally left blank; overwritten by nodebb-plugin-reactions -->\n<span class=\"post-tools\">\n<a component=\"post/reply\" href=\"#\" class=\"btn btn-sm btn-link user-select-none " + 
      (guard((context != null && context['privileges'] != null) ? context['privileges']['topics:reply'] : null) ?
        "" :
        "hidden") + 
      "\">[[topic:reply]]</a>\n<a component=\"post/quote\" href=\"#\" class=\"btn btn-sm btn-link user-select-none " + 
      (guard((context != null && context['privileges'] != null) ? context['privileges']['topics:reply'] : null) ?
        "" :
        "hidden") + 
      "\">[[topic:quote]]</a>\n</span>\n" + 
      (guard((context != null) ? context['announces'] : null) ?
        "\n<a component=\"post/announce-count\" href=\"#\" class=\"btn-ghost-sm\" title=\"[[topic:announcers]]\"><i class=\"fa fa-share-alt text-primary\"></i> " + 
          __escape(guard((context != null) ? context['announces'] : null)) + 
          "</a>\n" :
        "") + 
      "\n" + 
      (guard((context != null) ? context['reputation:disabled'] : null) ?
        "" :
        "\n<span class=\"votes\">\n<a component=\"post/upvote\" href=\"#\" class=\"btn btn-sm btn-link " + 
          (guard((context != null && context['posts'] != null) ? context['posts']['upvoted'] : null) ?
            "upvoted" :
            "") + 
          "\">\n<i class=\"fa fa-chevron-up\"></i>\n</a>\n<span class=\"btn btn-sm btn-link\" component=\"post/vote-count\" data-votes=\"" + 
          __escape(guard((context != null && context['posts'] != null) ? context['posts']['votes'] : null)) + 
          "\">" + 
          __escape(guard((context != null && context['posts'] != null) ? context['posts']['votes'] : null)) + 
          "</span>\n" + 
          (guard((context != null) ? context['downvote:disabled'] : null) ?
            "" :
            "\n<a component=\"post/downvote\" href=\"#\" class=\"btn btn-sm btn-link " + 
              (guard((context != null && context['posts'] != null) ? context['posts']['downvoted'] : null) ?
                "downvoted" :
                "") + 
              "\">\n<i class=\"fa fa-chevron-down\"></i>\n</a>\n") + 
          "\n</span>\n") + 
      "\n<span component=\"post/tools\" class=\"dropdown bottom-sheet d-inline-block " + 
      (guard((context != null && context['posts'] != null) ? context['posts']['display_post_menu'] : null) ?
        "" :
        "hidden") + 
      "\">\n<a class=\"btn btn-link btn-sm dropdown-toggle\" href=\"#\" data-bs-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><i class=\"fa fa-fw fa-ellipsis-v\"></i></a>\n<ul class=\"dropdown-menu dropdown-menu-end p-1 text-sm\" role=\"menu\"></ul>\n</span>\n</small>\n</div>\n<div component=\"post/replies/container\"></div>\n</div>\n" + 
      ((!guard((context != null) ? context['index'] : null) && guard((context != null && context['widgets'] != null && context['widgets']['mainpost-footer'] != null) ? context['widgets']['mainpost-footer']['length'] : null)) ?
        "\n<div data-widget-area=\"mainpost-footer\">\n" + 
          compiled.blocks['widgets.mainpost-footer'](helpers, context, guard, iter, helper) + 
          "\n</div>\n" :
        "");
  }

  compiled.blocks = {
    'widgets.mainpost-header': function widgetsmainpostheader(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null && context['widgets'] != null) ? context['widgets']['mainpost-header'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          __escape(guard((context != null && context['widgets'] != null && context['widgets']['mainpost-header'] != null && context['widgets']['mainpost-header'][key0] != null) ? context['widgets']['mainpost-header'][key0]['html'] : null)) + 
          "\n";
      }, function alt() {
        return "";
      });
    },
    'posts.user.selectedGroups': function postsuserselectedGroups(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['selectedGroups'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          (guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['selectedGroups'] != null && context['posts']['user']['selectedGroups'][key0] != null) ? context['posts']['user']['selectedGroups'][key0]['slug'] : null) ?
            "\n<a href=\"" + 
              __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
              "/groups/" + 
              __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['selectedGroups'] != null && context['posts']['user']['selectedGroups'][key0] != null) ? context['posts']['user']['selectedGroups'][key0]['slug'] : null)) + 
              "\" class=\"badge rounded-1 text-uppercase text-truncate\" style=\"max-width: 150px;color:" + 
              __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['selectedGroups'] != null && context['posts']['user']['selectedGroups'][key0] != null) ? context['posts']['user']['selectedGroups'][key0]['textColor'] : null)) + 
              ";background-color: " + 
              __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['selectedGroups'] != null && context['posts']['user']['selectedGroups'][key0] != null) ? context['posts']['user']['selectedGroups'][key0]['labelColor'] : null)) + 
              ";\"><i class=\"fa " + 
              (guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['selectedGroups'] != null && context['posts']['user']['selectedGroups'][key0] != null) ? context['posts']['user']['selectedGroups'][key0]['icon'] : null) ?
                __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['selectedGroups'] != null && context['posts']['user']['selectedGroups'][key0] != null) ? context['posts']['user']['selectedGroups'][key0]['icon'] : null)) + 
                  (guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['selectedGroups'] != null && context['posts']['user']['selectedGroups'][key0] != null) ? context['posts']['user']['selectedGroups'][key0]['userTitle'] : null) ?
                    " me-1" :
                    "") :
                "hidden") + 
              "\"></i><span class=\"badge-text\">" + 
              (guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['selectedGroups'] != null && context['posts']['user']['selectedGroups'][key0] != null) ? context['posts']['user']['selectedGroups'][key0]['userTitle'] : null) ?
                __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['selectedGroups'] != null && context['posts']['user']['selectedGroups'][key0] != null) ? context['posts']['user']['selectedGroups'][key0]['userTitle'] : null)) :
                "") + 
              "</span></a>\n" :
            "") + 
          "\n";
      }, function alt() {
        return "";
      });
    },
    'posts.user.custom_profile_info': function postsusercustom_profile_info(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null && context['posts'] != null && context['posts']['user'] != null) ? context['posts']['user']['custom_profile_info'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          __escape(guard((context != null && context['posts'] != null && context['posts']['user'] != null && context['posts']['user']['custom_profile_info'] != null && context['posts']['user']['custom_profile_info'][key0] != null) ? context['posts']['user']['custom_profile_info'][key0]['content'] : null)) + 
          "\n";
      }, function alt() {
        return "";
      });
    },
    'posts.replies.users': function postsrepliesusers(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null && context['posts'] != null && context['posts']['replies'] != null) ? context['posts']['replies']['users'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n<span>" + 
          __escape(helper(context, helpers, 'buildAvatar', [guard((context != null && context['posts'] != null && context['posts']['replies'] != null && context['posts']['replies']['users'] != null) ? context['posts']['replies']['users'][key0] : null), "16px", guard((context != null) ? context['true'] : null), ""])) + 
          "</span>\n";
      }, function alt() {
        return "";
      });
    },
    'widgets.mainpost-footer': function widgetsmainpostfooter(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null && context['widgets'] != null) ? context['widgets']['mainpost-footer'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          __escape(guard((context != null && context['widgets'] != null && context['widgets']['mainpost-footer'] != null && context['widgets']['mainpost-footer'][key0] != null) ? context['widgets']['mainpost-footer'][key0]['html'] : null)) + 
          "\n";
      }, function alt() {
        return "";
      });
    }
  };

  return compiled;
})
