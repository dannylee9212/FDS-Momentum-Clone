import Time from './time';
import weatherHandler from './weather';

const time = new Time();

time.displayCurrentTime();

// get and set weather info
weatherHandler();
