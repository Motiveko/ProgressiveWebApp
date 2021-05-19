<template>
  <v-app>
    <v-card>
      <v-app-bar dark color="lime">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>To-Do 리스트</v-toolbar-title>
      </v-app-bar>

      <v-content>
        <v-container>
          <v-row my-5>
            <v-col cols="8" offset="1">
              <v-text-field label="할 일" autofocus v-model="sTodoTitle">
              </v-text-field>
            </v-col>
            <v-col cols="2" my-2>
              <v-btn fab 
                    max-height="50px"
                    max-width="50px"
                    color="pink"
                    dark
                    @click="fnSubmitTodo()"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-list two-line v-for="item in oTodos" :key="item.key">
                <v-card flat color="grey lighten-3" v-if="!item.b_edit">
                  <v-list-item class="py-2">
                    <v-list-item-action>
                      <v-checkbox
                        v-model="item.b_completed"
                        @change="fnCheckboxChange(item)">
                      </v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title
                        :class="{'style_completed': item.b_completed}"
                      >
                        {{ item.todo_title }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="mt-2">
                        <v-icon class="pointer" @click="fnSetEditTodo(item['.key'])">create</v-icon>
                        <v-icon class="pointer" @click="fnRemoveTodo(item['.key'])">delete</v-icon>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
                <v-card v-else dark>
                  <v-list-item class="py-2">
                    <v-list-item-action>
                      <v-checkbox v-model="item.b_completed"></v-checkbox>
                    </v-list-item-action>
                    <v-card-text>
                      <v-text-field autofocus clearable v-model="item.todo_title">
                      </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-icon class="pointer" @click="fnSaveEdit(item)">create</v-icon>
                      <v-icon class="pointer" @click="fnCancelEdit(item['.key'])">cancel</v-icon>
                    </v-card-actions>
                  </v-list-item>
                </v-card>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-card>
  </v-app>
</template>

<script>
// @ : src 폴더를 의미
import {oTodosinDB} from '@/datasource/firebase'


export default {
  name: 'App',
  data: () => {
    return {
      oTodos: [],
      sTodoTitle: ''
    }
  },
  // firebase 쉽게 사용할 수 있게 변수 설정
  firebase: {
    oTodos: oTodosinDB
  },
  methods: {
    fnSubmitTodo() {
      oTodosinDB.push({
        todo_title: this.sTodoTitle,
        b_completed: false,
        b_edit: false
      })
      this.sTodoTitle = ''
    },
    fnRemoveTodo(pKey) {
      oTodosinDB.child(pKey).remove()
    },
    fnSetEditTodo(pKey) {

      // db구조는 트리 구조인데 각각 노드가 key값을 가져서 이걸로 참조하는 형태
      // 루트 노드에서 자식 노드 가져오기
      // update는 수정할 값만 적어주면 되는듯하다
      oTodosinDB.child(pKey).update({
        b_edit: true
      })
    },
    fnCancelEdit(pKey) { 
      oTodosinDB.child(pKey).update({
        b_edit: false
      })
    },
    fnSaveEdit(pItem) {
      const sKey = pItem['.key'];
      oTodosinDB.child(sKey).set({
        todo_title: pItem.todo_title,
        b_completed: pItem.b_completed,
        b_edit: false
      })
    },
    fnCheckboxChange(pItem) {
      const sKey = pItem['.key']
      oTodosinDB.child(sKey).update({
        b_completed: pItem.b_completed
      })
    }
  }
};
</script>

<style>
.pointer {
  cursor: pointer
}
.style_completed {
  text-decoration: line-through;
}
</style>