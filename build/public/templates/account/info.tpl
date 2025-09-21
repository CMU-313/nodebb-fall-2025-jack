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
<!-- IF sessions.length -->
<div class="row mb-3">
<div class="col-12 col-md-12">
<h4>[[global:sessions]]</h4>
<ul class="list-group" component="user/sessions">
{{{each sessions}}}
<li class="list-group-item" data-uuid="{../uuid}">
<div class="float-end">
<!-- IF isSelfOrAdminOrGlobalModerator -->
<!-- IF !../current -->
<button class="btn btn-sm btn-outline-secondary" type="button" data-action="revokeSession">Revoke Session</button>
<!-- ENDIF !../current -->
<!-- ENDIF isSelfOrAdminOrGlobalModerator -->
{function.userAgentIcons}
<i class="fa fa-circle text-<!-- IF ../current -->success<!-- ELSE -->muted<!-- ENDIF ../current -->"></i>
</div>
{../browser} {../version} on {../platform}<br />
<small class="timeago text-muted" title="{../datetimeISO}"></small>
<ul>
<li><strong>[[global:ip-address]]</strong>: {../ip}</li>
</ul>
</li>
{{{end}}}
</ul>
</div>
</div>
<!-- ENDIF sessions.length -->
<div class="row">
<div class="col-sm-6">
<div class="card mb-3">
<h5 class="card-header">
[[global:recentips]]
</h5>
<div class="card-body">
<ul>
{{{each ips}}}
<li>{@value}</li>
{{{end}}}
</ul>
</div>
</div>
<div class="card mb-3">
<h5 class="card-header">
[[user:info.username-history]]
</h5>
<div class="card-body">
<ul class="list-unstyled mb-0">
{{{ each usernames }}}
<li class="d-flex justify-content-between mb-1">
<span class="text-sm">{./value}</span>
<div>
{{{ if ./byUid }}}
<a class="lh-1" href="{{{ if ./byUser.userslug }}}{config.relative_path}/user/{./byUser.userslug}{{{ else }}}#{{{ end }}}">
{buildAvatar(./byUser, "18px", true)}</a>
{{{ end }}}
<span class="timeago text-sm lh-1" title="{./timestampISO}"></span>
</div>
</li>
{{{ end }}}
</ul>
</div>
</div>
<div class="card mb-3">
<h5 class="card-header">
[[user:info.email-history]]
</h5>
<div class="card-body">
<ul class="list-unstyled mb-0">
{{{ each emails }}}
<li class="d-flex justify-content-between mb-1">
<span class="text-sm">{./value}</span>
<div>
{{{ if ./byUid }}}
<a class="lh-1" href="{{{ if ./byUser.userslug }}}{config.relative_path}/user/{./byUser.userslug}{{{ else }}}#{{{ end }}}">
{buildAvatar(./byUser, "18px", true)}</a>
{{{ end }}}
<span class="timeago text-sm lh-1" title="{./timestampISO}"></span>
</div>
</li>
{{{ end }}}
</ul>
</div>
</div>
<!-- IF isAdminOrGlobalModerator -->
<div class="card">
<h5 class="card-header">
[[user:info.moderation-note]]
</h5>
<div class="card-body">
<textarea component="account/moderation-note" class="form-control"></textarea>
<br/>
<button class="btn btn-sm float-end btn-success" component="account/save-moderation-note">[[user:info.moderation-note.add]]</button>
<br/>
<div component="account/moderation-note/list">
{{{ each moderationNotes }}}
<hr/>
<div data-id="{./id}">
<div class="mb-1">
<a href="{{{ if ./user.userslug }}}{config.relative_path}/user/{./user.userslug}{{{ else }}}#{{{ end }}}">{buildAvatar(./user, "24px", true)}</a>
<a href="{{{ if ./user.userslug }}}{config.relative_path}/user/{./user.userslug}{{{ else }}}#{{{ end }}}" class="fw-bold" itemprop="author" data-username="{./user.username}" data-uid="{./user.uid}">{./user.username}</a>
<span class="timeago" title="{./timestampISO}"></span>
</div>
<div component="account/moderation-note/content-area" class="d-flex flex-column">
<div class="content">
{./note}
</div>
<button component="account/moderation-note/edit" class="btn btn-sm btn-link align-self-end">[[topic:edit]]</button>
</div>
<div component="account/moderation-note/edit-area" class="d-flex flex-column gap-2">
<textarea class="form-control w-100 overflow-hidden">{./rawNote}</textarea>
<div class="align-self-end">
<button component="account/moderation-note/cancel-edit" class="btn btn-sm btn-link text-danger align-self-end">[[global:cancel]]</button>
<button component="account/moderation-note/save-edit" class="btn btn-sm btn-primary align-self-end">[[global:save]]</button>
</div>
</div>
</div>
{{{ end }}}
</div>
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
</div>
</div>
<!-- ENDIF isAdminOrGlobalModerator -->
</div>
<div class="col-sm-6">
<div class="card mb-3">
<h5 class="card-header">
[[user:info.latest-flags]]
</h5>
<div class="card-body">
<!-- IF history.flags.length -->
<ul class="recent-flags list-unstyled">
{{{ each history.flags }}}
<li class="mb-4 border-bottom">
<div class="mb-1 d-flex align-items-center justify-content-between">
<div>
{{{ if (./type == "user")}}}
<span class="badge text-bg-info">[[user:info.profile]]</span>
{{{ else }}}
<span class="badge text-bg-info">[[user:info.post]]</span>
{{{ end }}}
<span class="timestamp timeago" title="{./timestampISO}"></span>
</div>
<a href="{config.relative_path}/flags/{./flagId}" class="badge badge border border-gray-300 text-body">[[user:info.view-flag]]</a>
</div>
{{{ if (./type == "post") }}}
<p class="mb-1">
{{{ if history.flags.targetPurged }}}
<div>[[flags:target-purged]]</div>
{{{ else }}}
<a class="title" href="{config.relative_path}/post/{encodeURIComponent(./pid)}">{./title}</a>
{{{ end }}}
</p>
{{{ end }}}
<div class="d-flex gap-2 align-items-center mb-3">
<span class="text-sm">[[user:info.reported-by]]</span>
<div class="d-flex text-nowrap">
{{{ each ./reports }}}
<a style="width: 18px; z-index: 3;" class="text-decoration-none" href="{config.relative_path}/user/{./reporter.userslug}">{buildAvatar(./reporter, "24px", true)}</a>
{{{ end }}}
</div>
</div>
</li>
{{{ end }}}
</ul>
<!-- ELSE -->
<div class="alert alert-success">[[user:info.no-flags]]</div>
<!-- ENDIF history.flags.length -->
</div>
</div>
<div class="card mb-3">
<h5 class="card-header">
[[user:info.ban-history]]
<!-- IF !banned -->
<!-- IF !isSelf -->
<button class="btn btn-sm float-end btn-danger" component="account/ban">[[user:ban-account]]</button>
<!-- ENDIF !isSelf -->
<!-- ELSE -->
<!-- IF !isSelf -->
<button class="btn btn-sm float-end btn-success" component="account/unban">[[user:unban-account]]</button>
<!-- ENDIF !isSelf -->
<!-- ENDIF !banned -->
</h5>
<div class="card-body">
<!-- IF history.bans.length -->
<ul class="ban-history list-unstyled">
{{{ each history.bans }}}
<li class="mb-4 border-bottom">
<div class="mb-1 d-flex align-items-center justify-content-between">
<div>
<a href="{config.relative_path}/user/{./user.userslug}">{buildAvatar(./user, "24px", true)}</a>
<strong>
<a href="{{{ if ./user.userslug }}}{config.relative_path}/user/{./user.userslug}{{{ else }}}#{{{ end }}}" itemprop="author" data-username="{./user.username}" data-uid="{./user.uid}">{./user.username}</a>
</strong>
<span class="timestamp timeago" title="{./timestampISO}"></span>
</div>
{{{ if (./type != "unban") }}}
<span class="badge text-bg-danger">[[user:banned]]</span>
{{{ else }}}
<span class="badge text-bg-success">[[user:unbanned]]</span>
{{{ end }}}
</div>
<p class="mb-1">
<span class="reason">[[user:info.banned-reason-label]]: <strong>{./reason}</strong></span>
</p>
<p class="">
{{{ if ./until }}}
<span class="expiry">[[user:info.banned-until, {isoTimeToLocaleString(./untilISO, config.userLang)}]]</span>
{{{ else }}}
{{{ if (./type != "unban") }}}
<span class="expiry">[[user:info.banned-permanently]]</span>
{{{ end }}}
{{{ end }}}
</p>
</li>
{{{ end }}}
</ul>
<!-- ELSE -->
<div class="alert alert-success">[[user:info.no-ban-history]]</div>
<!-- ENDIF history.bans.length -->
</div>
</div>
<div class="card mb-3">
<h5 class="card-header">
[[user:info.mute-history]]
{{{ if !muted }}}
{{{ if !isSelf }}}
<button class="btn btn-sm float-end btn-danger" component="account/mute">[[user:mute-account]]</button>
{{{ end }}}
{{{ else }}}
{{{ if !isSelf }}}
<button class="btn btn-sm float-end btn-success" component="account/unmute">[[user:unmute-account]]</button>
{{{ end }}}
{{{ end }}}
</h5>
<div class="card-body">
{{{ if history.mutes.length }}}
<ul class="ban-history list-unstyled">
{{{ each history.mutes }}}
<li class="mb-4 border-bottom">
<div class="mb-1 d-flex align-items-center justify-content-between">
<div>
<a href="{config.relative_path}/user/{./user.userslug}">{buildAvatar(./user, "24px", true)}</a>
<strong>
<a href="{{{ if ./user.userslug }}}{config.relative_path}/user/{./user.userslug}{{{ else }}}#{{{ end }}}" itemprop="author" data-username="{./user.username}" data-uid="{./user.uid}">{./user.username}</a>
</strong>
<span class="timestamp timeago" title="{./timestampISO}"></span>
</div>
{{{ if (./type != "unmute") }}}
<span class="badge text-bg-danger">[[user:muted]]</span>
{{{ else }}}
<span class="badge text-bg-success">[[user:unmuted]]</span>
{{{ end }}}
</div>
<p class="mb-1">
<span class="reason">[[user:info.banned-reason-label]]: <strong>{./reason}</strong></span>
</p>
<p class="">
{{{ if ./until }}}
<span class="expiry">[[user:info.muted-until, {isoTimeToLocaleString(./untilISO, config.userLang)}]]</span>
{{{ end }}}
</p>
</li>
{{{ end }}}
</ul>
{{{ else }}}
<div class="alert alert-success">[[user:info.no-mute-history]]</div>
{{{ end }}}
</div>
</div>
</div>
</div>
</div>