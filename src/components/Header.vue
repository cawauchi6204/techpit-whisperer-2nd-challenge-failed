<template>
  <header>
    <router-link to="/">
      <h1>whisp.</h1>
    </router-link>
    <!-- ユーザーがいる場合には該当ユーザーのアイコンとサインアウトボタンを表示、ユーザーがいない場合にはサインインボタンを表示するようにしています。 -->
    <div
      class="btns"
      v-if="currentUser"
    >
      <router-link to="'/user/'+currentUser.uid">
      <button
        :style="'background-image:url('+currentUser.photoURL+')'"
      >
      </button>
      </router-link>
      <button>
        <fa icon="sign-out-alt" @click="signOut" />
      </button>
    </div>
    <div
      class="btns"
      v-else
    >
      <button>
        <fa icon="user" @click="signIn"/>
      </button>
      <button>
      </button>
    </div>
  </header>
</template>

<script>
import { auth } from '../main'
import firebase from 'firebase'

import { db } from '../main'

export default {
// 前パートで作成したサインイン用の関数とは違って、今回のユーザー状態を確認するための関数は、ページが表示された時点で自動的に実行したいものです。そのため、サインイン用の関数をmethods: {}内で作成したのに対して、今回の関数は、created () {}という別の項目の中に作成する必要があります。
// こちらのコードでは、currentUserという、サインイン中のユーザーデータを格納する変数をdata() {}内に作成したのち、上の関数を追加し、ユーザーの状態が変わるごとにこの変数にユーザーデータを格納するようにしています。
// これにより、<template>内でもcurrentUserとしてサインイン中のユーザーのデータにアクセスできるようになりました。
  data () {
    return {
      currentUser:{}
    }
  },
  created () {
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
// signInの中身については、まず、先に紹介したFirebaseプラグインのサインイン関数を呼び出します。その後、.then((result) => )とすることで、サインインの結果得られたデータをresultに格納します。この時、result.userでサインインしたユーザーのデータを取得できるようになるので、
// JAVASCRIPT
// alert('こんにちは、'+result.user.displayName+'さん！')
// とし、ユーザー名を含む挨拶文をアラートで表示させるようにしています。
// signOut関数では、クリック時にサインアウトの可否を問うポップアップを表示させるようにし、そこでOKが選ばれた場合に、Firebaseプラグインのサインアウト用関数が実行されるようにしています。サインアウト後、アラートを表示するとともに、
// JAVASCRIPT
// this.$router.push('/'),
// location.reload()
// でトップページに遷移、ページをリロードするようにします。リロードの設定は、必ずしも必要ではありませんが、サインアウト後、稀に正常にページが表示されなくなることがあるので、そのための対策として入れています。
// 最後に、テンプレート側のサインインボタン部分に、signIn関数をクリックアクションとして追加します。クリック時のアクションは、@clickを用いて、
// HTML
// <button @click="関数名">
// とすることで設定できます。
  methods: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
      .then((result) => {

        this.$router.push('/user/'+result.user.uid)

        alert('Hello ,' + result.user.displayName + '!')

        this.createUser(result.user)
      })
    },
    createUser (user) {
      db.collection('users').doc(user.uid).set({
        'name':user.displayName,
        'photoURL':user.photoURL,
        'email':user.email
      },{ merge:true })
    },
// userを引数とする関数createUserを作成しています。createUserでは、userのuidをIDとするドキュメントをusersコレクションに追加し、name、photoURL、emailをフィールドとして保存するようにしています。
// その上で、signIn関数の中にこのcreateUserを追加します。同じコンポーネント内で作成した関数を引用するには、this.<関数名>とします。また、signIn関数内ではresult.userにサインインしたユーザーのデータが入っているので、createUserの引数にresult.userを使います。
// こうすることで、signIn発動時に、サインインしたユーザーのドキュメントがFirestore内に作成されるようになりました。
    signOut () {
      if (window.confirm('本当にサインアウトしますか？')) {
        auth.signOut()
        .then(() => {
          alert('サインアウトできました')
          this.$router.push('/'),
          location.reload()
        })
      }
    }
   }
}
// サインイン機能は、サインインボタンを作成したHeader.vue内で実装していきます。具体的には、
// サインイン/サインアウトのための関数をスクリプト内に追加
// ヘッダー内のサインインボタンがクリックされた場合にそれが発動するようにする
// という手順で進めます。
// まず、関数の追加です。下で出てくるように、Firebaseがサインイン用の関数をすでに用意してくれているので、こちらを使います。
// Header.vueに<script>部分を追加し、その中でFirebaseのプラグインをインポートしてください。
</script>

<style lang="stylus" scoped>
  header
    position fixed
    top 0
    width 100%
    text-align center
    padding 10px
    h1
      width fit-content
      margin 0 auto
      font-size 1.4rem
    .btns
      position absolute
      top 10px
      right 30px
      cursor pointer
      img
        width 100%
</style>