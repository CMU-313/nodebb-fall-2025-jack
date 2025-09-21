<div class="account">
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
{{{each widgets.header}}}
{{widgets.header.html}}
{{{end}}}
</div>
<div class="cover" component="account/cover" style="background-image: url({cover:url}); background-position: {cover:position};">
<div class="avatar-wrapper" data-uid="{uid}">
<!-- IF picture -->
<img src="{picture}" class="avatar avatar-rounded" style="--avatar-size: 128px;" />
<!-- ELSE -->
<div class="avatar avatar-rounded" style="background-color: {icon:bgColor}; --avatar-size: 128px;" title="{username}">{icon:text}</div>
<!-- ENDIF picture -->
<span component="user/status" class="position-absolute border border-white border-2 rounded-circle status {status}"><span class="visually-hidden">[[global:{status}]]</span></span>
<!-- IF loggedIn -->
<!-- IF !isSelf -->
<button class="btn-morph persona-fab <!-- IF isFollowing -->heart<!-- ELSE -->plus<!-- ENDIF isFollowing -->" title="<!-- IF isFollowing -->[[global:unfollow]]<!-- ELSE -->[[global:follow]]<!-- ENDIF isFollowing -->">
<span>
<span class="s1"></span>
<span class="s2"></span>
<span class="s3"></span>
</span>
</button>
<!-- ENDIF !isSelf -->
<!-- ENDIF loggedIn -->
</div>
<div class="container">
<!-- IF allowCoverPicture -->
<!-- IF canEdit -->
<div class="controls">
<a href="#" class="upload"><i class="fa fa-fw fa-4x fa-upload"></i></a>
<a href="#" class="resize"><i class="fa fa-fw fa-4x fa-arrows"></i></a>
<a href="#" class="remove"><i class="fa fa-fw fa-4x fa-times"></i></a>
</div>
<a href="#" class="save">[[groups:cover-save]] <i class="fa fa-fw fa-floppy-o"></i></a>
<div class="indicator">[[groups:cover-saving]] <i class="fa fa-fw fa-refresh fa-spin"></i></div>
<!-- ENDIF canEdit -->
<!-- ENDIF allowCoverPicture -->
<div class="btn-group account-fab bottom-sheet">
<button type="button" class="persona-fab dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<i class="fa fa-ellipsis-v"></i>
</button>
<ul class="dropdown-menu dropdown-menu-end account-sub-links" role="menu">
<!-- IF loggedIn -->
<!-- IF !isSelf -->
<!-- IF !banned -->
<!-- IF canChat -->
<li class="<!-- IF !hasPrivateChat -->hidden<!-- ENDIF !hasPrivateChat -->">
<a class="dropdown-item" component="account/chat" href="#" role="menuitem">[[user:chat-with, {username}]]</a>
</li>
<li>
<a class="dropdown-item" component="account/new-chat" href="#" role="menuitem">[[user:new-chat-with, {username}]]</a>
</li>
<!-- ENDIF canChat -->
<li>
<a {{{if flagId }}}hidden{{{end}}} class="dropdown-item" component="account/flag" href="#" role="menuitem">[[user:flag-profile]]</a>
</li>
<li>
<a {{{if !flagId }}}hidden{{{end}}} class="dropdown-item" component="account/already-flagged" href="#" role="menuitem" data-flag-id="{flagId}">[[user:profile-flagged]]</a>
</li>
<li>
<a class="dropdown-item {{{ if ./isBlocked }}}hidden{{{ end }}}" component="account/block" href="#" role="menuitem">[[user:block-user]]</a>
</li>
<li>
<a class="dropdown-item {{{ if !./isBlocked }}}hidden{{{ end }}}" component="account/unblock" href="#" role="menuitem">[[user:unblock-user]]</a>
</li>
<li role="separator" class="dropdown-divider"></li>
<!-- ENDIF !banned -->
<!-- ENDIF !isSelf -->
<!-- ENDIF loggedIn -->
<li>
<a class="dropdown-item" href="{config.relative_path}/user/{userslug}" class="d-inline-block" id="profile" role="menuitem">[[user:profile]]</a>
</li>
<!-- IF canEdit -->
<li><a class="dropdown-item" href="{config.relative_path}/user/{userslug}/edit" role="menuitem">[[user:edit]]</a></li>
<li><a class="dropdown-item" href="{config.relative_path}/user/{userslug}/settings" role="menuitem">[[user:settings]]</a></li>
<!-- ENDIF canEdit -->
<!-- IF !isSelf -->
{{{ if (canBan || canMute) }}}
<li role="separator" class="dropdown-divider"></li>
<li class="dropdown-header">[[user:admin-actions-label]]</li>
{{{ end }}}
{{{ if canBan }}}
<li class="<!-- IF banned -->hide<!-- ENDIF banned -->">
<a class="dropdown-item" component="account/ban" href="#" role="menuitem">[[user:ban-account]]</a>
</li>
<li class="<!-- IF !banned -->hide<!-- ENDIF !banned -->">
<a class="dropdown-item" component="account/unban" href="#" role="menuitem">[[user:unban-account]]</a>
</li>
{{{ end }}}
{{{ if canMute }}}
<li class="<!-- IF muted -->hide<!-- ENDIF muted -->">
<a class="dropdown-item" component="account/mute" href="#" role="menuitem">[[user:mute-account]]</a>
</li>
<li class="<!-- IF !muted -->hide<!-- ENDIF !muted -->">
<a class="dropdown-item" component="account/unmute" href="#" role="menuitem">[[user:unmute-account]]</a>
</li>
{{{ end }}}
<!-- IF isAdmin -->
<li>
<a component="account/delete-account" href="#" class="dropdown-item" role="menuitem">[[user:delete-account-as-admin]]</a>
<a component="account/delete-content" href="#" class="dropdown-item" role="menuitem">[[user:delete-content]]</a>
<a component="account/delete-all" href="#" class="dropdown-item" role="menuitem">[[user:delete-all]]</a>
</li>
<!-- ENDIF isAdmin -->
<!-- ENDIF !isSelf -->
<li role="separator" class="dropdown-divider"></li>
<li><a class="dropdown-item d-flex justify-content-between align-items-center" href="{config.relative_path}/user/{userslug}/following" role="menuitem">[[user:following]] <span class="badge bg-secondary rounded-pill ms-2" title="{counts.following}">{formattedNumber(counts.following)}</span></a></li>
<li><a class="dropdown-item d-flex justify-content-between align-items-center" href="{config.relative_path}/user/{userslug}/followers" role="menuitem">[[user:followers]] <span class="badge bg-secondary rounded-pill ms-2" title="{counts.followers}">{formattedNumber(counts.followers)}</span></a></li>
<!-- IF canEdit -->
<li><a class="dropdown-item d-flex justify-content-between align-items-center" href="{config.relative_path}/user/{userslug}/blocks" role="menuitem">[[user:blocks]] <span class="badge bg-secondary rounded-pill ms-2" title="{counts.blocks}">{formattedNumber(counts.blocks)}</span></a></li>
<!-- ENDIF canEdit -->
<li role="separator" class="dropdown-divider"></li>
<li><a class="dropdown-item d-flex justify-content-between align-items-center" href="{config.relative_path}/user/{userslug}/topics" role="menuitem">[[global:topics]] <span class="badge bg-secondary rounded-pill ms-2" title="{counts.topics}">{formattedNumber(counts.topics)}</span></a></li>
<li><a class="dropdown-item d-flex justify-content-between align-items-center" href="{config.relative_path}/user/{userslug}/posts" role="menuitem">[[global:posts]] <span class="badge bg-secondary rounded-pill ms-2" title="{counts.posts}">{formattedNumber(counts.posts)}</span></a></li>
<li><a class="dropdown-item d-flex justify-content-between align-items-center" href="{config.relative_path}/user/{userslug}/groups" role="menuitem">[[global:header.groups]] <span class="badge bg-secondary rounded-pill ms-2" title="{counts.groups}">{formattedNumber(counts.groups)}</span></a></li>
<!-- IF canEdit -->
<li><a class="dropdown-item d-flex justify-content-between align-items-center" href="{config.relative_path}/user/{userslug}/categories" role="menuitem">[[user:watched-categories]] <span class="badge bg-secondary rounded-pill ms-2" title="{counts.categoriesWatched}">{formattedNumber(counts.categoriesWatched)}</span></a></li>
{{{ if isSelf }}}
<li><a class="dropdown-item d-flex justify-content-between align-items-center" href="{config.relative_path}/user/{userslug}/tags" role="menuitem">
[[user:watched-tags]] <span class="badge bg-secondary rounded-pill ms-2" title="{counts.tagsWatched}">{formattedNumber(counts.tagsWatched)}</span></a></li>
{{{ end }}}
<li><a class="dropdown-item d-flex justify-content-between align-items-center" href="{config.relative_path}/user/{userslug}/uploads" role="menuitem">[[global:uploads]] <span class="badge bg-secondary rounded-pill ms-2" title="{counts.uploaded}">{formattedNumber(counts.uploaded)}</span></a></li>
<!-- ENDIF canEdit -->
{{{each profile_links}}}
<!-- IF @first -->
<li role="separator" class="dropdown-divider"></li>
<!-- ENDIF @first -->
<li id="{profile_links.id}" class="plugin-link <!-- IF profile_links.public -->public<!-- ELSE -->private<!-- ENDIF profile_links.public -->"><a class="dropdown-item" href="{config.relative_path}/user/{userslug}/{profile_links.route}"><!-- IF ../icon --><i class="fa fa-fw {profile_links.icon}"></i> <!-- END -->{profile_links.name}</a></li>
{{{end}}}
</ul>
</div>
</div>
</div>
<div class="d-flex justify-content-between align-items-center mb-3">
<div class="d-flex gap-1">
<h3 class="fw-semibold fs-4 mb-0 align-self-center">[[global:topics]]</h3>
{{{ if showSort }}}
<div class="btn-group bottom-sheet" component="thread/sort">
<button title="[[global:sort]]" class="btn btn-ghost btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button"><i class="fa-solid fa-arrow-up-wide-short"></i></button>
<ul class="dropdown-menu p-1 text-sm" role="menu">
{{{each sortOptions }}}
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="{config.relative_path}{./url}" role="menuitem">
<div class="flex-grow-1">{./name}</div>
<i class="flex-shrink-0 fa fa-fw {{{if ./selected}}}fa-check{{{end}}}"></i>
</a>
</li>
{{{end}}}
</ul>
</div>
{{{ end }}}
</div>
<div class="d-flex gap-1">
{{{ if canEdit }}}
<a href="{config.relative_path}/user/{userslug}/topics" class="btn btn-ghost btn-sm ff-secondary fw-semibold {{{ if template.account/topics }}}active{{{ end }}}">[[global:header.recent]]</a>
<a href="{config.relative_path}/user/{userslug}/watched"class="btn btn-ghost btn-sm ff-secondary fw-semibold {{{ if template.account/watched }}}active{{{ end }}}">[[user:watched]]</a>
<a href="{config.relative_path}/user/{userslug}/ignored" class="btn btn-ghost btn-sm ff-secondary fw-semibold {{{ if template.account/ignored }}}active{{{ end }}}">[[user:ignored]]</a>
<a href="{config.relative_path}/user/{userslug}/read" class="btn btn-ghost btn-sm ff-secondary fw-semibold {{{ if template.account/read }}}active{{{ end }}}">[[user:read]]</a>
{{{ end }}}
</div>
</div>
{{{ if !topics.length }}}
<div class="alert alert-warning text-center">{noItemsFoundKey}</div>
{{{ end }}}
<div class="category">
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
</div>