<template>
  <div>
     <d-player :options="options"
              @play="play"
              ref="player">
    </d-player>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        video: {
          url: 'http://p6k20rdt2.bkt.clouddn.com/FoiCdTJ3kxLZGCICyUZn7VlV9Di1'
        },
        autoplay: false,
        contextmenu: [
          {
            text: 'GitHub',
            link: 'https://github.com/MoePlayer/vue-dplayer'
          }
        ]
      },
      player: null
    }
  },
  mounted() {
    this.player = this.$refs.player.dp
  },
  methods: {
    play() {
      console.log('play callback')
    },
    switchHandle() {
      this.player.switchVideo({
        url: 'http://static.smartisanos.cn/common/video/video-jgpro.mp4'
      })
    }
  }
}
</script>

<style>

</style>
