export default class Time {
    #todayDate = '';
    #hours = '';
    #minutes = '';

    constructor() {
        this.#todayDate = new Date();
        this.#hours = this.#todayDate.getHours();
        this.#minutes = this.#todayDate.getMinutes();
    }
    
    displayCurrentTime() {
        document.getElementById('currentTime').innerHTML = `${this.addZeroForTime(this.#hours)}:${this.addZeroForTime(this.#minutes)}`
    }

    addZeroForTime(value) {
        return String(value).length === 1 ? '0' + value : value; 
    }
}