<template lang="html">
    <div>
        <h2>서브 페이지입니다.</h2>
        <button @click="fnMainPage">메인 페이지로 이동(라우터 함수 사용)</button>
    </div>
</template>

<script>

export default {
    methods: {
        fnMainPage() {
            // 여기서 this 는 Vue객체(global)을 가르킨다.
            this.$router.push('/main')
        }
    }   
}
</script>
