<!--題目 1：顯示 / 隱藏判斷
有一段文字：
「載入中…」
需求：
當 isLoading 為 true 時顯示
為 false 時完全不存在於 DOM 中
👉 請問應該用哪一個指令？請寫出範例寫法

<template>
  <p v-if="isLoading">載入中......</p>
  <p v-else>內容顯示</p>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>-->

<!--------------------------------------------------------------------------->

<!--題目 2：v-if vs v-show（觀念題）
請回答下列敘述哪一個比較適合用 v-show，並說理由：
A. 切換 tab，內容會一直來回顯示/隱藏
B. 使用者是否為管理員，決定要不要顯示「後台管理」按鈕（幾乎不會變）

A. 切換 tab，內容會一直來回顯示/隱藏比較適合用 v-show，只用 CSS display 控制顯示隱藏；B的狀況下使用v-if，避免了 v-show 總是在 DOM 中留下的元素~
補充：tab 會 頻繁切換
v-show 不會反覆建立 / 銷毀 DOM
效能跟使用體驗都比較好
-->

<!--------------------------------------------------------------------------->

<!--題目 3：v-for 基礎
data 裡有：
data() {
  return {
    fruits: ['🍎 蘋果', '🍌 香蕉', '🍇 葡萄']
  }
}
👉 請用 v-for 產生一個 <ul> 清單
👉 並補上正確的 :key

<template>
  <ul>
    <li v-for="fruit in fruits" :key="fruit">
      {{ fruit }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      fruits: ['🍎 蘋果', '🍌 香蕉', '🍇 葡萄']
    }
  }
};
</script>-->

<!--------------------------------------------------------------------------->

<!--題目 4：v-for + 物件
data() {
  return {
    user: {
      name: 'Lia',
      age: 18,
      job: '前端學習中'
    }
  }
}
👉 請用 v-for 列出每一組「key : value」
<template>
  <ul>
    <li v-for="(value, key) in user" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: {
        name: 'Lia',
        age: 18,
        job: '前端學習中'
      }
    }
  }
};
</script>
-->

<!--------------------------------------------------------------------------->

<!--題目 5：methods + @click
有一顆按鈕：
點一下，數字 +1
👉 請寫出：
data
methods
template 中的 @click

<template>
  {{ count }}
  <button @click="myFunction">button</button>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      count: 0, 
    };
  },
  methods: {
    myFunction() {
      this.count += 1;
    },
  },
};
</script>-->

<!--------------------------------------------------------------------------->

<!--題目 6：v-model（文字輸入）
有一個輸入框，需求：
使用者輸入名字
即時顯示「你好，XXX」
👉 請寫出 input + 顯示文字的 Vue 寫法
<template>
  <p v-if="name">你好，{{ name }}</p> <br />
  <input type="text" v-model="name" />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: '',
    };
  },
};
</script>-->

<!--------------------------------------------------------------------------->

<!--題目 7：v-model 修飾符
下面需求該用哪個？
1️⃣ 使用者輸入帳號時，自動去除前後空白 → v-model.trim
2️⃣ 使用者輸入完成、離開輸入框後才更新資料 → v-model.lazy
👉 請寫出對應的 v-model 寫法-->

<!--------------------------------------------------------------------------->

<!--題目 8：checkbox（多選）
data：
data() {
  return {
    hobbies: []
  }
}
👉 請寫出「三個 checkbox」，勾選後會存進 hobbies 陣列

<template>
  <p>已選擇：{{ hobbies }}</p>
  <label>
    <input type="checkbox" value="hobby1" v-model="hobbies" />
    hobby1
  </label>
  <label>
    <input type="checkbox" value="hobby2" v-model="hobbies" />
    hobby2
  </label>
  <label>
    <input type="checkbox" value="hobby3" v-model="hobbies" />
    hobby3
  </label>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      hobbies: []
    }
  }
};
</script>-->

<!--------------------------------------------------------------------------->

<!--題目 9：radio（單選）
需求：
性別只能選一個
值為 male / female
👉 請寫出 radio 的 Vue 寫法

<template>
  <p>已選擇：{{ gender }}</p>
  <label>
    <input type="radio" value="male" v-model="gender" />
    male
  </label>
  <label>
    <input type="radio" value="female" v-model="gender" />
    female
  </label>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      gender: []
    }
  }
};
</script>-->

<!--------------------------------------------------------------------------->

<!--題目 10：表單 submit
有一個表單，需求：
點擊送出時不要刷新頁面
呼叫 submitForm 方法
👉 請寫出 <form> 的 Vue 寫法

<template>
  <form @submit.prevent="submitForm">
    <input type="text" v-model="username" placeholder="輸入姓名" />
    <button type="submit">送出</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
const username = ref('');
const submitForm = () => {
  console.log('表單已提交，', username.value);
  alert('送出成功！');
};
</script>
-->

<!--------------------------------------------------------------------------->

<!--加分題 🌟（觀念）
請回答：
❓ v-once 跟 v-pre 差在哪？
v-once可以防止顯示的變數被更改，是用在不會變的東西上 v-pre是為了完整顯示標籤內容，比如{{}}會完整顯示

<p v-once>{{ message }}</p>
作用：只渲染一次，之後資料更新不會改變畫面
使用場景：靜態內容、只需要顯示一次的資料

<p v-pre>{{ message }}</p>
作用：Vue 不會解析這個元素內的 template 語法，原樣顯示
使用場景：顯示程式碼範例、原始模板語法，或跳過不必要的模板解析
-->

<!--------------------------------------------------------------------------->

<!--
1️⃣ 為什麼 filteredStickers 不能存回 store？
filteredStickers 是「衍生資料」，不是資料來源
把衍生資料存 state 會造成雙資料源 → 同步問題

2️⃣ keyword 改變時，Vue 做了什麼？
Vue 的 reactivity system 追蹤 keyword →
computed 依賴 keyword →
觸發重新求值 →
Virtual DOM diff →
最小化更新 UI

3️⃣ computed 跟 methods 在這題差在哪？
👉 computed 有 cache
👉 只有依賴改變才會重算
👉 methods 每次 render 都執行
-->