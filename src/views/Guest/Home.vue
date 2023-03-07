<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from "vue";
export default defineComponent({
        setup() {
            const currentIndex = ref(0);
            const intervalId = ref<number>();
            const images = ref([
                { src: "Images/lorem.jpg"},
                { src: "Images/b.jpg"},
                { src: "Images/c.jpg"},
            ]); 
            const currentImage = computed(() =>
                require(`@/assets/${images.value[currentIndex.value].src}`)
            );
        
           /*  onMounted(() => {
                intervalId.value = setInterval(() => {
                    currentIndex.value = (currentIndex.value + 1) % images.value.length;
                }, 10000);
            }); */
            onUnmounted(() => {
                clearInterval(intervalId.value);
            });
            return {
                currentIndex,
                images,
                currentImage,
            
            };
        },
    });
</script>

<template lang="">
    <el-main class="bannerSection">
        <el-section>
            <div class="image-container fade">
                <transition name="fade">
                    <div :key="currentIndex">
                        <el-image
                            :src="currentImage"
                            class="my-image"
                        >
                        </el-image>
                    </div>
                    
                </transition> 
            </div>       
        </el-section>
    </el-main>
    
    
    <div class="wrapper">
        <div class="box-card">
            <div class="content">
                <h1>Beverages</h1>
                <button><router-link to="/about" class="router-link">Read More</router-link></button>
            </div>
            <img src="@/assets/Images/second.jpg" alt="">
        </div>
        <div class="box-card">
            <div class="content">
                <h1>Beverages</h1>
                <button><router-link to="/about" class="router-link">Read More</router-link></button>
            </div>
            <img src="@/assets/Images/second.jpg" alt="">
        </div>
        <div class="box-card">
            <div class="content">
                <h1>Beverages</h1>
                <button><router-link to="/about" class="router-link">Read More</router-link></button>
            </div>
            <img src="@/assets/Images/fourth.jpg" alt="">
        </div>
        <div class="box-card">
            <div class="content">
                <h1>Beverages</h1>
                <button><router-link to="/about" class="router-link">Read More</router-link></button>
            </div>
            <img src="@/assets/Images/fourth.jpg" alt="">
        </div>
    </div>


    <el-section class="newSection">
        <div class="container-news">
            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
                <h1>dasdsadasdsa</h1>
            </el-carousel>
        </div>
    </el-section>

   
</template>

<style> 
    .my-image {
        height: 35rem;
        width: 100rem;
        object-fit: cover;
    }
    .fade-enter-active,
    .fade-leave-active {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }
    .el-image {
        top: -1rem;
    }
    .box-card {
        width: 19rem;
        height: 17rem;
        background: #fafafa;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        border: none;
        border-radius: 1rem;
        
    }

    .box-card img {
        max-width: 100%;
    }
    .content {
        display: flex;
        padding: 1rem;
        column-gap: 5rem;
    }

    .content button {
        border: none;
        outline: none;
        background: #008978;
        margin-top: 7px;
        height: 3rem;
        width: 9rem;
    }

    .router-link {
        color: #fafafa;
        text-decoration: none;
    }

    .container {
        justify-content: center;
        display: flex;
        top: -7rem;
        position: relative;
        z-index: 10;
    }
    
    .container-news {
        background-color: skyblue;;
        clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
    }
    

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        top: -11rem;
        column-gap: 1rem;
        
    }

    
</style>