<!DOCTYPE html>
<html lang="{function.localeToHTML, userLang, defaultLang}" {{{if languageDirection}}}data-dir="{languageDirection}" style="direction: {languageDirection};"{{{end}}}>
<head>
<title>{browserTitle}</title>
{{{each metaTags}}}{function.buildMetaTag}{{{end}}}
<link rel="stylesheet" type="text/css" href="{relative_path}/assets/client{{{if bootswatchSkin}}}-{bootswatchSkin}{{{end}}}{{{ if (languageDirection=="rtl") }}}-rtl{{{ end }}}.css?{config.cache-buster}" />
{{{each linkTags}}}{function.buildLinkTag}{{{end}}}
<script>
var config = JSON.parse('{{configJSON}}');
var app = {
user: JSON.parse('{{userJSON}}')
};
document.documentElement.style.setProperty('--panel-offset', `${localStorage.getItem('panelOffset') || 0}px`);
</script>
{{{if useCustomHTML}}}
{{customHTML}}
{{{end}}}
{{{if useCustomCSS}}}
<style>{{customCSS}}</style>
{{{end}}}
</head>
<body class="{bodyClass} skin-{{{if bootswatchSkin}}}{bootswatchSkin}{{{else}}}noskin{{{end}}}">
<nav id="menu" class="slideout-menu hidden">
<section class="menu-section" data-section="navigation">
<ul class="menu-section-list text-bg-dark list-unstyled"></ul>
</section>
</nav>
<nav id="chats-menu" class="slideout-menu hidden">
{{{ if config.loggedIn }}}
<ul class="nav nav-pills">
<li class="nav-item">
<a class="nav-link text-decoration-none" href="#" data-bs-target="#notifications" data-bs-toggle="tab"><span class="counter unread-count" component="notifications/icon" data-content="{unreadCount.notification}"></span> <i class="fa fa-fw fa-bell"></i></a>
</li>
{{{ if !config.disableChat }}}
<li class="nav-item">
<a class="nav-link text-decoration-none" href="#" data-bs-target="#chats" data-bs-toggle="tab"><i class="counter unread-count" component="chat/icon" data-content="{unreadCount.chat}"></i> <i class="fa fa-fw fa-comment"></i></a>
</li>
{{{ end }}}
<li class="nav-item">
<a class="nav-link active text-decoration-none" href="#" data-bs-target="#profile" data-bs-toggle="tab">
{buildAvatar(user, "24px", true, "user-icon")}
</a>
</li>
</ul>
<div class="tab-content">
<div class="tab-pane fade show active" id="profile">
<section class="menu-section" data-section="profile">
<ul class="menu-section-list dropdown-menu show text-bg-dark w-100 border-0" component="header/usercontrol"></ul>
</section>
</div>
<div class="tab-pane fade" id="notifications">
<section class="menu-section text-bg-dark px-1" data-section="notifications">
<ul class="menu-section-list notification-list-mobile list-unstyled" component="notifications/list"></ul>
<div class="menu-section-list text-center p-3"><a href="{relative_path}/notifications">[[notifications:see-all]]</a></div>
</section>
</div>
{{{ if !config.disableChat }}}
<div class="tab-pane fade" id="chats">
<section class="menu-section text-bg-dark px-1" data-section="chats">
<ul class="menu-section-list chat-list list-unstyled" component="chat/list">
</ul>
<div class="menu-section-list text-center p-3"><a class="navigation-link" href="{relative_path}/user/{user.userslug}/chats">[[modules:chat.see-all]]</a></div>
</section>
</div>
{{{ end }}}
</div>
{{{ end }}}
</nav>
<main id="panel" class="slideout-panel">
<nav class="navbar sticky-top navbar-expand-lg bg-light header border-bottom py-0" id="header-menu" component="navbar">
<div class="container-lg justify-content-start flex-nowrap">
<div class="d-flex align-items-center me-auto" style="min-width: 0px;">
<button type="button" class="navbar-toggler border-0" id="mobile-menu">
<i class="fa fa-lg fa-fw fa-bars unread-count" ></i>
<span component="unread/icon" class="notification-icon fa fa-fw fa-book unread-count" data-content="{unreadCount.mobileUnread}" data-unread-url="{unreadCount.unreadUrl}"></span>
</button>
<div class="d-inline-flex align-items-center" style="min-width: 0px;">
{{{ if brand:logo }}}
<a class="navbar-brand" href="{{{ if brand:logo:url }}}{brand:logo:url}{{{ else }}}{relative_path}/{{{ end }}}">
<img alt="{brand:logo:alt}" class="{brand:logo:display} forum-logo d-inline-block align-text-bottom" src="{brand:logo}?{config.cache-buster}" />
</a>
{{{ end }}}
{{{ if config.showSiteTitle }}}
<a class="navbar-brand text-truncate" href="{{{ if title:url }}}{title:url}{{{ else }}}{relative_path}/{{{ end }}}">
{config.siteTitle}
</a>
{{{ end }}}
</div>
</div>
{{{ if (config.searchEnabled && user.privileges.search:content) }}}
<div class="navbar-search visible-xs">
<form action="{config.relative_path}/search" method="GET">
<button type="button" class="btn btn-link"><i class="fa fa-lg fa-fw fa-search" title="[[global:header.search]]"></i></button>
<input autocomplete="off" type="text" class="form-control hidden" name="term" placeholder="[[global:search]]"/>
<button class="btn btn-primary hidden" type="submit"></button>
<input type="text" class="hidden" name="in" value="{config.searchDefaultInQuick}" />
</form>
<div class="quick-search-container dropdown-menu d-block mt-2 hidden">
<div class="quick-search-results-container"></div>
</div>
</div>
{{{ end }}}
{{{ if config.loggedIn }}}
<button type="button" class="navbar-toggler border-0" id="mobile-chats">
<span component="notifications/icon" class="notification-icon fa fa-fw fa-bell-o unread-count" data-content="{unreadCount.notification}"></span>
<span component="chat/icon" class="notification-icon fa fa-fw fa-comments unread-count" data-content="{unreadCount.chat}"></span>
{buildAvatar(user, "32px", true)}
</button>
{{{ end }}}
<div component="navbar/title" class="visible-xs hidden">
<span></span>
</div>
<div id="nav-dropdown" class="collapse navbar-collapse d-none d-lg-block">
<ul id="main-nav" class="navbar-nav me-auto mb-2 mb-lg-0">
{{{each navigation}}}
<!-- IF function.displayMenuItem, @index -->
<li class="nav-item {navigation.class}{{{ if navigation.dropdown }}} dropdown{{{ end }}}" title="{navigation.title}">
<a class="nav-link navigation-link {{{ if navigation.dropdown }}}dropdown-toggle{{{ end }}}"
{{{ if navigation.dropdown }}} href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" {{{ else }}} href="{navigation.route}"{{{ end }}} {{{ if navigation.id }}}id="{navigation.id}"{{{ end }}}{{{ if navigation.targetBlank }}} target="_blank"{{{ end }}}>
{{{ if navigation.iconClass }}}
<i class="fa fa-fw {navigation.iconClass}" data-content="{navigation.content}"></i>
{{{ end }}}
{{{ if navigation.text }}}
<span class="{navigation.textClass}">{navigation.text}</span>
{{{ end }}}
{{{ if navigation.dropdown}}}
<i class="fa fa-caret-down"></i>
{{{ end }}}
</a>
{{{ if navigation.dropdown }}}
<ul class="dropdown-menu p-1" role="menu">
{navigation.dropdownContent}
</ul>
{{{ end }}}
</li>
<!-- ENDIF function.displayMenuItem -->
{{{end}}}
</ul>
<ul class="navbar-nav mb-2 mb-lg-0 hidden-xs">
<li class="nav-item">
<a href="#" id="reconnect" class="nav-link hide" title="[[global:reconnecting-message, {config.siteTitle}]]">
<i class="fa fa-check"></i>
</a>
</li>
</ul>
{{{ if (config.searchEnabled && user.privileges.search:content) }}}
<div class="navbar-nav mb-2 mb-lg-0 position-relative">
<form component="search/form" id="search-form" class="d-flex justify-content-end align-items-center" role="search" method="GET">
<div component="search/fields" class="hidden" id="search-fields">
<div class="input-group flex-nowrap">
<input autocomplete="off" type="text" class="form-control" placeholder="[[global:search]]" name="query" value="">
<a href="{config.relative_path}/search" class="btn btn-outline-secondary" aria-label="[[search:type-to-search]]">
<i class="fa fa-gears fa-fw"></i>
</a>
</div>
<div id="quick-search-container" class="quick-search-container dropdown-menu d-block mt-2 hidden">
<div class="form-check filter-category mb-2 ms-4">
<input class="form-check-input" type="checkbox" checked>
<label class="form-check-label name"></label>
</div>
<div class="text-center loading-indicator"><i class="fa fa-spinner fa-spin"></i></div>
<div class="quick-search-results-container"></div>
</div>
<button type="submit" class="btn btn-outline-secondary hide">[[global:search]]</button>
</div>
<div class="nav-item" title="[[global:search]]"><a component="search/button" id="search-button" href="#" class="nav-link" aria-label="[[global:search]]"><i class="fa fa-search fa-fw"></i></a></div>
</form>
</div>
{{{ end }}}
{{{ if !maintenanceHeader }}}
{{{ if config.loggedIn }}}
<ul id="logged-in-menu" class="navbar-nav me-0 mb-2 mb-lg-0 align-items-center">
<li class="nav-item notifications dropdown d-none d-sm-block" component="notifications" title="[[global:header.notifications]]">
<a data-bs-toggle="dropdown" href="#" role="button" class="nav-link position-relative" aria-haspopup="true" aria-expanded="false" aria-label="[[global:header.notifications]]">
<i component="notifications/icon" class="fa fa-fw {{{ if unreadCount.notification}}}fa-bell{{{ else }}}fa-bell-o{{{ end }}} unread-count" data-content="{unreadCount.notification}"></i>
</a>
<ul class="notifications-dropdown dropdown-menu dropdown-menu-end p-1 shadow" role="menu">
<li>
<div component="notifications/list" class="list-container notification-list overscroll-behavior-contain pe-1 ff-base ghost-scrollbar">
<div class="mb-2 p-1">
<div class="d-flex gap-1 justify-content-between">
<div class="d-flex gap-2 flex-grow-1 placeholder-wave">
<div class="placeholder" style="width: 32px; height: 32px;"></div>
<div class="flex-grow-1">
<div class="d-flex flex-column">
<div class="text-sm">
<span class="placeholder placeholder-sm col-4"></span>
<span class="placeholder placeholder-sm col-6"></span>
<span class="placeholder placeholder-sm col-7"></span>
<span class="placeholder placeholder-sm col-2"></span>
<span class="placeholder placeholder-sm col-5"></span>
</div>
<div class="text-xs">
<div class="placeholder placeholder-xs col-6"></div>
</div>
</div>
</div>
</div>
<div>
<button class="mark-read btn btn-ghost btn-sm d-flex align-items-center justify-content-center flex-grow-0 flex-shrink-0 p-1" style="width: 1.5rem; height: 1.5rem;">
<i class="unread fa fa-2xs fa-circle text-primary"></i>
</button>
</div>
</div>
</div>
</div>
</li>
<li class="dropdown-divider"></li>
<li>
<div class="d-flex justify-content-center gap-1 flex-wrap">
<a role="button" href="#" class="btn btn-sm btn-light mark-all-read flex-fill text-nowrap text-truncate ff-secondary"><i class="fa fa-check-double"></i> [[notifications:mark-all-read]]</a>
<a class="btn btn-sm btn-primary flex-fill text-nowrap text-truncate ff-secondary" href="{relative_path}/notifications"><i class="fa fa-list"></i> [[notifications:see-all]]</a>
</div>
</li>
</ul>
</li>
{{{ if canChat }}}
<li class="nav-item chats dropdown" title="[[global:header.chats]]">
<a class="nav-link" data-bs-toggle="dropdown" href="{relative_path}/user/{user.userslug}/chats" data-ajaxify="false" id="chat_dropdown" component="chat/dropdown" role="button" aria-haspopup="true" aria-expanded="false">
<i component="chat/icon" class="fa {{{ if unreadCount.chat}}}fa-comment{{{ else }}}fa-comment-o{{{ end }}} fa-fw unread-count" data-content="{unreadCount.chat}"></i> <span class="d-inline d-sm-none">[[global:header.chats]]</span>
</a>
<ul class="dropdown-menu dropdown-menu-end p-1" aria-labelledby="chat_dropdown" role="menu">
<li>
<ul component="chat/list" class="list-unstyled chat-list chats-list ghost-scrollbar pe-1">
<div class="rounded-1">
<div class="d-flex gap-1 justify-content-between">
<div class="dropdown-item p-2 d-flex gap-2 placeholder-wave">
<div class="main-avatar">
<div class="placeholder" style="width: 32px; height: 32px;"></div>
</div>
<div class="d-flex flex-grow-1 flex-column w-100">
<div class="text-xs"><div class="placeholder col-3"></div></div>
<div class="text-sm"><div class="placeholder col-11"></div></div>
<div class="text-xs"><div class="placeholder col-4"></div></div>
</div>
</div>
<div>
<button class="mark-read btn btn-ghost btn-sm d-flex align-items-center justify-content-center flex-grow-0 flex-shrink-0 p-1" style="width: 1.5rem; height: 1.5rem;">
<i class="unread fa fa-2xs fa-circle text-primary"></i>
</button>
</div>
</div>
</div>
</ul>
</li>
<li class="dropdown-divider"></li>
<li>
<div class="d-flex justify-content-center gap-1 flex-wrap">
<a class="btn btn-light btn-sm mark-all-read flex-fill text-nowrap" href="#" component="chats/mark-all-read"><i class="fa fa-check-double"></i> [[modules:chat.mark-all-read]]</a>
<a class="btn btn-primary btn-sm flex-fill text-nowrap" href="{relative_path}/user/{user.userslug}/chats"><i class="fa fa-comments"></i> [[modules:chat.see-all]]</a>
</div>
</li>
</ul>
</li>
{{{ end }}}
<li id="user_label" class="nav-item dropdown px-3" title="[[global:header.profile]]">
<a href="#" for="user-control-list-check" data-bs-toggle="dropdown" id="user_dropdown" role="button" component="header/avatar" aria-haspopup="true" aria-expanded="false">
{buildAvatar(user, "32px", true)}
<span id="user-header-name" class="d-block d-sm-none">{user.username}</span>
</a>
<input type="checkbox" class="hidden" id="user-control-list-check" aria-hidden="true">
<ul id="user-control-list" component="header/usercontrol" class="overscroll-behavior-contain user-dropdown dropdown-menu dropdown-menu-end shadow p-1 text-sm ff-base" role="menu">
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" component="header/profilelink" href="{relative_path}/user/{user.userslug}" role="menuitem" aria-label="[[user:profile]]">
<span component="user/status" class="flex-shrink-0 border border-white border-2 rounded-circle status {user.status}"><span class="visually-hidden">[[global:{user.status}]]</span></span>
<span class="fw-semibold" component="header/username">{user.username}</span>
</a>
</li>
<li role="presentation" class="dropdown-divider"></li>
<li><h6 class="dropdown-header text-xs">[[global:status]]</h6></li>
<li>
<a href="#" class="dropdown-item rounded-1 user-status d-flex align-items-center gap-2 {{{ if user.online }}}selected{{{ end }}}" data-status="online" role="menuitem">
<span component="user/status" class="flex-shrink-0 border border-white border-2 rounded-circle status online"></span>
<span class="flex-grow-1">[[global:online]]</span>
</a>
</li>
<li>
<a href="#" class="dropdown-item rounded-1 user-status d-flex align-items-center gap-2 {{{ if user.away }}}selected{{{ end }}}" data-status="away" role="menuitem">
<span component="user/status" class="flex-shrink-0 border border-white border-2 rounded-circle status away"></span>
<span class="flex-grow-1">[[global:away]]</span>
</a>
</li>
<li>
<a href="#" class="dropdown-item rounded-1 user-status d-flex align-items-center gap-2 {{{ if user.dnd }}}selected{{{ end }}}" data-status="dnd" role="menuitem">
<span component="user/status" class="flex-shrink-0 border border-white border-2 rounded-circle status dnd"></span>
<span class="flex-grow-1">[[global:dnd]]</span>
</a>
</li>
<li>
<a href="#" class="dropdown-item rounded-1 user-status d-flex align-items-center gap-2 {{{ if user.offline }}}selected{{{ end }}}" data-status="offline" role="menuitem">
<span component="user/status" class="flex-shrink-0 border border-white border-2 rounded-circle status offline"></span>
<span class="flex-grow-1">[[global:invisible]]</span>
</a>
</li>
<li role="presentation" class="dropdown-divider"></li>
<li>
<a class="dropdown-item" href="{relative_path}/user/{user.userslug}/bookmarks" role="menuitem">
<i class="fa fa-fw fa-bookmark"></i> <span>[[user:bookmarks]]</span>
</a>
</li>
<li>
<a class="dropdown-item" component="header/profilelink/edit" href="{relative_path}/user/{user.userslug}/edit" role="menuitem">
<i class="fa fa-fw fa-edit"></i> <span>[[user:edit-profile]]</span>
</a>
</li>
<li>
<a class="dropdown-item" component="header/profilelink/settings" href="{relative_path}/user/{user.userslug}/settings" role="menuitem">
<i class="fa fa-fw fa-gear"></i> <span>[[user:settings]]</span>
</a>
</li>
{{{ if showModMenu }}}
<li role="presentation" class="dropdown-divider"></li>
<li><h6 class="dropdown-header">[[pages:moderator-tools]]</h6></li>
<li>
<a class="dropdown-item" href="{relative_path}/flags" role="menuitem">
<i class="fa fa-fw fa-flag"></i> <span>[[pages:flagged-content]]</span>
</a>
</li>
<li>
<a class="dropdown-item" href="{relative_path}/post-queue" role="menuitem">
<i class="fa fa-fw fa-list-alt"></i> <span>[[pages:post-queue]]</span>
</a>
</li>
{{{ if registrationQueueEnabled }}}
<li>
<a class="dropdown-item" href="{relative_path}/registration-queue" role="menuitem">
<i class="fa fa-fw fa-list-alt"></i> <span>[[pages:registration-queue]]</span>
</a>
</li>
{{{ end }}}
<li>
<a class="dropdown-item" href="{relative_path}/ip-blacklist" role="menuitem">
<i class="fa fa-fw fa-ban"></i> <span>[[pages:ip-blacklist]]</span>
</a>
</li>
{{{ else }}}
{{{ if postQueueEnabled }}}
<li>
<a class="dropdown-item" href="{relative_path}/post-queue" role="menuitem">
<i class="fa fa-fw fa-list-alt"></i> <span>[[pages:post-queue]]</span>
</a>
</li>
{{{ end }}}
{{{ end }}}
<li role="presentation" class="dropdown-divider"></li>
<li component="user/logout">
<form method="post" action="{relative_path}/logout">
<input type="hidden" name="_csrf" value="{config.csrf_token}">
<input type="hidden" name="noscript" value="true">
<button type="submit" class="dropdown-item" role="menuitem">
<i class="fa fa-fw fa-sign-out"></i><span> [[global:logout]]</span>
</button>
</form>
</li>
</ul>
</li>
</ul>
{{{ else }}}
<ul id="logged-out-menu" class="navbar-nav me-0 mb-2 mb-lg-0 align-items-center">
{{{ if allowRegistration }}}
<li class="nav-item">
<a class="nav-link" href="{relative_path}/register">
<i class="fa fa-pencil fa-fw d-inline-block d-sm-none"></i>
<span>[[global:register]]</span>
</a>
</li>
{{{ end }}}
<li class="nav-item">
<a class="nav-link" href="{relative_path}/login">
<i class="fa fa-sign-in fa-fw d-inline-block d-sm-none"></i>
<span>[[global:login]]</span>
</a>
</li>
</ul>
{{{ end }}}
{{{ else }}}
<ul class="navbar-nav me-0 mb-2 mb-lg-0"></ul>
<li class="nav-item">
<a href="{relative_path}/login">
<i class="fa fa-sign-in fa-fw d-block d-sm-none"></i>
<span>[[global:login]]</span>
</a>
</li>
</ul>
{{{ end }}}
</div>
</div>
</nav>
<script>
const rect = document.getElementById('header-menu').getBoundingClientRect();
const offset = Math.max(0, rect.bottom);
document.documentElement.style.setProperty('--panel-offset', offset + `px`);
</script>
<div class="container-lg pt-3" id="content">
<noscript>
<div class="alert alert-danger">
<p>
Your browser does not seem to support JavaScript. As a result, your viewing experience will be diminished, and you have been placed in <strong>read-only mode</strong>.
</p>
<p>
Please download a browser that supports JavaScript, or enable it if it's disabled (i.e. NoScript).
</p>
</div>
</noscript>
{{{ if noScriptMessage }}}
<noscript>
<div class="alert alert-info">
<p>
{noScriptMessage}
</p>
</div>
</noscript>
{{{ end }}}