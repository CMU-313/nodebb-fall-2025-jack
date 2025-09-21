<!-- IF breadcrumbs.length -->
<ol class="breadcrumb" itemscope="itemscope" itemprop="breadcrumb" itemtype="http://schema.org/BreadcrumbList">
{{{each breadcrumbs}}}
<li<!-- IF @last --> component="breadcrumb/current"<!-- ENDIF @last --> itemscope="itemscope" itemprop="itemListElement" itemtype="http://schema.org/ListItem" class="breadcrumb-item <!-- IF @last -->active<!-- ENDIF @last -->">
<meta itemprop="position" content="{@index}" />
{{{ if ./url }}}<a href="{breadcrumbs.url}" itemprop="item">{{{ end }}}
<span itemprop="name">
{breadcrumbs.text}
<!-- IF @last -->
<!-- IF !feeds:disableRSS -->
<!-- IF rssFeedUrl --><a target="_blank" href="{rssFeedUrl}" itemprop="item"><i class="fa fa-rss-square"></i></a><!-- ENDIF rssFeedUrl --><!-- ENDIF !feeds:disableRSS -->
<!-- ENDIF @last -->
</span>
{{{ if ./url }}}</a>{{{ end }}}
</li>
{{{end}}}
</ol>
<!-- ENDIF breadcrumbs.length -->
<div data-widget-area="header">
{{{ each widgets.header }}}
{{widgets.header.html}}
{{{ end }}}
</div>
<div class="row">
<div class="category {{{if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
{{{ if children.length }}}
<div class="subcategory">
{{{ if hasMoreSubCategories }}}
<div class="mb-2"><div component="category-selector" class="btn-group dropdown-left category-dropdown-container bottom-sheet">
<button type="button" class="btn btn-ghost btn-sm ff-secondary d-flex align-items-center gap-2 dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<span component="category-selector-selected">
{{{ if (selectedCategory && !showCategorySelectLabel) }}}
<span class="category-item d-inline-flex align-items-center gap-1">
{buildCategoryIcon(selectedCategory, "24px", "rounded-circle")}
<span class="fw-semibold">{selectedCategory.name}</span>
</span>
{{{ else }}}
<i class="fa fa-fw {{{ if selectCategoryIcon }}}{selectCategoryIcon}{{{ else }}}fa-list{{{ end }}} text-primary"></i>
<span class="visible-md-inline visible-lg-inline fw-semibold">{{{ if selectCategoryLabel }}}{selectCategoryLabel}{{{ else }}}[[topic:thread-tools.select-category]]{{{ end }}}</span>
{{{ end }}}
</span>
</button>
<div class="dropdown-menu p-1">
<div component="category-selector-search" class="p-1 hidden">
<input type="text" class="form-control form-control-sm" placeholder="[[search:type-to-search]]" autocomplete="off">
<hr class="mt-2 mb-0"/>
</div>
<ul component="category/list" class="list-unstyled mb-0 text-sm category-dropdown-menu ghost-scrollbar" role="menu">
<li component="category/no-matches" role="presentation" class="category hidden">
<a class="dropdown-item rounded-1" role="menuitem">[[search:no-matches]]</a>
</li>
{{{ each categoryItems }}}
<li role="presentation" class="category {{{ if ./disabledClass }}}disabled {{{ end }}}" data-cid="{./cid}" data-name="{./name}" data-parent-cid="{./parentCid}">
<a class="dropdown-item rounded-1 {{{ if ./disabledClass }}}disabled{{{ end }}}" role="menuitem" href="#">{./level}
<span component="category-markup" style="{{{ if ./match }}}font-weight: bold;{{{end}}}">
<div class="category-item d-inline-flex align-items-center gap-1">
{{{ if ./icon }}}
{buildCategoryIcon(@value, "24px", "rounded-circle")}
{{{ end }}}
{./name}
</div>
</span>
</a>
</li>
{{{ end }}}
</ul>
</div>
</div></div>
{{{ else }}}
<p>[[category:subcategories]]</p>
{{{ end }}}
<ul component="category/subcategory/container" class="categories list-unstyled" itemscope itemtype="http://www.schema.org/ItemList">
{{{each children}}}
<li component="categories/category" data-cid="{./cid}" class="w-100 py-2 mb-2 gap-lg-0 gap-2 d-flex flex-column flex-md-row align-items-start {{{ if !@last }}}border-bottom{{{ end }}} border-bottom-lg-0 category-{./cid} {./unread-class}">
<meta itemprop="name" content="{./name}">
<div class="d-flex col-md-7 gap-2 gap-lg-3">
<div class="flex-shrink-0">
{buildCategoryIcon(@value, "48px", "rounded-circle")}
</div>
<div class="flex-grow-1 d-flex flex-wrap gap-1">
<h2 class="title text-break fs-4 fw-semibold m-0 tracking-tight w-100">
<!-- IF ../isSection -->
{../name}
<!-- ELSE -->
<!-- IF ../link -->
<a href="{../link}" itemprop="url">
<!-- ELSE -->
<a href="{config.relative_path}/category/{../slug}" itemprop="url">
<!-- ENDIF ../link -->
{../name}
</a>
<!-- ENDIF ../isSection -->
</h2>
{{{ if ./descriptionParsed }}}
<div class="description text-muted text-sm w-100 line-clamp-sm-5">
{./descriptionParsed}
</div>
{{{ end }}}
{{{ if ./teaser.timestampISO }}}
<div class="d-block d-md-none">
<a class="permalink timeago text-muted" title="{../teaser.timestampISO}" href="{../teaser.url}">
</a>
</div>
{{{ end }}}
{{{ if !config.hideSubCategories }}}
{{{ if ./children.length }}}
<ul class="list-unstyled category-children row row-cols-1 row-cols-md-2 g-2 my-1 w-100">
{{{ each ./children }}}
{{{ if !./isSection }}}
<li class="category-children-item small d-flex gap-1 align-items-center">
{buildCategoryIcon(@value, "24px", "rounded-circle")}
<a href="{{{ if ./link }}}{./link}{{{ else }}}{config.relative_path}/category/{./slug}{{{ end }}}" class="text-reset">{./name}</a>
</li>
{{{ end }}}
{{{ end }}}
</ul>
{{{ end }}}
{{{ end }}}
</div>
</div>
{{{ if !./link }}}
<div class="d-flex col-md-5 col-12 align-content-stretch">
<div class="meta stats d-none d-lg-grid col-6 gap-1 pe-2 text-muted" style="grid-template-columns: 1fr 1fr;">
<div class="overflow-hidden rounded-1 d-flex flex-column align-items-center">
<span class="fs-4" title="{./totalTopicCount}">{humanReadableNumber(./totalTopicCount, 0)}</span>
<span class="text-uppercase text-xs">[[global:topics]]</span>
</div>
<div class="overflow-hidden rounded-1 d-flex flex-column align-items-center">
<span class="fs-4" title="{./totalPostCount}">{humanReadableNumber(./totalPostCount, 0)}</span>
<span class="text-uppercase text-xs">[[global:posts]]</span>
</div>
</div>
{{{ if !config.hideCategoryLastPost }}}
<div component="topic/teaser" class="teaser col-md-6 col-12 d-none d-md-block">
<div class="lastpost border-start border-4 lh-sm h-100" style="border-color: {./bgColor}!important;">
{{{ each ./posts }}}
{{{ if @first }}}
<div component="category/posts" class="ps-2 text-xs d-flex flex-column h-100 gap-1">
<div class="text-nowrap text-truncate">
<a class="text-decoration-none avatar-tooltip" title="{./user.displayname}" href="{config.relative_path}/user/{./user.userslug}">{buildAvatar(posts.user, "18px", true)}</a>
<a class="permalink text-muted timeago text-xs" href="{config.relative_path}/topic/{./topic.slug}{{{ if ./index }}}/{./index}{{{ end }}}" title="{./timestampISO}" aria-label="[[global:lastpost]]"></a>
</div>
<div class="post-content text-xs text-break line-clamp-sm-2 lh-sm position-relative flex-fill">
<a class="stretched-link" tabindex="-1" href="{config.relative_path}/topic/{./topic.slug}{{{ if ./index }}}/{./index}{{{ end }}}" aria-label="[[global:lastpost]]"></a>
{./content}
</div>
</div>
{{{ end }}}
{{{ end }}}
{{{ if !./posts.length }}}
<div component="category/posts" class="ps-2">
<div class="post-content overflow-hidden text-xs">
[[category:no-new-posts]]
</div>
</div>
{{{ end }}}
</div>
</div>
{{{ end }}}
</div>
{{{ end }}}
</li>
{{{end}}}
</ul>
{{{ if hasMoreSubCategories}}}
<button class="btn btn-ghost btn-sm mb-2" component="category/load-more-subcategories">[[category:x-more-categories, {subCategoriesLeft}]]</button>
{{{ end }}}
</div>
{{{ end }}}
{{{ if (topics.length || privileges.topics:create) }}}
<div class="topic-list-header text-bg-light sticky-top btn-toolbar justify-content-between align-items-center p-1 mb-2 flex-nowrap">
<div class="d-flex gap-1">
{{{ if privileges.topics:create }}}
<a href="{config.relative_path}/compose?cid={cid}" component="category/post" id="new_topic" class="btn btn-primary btn-sm text-nowrap" data-ajaxify="false" role="button">[[category:new-topic-button]]</a>
{{{ else }}}
{{{ if !loggedIn }}}
<a component="category/post/guest" href="{config.relative_path}/login" class="btn btn-primary btn-sm">[[category:guest-login-post]]</a>
{{{ end }}}
{{{ end }}}
<a href="{url}" class="d-inline-block">
<div class="alert alert-warning h-100 m-0 px-2 py-1 d-flex gap-1 align-items-center hide" id="new-topics-alert"><i class="fa fa-fw fa-rotate-right"></i>[[recent:load-new-posts]]</div>
</a>
</div>
<div component="category/controls" class="d-flex gap-1">
{{{ if config.loggedIn }}}
<div class="btn-group bottom-sheet" component="topic/watch">
<button class="btn btn-ghost btn-sm ff-secondary dropdown-toggle" data-bs-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false">
<span component="category/watching/menu" class="d-flex gap-2 align-items-center {{{ if !./isWatched }}} hidden{{{ end }}}"><i class="fa fa-fw fa-bell-o text-primary"></i><span class="visible-md-inline visible-lg-inline fw-semibold">[[category:watching]]</span></span>
<span component="category/tracking/menu"  class="d-flex gap-2 align-items-center {{{ if !./isTracked }}} hidden{{{ end }}}"><i class="fa fa-fw fa-inbox text-primary"></i><span class="visible-md-inline visible-lg-inline fw-semibold">[[category:tracking]]</span></span>
<span component="category/notwatching/menu"  class="d-flex gap-2 align-items-center {{{ if !./isNotWatched }}} hidden{{{ end }}}"><i class="fa fa-fw fa-clock-o text-primary"></i><span class="visible-md-inline visible-lg-inline fw-semibold">[[category:not-watching]]</span></span>
<span component="category/ignoring/menu"  class="d-flex gap-2 align-items-center {{{ if !./isIgnored }}} hidden{{{ end }}}"><i class="fa fa-fw fa-eye-slash text-primary"></i><span class="visible-md-inline visible-lg-inline fw-semibold">[[category:ignoring]]</span></span>
</button>
<ul class="dropdown-menu p-1 text-sm {{{ if template.account/categories }}}dropdown-menu-end{{{ end }}}" role="menu">
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2 p-2" href="#" component="category/watching" data-state="watching" role="menuitem">
<div class="flex-grow-1 d-flex flex-column">
<span class="d-flex align-items-center gap-2">
<i class="flex-shrink-0 fa fa-fw fa-bell-o text-secondary"></i>
<span class="flex-grow-1 fw-semibold">[[category:watching]]</span>
</span>
<div class="help-text text-secondary text-xs">[[category:watching.description]]</div>
</div>
<span class="flex-shrink-0"><i component="category/watching/check" class="fa fa-fw {{{ if ./isWatched }}}fa-check{{{ end }}}"></i></span>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2 p-2" href="#" component="category/tracking" data-state="tracking" role="menuitem">
<div class="flex-grow-1 d-flex flex-column">
<span class="d-flex align-items-center gap-2">
<i class="flex-shrink-0 fa fa-fw fa-inbox text-secondary"></i>
<span class="flex-grow-1 fw-semibold">[[category:tracking]]</span>
</span>
<div class="help-text text-secondary text-xs">[[category:tracking.description]]</div>
</div>
<span class="flex-shrink-0"><i component="category/tracking/check" class="fa fa-fw {{{ if ./isTracked }}}fa-check{{{ end }}}"></i></span>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2 p-2" href="#" component="category/notwatching" data-state="notwatching" role="menuitem">
<div class="flex-grow-1 d-flex flex-column">
<span class="d-flex align-items-center gap-2">
<i class="flex-shrink-0 fa fa-fw fa-clock-o text-secondary"></i>
<span class="flex-grow-1 fw-semibold">[[category:not-watching]]</span>
</span>
<div class="help-text text-secondary text-xs">[[category:not-watching.description]]</div>
</div>
<span class="flex-shrink-0"><i component="category/notwatching/check" class="fa fa-fw {{{ if ./isNotWatched }}}fa-check{{{ end }}}"></i></span>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2 p-2" href="#" component="category/ignoring" data-state="ignoring" role="menuitem">
<div class="flex-grow-1 d-flex flex-column">
<span class="d-flex align-items-center gap-2">
<i class="flex-shrink-0 fa fa-fw fa-eye-slash text-secondary"></i>
<span class="flex-grow-1 fw-semibold">[[category:ignoring]]</span>
</span>
<div class="help-text text-secondary text-xs">[[category:ignoring.description]]</div>
</div>
<span class="flex-shrink-0"><i component="category/ignoring/check" class="fa fa-fw {{{ if ./isIgnored }}}fa-check{{{ end }}}"></i></span>
</a>
</li>
</ul>
</div>
{{{ end }}}
<div class="btn-group bottom-sheet" component="thread/sort">
<button class="btn btn-ghost btn-sm ff-secondary d-flex gap-2 align-items-center dropdown-toggle" data-bs-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false" aria-label="[[aria:topic-sort-option, {sortOptionLabel}]]">
<i class="fa fa-fw fa-arrow-down-wide-short text-primary"></i>
<span class="d-none d-md-inline fw-semibold">{sortOptionLabel}</span>
</button>
<ul class="dropdown-menu p-1 text-sm" role="menu">
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="#" data-sort="recently_replied" role="menuitem">
<span class="flex-grow-1">[[topic:recently-replied]]</span>
<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="#" data-sort="recently_created" role="menuitem">
<span class="flex-grow-1">[[topic:recently-created]]</span>
<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="#" data-sort="most_posts" role="menuitem">
<span class="flex-grow-1">[[topic:most-posts]]</span>
<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="#" data-sort="most_votes" role="menuitem">
<span class="flex-grow-1">[[topic:most-votes]]</span>
<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="#" data-sort="most_views" role="menuitem">
<span class="flex-grow-1">[[topic:most-views]]</span>
<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
</a>
</li>
</ul>
</div>
{{{ if showTopicTools }}}
<div class="btn-group thread-tools dropdown-right bottom-sheet">
<button class="btn btn-ghost btn-sm ff-secondary d-flex gap-2 align-items-center dropdown-toggle" data-bs-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false">
<i class="fa fa-fw fa-gear text-primary"></i>
<span class="visible-md-inline visible-lg-inline fw-semibold">[[topic:thread-tools.title]]</span>
<span component="topic/selected/badge" class="badge rounded-pill bg-secondary"></span>
</button>
<ul class="dropdown-menu p-1 text-sm" role="menu">
<li>
<a component="topic/mark-unread-for-all" href="#" class="dropdown-item rounded-1 d-flex align-items-center gap-2" role="menuitem">
<i class="fa fa-fw fa-inbox text-secondary"></i> [[topic:thread-tools.markAsUnreadForAll]]
</a>
</li>
<li>
<a component="topic/pin" href="#" class="dropdown-item rounded-1 d-flex align-items-center gap-2" role="menuitem">
<i class="fa fa-fw fa-thumb-tack text-secondary"></i> [[topic:thread-tools.pin]]
</a>
</li>
<li>
<a component="topic/unpin" href="#" class="hidden dropdown-item rounded-1" role="menuitem">
<i class="fa fa-fw fa-thumb-tack fa-rotate-90 text-secondary"></i> [[topic:thread-tools.unpin]]
</a>
</li>
<li>
<a component="topic/lock" href="#" class="dropdown-item rounded-1 d-flex align-items-center gap-2" role="menuitem">
<i class="fa fa-fw fa-lock text-secondary"></i> [[topic:thread-tools.lock]]
</a>
</li>
<li>
<a component="topic/unlock" href="#" class="hidden dropdown-item rounded-1 d-flex align-items-center gap-2" role="menuitem">
<i class="fa fa-fw fa-unlock text-secondary"></i> [[topic:thread-tools.unlock]]
</a>
</li>
<li class="dropdown-divider"></li>
<li>
<a component="topic/move" href="#" class="dropdown-item rounded-1 d-flex align-items-center gap-2" role="menuitem">
<i class="fa fa-fw fa-arrows text-secondary"></i> [[topic:thread-tools.move]]
</a>
</li>
{{{if template.category}}}
<li>
<a component="topic/move-all" href="#" class="dropdown-item rounded-1 d-flex align-items-center gap-2" role="menuitem">
<i class="fa fa-fw fa-arrows text-secondary"></i> [[topic:thread-tools.move-all]]
</a>
</li>
{{{end}}}
<li>
<a component="topic/merge" href="#" class="dropdown-item rounded-1 d-flex align-items-center gap-2" role="menuitem">
<i class="fa fa-fw fa-code-fork text-secondary"></i> [[topic:thread-tools.merge]]
</a>
</li>
<li>
<a component="topic/tag" href="#" class="dropdown-item rounded-1 d-flex align-items-center gap-2" role="menuitem">
<i class="fa fa-fw fa-tag text-secondary"></i> [[topic:thread-tools.tag]]
</a>
</li>
<li class="dropdown-divider"></li>
<li>
<a component="topic/delete" href="#" class="dropdown-item rounded-1 d-flex align-items-center gap-2" role="menuitem">
<i class="fa fa-fw fa-trash-o text-secondary"></i> [[topic:thread-tools.delete]]
</a>
</li>
<li>
<a component="topic/restore" href="#" class="hidden dropdown-item rounded-1" role="menuitem">
<i class="fa fa-fw fa-history text-secondary"></i> [[topic:thread-tools.restore]]
</a>
</li>
<li>
<a component="topic/purge" href="#" class="hidden dropdown-item rounded-1" role="menuitem">
<i class="fa fa-fw fa-eraser text-secondary"></i> [[topic:thread-tools.purge]]
</a>
</li>
{{{each thread_tools}}}
<li>
<a href="#" class="dropdown-item rounded-1 d-flex align-items-center gap-2 {thread_tools.class}" role="menuitem">
<i class="fa fa-fw {thread_tools.icon} text-secondary"></i>
{thread_tools.title}</a>
</li>
{{{end}}}
</ul>
</div>
{{{ end }}}
</div>
</div>
{{{ end }}}
{{{ if (./inbox && (./hasFollowers == false)) }}}
<div class="alert alert-warning mb-4" id="category-no-followers" data-bs-toggle="dropdown" data-bs-target='[component="topic/watch"] button' aria-hidden="true">
<i class="fa fa-triangle-exclamation pe-2"></i>
[[category:no-followers]]
<a href="#" class="stretched-link"></a>
</div>
{{{ end }}}
{{{ if (!topics.length && privileges.topics:create)}}}
<hr class="visible-xs" />
<div class="alert alert-warning" id="category-no-topics">
[[category:no-topics]]
</div>
{{{ end }}}
<ul component="category" class="topics-list list-unstyled" itemscope itemtype="http://www.schema.org/ItemList" data-nextstart="{nextStart}" data-set="{set}">
{{{ each topics }}}
<li component="category/topic" class="category-item hover-parent py-2 mb-2 d-flex flex-column flex-lg-row align-items-start {function.generateTopicClass}" data-tid="{topics.tid}" data-index="{topics.index}" data-cid="{topics.cid}" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
<link itemprop="url" content="{config.relative_path}/topic/{./slug}" />
<meta itemprop="name" content="{function.stripTags, ./title}" />
<meta itemprop="itemListOrder" content="descending" />
<meta itemprop="position" content="{increment(./index, "1")}" />
<a id="{./index}" data-index="{./index}" component="topic/anchor"></a>
<div class="d-flex p-0 col-12 col-lg-7 gap-2 gap-lg-3 pe-1 align-items-start {{{ if config.theme.mobileTopicTeasers }}}mb-2 mb-lg-0{{{ end }}}">
<div class="flex-shrink-0 position-relative">
<a class="d-inline-block text-decoration-none avatar-tooltip" title="{./user.displayname}" href="{{{ if ./user.userslug }}}{config.relative_path}/user/{./user.userslug}{{{ else }}}#{{{ end }}}">
{buildAvatar(./user, "40px", true)}
</a>
{{{ if showSelect }}}
<div class="checkbox position-absolute top-100 start-50 translate-middle-x m-0 d-none d-lg-flex" style="max-width:max-content">
<i component="topic/select" class="fa text-muted pointer fa-square-o p-1 hover-visible"></i>
</div>
{{{ end }}}
</div>
<div class="flex-grow-1 d-flex flex-wrap gap-1 position-relative">
<h3 component="topic/header" class="title text-break fs-5 fw-semibold m-0 tracking-tight w-100 {{{ if showSelect }}}me-4 me-lg-0{{{ end }}}">
<a class="text-reset" href="{{{ if topics.noAnchor }}}#{{{ else }}}{config.relative_path}/topic/{./slug}{{{ if ./bookmark }}}/{./bookmark}{{{ end }}}{{{ end }}}">{./title}</a>
</h3>
<div component="topic/labels" class="d-flex flex-wrap gap-1 w-100 align-items-center">
<span component="topic/watched" class="badge border border-gray-300 text-body {{{ if !./followed }}}hidden{{{ end }}}">
<i class="fa fa-bell-o"></i>
<span>[[topic:watching]]</span>
</span>
<span component="topic/ignored" class="badge border border-gray-300 text-body {{{ if !./ignored }}}hidden{{{ end }}}">
<i class="fa fa-eye-slash"></i>
<span>[[topic:ignoring]]</span>
</span>
<span component="topic/scheduled" class="badge border border-gray-300 text-body {{{ if !./scheduled }}}hidden{{{ end }}}">
<i class="fa fa-clock-o"></i>
<span>[[topic:scheduled]]</span>
</span>
<span component="topic/pinned" class="badge border border-gray-300 text-body {{{ if (./scheduled || !./pinned) }}}hidden{{{ end }}}">
<i class="fa fa-thumb-tack"></i>
<span>{{{ if !./pinExpiry }}}[[topic:pinned]]{{{ else }}}[[topic:pinned-with-expiry, {isoTimeToLocaleString(./pinExpiryISO, config.userLang)}]]{{{ end }}}</span>
</span>
<span component="topic/locked" class="badge border border-gray-300 text-body {{{ if !./locked }}}hidden{{{ end }}}">
<i class="fa fa-lock"></i>
<span>[[topic:locked]]</span>
</span>
<span component="topic/moved" class="badge border border-gray-300 text-body {{{ if !./oldCid }}}hidden{{{ end }}}">
<i class="fa fa-arrow-circle-right"></i>
<span>[[topic:moved]]</span>
</span>
{{{each ./icons}}}<span class="lh-1">{@value}</span>{{{end}}}
{{{ if !template.category }}}
{function.buildCategoryLabel, ./category, "a", "border"}
{{{ end }}}
<span data-tid="{./tid}" component="topic/tags" class="lh-1 tag-list d-flex flex-wrap gap-1 {{{ if !./tags.length }}}hidden{{{ end }}}">
{{{ each ./tags }}}
<a href="{config.relative_path}/tags/{./valueEncoded}"><span class="badge border border-gray-300 fw-normal tag tag-class-{./class}" data-tag="{./value}">{./valueEscaped}</span></a>
{{{ end }}}
</span>
<div class="d-flex gap-1 d-block d-lg-none w-100">
<span class="badge text-body border stats text-xs text-muted">
<i class="fa-regular fa-fw fa-message"></i>
<span component="topic/post-count" class="fw-normal">{humanReadableNumber(./postcount, 0)}</span>
</span>
<a href="{config.relative_path}/topic/{./slug}{{{ if (./teaser.timestampISO && !config.theme.mobileTopicTeasers) }}}/{./teaser.index}{{{ end }}}" class="border badge bg-transparent text-muted fw-normal timeago" title="{{{ if (./teaser.timestampISO && !config.theme.mobileTopicTeasers) }}}{./teaser.timestampISO}{{{ else }}}{./timestampISO}{{{ end }}}"></a>
</div>
<a href="{config.relative_path}/topic/{./slug}" class="d-none d-lg-block badge bg-transparent text-muted fw-normal timeago" title="{./timestampISO}"></a>
</div>
{{{ if showSelect }}}
<div class="checkbox position-absolute top-0 end-0 m-0 d-flex d-lg-none" style="max-width:max-content">
<i component="topic/select" class="fa fa-square-o text-muted pointer p-1"></i>
</div>
{{{ end }}}
</div>
{{{ if ./thumbs.length }}}
<a class="topic-thumbs position-relative text-decoration-none flex-shrink-0 d-none d-xl-block" href="{config.relative_path}/topic/{./slug}{{{ if ./bookmark }}}/{./bookmark}{{{ end }}}" aria-label="[[topic:thumb-image]]">
<img class="topic-thumb rounded-1 bg-light" style="width:auto;max-width: 5.33rem;height: 3.33rem;object-fit: contain;" src="{./thumbs.0.url}" alt=""/>
<span data-numthumbs="{./thumbs.length}" class="px-1 position-absolute bottom-0 end-0 badge rounded-0 border fw-semibold text-bg-light" style="z-index: 1; border-top-left-radius: 0.25rem!important; border-bottom-right-radius: 0.25rem!important;">{./thumbs.length}</span>
</a>
{{{ end }}}
</div>
<div class="d-flex p-0 col-lg-5 col-12 align-content-stretch">
<div class="meta stats d-none d-lg-grid col-6 gap-1 pe-2 text-muted" style="grid-template-columns: 1fr 1fr 1fr;">
{{{ if !reputation:disabled }}}
<div class="stats-votes overflow-hidden d-flex flex-column align-items-center">
<span class="fs-4" title="{./votes}">{humanReadableNumber(./votes, 0)}</span>
<span class="d-none d-xl-flex text-uppercase text-xs">[[global:votes]]</span>
<i class="d-xl-none fa fa-fw text-xs text-muted opacity-75 fa-chevron-up"></i>
</div>
{{{ end }}}
<div class="stats-postcount overflow-hidden d-flex flex-column align-items-center">
<span class="fs-4" title="{./postcount}">{humanReadableNumber(./postcount, 0)}</span>
<span class="d-none d-xl-flex text-uppercase text-xs">[[global:posts]]</span>
<i class="d-xl-none fa-regular fa-fw text-xs text-muted opacity-75 fa-message"></i>
</div>
<div class="stats-viewcount overflow-hidden d-flex flex-column align-items-center">
<span class="fs-4" title="{./viewcount}">{humanReadableNumber(./viewcount, 0)}</span>
<span class="d-none d-xl-flex text-uppercase text-xs">[[global:views]]</span>
<i class="d-xl-none fa fa-fw text-xs text-muted opacity-75 fa-eye"></i>
</div>
</div>
<div component="topic/teaser" class="meta teaser col-lg-6 col-12 {{{ if !config.theme.mobileTopicTeasers }}}d-none d-lg-block{{{ end }}}">
<div class="lastpost border-start border-4 lh-sm h-100 d-flex flex-column gap-1" style="border-color: {./category.bgColor}!important;">
{{{ if ./unreplied }}}
<div class="ps-2 text-xs">
[[category:no-replies]]
</div>
{{{ else }}}
{{{ if ./teaser.pid }}}
<div class="ps-2">
<a href="{{{ if ./teaser.user.userslug }}}{config.relative_path}/user/{./teaser.user.userslug}{{{ else }}}#{{{ end }}}" class="text-decoration-none avatar-tooltip" title="{./teaser.user.displayname}">{buildAvatar(./teaser.user, "18px", true)}</a>
<a class="permalink text-muted timeago text-xs" href="{config.relative_path}/topic/{./slug}/{./teaser.index}" title="{./teaser.timestampISO}" aria-label="[[global:lastpost]]"></a>
</div>
<div class="post-content text-xs ps-2 line-clamp-sm-2 lh-sm text-break position-relative flex-fill">
<a class="stretched-link" tabindex="-1" href="{config.relative_path}/topic/{./slug}/{./teaser.index}" aria-label="[[global:lastpost]]"></a>
{./teaser.content}
</div>
{{{ end }}}
{{{ end }}}
</div>
</div>
</div>
</li>
{{{end}}}
</ul>
{{{ if config.usePagination }}}
<nav component="pagination" class="pagination-container<!-- IF !pagination.pages.length --> hidden<!-- ENDIF !pagination.pages.length -->" aria-label="[[global:pagination]]">
<ul class="pagination hidden-xs justify-content-center">
<li class="page-item previous float-start<!-- IF !pagination.prev.active --> disabled<!-- ENDIF !pagination.prev.active -->">
<a class="page-link" href="?{pagination.prev.qs}" data-page="{pagination.prev.page}" aria-label="[[global:pagination.previouspage]]"><i class="fa fa-chevron-left"></i> </a>
</li>
{{{each pagination.pages}}}
<!-- IF pagination.pages.separator -->
<li component="pagination/select-page" class="page-item page select-page">
<a class="page-link" href="#" aria-label="[[global:pagination.go-to-page]]"><i class="fa fa-ellipsis-h"></i></a>
</li>
<!-- ELSE -->
<li class="page-item page<!-- IF pagination.pages.active --> active<!-- ENDIF pagination.pages.active -->" >
<a class="page-link" href="?{pagination.pages.qs}" data-page="{pagination.pages.page}" aria-label="[[global:pagination.page-x, {./page}]]">{pagination.pages.page}</a>
</li>
<!-- ENDIF pagination.pages.separator -->
{{{end}}}
<li class="page-item next float-end<!-- IF !pagination.next.active --> disabled<!-- ENDIF !pagination.next.active -->">
<a class="page-link" href="?{pagination.next.qs}" data-page="{pagination.next.page}" aria-label="[[global:pagination.nextpage]]"><i class="fa fa-chevron-right"></i></a>
</li>
</ul>
<ul class="pagination hidden-sm hidden-md hidden-lg justify-content-center">
<li class="page-item first<!-- IF !pagination.prev.active --> disabled<!-- ENDIF !pagination.prev.active -->">
<a class="page-link" href="?{pagination.first.qs}" data-page="1" aria-label="[[global:pagination.firstpage]]"><i class="fa fa-fast-backward"></i> </a>
</li>
<li class="page-item previous<!-- IF !pagination.prev.active --> disabled<!-- ENDIF !pagination.prev.active -->">
<a class="page-link" href="?{pagination.prev.qs}" data-page="{pagination.prev.page}" aria-label="[[global:pagination.previouspage]]"><i class="fa fa-chevron-left"></i> </a>
</li>
<li component="pagination/select-page" class="page-item page select-page">
<a class="page-link" href="#" aria-label="[[global:pagination.go-to-page]]">{pagination.currentPage} / {pagination.pageCount}</a>
</li>
<li class="page-item next<!-- IF !pagination.next.active --> disabled<!-- ENDIF !pagination.next.active -->">
<a class="page-link" href="?{pagination.next.qs}" data-page="{pagination.next.page}" aria-label="[[global:pagination.nextpage]]"><i class="fa fa-chevron-right"></i></a>
</li>
<li class="page-item last<!-- IF !pagination.next.active --> disabled<!-- ENDIF !pagination.next.active -->">
<a class="page-link" href="?{pagination.last.qs}" data-page="{pagination.pageCount}" aria-label="[[global:pagination.lastpage]]"><i class="fa fa-fast-forward"></i> </a>
</li>
</ul>
</nav>
{{{ end }}}
</div>
<div data-widget-area="sidebar" class="col-lg-3 col-sm-12 {{{ if !widgets.sidebar.length }}}hidden{{{ end }}}">
{{{ each widgets.sidebar }}}
{{widgets.sidebar.html}}
{{{ end }}}
</div>
</div>
<div data-widget-area="footer">
{{{each widgets.footer}}}
{{widgets.footer.html}}
{{{end}}}
</div>
<!-- IF !config.usePagination -->
<noscript>
<nav component="pagination" class="pagination-container<!-- IF !pagination.pages.length --> hidden<!-- ENDIF !pagination.pages.length -->" aria-label="[[global:pagination]]">
<ul class="pagination hidden-xs justify-content-center">
<li class="page-item previous float-start<!-- IF !pagination.prev.active --> disabled<!-- ENDIF !pagination.prev.active -->">
<a class="page-link" href="?{pagination.prev.qs}" data-page="{pagination.prev.page}" aria-label="[[global:pagination.previouspage]]"><i class="fa fa-chevron-left"></i> </a>
</li>
{{{each pagination.pages}}}
<!-- IF pagination.pages.separator -->
<li component="pagination/select-page" class="page-item page select-page">
<a class="page-link" href="#" aria-label="[[global:pagination.go-to-page]]"><i class="fa fa-ellipsis-h"></i></a>
</li>
<!-- ELSE -->
<li class="page-item page<!-- IF pagination.pages.active --> active<!-- ENDIF pagination.pages.active -->" >
<a class="page-link" href="?{pagination.pages.qs}" data-page="{pagination.pages.page}" aria-label="[[global:pagination.page-x, {./page}]]">{pagination.pages.page}</a>
</li>
<!-- ENDIF pagination.pages.separator -->
{{{end}}}
<li class="page-item next float-end<!-- IF !pagination.next.active --> disabled<!-- ENDIF !pagination.next.active -->">
<a class="page-link" href="?{pagination.next.qs}" data-page="{pagination.next.page}" aria-label="[[global:pagination.nextpage]]"><i class="fa fa-chevron-right"></i></a>
</li>
</ul>
<ul class="pagination hidden-sm hidden-md hidden-lg justify-content-center">
<li class="page-item first<!-- IF !pagination.prev.active --> disabled<!-- ENDIF !pagination.prev.active -->">
<a class="page-link" href="?{pagination.first.qs}" data-page="1" aria-label="[[global:pagination.firstpage]]"><i class="fa fa-fast-backward"></i> </a>
</li>
<li class="page-item previous<!-- IF !pagination.prev.active --> disabled<!-- ENDIF !pagination.prev.active -->">
<a class="page-link" href="?{pagination.prev.qs}" data-page="{pagination.prev.page}" aria-label="[[global:pagination.previouspage]]"><i class="fa fa-chevron-left"></i> </a>
</li>
<li component="pagination/select-page" class="page-item page select-page">
<a class="page-link" href="#" aria-label="[[global:pagination.go-to-page]]">{pagination.currentPage} / {pagination.pageCount}</a>
</li>
<li class="page-item next<!-- IF !pagination.next.active --> disabled<!-- ENDIF !pagination.next.active -->">
<a class="page-link" href="?{pagination.next.qs}" data-page="{pagination.next.page}" aria-label="[[global:pagination.nextpage]]"><i class="fa fa-chevron-right"></i></a>
</li>
<li class="page-item last<!-- IF !pagination.next.active --> disabled<!-- ENDIF !pagination.next.active -->">
<a class="page-link" href="?{pagination.last.qs}" data-page="{pagination.pageCount}" aria-label="[[global:pagination.lastpage]]"><i class="fa fa-fast-forward"></i> </a>
</li>
</ul>
</nav>
</noscript>
<!-- ENDIF !config.usePagination -->