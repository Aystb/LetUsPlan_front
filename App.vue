<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-plus/index.scss";
	@import "./css/flexCF.css";
	@import "./css/flex.css";
	@import "./css/text.css";
	@import "./css/position.css";
	@import "./css/maggin.css";
	@import "./css/color.css";
</style>
