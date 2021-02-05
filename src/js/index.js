import Time from './time';
import weatherHandler from './weather';
import subTodoHandler from './subTodo';
import mainTodoHandler from './mainTodo';
import bgHandler from './background';
import { URL_BG, ACCESS_KEY, URL } from './utils/constants';


//obtain and display an image on background 
bgHandler(URL_BG, ACCESS_KEY, Time.getCurrentDate());

Time.displayCurrentTime();
Time.storeCurrentDateToLocalStorage();

// get and set weather info
weatherHandler();
// sub todo functionality handling
subTodoHandler(URL);
// main todo functionality handling
mainTodoHandler();

