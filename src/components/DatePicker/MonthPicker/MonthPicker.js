import pickerMixin from '@/mixins/picker';

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
  'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
export default {
  name: 'MonthPicker',
  mixins: [pickerMixin],
  props: {
    value: {
      type: Number,
      default: new Date().getMonth(),
    },
  },
  data() {
    return {};
  },
  computed: {
    normalizedStartValue: () => 0,
    normalizedEndValue: () => 11,
  },
  filters: {
    // Фильтр отображения названия месяца
    filterPickValue(val) {
      return months[val];
    },
  },
};
