<template>
  <div>
    <date-picker
      v-model="dt"
      :start-date="new Date(2000, 0, 1)"
      :end-date="new Date(2100, 11, 1)"
    ></date-picker>
    {{dt}}
  </div>
</template>

<script>
import datePicker from '@/components/DatePicker/DatePicker.vue';

export default {
  name: 'App',
  components: {
    datePicker,
  },
  data() {
    return {
      dt: new Date(),
    };
  },
};
</script>

<style scoped>

</style>
