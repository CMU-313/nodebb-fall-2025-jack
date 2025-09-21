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
<div class="tags">
{{{ if displayTagSearch }}}
{{{ if tags.length }}}
<div class="d-flex justify-content-end mb-3">
<div class="search">
<div class="input-group">
<input type="text" class="form-control form-control-sm" placeholder="[[global:search]]" id="tag-search">
<button class="btn btn-sm btn-primary" type="button">
<i class="fa fa-search"></i>
</button>
</div>
</div>
</div>
{{{ end }}}
{{{ end }}}
<hr/>
{{{ if !tags.length }}}
<div class="alert alert-warning">[[tags:no-tags]]</div>
{{{ end }}}
<div class="category row">
<div class="col-md-12 clearfix tag-list" data-nextstart="{nextStart}">
{{{each tags}}}
<h5 class="float-start tag-container me-5 mb-5 fw-bold">
<a href="{config.relative_path}/tags/{tags.valueEncoded}" data-tag="{tags.valueEscaped}"><span class="tag-item text-muted text-uppercase text-nowrap tag-class-{tags.class} me-2" data-tag="{tags.valueEscaped}">{tags.valueEscaped}</span><span class="tag-topic-count text-primary text-nowrap" title="{tags.score}">{formattedNumber(tags.score)}</span></a>
</h5>
{{{end}}}
</div>
</div>
</div>