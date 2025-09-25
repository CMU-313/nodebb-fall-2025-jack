<div class="dashboard px-lg-4">
	<div class="col-12">
		<!-- IMPORT admin/partials/dashboard/stats.tpl -->
		<div class="card-header text-start mb-2">User Activity</div>
			<div class="table-responsive">
				<table class="table users-activity text-sm">
					<thead>
						<th class="text-muted">[[admin/manage/users:users.uid]]</th>
						<th class="text-muted">Number of Posts</th>
						<th class="text-muted">Number of Shares</th>
						<th class="text-muted">Number of Uploads</th>

					</thead>
					<tbody>
						{{{ if !users.length}}}
						<tr>
							<td colspan=4 class="text-center"><em>[[admin/dashboard:details.no-users]]</em></td>
						</tr>
						{{{ end }}}
						{{{ each users }}}
						<tr>
							<td>{../uid}</td>
							<td><a href="/admin/dashboard/user-activity/uid">{../postcount}</a></td>
							<td>10</td>
							<td>10</td>
						</tr>
						{{{ end }}}
						
					</tbody>
				</table>
			</div>
		<div>
	</div>
</div>