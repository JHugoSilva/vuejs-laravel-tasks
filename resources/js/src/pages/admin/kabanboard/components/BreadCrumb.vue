<template>
    <div class="row mt-5">
        <nav aria-label="breadcrumb" style="background-color: rgb(245, 245, 245); border-radius: 5px;">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">
                    <router-link to="">Create Project</router-link>
                </li>
                <li class="breadcrumb-item" style="text-decoration:none;" aria-current="page">
                    <router-link to="/projects">Project</router-link>
                </li>
            </ol>
        </nav>
    </div>
</template>
<style scoped>
.breadcrumb-item a {
    text-decoration: none;
    font-weight: 400;
}
</style>
