<div class="btn-group bottom-sheet" component="category/staff-filter">
	<button class="btn btn-ghost btn-sm ff-secondary d-flex gap-2 align-items-center dropdown-toggle" data-bs-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Filter by Course Staff">
		<i class="fa fa-fw fa-user-tie text-primary"></i>
		<span class="d-none d-md-inline fw-semibold">[[category:staff-filter-label]]</span>
	</button>

	<ul class="dropdown-menu p-1 text-sm" role="menu">
		<li>
			<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="#" data-staff-filter="all" role="menuitem">
				<span class="flex-grow-1">[[category:all-posts]]</span>
				<i component="category/staff-filter/check-all" class="flex-shrink-0 fa fa-fw text-secondary {{{ if !query.courseStaff }}}fa-check{{{ end }}}"></i>
			</a>
		</li>
		<li>
			<a class="dropdown-item rounded-1 d-flex align-items-center gap-2" href="#" data-staff-filter="staff" role="menuitem">
				<span class="flex-grow-1">[[category:staff-posts-only]]</span>
				<i component="category/staff-filter/check-staff" class="flex-shrink-0 fa fa-fw text-secondary {{{ if query.courseStaff }}}fa-check{{{ end }}}"></i>
			</a>
		</li>
	</ul>
</div>

