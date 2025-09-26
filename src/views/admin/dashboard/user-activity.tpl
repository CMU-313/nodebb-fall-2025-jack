<div class="dashboard px-lg-4">
	<div class="col-12">
		<div class="card-header text-start mb-2">
			<a href="/admin/dashboard/users">Back to Users</a>
		</div>

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
						{* couldn't figure out where they did it for postcount in the backend, so just made a quick frontend fix *}
						<td>{{{ if ../sharesCount }}}{../sharesCount}{{{ else }}}0{{{ end }}}</td>
    					<td>{{{ if ../uploadsCount }}}{../uploadsCount}{{{ else }}}0{{{ end }}}</td>
					</tr>
					{{{ end }}}
					
				</tbody>
			</table>
		</div>

	</div>
</div>