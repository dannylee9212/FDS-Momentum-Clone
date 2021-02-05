export default class Time {
    #todayDate = '';
    #currentDate = '';

    constructor() {
        this.#todayDate = new Date();
        this.#currentDate = this.#todayDate.getDate();
    }

    static addZeroForTime(value) {
        return String(value).length === 1 ? '0' + value : value; 
    }

    displayCurrentTime() {
        document.getElementById('currentTime').innerHTML = `${Time.addZeroForTime(this.#todayDate.getHours())}:${Time.addZeroForTime(this.#todayDate.getMinutes())}`
    }

    storeCurrentDateToLocalStorage() {
        localStorage.setItem('current-date', this.#currentDate);
    }

    getCurrentDate() {
        return this.#currentDate;
    }
}