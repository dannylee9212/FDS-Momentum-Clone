import Time from './time';
import { bgHandler }  from './background';
import { URL_BG, ACCESS_KEY } from './utils/constants';

const time = new Time();

bgHandler(URL_BG, ACCESS_KEY, time.getCurrentDate());

time.displayCurrentTime();
time.storeCurrentDateToLocalStorage();

