import Time from './time';
import weatherHandler from './weather';
import subTodoHandler from './subTodo';
import mainTodoHandler from './mainTodo';
import bgHandler from './background';
import { URL_BG, ACCESS_KEY, URL } from './utils/constants';


const time = new Time();

//obtain and display an image on background 
bgHandler(URL_BG, ACCESS_KEY, time.getCurrentDate());

time.displayCurrentTime();
time.storeCurrentDateToLocalStorage();

// get and set weather info
weatherHandler();
// sub todo functionality handling
subTodoHandler(URL);
// main todo functionality handling
mainTodoHandler();

