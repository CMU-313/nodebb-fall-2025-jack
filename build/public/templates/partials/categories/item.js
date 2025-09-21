
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
    return "<li component=\"categories/category\" data-cid=\"" + 
      __escape(guard((context != null) ? context['cid'] : null)) + 
      "\" class=\"w-100 py-2 mb-2 gap-lg-0 gap-2 d-flex flex-column flex-md-row align-items-start " + 
      (index === length - 1 ?
        "" :
        "border-bottom") + 
      " border-bottom-lg-0 category-" + 
      __escape(guard((context != null) ? context['cid'] : null)) + 
      " " + 
      __escape(guard((context != null) ? context['unread-class'] : null)) + 
      "\">\n<meta itemprop=\"name\" content=\"" + 
      __escape(guard((context != null) ? context['name'] : null)) + 
      "\">\n<div class=\"d-flex col-md-7 gap-2 gap-lg-3\">\n<div class=\"flex-shrink-0\">\n" + 
      __escape(helper(context, helpers, 'buildCategoryIcon', [guard(value), "48px", "rounded-circle"])) + 
      "\n</div>\n<div class=\"flex-grow-1 d-flex flex-wrap gap-1\">\n<h2 class=\"title text-break fs-4 fw-semibold m-0 tracking-tight w-100\">\n" + 
      (guard((context != null) ? context['isSection'] : null) ?
        "\n" + 
          __escape(guard((context != null) ? context['name'] : null)) + 
          "\n" :
        "\n" + 
          (guard((context != null) ? context['link'] : null) ?
            "\n<a href=\"" + 
              __escape(guard((context != null) ? context['link'] : null)) + 
              "\" itemprop=\"url\">\n" :
            "\n<a href=\"" + 
              __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
              "/category/" + 
              __escape(guard((context != null) ? context['slug'] : null)) + 
              "\" itemprop=\"url\">\n") + 
          "\n" + 
          __escape(guard((context != null) ? context['name'] : null)) + 
          "\n</a>\n") + 
      "\n</h2>\n" + 
      (guard((context != null) ? context['descriptionParsed'] : null) ?
        "\n<div class=\"description text-muted text-sm w-100 line-clamp-sm-5\">\n" + 
          __escape(guard((context != null) ? context['descriptionParsed'] : null)) + 
          "\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null && context['teaser'] != null) ? context['teaser']['timestampISO'] : null) ?
        "\n<div class=\"d-block d-md-none\">\n<a class=\"permalink timeago text-muted\" title=\"" + 
          __escape(guard((context != null && context['teaser'] != null) ? context['teaser']['timestampISO'] : null)) + 
          "\" href=\"" + 
          __escape(guard((context != null && context['teaser'] != null) ? context['teaser']['url'] : null)) + 
          "\">\n</a>\n</div>\n" :
        "") + 
      "\n" + 
      (guard((context != null && context['config'] != null) ? context['config']['hideSubCategories'] : null) ?
        "" :
        "\n" + 
          (guard((context != null && context['children'] != null) ? context['children']['length'] : null) ?
            "\n<ul class=\"list-unstyled category-children row row-cols-1 row-cols-md-2 g-2 my-1 w-100\">\n" + 
              compiled.blocks['./children'](helpers, context, guard, iter, helper) + 
              "\n</ul>\n" :
            "") + 
          "\n") + 
      "\n</div>\n</div>\n" + 
      (guard((context != null) ? context['link'] : null) ?
        "" :
        "\n<div class=\"d-flex col-md-5 col-12 align-content-stretch\">\n<div class=\"meta stats d-none d-lg-grid col-6 gap-1 pe-2 text-muted\" style=\"grid-template-columns: 1fr 1fr;\">\n<div class=\"overflow-hidden rounded-1 d-flex flex-column align-items-center\">\n<span class=\"fs-4\" title=\"" + 
          __escape(guard((context != null) ? context['totalTopicCount'] : null)) + 
          "\">" + 
          __escape(helper(context, helpers, 'humanReadableNumber', [guard((context != null) ? context['totalTopicCount'] : null), guard((context != null) ? context['0'] : null)])) + 
          "</span>\n<span class=\"text-uppercase text-xs\">[[global:topics]]</span>\n</div>\n<div class=\"overflow-hidden rounded-1 d-flex flex-column align-items-center\">\n<span class=\"fs-4\" title=\"" + 
          __escape(guard((context != null) ? context['totalPostCount'] : null)) + 
          "\">" + 
          __escape(helper(context, helpers, 'humanReadableNumber', [guard((context != null) ? context['totalPostCount'] : null), guard((context != null) ? context['0'] : null)])) + 
          "</span>\n<span class=\"text-uppercase text-xs\">[[global:posts]]</span>\n</div>\n</div>\n" + 
          (guard((context != null && context['config'] != null) ? context['config']['hideCategoryLastPost'] : null) ?
            "" :
            "\n<div component=\"topic/teaser\" class=\"teaser col-md-6 col-12 d-none d-md-block\">\n<div class=\"lastpost border-start border-4 lh-sm h-100\" style=\"border-color: " + 
              __escape(guard((context != null) ? context['bgColor'] : null)) + 
              "!important;\">\n" + 
              compiled.blocks['./posts'](helpers, context, guard, iter, helper) + 
              "\n" + 
              (guard((context != null && context['posts'] != null) ? context['posts']['length'] : null) ?
                "" :
                "\n<div component=\"category/posts\" class=\"ps-2\">\n<div class=\"post-content overflow-hidden text-xs\">\n[[category:no-new-posts]]\n</div>\n</div>\n") + 
              "\n</div>\n</div>\n") + 
          "\n</div>\n") + 
      "\n</li>";
  }

  compiled.blocks = {
    './children': function children(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['children'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          (guard((context != null && context['children'] != null && context['children'][key0] != null) ? context['children'][key0]['isSection'] : null) ?
            "" :
            "\n<li class=\"category-children-item small d-flex gap-1 align-items-center\">\n" + 
              __escape(helper(context, helpers, 'buildCategoryIcon', [guard(value), "24px", "rounded-circle"])) + 
              "\n<a href=\"" + 
              (guard((context != null && context['children'] != null && context['children'][key0] != null) ? context['children'][key0]['link'] : null) ?
                __escape(guard((context != null && context['children'] != null && context['children'][key0] != null) ? context['children'][key0]['link'] : null)) :
                __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
                  "/category/" + 
                  __escape(guard((context != null && context['children'] != null && context['children'][key0] != null) ? context['children'][key0]['slug'] : null))) + 
              "\" class=\"text-reset\">" + 
              __escape(guard((context != null && context['children'] != null && context['children'][key0] != null) ? context['children'][key0]['name'] : null)) + 
              "</a>\n</li>\n") + 
          "\n";
      }, function alt() {
        return "";
      });
    },
    './posts': function posts(helpers, context, guard, iter, helper) {
      var __escape = helpers.__escape;
      var value = context;
      return iter(guard((context != null) ? context['posts'] : null), function each(key0, index, length, value) {
        var key = key0;
        return "\n" + 
          (index === 0 ?
            "\n<div component=\"category/posts\" class=\"ps-2 text-xs d-flex flex-column h-100 gap-1\">\n<div class=\"text-nowrap text-truncate\">\n<a class=\"text-decoration-none avatar-tooltip\" title=\"" + 
              __escape(guard((context != null && context['posts'] != null && context['posts'][key0] != null && context['posts'][key0]['user'] != null) ? context['posts'][key0]['user']['displayname'] : null)) + 
              "\" href=\"" + 
              __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
              "/user/" + 
              __escape(guard((context != null && context['posts'] != null && context['posts'][key0] != null && context['posts'][key0]['user'] != null) ? context['posts'][key0]['user']['userslug'] : null)) + 
              "\">" + 
              __escape(helper(context, helpers, 'buildAvatar', [guard((context != null && context['posts'] != null && context['posts'][key0] != null) ? context['posts'][key0]['user'] : null), "18px", guard((context != null) ? context['true'] : null)])) + 
              "</a>\n<a class=\"permalink text-muted timeago text-xs\" href=\"" + 
              __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
              "/topic/" + 
              __escape(guard((context != null && context['posts'] != null && context['posts'][key0] != null && context['posts'][key0]['topic'] != null) ? context['posts'][key0]['topic']['slug'] : null)) + 
              (guard((context != null && context['posts'] != null && context['posts'][key0] != null) ? context['posts'][key0]['index'] : null) ?
                "/" + 
                  __escape(guard((context != null && context['posts'] != null && context['posts'][key0] != null) ? context['posts'][key0]['index'] : null)) :
                "") + 
              "\" title=\"" + 
              __escape(guard((context != null && context['posts'] != null && context['posts'][key0] != null) ? context['posts'][key0]['timestampISO'] : null)) + 
              "\" aria-label=\"[[global:lastpost]]\"></a>\n</div>\n<div class=\"post-content text-xs text-break line-clamp-sm-2 lh-sm position-relative flex-fill\">\n<a class=\"stretched-link\" tabindex=\"-1\" href=\"" + 
              __escape(guard((context != null && context['config'] != null) ? context['config']['relative_path'] : null)) + 
              "/topic/" + 
              __escape(guard((context != null && context['posts'] != null && context['posts'][key0] != null && context['posts'][key0]['topic'] != null) ? context['posts'][key0]['topic']['slug'] : null)) + 
              (guard((context != null && context['posts'] != null && context['posts'][key0] != null) ? context['posts'][key0]['index'] : null) ?
                "/" + 
                  __escape(guard((context != null && context['posts'] != null && context['posts'][key0] != null) ? context['posts'][key0]['index'] : null)) :
                "") + 
              "\" aria-label=\"[[global:lastpost]]\"></a>\n" + 
              __escape(guard((context != null && context['posts'] != null && context['posts'][key0] != null) ? context['posts'][key0]['content'] : null)) + 
              "\n</div>\n</div>\n" :
            "") + 
          "\n";
      }, function alt() {
        return "";
      });
    }
  };

  return compiled;
})
