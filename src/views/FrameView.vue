<template>
  <div class="frame">
    <canvas id="canvas" width="1024" height="683"></canvas>
  </div>
  <div class="download">
    <a href="" download="" id="download_link" @click="canDownload">ダウンロード</a>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    onMounted(() => {
      const store = useStore();
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      //画像定義
      const img = new Image();
      img.src = '/img/sakura.jpeg';
      
      img.onload = function() {
        //画像サイズ取得
        const imgWidth = img.width;
        const imgHeight = img.height;
        //canvasサイズ取得
        const canWidth = canvas.width;
        //画像をcanvasサイズに合わせて描画するために縦横比を取得
        const compression = canWidth / imgWidth;
        const compHeight  = compression * imgHeight;
        //画像描画
        ctx.drawImage(img, 0, 0, canWidth, compHeight);
        //文字設定
        ctx.font = "60px 'Kosugi Maru'";
        ctx.textAlign = "left";        // 左右中央
        ctx.textBaseline = "middle";   // 上下中央
        //文字描画
        const nameData = (store.state.name != '') ? store.state.name + 'さん' : '';
        const msgData = store.state.msg;
        ctx.fillText(nameData, 50, 80, 500);
        ctx.fillText(msgData, 50, 580, 500);
      }
    });
    
    //ダウンロードリンク押下時、ダウンロード処理
    const canDownload = () => {
      const dlLink = document.getElementById('download_link');
      const canvas = document.getElementById('canvas');
      dlLink.href = canvas.toDataURL();
      dlLink.download = 'sakura.jpeg';
    }   

    return {
      canDownload
    }
  },
})
</script>

<style scoped>
.frame {
  width: 90%;
  margin: 10vh auto 0;
  position: relative;
}
.frame canvas {
  display: block;
  width: 100%;
}
</style>
