var pageContentEl= document.querySelector("#page-content");
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();   
    
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //sent it as an argument to createTaskEl
    createTaskEl(taskDataObj);
   
}

var createTaskEl = function(taskDataObj) {
    // Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Add task id as a custom attribute
    listItemEl.setAttribute("data-task-id",taskIdCounter);

    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML= "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>"+ taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    
    //give counter id
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl); 

    //Increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
  //create div element with class = task-actions
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className="task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);


  // dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name","status-change");
  statusSelectEl.setAttribute("data-task-id",taskId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do","In Progress","Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
    
    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);
//Function to edit a task
var editTask = function(taskId) {
    //Get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
  
    //reload info into prompt
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent= "Save Task";
    //give task ID of current task
    formEl.setAttribute("data-task-id", taskId);

};
//Function to delete a task
var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
}


var taskButtonHandler = function (event) {
  // get target from event
  var targetEl = event.target
  
  //The edit button is clicked
  if (targetEl.matches(".edit-btn")){
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
  }

  // The delete button is clicked
  if(targetEl.matches(".delete-btn")){
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
  }

}

pageContentEl.addEventListener("click",taskButtonHandler);