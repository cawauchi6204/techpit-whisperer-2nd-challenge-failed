<template>
  <div class="user">
    <div class="user-title">
      <div class="avatar" :style="'background-image: url('+user.photoURL+')'"></div>
      <div class="texts">
        <h1>{{user.name}}</h1>
        <p v-if="myWhispers.length > 1">{{myWhispers.length}} whispers</p>
        <p v-else>{{myWhispers.length}} whisper</p>
      </div>
    </div>
    <div class="list">
      
      <Editor :currentUser="currentUser"/>
      
      <Item 
        v-for="whisper in orderBy(myWhispers,'date',-1)"
        :key="whisper.id" 
        :id="whisper.id"
        :uid="whisper.uid" 
      />
    </div>
  </div>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'
import firebase from 'firebase'
import Editor from '../components/Editor'
import Item from '../components/Item'
import Vue2Filters from 'vue2-filters'

export default {
  data () {
    return {
      user: {},
      myWispers:[],
      currentUser: {}
    }
  },
  firestore () {
    return {
      user:db.collection('users').doc(this.$route.params.uid),

      myWispers:db.collection('whisperers').where('uid','==',this.$route.params.uid)
    }
  },
  components: {
    Item,
    Editor
  },

  mixins:[Vue2Filters.mixin],
  created () {
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  }

// 該当ユーザーを検索、取得するためのコードをUser.vueのスクリプト部分に書きましょう。
// Firestoreデータベースをdbとしてインポート
// ユーザーデータを入れるための変数userを追加
// vuefireのドキュメント取得関数を追加
}
</script>


<style lang="stylus" scoped>
.user-title
  display flex
  flex-wrap nowrap
  justify-content flex-start
  margin 10px 0
.avatar
  width 50px
  height 50px
  border-radius 5px
  background-size cover
.texts
  margin-left 10px
  h1
    font-size 1.5rem
    margin 0
  p
    font-size .8rem
    margin 0
</style>