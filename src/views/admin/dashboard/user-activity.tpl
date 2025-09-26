<div class="dashboard px-lg-4">
	<div class="col-12">
		<div class="table-responsive">
			<table class="table users-activity text-sm">
				<thead>
					<th class="text-muted">[[admin/manage/users:users.uid]]</th>
					<th class="text-muted">[[admin/manage/users:users.username]]</th>
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
						<td>{../username}</td>
						<td>{../postcount}</td>
						<td>{../sharesCount}</td>
						<td>{../uploadsCount}</td>
					</tr>
					{{{ end }}}
					
				</tbody>
			</table>
		</div>

	</div>
</div>