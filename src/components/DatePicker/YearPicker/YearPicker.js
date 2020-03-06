import pickerMixin from '@/mixins/picker'
export default {
  name: "YearPicker",
  mixins: [pickerMixin],
  data () {
    return {
      curValue: this.defValue === null ? new Date().getFullYear() : this.defValue,  // Текущий год
    }
  },
  computed: {
    normalizedStartValue () {
      return this.startValue === null ? new Date().getFullYear() - 100 : this.startValue;
    },
    normalizedEndValue () {
      return this.endValue === null ? new Date().getFullYear() + 10 : this.endValue;
    },
  },
}