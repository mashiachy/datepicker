const nmDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const nmbDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeap(year, month) {
  if (month !== 1) {
    return false;
  }
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

export default {
  name: 'DayPicker',
  props: {
    // Недоступность пикера
    locked: {
      type: Boolean,
      default: false,
    },
    // Текущая выбранная дата
    nowDate: {
      type: Date,
      default: new Date(),
    },
    // Отображаемый год
    curYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
    // Отображаемый месяц
    curMonth: {
      type: Number,
      default: new Date().getMonth(),
    },
  },
  data() {
    return {
      // Имена дней недели
      nmDays,
      // Количество дней в месяцах
      nmbDays,
    };
  },
  computed: {
    // Массив дней для отображения ({ day: номер дня, type: расположение месяца дня -1 0 1})
    listItems() {
      const array = [];
      // Добавление дней предыдущего месяца
      let frsDay = new Date(this.curYear, this.curMonth, 1).getDay();
      frsDay = frsDay === 0 ? 6 : frsDay - 1;
      const prvMnth = this.curMonth === 0 ? 11 : this.curMonth - 1;
      for (let i = 0; i < frsDay; i += 1) {
        array.push({
          day: (isLeap(this.curYear, this.curMonth - 1) ? 29
            : this.nmbDays[prvMnth]) + i - frsDay + 1,
          type: -1,
        });
      }
      // Добавление дней текущего месяца
      let nmb = this.nmbDays[this.curMonth];
      if (isLeap(this.curYear, this.curMonth)) {
        nmb = 29;
      }
      for (let i = 1; i <= nmb; i += 1) {
        array.push({
          day: i,
          type: 0,
        });
      }
      // Добавление дней следующего месяца
      let nxtDay = new Date(this.curYear, this.curMonth + 1, 1).getDay();
      nxtDay = nxtDay === 0 ? 6 : nxtDay - 1;
      for (let i = 1; i <= (7 - nxtDay) % 7; i += 1) {
        array.push({
          day: i,
          type: 1,
        });
      }
      return array;
    },
  },
  methods: {
    // Клик по дню
    clickDay(dayObj) {
      if (!this.locked) {
        this.$emit('changed-day', dayObj);
      }
    },
    isToday({ day, type }) {
      if (this.nowDate.getDate() !== day) {
        return false;
      }
      if (this.curMonth + type !== this.nowDate.getMonth()) {
        return false;
      }
      return this.curYear === this.nowDate.getFullYear();
    },
  },
};
