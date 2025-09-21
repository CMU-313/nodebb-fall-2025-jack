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
<!-- IF sso.length --><div><!-- ENDIF sso.length -->
<div class="row">
<div class="col-md-3 col-sm-4">
<div class="account-picture-block text-center">
<div class="row mb-3">
<div class="col-12 hidden-xs">
<!-- IF picture -->
<img id="user-current-picture" class="avatar avatar-rounded" style="--avatar-size: 128px;" src="{picture}" />
<!-- ELSE -->
<div class="avatar avatar-rounded" style="background-color: {icon:bgColor}; --avatar-size: 128px;">{icon:text}</div>
<!-- ENDIF picture -->
</div>
</div>
<ul class="list-group mb-3">
{{{ if allowProfilePicture }}}
<li class="list-group-item"><a component="profile/change/picture" href="#" class="text-decoration-none text-reset">[[user:change-picture]]</a></li>
{{{ end }}}
{{{ if !username:disableEdit }}}
<li class="list-group-item"><a href="{config.relative_path}/user/{userslug}/edit/username" class="text-decoration-none text-reset">[[user:change-username]]</a></li>
{{{ end }}}
{{{ if !email:disableEdit }}}
<li class="list-group-item"><a href="{config.relative_path}/user/{userslug}/edit/email" class="text-decoration-none text-reset">[[user:change-email]]</a></li>
{{{ end }}}
{{{ if canChangePassword }}}
<li class="list-group-item"><a href="{config.relative_path}/user/{userslug}/edit/password" class="text-decoration-none text-reset">[[user:change-password]]</a></li>
{{{ end }}}
{{{ each editButtons }}}
<li class="list-group-item"><a href="{config.relative_path}{./link}" class="text-decoration-none text-reset">{./text}</a></li>
{{{ end }}}
</ul>
<!-- IF config.requireEmailConfirmation -->
<!-- IF email -->
<!-- IF isSelf -->
<a id="confirm-email" href="#" class="btn btn-warning <!-- IF email:confirmed -->hide<!-- ENDIF email:confirmed -->">[[user:confirm-email]]</a><br/><br/>
<!-- ENDIF isSelf -->
<!-- ENDIF email -->
<!-- ENDIF config.requireEmailConfirmation -->
<!-- IF allowAccountDelete -->
<!-- IF isSelf -->
<a id="deleteAccountBtn" href="#" class="btn btn-danger">[[user:delete-account]]</a><br/><br/>
<!-- ENDIF isSelf -->
<!-- ENDIF allowAccountDelete -->
</div>
</div>
<div class="<!-- IF !sso.length -->col-md-9 col-sm-8<!-- ELSE -->col-md-5 col-sm-4<!-- ENDIF !sso.length -->">
<form role="form" component="profile/edit/form">
<div class="mb-2">
<label class="form-label fw-bold" for="fullname">[[user:fullname]]</label>
<input class="form-control" type="text" id="fullname" name="fullname" placeholder="[[user:fullname]]" value="{fullname}">
</div>
<div class="mb-2">
<label class="form-label fw-bold" for="birthday">[[user:birthday]]</label>
<input class="form-control" type="date" id="birthday" name="birthday" value="{birthday}" placeholder="mm/dd/yyyy">
</div>
{{{ each customUserFields }}}
<div class="mb-2">
<label class="form-label fw-bold" for="{./key}">{./name}</label>
{{{ if ((./type == "input-text") || (./type == "input-link")) }}}
<input class="form-control" type="text" id="{./key}" name="{./key}" value="{./value}">
{{{ end }}}
{{{ if (./type == "input-number") }}}
<input class="form-control" type="number" id="{./key}" name="{./key}" value="{./value}">
{{{ end }}}
{{{ if (./type == "input-date") }}}
<input class="form-control" type="date" id="{./key}" name="{./key}" value="{./value}">
{{{ end }}}
{{{ if ((./type == "select") || (./type == "select-multi")) }}}
<select class="form-select" id="{./key}" name="{./key}" {{{ if (./type == "select-multi") }}} multiple{{{ end }}}>
{{{ each ./select-options}}}
<option value="{./value}" {{{ if ./selected }}}selected{{{ end }}}>{./value}</option>
{{{ end }}}
</select>
{{{ end }}}
</div>
{{{ end }}}
<div class="mb-2">
<label class="form-label fw-bold" for="groupTitle">[[user:grouptitle]]</label>
<div class="d-flex flex-column gap-2" component="group/badge/list">
{{{ each groups }}}
<div component="group/badge/item" class="d-flex gap-2 justify-content-between align-items-center" data-value="{./displayName}" data-selected="{./selected}">
<a href="{config.relative_path}/groups/{./slug}" class="badge rounded-1 text-uppercase text-truncate" style="max-width: 150px;color:{./textColor};background-color: {./labelColor};"><i class="fa {{{ if ./icon }}}{./icon}{{{ if ./userTitle}}} me-1{{{ end }}}{{{else}}}hidden{{{ end }}}"></i><span class="badge-text">{{{ if ./userTitle }}}{./userTitle}{{{ end }}}</span></a>
<div class="d-flex gap-1">
<button component="group/toggle/hide" type="button" class="btn btn-ghost btn-sm {{{ if !./selected }}}hidden{{{ end }}}" title="[[user:hide-group-title]]"><i class="fa fa-fw fa-eye"></i></button>
<button component="group/toggle/show" type="button" class="btn btn-ghost btn-sm {{{ if ./selected }}}hidden{{{ end }}}" title="[[user:show-group-title]]"><i class="fa fa-fw fa-eye-slash"></i></button>
{{{ if allowMultipleBadges }}}
<button component="group/order/up" type="button" class="btn btn-ghost btn-sm" title="[[user:order-group-up]]"><i class="fa fa-fw fa-chevron-up"></i></button>
<button component="group/order/down" type="button" class="btn btn-ghost btn-sm" title="[[user:order-group-down]]"><i class="fa fa-fw fa-chevron-down"></i></button>
{{{ end }}}
</div>
</div>
{{{ end }}}
</div>
</div>
<!-- IF allowAboutMe -->
<div class="mb-2">
<label class="form-label fw-bold" for="aboutme">[[user:aboutme]]</label> <small><label id="aboutMeCharCountLeft"></label></small>
<textarea class="form-control" id="aboutme" name="aboutme" rows="5">{aboutme}</textarea>
</div>
<!-- ENDIF allowAboutMe -->
<!-- IF allowSignature -->
<!-- IF !disableSignatures -->
<div class="mb-2">
<label class="form-label fw-bold" for="signature">[[user:signature]]</label> <small><label id="signatureCharCountLeft"></label></small>
<textarea class="form-control" id="signature" name="signature" rows="5">{signature}</textarea>
</div>
<!-- ENDIF !disableSignatures -->
<!-- ENDIF allowSignature -->
<a id="submitBtn" href="#" class="btn btn-primary">[[global:save-changes]]</a>
</form>
<hr class="visible-xs visible-sm"/>
</div>
<!-- IF sso.length -->
<div class="col-md-4 col-sm-4">
<label>[[user:sso.title]]</label>
<div class="list-group">
{{{each sso}}}
<div class="list-group-item">
<!-- IF ../deauthUrl -->
<a data-component="{../component}" class="btn btn-outline-secondary btn-sm float-end" href="{../deauthUrl}">[[user:sso.dissociate]]</a>
<!-- END -->
<a data-component="{../component}" href="{{{ if ./url }}}{./url}{{{ else }}}#{{{ end }}}" target="<!-- IF ../associated -->_blank<!-- ELSE -->_top<!-- ENDIF ../associated -->">
<!-- IF ../icon --><i class="fa {../icon}"></i><!-- ENDIF ../icon -->
<!-- IF ../associated -->[[user:sso.associated]]<!-- ELSE -->[[user:sso.not-associated]]<!-- ENDIF ../associated -->
{../name}
</a>
</div>
{{{end}}}
</div>
</div>
<!-- ENDIF sso.length -->
</div>
<!-- IF sso.length --></div><!-- ENDIF sso.length -->
</div>