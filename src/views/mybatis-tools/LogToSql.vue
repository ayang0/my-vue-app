<script setup>
import { computed, ref } from 'vue'
import { format } from 'sql-formatter'
const mybatisLog = ref('')
const sqlRef = ref('')
const extractSql = computed(() => {
    const regex = /(?<=(Preparing:))(.*)\S/
    const match = mybatisLog.value.match(regex)
    // console.log(match)
    return match ? match[0].trim() : ''
})
const extractParameters = computed(() => {
    const regex = /(?<=(Parameters:))(.*)\S/
    const match = mybatisLog.value.match(regex);
    if (!match) return [];
    const paramString = match[0];
    const params = paramString.split(',');
    return params.map(param => {
        const [value, type] = param.split('(');
        return [value.trim(), type ? type.slice(0, -1).trim() : 'Unknown'];
    });
})
const bindParameters = () => {
    const arr = extractParameters.value.map((arr) => { 
        return `'${arr[0]}'`
    })
    // console.log(arr)
    sqlRef.value = format(extractSql.value, {
        params: arr,
        language: 'mysql'
    })
}
const clear = () => {
    mybatisLog.value = ''
    sqlRef.value = ''
}
</script>

<template>
    <div class="font-sans h-screen flex flex-col">
        <header class="w-full h-1/6 flex justify-evenly items-center">
            <h1 class="m-0 text-center text-4xl font-bol">Mybatis Sql Log => SQL
            </h1>
        </header>
        <section class="flex h-5/6 justify-evenly items-center">
            <textarea id="log" v-model="mybatisLog" class="block p-2.5 w-2/5 w h-5/6 textarea textarea-bordered"
                placeholder="Mybatis Sql Log">
            </textarea>
            <div class="flex h-5/6 flex-col justify-evenly">
                <button @click="bindParameters" class="btn btn-primary">转换</button>
                <button @click="clear" class="btn btn-secondary">清空</button>
            </div>
            <textarea id="result" v-model="sqlRef" class="block p-2.5 w-2/5 h-5/6 textarea textarea-bordered"
                placeholder="SQL">
            </textarea>
        </section>
    </div>
</template>

<style scoped>

</style>