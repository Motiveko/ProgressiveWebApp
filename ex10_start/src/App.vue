<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon color="blue-grey" dark fixed></v-app-bar-nav-icon>
      <v-toolbar-title>사진 갤러리</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>


    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>

          <v-col>
            <v-card>
              <v-img></v-img>

              <v-card-title>
                <h1> 카드 제목</h1>
                <p> 카드 내용</p>
              </v-card-title>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

  </v-app>
</template>
<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
};
</script>
