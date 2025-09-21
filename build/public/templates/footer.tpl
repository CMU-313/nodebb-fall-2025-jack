</div><!-- /.container#content -->
</main>
{{{ if !isSpider }}}
<div component="toaster/tray" class="alert-window">
<div id="reconnect-alert" class="alert alert-dismissible alert-warning fade hide" component="toaster/toast">
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-hidden="true"></button>
<p class="mb-0">[[global:reconnecting-message, {config.siteTitle}]]</p>
</div>
</div>
{{{ end }}}
<div id="taskbar" component="taskbar" class="taskbar fixed-bottom">
<div class="navbar-inner"><ul class="nav navbar-nav"></ul></div>
</div>
<script defer src="{relative_path}/assets/nodebb.min.js?{config.cache-buster}"></script>
{{{each scripts}}}
<script defer type="text/javascript" src="{scripts.src}"></script>
{{{end}}}
<script>
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', prepareFooter);
} else {
prepareFooter();
}
function prepareFooter() {
{{{ if useCustomJS }}}
{{customJS}}
{{{ end }}}
$(document).ready(function () {
app.coldLoad();
});
}
</script>
</body>
</html>