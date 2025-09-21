<div data-widget-area="header">
{{{each widgets.header}}}
{{widgets.header.html}}
{{{end}}}
</div>
<div class="row mb-5">
<div class="topic {{{ if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}" itemid="{url}" itemscope itemtype="https://schema.org/DiscussionForumPosting">
<meta itemprop="headline" content="{escape(titleRaw)}">
<meta itemprop="text" content="{escape(titleRaw)}">
<meta itemprop="url" content="{url}">
<meta itemprop="datePublished" content="{timestampISO}">
<meta itemprop="dateModified" content="{lastposttimeISO}">
<div itemprop="author" itemscope itemtype="https://schema.org/Person">
<meta itemprop="name" content="{author.username}">
{{{ if author.userslug }}}<meta itemprop="url" content="{config.relative_path}/user/{author.userslug}">{{{ end }}}
</div>
<div class="topic-header sticky-top mb-3 bg-body">
<div class="d-flex flex-wrap gap-3 border-bottom p-2">
<div class="d-flex flex-column gap-2 flex-grow-1">
<h1 component="post/header" class="mb-0" itemprop="name">
<div class="topic-title d-flex">
<span class="fs-3" component="topic/title">{title}</span>
</div>
</h1>
<div class="topic-info d-flex gap-2 align-items-center flex-wrap">
<span component="topic/labels" class="d-flex gap-2 {{{ if (!scheduled && (!pinned && (!locked && (!icons.length && (!oldCid || (oldCid == "-1")))))) }}}hidden{{{ end }}}">
<span component="topic/scheduled" class="badge badge border border-gray-300 text-body {{{ if !scheduled }}}hidden{{{ end }}}">
<i class="fa fa-clock-o"></i> [[topic:scheduled]]
</span>
<span component="topic/pinned" class="badge badge border border-gray-300 text-body {{{ if (scheduled || !pinned) }}}hidden{{{ end }}}">
<i class="fa fa-thumb-tack"></i> {{{ if !pinExpiry }}}[[topic:pinned]]{{{ else }}}[[topic:pinned-with-expiry, {isoTimeToLocaleString(./pinExpiryISO, config.userLang)}]]{{{ end }}}
</span>
<span component="topic/locked" class="badge badge border border-gray-300 text-body {{{ if !locked }}}hidden{{{ end }}}">
<i class="fa fa-lock"></i> [[topic:locked]]
</span>
<a component="topic/moved" href="{config.relative_path}/category/{oldCid}" class="badge badge border border-gray-300 text-body text-decoration-none {{{ if !oldCid }}}hidden{{{ end }}}">
<i class="fa fa-arrow-circle-right"></i> {{{ if privileges.isAdminOrMod }}}[[topic:moved-from, {oldCategory.name}]]{{{ else }}}[[topic:moved]]{{{ end }}}
</a>
{{{each icons}}}<span class="lh-1">{@value}</span>{{{end}}}
</span>
{function.buildCategoryLabel, category, "a", "border"}
<div data-tid="{./tid}" component="topic/tags" class="lh-1 tags tag-list d-flex flex-wrap hidden-xs hidden-empty gap-2">{{{ each tags }}}<a href="{config.relative_path}/tags/{./valueEncoded}"><span class="badge border border-gray-300 fw-normal tag tag-class-{./class}" data-tag="{./value}">{./valueEscaped}</span></a>{{{ end }}}</div>
<div class="d-flex gap-2"><span class="badge text-body border border-gray-300 stats text-xs">
<i class="fa-regular fa-fw fa-message visible-xs-inline" title="[[global:posts]]"></i>
<span component="topic/post-count" title="{postcount}" class="fw-bold">{humanReadableNumber(postcount)}</span>
<span class="hidden-xs text-lowercase fw-normal">[[global:posts]]</span>
</span>
<span class="badge text-body border border-gray-300 stats text-xs">
<i class="fa fa-fw fa-user visible-xs-inline" title="[[global:posters]]"></i>
<span title="{postercount}" class="fw-bold">{humanReadableNumber(postercount)}</span>
<span class="hidden-xs text-lowercase fw-normal">[[global:posters]]</span>
</span>
<span class="badge text-body border border-gray-300 stats text-xs">
<i class="fa fa-fw fa-eye visible-xs-inline" title="[[global:views]]"></i>
<span class="fw-bold" title="{viewcount}">{humanReadableNumber(viewcount)}</span>
<span class="hidden-xs text-lowercase fw-normal">[[global:views]]</span>
</span>
{{{ if ./followercount }}}
<span class="badge text-body border border-gray-300 stats text-xs">
<i class="fa fa-fw fa-bell-o visible-xs-inline" title="[[global:watching]]"></i>
<span class="fw-bold" title="{viewcount}">{humanReadableNumber(followercount)}</span>
<span class="hidden-xs text-lowercase fw-normal">[[global:watching]]</span>
</span>
{{{ end }}}</div>
{{{ if !feeds:disableRSS }}}
{{{ if rssFeedUrl }}}<a class="hidden-xs" target="_blank" href="{rssFeedUrl}"><i class="fa fa-rss-square"></i></a>{{{ end }}}
{{{ end }}}
{{{ if browsingUsers }}}
<div class="d-inline-block hidden-xs">
<!-- This partial intentionally left blank; overwritten by nodebb-plugin-browsing-users -->
</div>
{{{ end }}}
<div class="ms-auto">
<div class="topic-main-buttons float-end d-inline-block">
<span class="loading-indicator btn float-start hidden" done="0">
<span class="hidden-xs">[[topic:loading-more-posts]]</span> <i class="fa fa-refresh fa-spin"></i>
</span>
{{{ if loggedIn }}}
<button component="topic/mark-unread" class="btn btn-sm btn-ghost" title="[[topic:mark-unread]]">
<i class="fa fa-fw fa-inbox text-secondary"></i>
</button>
{{{ end }}}
{{{ if config.loggedIn }}}
<div class="btn-group bottom-sheet" component="topic/watch"
data-bs-toggle="tooltip"
{{{if isFollowing}}}title="[[topic:watching]]"{{{end}}}
{{{if isNotFollowing}}}title="[[topic:not-watching]]"{{{end}}}
{{{if isIgnoring}}}title="[[topic:ignoring]]"{{{end}}}
>
<button class="btn btn-sm btn-ghost dropdown-toggle text-secondary" data-bs-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false">
<span component="topic/following/menu" <!-- IF !isFollowing -->class="hidden"<!-- ENDIF !isFollowing -->><i class="fa fa-fw fa-bell-o"></i></span>
<span component="topic/not-following/menu" <!-- IF !isNotFollowing -->class="hidden"<!-- ENDIF !isNotFollowing -->><i class="fa fa-fw fa-bell-slash-o"></i></span>
<span component="topic/ignoring/menu" <!-- IF !isIgnoring -->class="hidden"<!-- ENDIF !isIgnoring -->><i class="fa fa-fw fa-eye-slash"></i></span>
</button>
<ul class="dropdown-menu dropdown-menu-end p-1 text-sm" role="menu">
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2 p-2" href="#" component="topic/following" role="menuitem">
<div class="flex-grow-1 d-flex flex-column">
<span class="d-flex align-items-center gap-2">
<i class="flex-shrink-0 fa fa-fw fa-bell-o text-secondary"></i>
<span class="flex-grow-1 fw-semibold">[[topic:watching]]</span>
</span>
<div class="help-text text-secondary text-xs">[[topic:watching.description]]</div>
</div>
<span class="flex-shrink-0"><i component="topic/following/check" class="fa fa-fw {{{ if isFollowing }}}fa-check{{{ end }}}"></i></span>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2 p-2" href="#" component="topic/not-following" role="menuitem">
<div class="flex-grow-1 d-flex flex-column">
<span class="d-flex align-items-center gap-2">
<i class="flex-shrink-0 fa fa-fw fa-bell-slash-o text-secondary"></i>
<span class="flex-grow-1 fw-semibold">[[topic:not-watching]]</span>
</span>
<div class="help-text text-secondary text-xs">[[topic:not-watching.description]]</div>
</div>
<span class="flex-shrink-0"><i component="topic/not-following/check" class="fa fa-fw {{{ if isNotFollowing }}}fa-check{{{ end }}}"></i></span>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2 p-2" href="#" component="topic/ignoring" role="menuitem">
<div class="flex-grow-1 d-flex flex-column">
<span class="d-flex align-items-center gap-2">
<i class="flex-shrink-0 fa fa-fw fa-eye-slash text-secondary"></i>
<span class="flex-grow-1 fw-semibold">[[topic:ignoring]]</span>
</span>
<div class="help-text text-secondary text-xs">[[topic:ignoring.description]]</div>
</div>
<span class="flex-shrink-0"><i component="topic/ignoring/check" class="fa fa-fw {{{ if isIgnoring }}}fa-check{{{ end }}}"></i></span>
</a>
</li>
</ul>
</div>
{{{ end }}}
<div title="[[topic:sort-by]]" class="btn-group bottom-sheet hidden-xs" component="thread/sort">
<button class="btn btn-sm btn-ghost dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="[[aria:post-sort-option, {sortOptionLabel}]]">
<i class="fa fa-fw fa-arrow-down-wide-short text-secondary"></i></button>
<ul class="dropdown-menu dropdown-menu-end p-1 text-sm" role="menu">
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="#" class="oldest_to_newest" data-sort="oldest_to_newest" role="menuitem">
<span class="flex-grow-1">[[topic:oldest-to-newest]]</span>
<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="#" class="newest_to_oldest" data-sort="newest_to_oldest" role="menuitem">
<span class="flex-grow-1">[[topic:newest-to-oldest]]</span>
<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
</a>
</li>
<li>
<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="#" class="most_votes" data-sort="most_votes" role="menuitem">
<span class="flex-grow-1">[[topic:most-votes]]</span>
<i class="flex-shrink-0 fa fa-fw text-secondary"></i>
</a>
</li>
</ul>
</div>
<div class="d-inline-block">
{{{ if privileges.view_thread_tools }}}
<div title="[[topic:thread-tools.title]]" class="btn-group thread-tools bottom-sheet">
<button class="btn btn-sm btn-ghost dropdown-toggle" data-bs-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false">
<i class="fa fa-fw fa-gear text-secondary"></i>
</button>
<ul class="dropdown-menu dropdown-menu-end p-1" role="menu"></ul>
</div>
{{{ end }}}
</div>
<div component="topic/reply/container" class="btn-group bottom-sheet <!-- IF !privileges.topics:reply -->hidden<!-- ENDIF !privileges.topics:reply -->">
<a href="{config.relative_path}/compose?tid={tid}" class="btn btn-sm btn-primary" component="topic/reply" data-ajaxify="false" role="button"><i class="fa fa-reply visible-xs-inline"></i><span class="visible-sm-inline visible-md-inline visible-lg-inline"> [[topic:reply]]</span></a>
<button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<span class="caret"></span>
</button>
<ul class="dropdown-menu dropdown-menu-end" role="menu">
<li><a class="dropdown-item" href="#" component="topic/reply-as-topic" role="menuitem">[[topic:reply-as-topic]]</a></li>
</ul>
</div>
<!-- IF loggedIn -->
<!-- IF !privileges.topics:reply -->
<!-- IF locked -->
<a component="topic/reply/locked" class="btn btn-sm btn-primary" disabled><i class="fa fa-lock"></i> [[topic:locked]]</a>
<!-- ENDIF locked -->
<!-- ENDIF !privileges.topics:reply -->
<!-- IF !locked -->
<a component="topic/reply/locked" class="btn btn-sm btn-primary hidden" disabled><i class="fa fa-lock"></i> [[topic:locked]]</a>
<!-- ENDIF !locked -->
<!-- ELSE -->
<!-- IF !privileges.topics:reply -->
<a component="topic/reply/guest" href="{config.relative_path}/login" class="btn btn-sm btn-primary">[[topic:guest-login-reply]]</a>
<!-- ENDIF !privileges.topics:reply -->
<!-- ENDIF loggedIn -->
</div>
</div>
</div>
</div>
<div class="d-flex flex-wrap gap-2 align-items-center hidden-empty" component="topic/thumb/list">{{{ each thumbs }}}
<a class="d-inline-block" href="{./url}">
<img class="rounded-1 bg-light" style="width:auto; max-width: 4rem; height: 3.33rem;object-fit: contain;" src="{./url}" />
</a>
{{{ end }}}</div>
</div>
</div>
{{{ if merger }}}
<div component="topic/merged/message" class="alert alert-info d-flex justify-content-between flex-wrap">
<span>[[topic:merged-message, {config.relative_path}/topic/{mergeIntoTid}, {merger.mergedIntoTitle}]]</span>
<span>
<a class="fw-bold" href="{config.relative_path}/user/{merger.userslug}">{merger.username}</strong></a> <small class="timeago" title="{mergedTimestampISO}"></small>
</span>
</div>
{{{ end }}}
{{{ if forker }}}
<div component="topic/forked/message" class="alert alert-info d-flex justify-content-between flex-wrap">
<span>[[topic:forked-message, {config.relative_path}/topic/{forkedFromTid}, {forker.forkedFromTitle}]]</span>
<span>
<a class="fw-bold" href="{config.relative_path}/user/{forker.userslug}">{forker.username}</strong></a> <small class="timeago" title="{forkTimestampISO}"></small>
</span>
</div>
{{{ end }}}
{{{ if !scheduled }}}
<div component="topic/deleted/message" class="alert alert-warning d-flex justify-content-between flex-wrap{{{ if !deleted }}} hidden{{{ end }}}">
<span>[[topic:deleted-message]]</span>
<span>
{{{ if deleter }}}
<a class="fw-bold" href="{config.relative_path}/user/{deleter.userslug}">{deleter.username}</a> <small class="timeago" title="{deletedTimestampISO}"></small>
{{{ end }}}
</span>
</div>
{{{ end }}}
<ul component="topic" class="posts timeline" data-tid="{tid}" data-cid="{cid}">
{{{each posts}}}
<li component="post" class="{{{ if posts.deleted }}}deleted{{{ end }}} {{{ if posts.selfPost }}}self-post{{{ end }}} {{{ if posts.topicOwnerPost }}}topic-owner-post{{{ end }}}" data-index="{posts.index}" data-pid="{posts.pid}" data-uid="{posts.uid}" data-timestamp="{posts.timestamp}" data-username="{posts.user.username}" data-userslug="{posts.user.userslug}"{{{ if posts.allowDupe }}} data-allow-dupe="1"{{{ end }}}{{{ if posts.navigatorIgnore }}} data-navigator-ignore="1"{{{ end }}} itemprop="comment" itemtype="http://schema.org/Comment" itemscope>
<a component="post/anchor" data-index="{./index}" id="{increment(./index, "1")}"></a>
<meta itemprop="datePublished" content="{posts.timestampISO}">
<meta itemprop="dateModified" content="{posts.editedISO}">
{{{ if (!./index && widgets.mainpost-header.length) }}}
<div data-widget-area="mainpost-header">
{{{ each widgets.mainpost-header }}}
{widgets.mainpost-header.html}
{{{ end }}}
</div>
{{{ end }}}
<div class="clearfix post-header">
<div class="icon float-start">
<a href="<!-- IF posts.user.userslug -->{config.relative_path}/user/{posts.user.userslug}<!-- ELSE -->#<!-- ENDIF posts.user.userslug -->">
{buildAvatar(posts.user, "48px", true, "", "user/picture")}
{{{ if ./user.isLocal }}}
<span component="user/status" class="position-absolute top-100 start-100 border border-white border-2 rounded-circle status {posts.user.status}"><span class="visually-hidden">[[global:{posts.user.status}]]</span></span>
{{{ else }}}
<span component="user/locality" class="position-absolute top-100 start-100 lh-1 border border-white border-2 rounded-circle small" title="[[global:remote-user]]">
<span class="visually-hidden">[[global:remote-user]]</span>
<i class="fa fa-globe"></i>
</span>
{{{ end }}}
</a>
</div>
<small class="d-flex">
<div class="d-flex align-items-center gap-1 flex-wrap w-100">
<strong class="text-nowrap" itemprop="author" itemscope itemtype="https://schema.org/Person">
<meta itemprop="name" content="{./user.username}">
{{{ if ./user.userslug }}}<meta itemprop="url" content="{config.relative_path}/user/{./user.userslug}">{{{ end }}}
<a href="<!-- IF posts.user.userslug -->{config.relative_path}/user/{posts.user.userslug}<!-- ELSE -->#<!-- ENDIF posts.user.userslug -->" data-username="{posts.user.username}" data-uid="{posts.user.uid}">{posts.user.displayname}</a>
</strong>
{{{ each posts.user.selectedGroups }}}
{{{ if posts.user.selectedGroups.slug }}}
<a href="{config.relative_path}/groups/{./slug}" class="badge rounded-1 text-uppercase text-truncate" style="max-width: 150px;color:{./textColor};background-color: {./labelColor};"><i class="fa {{{ if ./icon }}}{./icon}{{{ if ./userTitle}}} me-1{{{ end }}}{{{else}}}hidden{{{ end }}}"></i><span class="badge-text">{{{ if ./userTitle }}}{./userTitle}{{{ end }}}</span></a>
{{{ end }}}
{{{ end }}}
<!-- IF posts.user.banned -->
<span class="badge bg-danger">[[user:banned]]</span>
<!-- ENDIF posts.user.banned -->
<span class="visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block">
{{{ if posts.toPid }}}
<a component="post/parent" class="btn btn-sm btn-ghost py-0 px-1 text-xs hidden-xs" data-topid="{posts.toPid}" href="{config.relative_path}/post/{encodeURIComponent(posts.toPid)}"><i class="fa fa-reply"></i> @{{{ if posts.parent.user.userslug }}}{posts.parent.user.username}{{{ else }}}[[global:guest]]{{{ end }}}</a>
{{{ end }}}
<span>
<!-- IF posts.user.custom_profile_info.length -->
&#124;
{{{each posts.user.custom_profile_info}}}
{posts.user.custom_profile_info.content}
{{{end}}}
<!-- ENDIF posts.user.custom_profile_info.length -->
</span>
</span>
<div class="d-flex align-items-center gap-1 flex-grow-1 justify-content-end">
<span>
<i component="post/edit-indicator" class="fa fa-pencil-square<!-- IF privileges.posts:history --> pointer<!-- END --> edit-icon <!-- IF !posts.editor.username -->hidden<!-- ENDIF !posts.editor.username -->"></i>
<span data-editor="{posts.editor.userslug}" component="post/editor" class="hidden">[[global:last-edited-by, {posts.editor.username}]] <span class="timeago" title="{isoTimeToLocaleString(posts.editedISO, config.userLang)}"></span></span>
<span class="visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block">
<a class="permalink text-muted" href="{config.relative_path}/post/{encodeURIComponent(posts.pid)}"><span class="timeago" title="{posts.timestampISO}"></span></a>
</span>
</span>
<span class="bookmarked"><i class="fa fa-bookmark-o"></i></span>
</div>
</div>
</small>
</div>
<br />
<div class="content" component="post/content" itemprop="text">
{posts.content}
</div>
<div class="post-footer">
{{{ if posts.user.signature }}}
<div component="post/signature" data-uid="{posts.user.uid}" class="post-signature">{posts.user.signature}</div>
{{{ end }}}
<div class="clearfix">
{{{ if !hideReplies }}}
<a component="post/reply-count" data-target-component="post/replies/container" href="#" class="threaded-replies user-select-none float-start text-muted {{{ if (!./replies || shouldHideReplyContainer(@value)) }}}hidden{{{ end }}}">
<span component="post/reply-count/avatars" class="avatars d-inline-flex gap-1 align-items-top hidden-xs {{{ if posts.replies.hasMore }}}hasMore{{{ end }}}">
{{{each posts.replies.users}}}
<span>{buildAvatar(posts.replies.users, "16px", true, "")}</span>
{{{end}}}
{{{ if posts.replies.hasMore}}}
<span><i class="fa fa-ellipsis"></i></span>
{{{ end }}}
</span>
<span class="replies-count small" component="post/reply-count/text" data-replies="{posts.replies.count}">{posts.replies.text}</span>
<span class="replies-last hidden-xs small">[[topic:last-reply-time]] <span class="timeago" title="{posts.replies.timestampISO}"></span></span>
<i class="fa fa-fw fa-chevron-down" component="post/replies/open"></i>
</a>
{{{ end }}}
<small class="d-flex justify-content-end align-items-center gap-1" component="post/actions">
<!-- This partial intentionally left blank; overwritten by nodebb-plugin-reactions -->
<span class="post-tools">
<a component="post/reply" href="#" class="btn btn-sm btn-link user-select-none <!-- IF !privileges.topics:reply -->hidden<!-- ENDIF !privileges.topics:reply -->">[[topic:reply]]</a>
<a component="post/quote" href="#" class="btn btn-sm btn-link user-select-none <!-- IF !privileges.topics:reply -->hidden<!-- ENDIF !privileges.topics:reply -->">[[topic:quote]]</a>
</span>
{{{ if ./announces }}}
<a component="post/announce-count" href="#" class="btn-ghost-sm" title="[[topic:announcers]]"><i class="fa fa-share-alt text-primary"></i> {./announces}</a>
{{{ end }}}
<!-- IF !reputation:disabled -->
<span class="votes">
<a component="post/upvote" href="#" class="btn btn-sm btn-link <!-- IF posts.upvoted -->upvoted<!-- ENDIF posts.upvoted -->">
<i class="fa fa-chevron-up"></i>
</a>
<span class="btn btn-sm btn-link" component="post/vote-count" data-votes="{posts.votes}">{posts.votes}</span>
<!-- IF !downvote:disabled -->
<a component="post/downvote" href="#" class="btn btn-sm btn-link <!-- IF posts.downvoted -->downvoted<!-- ENDIF posts.downvoted -->">
<i class="fa fa-chevron-down"></i>
</a>
<!-- ENDIF !downvote:disabled -->
</span>
<!-- ENDIF !reputation:disabled -->
<span component="post/tools" class="dropdown bottom-sheet d-inline-block {{{ if !posts.display_post_menu }}}hidden{{{ end }}}">
<a class="btn btn-link btn-sm dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-fw fa-ellipsis-v"></i></a>
<ul class="dropdown-menu dropdown-menu-end p-1 text-sm" role="menu"></ul>
</span>
</small>
</div>
<div component="post/replies/container"></div>
</div>
{{{ if (!./index && widgets.mainpost-footer.length) }}}
<div data-widget-area="mainpost-footer">
{{{ each widgets.mainpost-footer }}}
{widgets.mainpost-footer.html}
{{{ end }}}
</div>
{{{ end }}}
</li>
{{{ if (config.topicPostSort != "most_votes") }}}
{{{ each ./events}}}
<li component="topic/event" class="timeline-event text-muted" data-topic-event-id="{./id}" data-topic-event-type="{./type}">
<div class="timeline-badge">
<i class="fa {{{ if ./icon }}}{./icon}{{{ else }}}fa-circle{{{ end }}}"></i>
</div>
<span class="timeline-text">
{./text}
</span>
{{{ if (privileges.isAdminOrMod && ./id) }}}
&nbsp;<span component="topic/event/delete" data-topic-event-id="{./id}" data-topic-event-type="{./type}" class="timeline-text pointer" title="[[topic:delete-event]]"><i class="fa fa-trash"></i></span>
{{{ end }}}
</li>
{{{ end }}}
{{{ end }}}
{{{end}}}
</ul>
{{{ if browsingUsers }}}
<div class="visible-xs">
<!-- This partial intentionally left blank; overwritten by nodebb-plugin-browsing-users -->
<hr/>
</div>
{{{ end }}}
{{{ if config.enableQuickReply }}}
{{{ if privileges.topics:reply }}}
<div component="topic/quickreply/container" class="quick-reply d-flex gap-3 mb-4">
<div class="icon hidden-xs">
<a class="d-inline-block position-relative" href="{{{ if loggedInUser.userslug }}}{config.relative_path}/user/{loggedInUser.userslug}{{{ else }}}#{{{ end }}}">
{buildAvatar(loggedInUser, "48px", true, "", "user/picture")}
</a>
</div>
<form class="flex-grow-1 d-flex flex-column gap-2" method="post" action="{config.relative_path}/compose">
<input type="hidden" name="tid" value="{tid}" />
<input type="hidden" name="_csrf" value="{config.csrf_token}" />
<div class="quickreply-message position-relative">
<textarea rows="4" name="content" component="topic/quickreply/text" class="form-control mousetrap" placeholder="[[modules:composer.textarea.placeholder]]"></textarea>
<div class="imagedrop"><div>[[topic:composer.drag-and-drop-images]]</div></div>
</div>
<div>
<div class="d-flex justify-content-end gap-2">
<button type="button" component="topic/quickreply/upload/button" class="btn btn-ghost btn-sm border"><i class="fa fa-upload"></i></button>
<button type="button" component="topic/quickreply/expand" class="btn btn-ghost btn-sm border" title="[[topic:open-composer]]"><i class="fa fa-expand"></i></button>
<button type="submit" component="topic/quickreply/button" class="btn btn-sm btn-primary">[[topic:post-quick-reply]]</button>
</div>
</div>
</form>
<form class="d-none" component="topic/quickreply/upload" method="post" enctype="multipart/form-data">
<input type="file" name="files[]" multiple class="hidden"/>
</form>
</div>
{{{ end }}}
{{{ end }}}
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
<div class="pagination-block border border-1 text-bg-light text-center">
<div class="progress-bar bg-info"></div>
<div class="wrapper dropup">
<i class="fa fa-2x fa-angle-double-up pointer fa-fw pagetop"></i>
<a href="#" class="text-reset dropdown-toggle d-inline-block text-decoration-none" data-bs-toggle="dropdown" data-bs-reference="parent" aria-haspopup="true" aria-expanded="false">
<span class="pagination-text"></span>
</a>
<i class="fa fa-2x fa-angle-double-down pointer fa-fw pagebottom"></i>
<ul class="dropdown-menu dropdown-menu-end" role="menu">
<li>
<div class="row">
<div class="col-8 post-content"></div>
<div class="col-4 text-end">
<div class="scroller-content">
<span class="pointer pagetop">[[topic:first-post]] <i class="fa fa-angle-double-up"></i></span>
<div class="scroller-container">
<div class="scroller-thumb">
<span class="thumb-text"></span>
<div class="scroller-thumb-icon"></div>
</div>
</div>
<span class="pointer pagebottom">[[topic:last-post]] <i class="fa fa-angle-double-down"></i></span>
</div>
</div>
</div>
<div class="row">
<div class="col-6">
<button id="myNextPostBtn" class="btn btn-outline-secondary form-control" disabled>[[topic:go-to-my-next-post]]</button>
</div>
<div class="col-6">
<input type="number" class="form-control" id="indexInput" placeholder="[[global:pagination.enter-index]]">
</div>
</div>
</li>
</ul>
</div>
</div>
</div>
<div data-widget-area="sidebar" class="col-lg-3 col-sm-12 {{{ if !widgets.sidebar.length }}}hidden{{{ end }}}">
{{{each widgets.sidebar}}}
{{widgets.sidebar.html}}
{{{end}}}
</div>
</div>
<div data-widget-area="footer">
{{{each widgets.footer}}}
{{widgets.footer.html}}
{{{end}}}
</div>
{{{ if !config.usePagination }}}
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
{{{ end }}}