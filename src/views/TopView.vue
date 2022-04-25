<template>
  <div class="home">
    <div class="form">
      <div class="field">
        <label for="name">名前</label>
        <input v-model="name" id="name">
        <p v-if="nameErrorFlg==true" class="error">必須入力です</p>
      </div>
      <div class="field">
        <label for="msg">メッセージ</label>
        <input v-model="msg" id="msg">
        <p v-if="msgErrorFlg==true" class="error">必須入力です</p>
      </div>
      <div class="field">
        <button class="form" @click="onNext">次へ</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

    const nameErrorFlg = ref(false);
    const msgErrorFlg = ref(false);
    const name = ref('');
    const msg = ref('');

    //次へボタン押下時処理
    //エラーメッセージ判定、storeへデータ保存、コンポーネント切り替え
    const onNext = () => {
      nameErrorFlg.value = (name.value == '') ? true : false;
      msgErrorFlg.value = (msg.value == '') ? true : false;

      if(name.value != '' && msg.value != '') {
        store.state.name = name.value;
        store.state.msg = msg.value;
        router.push('/frame');
      }
    };

    return {
      onNext,
      nameErrorFlg,
      msgErrorFlg,
      name,
      msg
    };
  }
});
</script>

<style scoped>
.form {
  width: 90%;
  margin: 10px auto;
  color: #000;
}
.field {
  margin: 10px auto;
  width: 100%;
}
label {
  text-align: left;
  margin: 0 auto 0 0;
  display: block;
}
input {
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto 0 0;
  display: block;
  font-size: 22px;
  padding: 2px;
}
.form .field button {
  display: block;
  width: 60%;
  outline: none;
  font-size: 24px;
  margin: 20px auto;
}
.error {
  font-size: 14px;
  color: red;
  width: 100%;
  text-align: left;
  margin: 0;
}
</style>
