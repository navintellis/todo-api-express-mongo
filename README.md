# todo-api-express-mongo
Simple Implementation api for Todo App in express JS with mongo db

## Overview

### High Level Functional Understanding
* The user lands on Home Page with a functionality(page management) to add, rename and delete a Page. 
* One can view the list of previously added pages
* On click of page entry the user is navigated to task management screen, where one can view all task, add new task, update existing task, delete as well as mark a task completed

### High Level Database View
* Page-
  * id
  * pageName
  * Tasks(List)-
    * Task:
      * id
      * description
      * isCompleted 

**Credits**
* Reference taken from - https://vsvaibhav2016.medium.com/create-crud-application-in-express-js-9b88a5a94299