<template>
	<view >
		this is LUP
		<u-icon name="map" size="24" ></u-icon>
		<div>{{ testStore.item }}</div>
	</view>
</template>

<script setup>
import {useTestStore} from '../../store/testStore'
		const testStore = useTestStore()
</script>

<style>
	

	
</style>
