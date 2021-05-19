<template lang="html">
    <div>
        <h2>메인 페이지입니다.</h2>
        <button @click="fnSubPage">서브 페이지로 이동(라우터 함수 사용)</button>
    </div>
</template>

<script>

export default {
    methods: {
        fnSubPage() {
            // Vue객체의 속성 변수(data, el, router..)에 접근하기 위해서는 $를 반드시 붙여야한다.
            this.$router.push('/sub')
        }
    }   
}
</script>
