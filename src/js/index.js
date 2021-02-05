import Time from './time';
import weatherHandler from './weather';
import subTodoHandler from "./subTodo";
import { DEFAULT_STATE, URL } from './utils/constants'

const time = new Time();
time.displayCurrentTime();

// get and set weather info
weatherHandler();
subTodoHandler(DEFAULT_STATE, URL);
