<template>
  <div>
    <vue-easy-lightbox
      :visible="visible"
      :imgs="projectImages"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
    <h1 class="text-xl font-semibold">{{ project.title }}</h1>
    <div class="w-full my-2">
      <div
        v-for="(img, index) in projectImages"
        :key="index"
        @click="showImg(index)"
      >
        <img
          v-if="index < 1"
          loading="lazy"
          class="rounded-md"
          :src="img"
          :alt="project.title"
        />
      </div>
    </div>
    <div>
      <h2 class="font-semibold tracking-wide">About</h2>
      <p class="text-gray-800">
        {{ project.details }}
      </p>
    </div>
    <div>
      <h2 class="font-semibold tracking-wide my-3">
        Notable Technologies used
      </h2>
      <ul class="text-gray-400 flex justify-around flex-col sm:flex-row">
        <li
          v-for="(skill, index) in project.skills"
          :key="index"
          class="transition-colors hover:text-blue-500"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
    <div class="flex justify-evenly flex-col md:flex-row">
      <div>
        <h2 class="font-semibold tracking-wide my-3">
          Site:
        </h2>
        <a
          class="px-2 py-1 font-thin text-white rounded-md"
          :class="
            !project.link ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'
          "
          :href="project.link"
          target="_blank"
          >Visit Site</a
        >
      </div>
      <div v-if="project.github">
        <h2 class="font-semibold tracking-wide my-3">
          Github Repositary:
        </h2>
        <a
          class="px-2 py-1 font-thin text-white rounded-md bg-blue-500"
          :href="project.github"
          target="_blank"
          >Visit Repositary</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppProjectModal",
  props: {
    project: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      visible: false,
      index: 0,
      projectImages: [],
    };
  },
  methods: {
    getImgUrl() {
      let imgs = this.project.img || [];
      let newArr = [];
      imgs.forEach((img) => {
        newArr.push(
          new URL(`../../assets/portfolio/${img}`, import.meta.url).href
        );
      });

      this.projectImages = newArr;
    },

    showImg(index) {
      this.index = index;
      this.visible = true;
    },

    handleHide() {
      this.visible = false;
    },
  },
  watch: {
    project: {
      deep: true,
      handler() {
        this.getImgUrl();
      },
    },
  },
  created() {
    this.getImgUrl();
  },
};
</script>
