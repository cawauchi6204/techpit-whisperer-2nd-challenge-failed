<template>
  <div class="home">
    <div class="list">
       <Item 
        v-for="whisper in orderBy(whispers,'date',-1)"
        :key="whisper.id"
        :id="whisper.id"
        :uid="whisper.uid" 
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '../main'
// Firestoreのデータベースをインポート
import Item from '../components/Item'

import Vue2Filters from 'vue2-filters'

export default {
  name: 'Home',
  components: {
    Item
  },

  data() {
    return {
      whispers:[]
    }
  },
// whispersという空の配列を、Firestoreから取得するwhisperデータの入れ物として用意しています。
  firestore() {
    return {
      whispers:db.collection('whisperers')
    }
  },
// 空の配列whispersにFirestore内にある「whispers」コレクション内のドキュメントを格納しています。
// これにより、<template>内でFirstoreに保存されたwhisperデータを、配列whispersとして参照できるようになりました。
  mixins:[Vue2Filters.mixin]
// mixinはコンポーネントのコンストラクタのオプションを抜き出して、コンポーネントに混ぜ込む機能。複数のコンポーネントで同一の処理を行っている場合、ミックスインを使うことで共通化できる
}
</script>

<style lang="stylus" scoped>
.item
  list-style none
  border-top 1px solid #eee
  padding 5px 15px
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  position relative
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
  .user-box
    margin 10px 10px 10px 0
    .avatar
      height 50px
      width 50px
      border-radius 50%
      border 1px solid #eee
      background-size cover
    .user-name
      margin 5px 0 0 0
      text-align center
      font-size .7rem
      line-height .7rem
      width 50px
  .content
    padding 10px
</style>
