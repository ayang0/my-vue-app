<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const apps = [
    {
        id: 1,
        title: 'Mybatis SQL 转换器',
        content: '一个简单的工具，用于将 Mybatis SQL 日志转换为格式化的 SQL 查询，方便阅读和理解。',
        picUrl: 'https://mybatis.org/images/mybatis-logo.png',
        path: '/mybatis-log-convert-sql',
    },
]
const routerPath = (path) => {
    router.push(path);
}
</script>

<template>
    <div class="h-full flex items-center justify-center">
        <div class="container">
            <div class="card w-80 bg-base-100 shadow-xl" v-for="app in apps" :key="app.id">
                <figure><img :src="app.picUrl" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ app.title }}</h2>
                    <p>{{ app.content }}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary" @click="routerPath(app.path)">跳转</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: 50px 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, 20rem);
    justify-content: space-evenly;
    grid-gap: 30px;
}
</style>