export default {
  props: {
    // Начальное значение выбираемого свойства
    startValue: Number,
    // Конечное --\\--
    endValue: Number,
    // Начальное значение
    value: Object,
    // Изменяемость поля
    locked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Видимость списка выбора
      visibleList: false,
    };
  },
  computed: {
    // Нормализованное начальное значение
    normalizedStartValue() {
      return this.startValue;
    },
    // Нормализованное конечное значение
    normalizedEndValue() {
      return this.endValue;
    },
    // Список элементов для выбора текущего значения
    listItems() {
      const array = [];
      for (let i = this.normalizedStartValue; i <= this.normalizedEndValue; i += 1) {
        array.push(i);
      }
      return array;
    },
  },
  methods: {
    // Нажатие по текущему значению для отображения списка выбора
    clickCurValue() {
      if (!this.locked) {
        this.visibleList = 1 - this.visibleList;
      }
    },
    // Нажатие стрелки влево
    clickLeftPick() {
      if (this.locked) {
        return;
      }
      if (this.normalizedStartValue < this.value.value) {
        this.$emit('input', { value: this.value.value - 1, flag: 0 });
      } else {
        this.$emit('input', { value: this.value.value, flag: -1 });
      }
    },
    // Нажатие стрелки вправо
    clickRightPick() {
      if (this.locked) {
        return;
      }
      if (this.normalizedEndValue > this.value.value) {
        this.$emit('input', { value: this.value.value + 1, flag: 0 });
      } else {
        this.$emit('input', { value: this.value.value, flag: 1 });
      }
    },
    // Изменение текущего значения
    changeItem(item) {
      if (!this.locked && item !== this.value) {
        this.$emit('input', { value: item, flag: 0 });
      }
      if (this.visibleList) {
        this.visibleList = false;
      }
    },
    filters: {
      // Фильтр отображения значения
      filterPickValue(val) {
        return val;
      },
    },
  },
};
