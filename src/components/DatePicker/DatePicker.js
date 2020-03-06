import YearPicker from './YearPicker/YearPicker.vue';
import MonthPicker from './MonthPicker/MonthPicker.vue';
import DayPicker from './DayPicker/DayPicker.vue';

export default {
  name: 'DatePicker.vue',
  props: {
    // Value значение пикера
    value: {
      type: Date,
      default: () => new Date(),
    },
    // Включен ли пикер
    enabled: {
      type: Boolean,
      default: true,
    },
    // Нижняя граница отображаемой даты
    startDate: {
      type: Date,
    },
    // Верхняя граница отображаемой даты
    endDate: {
      type: Date,
    },
  },
  components: {
    yearPicker: YearPicker,
    monthPicker: MonthPicker,
    dayPicker: DayPicker,
  },
  data() {
    return {
      // Текущий выбранный год
      curYear: {
        value: this.value.getFullYear(),
        flag: 0,
      },
      // Текущий выбранный месяц
      curMonth: {
        value: this.value.getMonth(),
        flag: 0,
      },
    };
  },
  watch: {
    // Изменение текущего месяца
    curMonth(payload) {
      if (payload.flag !== 0) {
        this.changeMonthFlag(payload.flag);
      }
    },
  },
  methods: {
    // Изменение месяца с узменением года (Январь -> Декабрь и наоборот)
    changeMonthFlag(flag) {
      // Переход на год вепрёд
      if (flag === 1) {
        if (this.curYear.value < this.endDate.getFullYear()) {
          this.curMonth.value = 0;
          this.curYear.value += 1;
          this.curMonth.flag = 0;
        }
        return;
      }
      // Перехож на год назад
      if (this.curYear.value > this.startDate.getFullYear()) {
        this.curMonth.value = 11;
        this.curYear.value -= 1;
        this.curMonth.flag = 0;
      }
    },
    // Изменение выбранного дня (day - номер дня, type - переход на месяц (-1 0 1))
    changeDay(event) {
      const { day, type } = event;
      this.curMonth.value += type;
      // Переход на предыдущий год
      if (this.curMonth.value === -1) {
        if (this.curYear.value === this.startDate.getFullYear()) {
          this.curMonth.value -= type;
          return;
        }
        this.curMonth.value = 11;
        this.curYear.value -= 1;
      } else if (this.curMonth.value === 12) { // Перехож на следующий год
        if (this.curYear.value === this.endDate.getFullYear()) {
          this.curMonth.value -= type;
          return;
        }
        this.curMonth.value = 0;
        this.curYear.value += 1;
      }
      // Отправка события с текущим годом, месяцом и днём
      this.$emit('input', new Date(this.curYear.value, this.curMonth.value, day));
    },
  },
};
