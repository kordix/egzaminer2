<template>
<div class="" v-if="activeobszar=='tags'">

<select class="" name="" v-model="activetag">
    <option :value="tag.id" v-for="tag in tags">{{tag.name}} </option>

</select>

<ul>
    <li v-for="elem in tagpivot.filter((el)=>el.tag_id == activetag)">{{words2.find((el)=>el.id==elem.question_id).question}} - {{words2.find((el)=>el.id==elem.question_id).answer}}</li>
</ul>

</div>
</template>
