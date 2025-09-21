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
<div class="groups list">
<div class="d-flex justify-content-between align-items-center gap-3 flex-wrap">
<div>
{{{ if allowGroupCreation }}}
<button class="btn btn-sm btn-primary" data-action="new"><i class="fa fa-plus"></i> [[groups:new-group]]</button>
{{{ end }}}
</div>
<div class="d-flex gap-3 align-items-center">
<select class="form-select form-select-sm" id="search-sort">
<option value="alpha">[[groups:details.group-name]]</option>
<option value="count">[[groups:details.member-count]]</option>
<option value="date">[[groups:details.creation-date]]</option>
</select>
<div class="input-group">
<input type="text" class="form-control form-control-sm" placeholder="[[global:search]]" name="query" value="" id="search-text">
<button id="search-button" class="btn btn-sm btn-primary">
<i class="fa fa-search"></i>
</button>
</div>
</div>
</div>
<hr />
<div component="groups/container" class="row" id="groups-list">
{{{ if groups.length }}}
{{{each groups}}}
<div class="col-lg-4 col-md-6 col-sm-12 mb-3" component="groups/summary" data-slug="{groups.slug}">
<div class="card h-100">
<a href="{config.relative_path}/groups/{groups.slug}" class="card-header list-cover" style="{{{ if groups.cover:thumb:url }}}background-image: url({./cover:thumb:url});background-size: cover;	min-height: 125px; background-position: {./cover:position}{{{ end }}}">
<h5 class="card-title d-inline-block mw-100 px-2 py-1 text-truncate text-capitalize fw-bold rounded-1" style="color: white;background-color: rgba(0,0,0,0.5);">{groups.displayName} <small>{formattedNumber(groups.memberCount)}</small></h5>
</a>
<div class="card-body">
<p class="text-muted">
{./description}
</p>
<ul class="members list-unstyled d-flex align-items-center gap-2 flex-wrap">
{{{each groups.members}}}
<li>
<a href="{config.relative_path}/user/{groups.members.userslug}">{buildAvatar(groups.members, "24px", true)}</a>
</li>
{{{end}}}
</ul>
</div>
</div>
</div>
{{{end}}}
{{{ else }}}
<div class="col-12">
<div class="alert alert-warning">
[[groups:no-groups-found]]
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