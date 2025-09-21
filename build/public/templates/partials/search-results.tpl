<div id="results" class="search-results col-md-12" data-search-query="{search_query}">
{{{ if matchCount }}}
<div class="alert alert-info">[[search:results-matching, {matchCount}, {search_query}, {time}]] </div>
{{{ else }}}
{{{ if search_query }}}
<div class="alert alert-warning">[[search:no-matches]]</div>
{{{ end }}}
{{{ end }}}
{{{each posts}}}
<div class="topic-row card clearfix mb-3">
<div class="card-body">
<div class="mb-2">
<a href="{config.relative_path}/user/{./user.userslug}">{buildAvatar(./user, "24px", true)}</a>
<a class="topic-title fw-semibold fs-5" href="{config.relative_path}/post/{encodeURIComponent(posts.pid)}">{./topic.title}</a>
</div>
{{{ if showAsPosts }}}
<div component="post/content" class="content">
{./content}
</div>
{{{ end }}}
<small class="post-info">
<a href="{config.relative_path}/category/{./category.slug}">
<div class="category-item d-inline-block">
{buildCategoryIcon(./category, "24px", "rounded-circle")}
{./category.name}
</div>
</a> &bull;
<span class="timeago" title="{./timestampISO}"></span>
</small>
</div>
</div>
{{{end}}}
{{{ if users.length }}}
<ul id="users-container" class="users-container list-unstyled d-flex flex-wrap gap-2">
{{{each users}}}
<li class="users-box registered-user text-center pb-3" data-uid="{users.uid}" style="width: 102px;">
<a href="{config.relative_path}/user/{users.userslug}">{buildAvatar(users, "64px", true)}</a>
<div class="user-info">
<div class="text-nowrap text-truncate">
<a href="{config.relative_path}/user/{users.userslug}">{users.username}</a>
</div>
<!-- IF section_online -->
<div class="lastonline">
<span class="timeago" title="{users.lastonlineISO}"></span>
</div>
<!-- ENDIF section_online -->
<!-- IF section_joindate -->
<div class="joindate">
<span class="timeago" title="{users.joindateISO}"></span>
</div>
<!-- ENDIF section_joindate -->
<!-- IF section_sort-reputation -->
<div class="reputation">
<i class="fa fa-star"></i>
<span>{formattedNumber(users.reputation)}</span>
</div>
<!-- ENDIF section_sort-reputation -->
<!-- IF section_sort-posts -->
<div class="post-count">
<i class="fa fa-pencil"></i>
<span>{formattedNumber(users.postcount)}</span>
</div>
<!-- ENDIF section_sort-posts -->
<!-- IF section_flagged -->
<div class="flag-count">
<i class="fa fa-flag"></i>
<span><a href="{config.relative_path}/flags?targetUid={users.uid}">{users.flags}</a></span>
</div>
<!-- ENDIF section_flagged -->
</div>
</li>
{{{end}}}
<!-- IF anonymousUserCount -->
<li class="users-box anon-user text-center pb-3" style="width: 102px;">
<span class="avatar avatar-rounded text-bg-secondary" component="avatar/icon" style="--avatar-size: 64px;">G</span>
<br/>
<div class="user-info">
<span id="online_anon_count">{anonymousUserCount}</span>
<span>[[global:guests]]</span>
</div>
</li>
<!-- ENDIF anonymousUserCount -->
</ul>
{{{ end }}}
{{{ if tags.length }}}
{{{each tags}}}
<h5 class="float-start tag-container me-5 mb-5 fw-bold">
<a href="{config.relative_path}/tags/{tags.valueEncoded}" data-tag="{tags.valueEscaped}"><span class="tag-item text-muted text-uppercase text-nowrap tag-class-{tags.class} me-2" data-tag="{tags.valueEscaped}">{tags.valueEscaped}</span><span class="tag-topic-count text-primary text-nowrap" title="{tags.score}">{formattedNumber(tags.score)}</span></a>
</h5>
{{{end}}}
{{{ end }}}
{{{ if categories.length }}}
<ul class="categories">
{{{each categories}}}
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
{{{ end }}}
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