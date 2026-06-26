let btnSubmit = document.querySelector("#submit");
let tasksForm = document.querySelector("#taskForm");
let tasksContainer = document.querySelector(".all-tasks");

let arrTasks = [];

if (localStorage.getItem("task")) {
  arrTasks = JSON.parse(localStorage.getItem("task"));
}

getTasks();

btnSubmit.onclick = defaultSubmitHandler;

function defaultSubmitHandler() {
  let title = document.querySelector("#title").value.trim();

  if (title === "") {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please enter a task.",
      confirmButtonColor: "#3f3d56",
    });
    return;
  }

  const isAdded = addTaskToArr(title);

  if (isAdded) {
    document.querySelector("#title").value = "";
  }
}

function addTaskToArr(title) {
  let deadlineInput = document.querySelector(
    'input[type="datetime-local"]'
  ).value;

  if (!deadlineInput) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please select a deadline.",
      confirmButtonColor: "#3f3d56",
    });
    return false;
  }

  let deadlineDate = new Date(deadlineInput);
  let now = new Date();

  if (deadlineDate <= now) {
    Swal.fire({
      icon: "warning",
      title: "Invalid Date",
      text: "Please choose a future date and time.",
      confirmButtonColor: "#3f3d56",
    });
    return false;
  }

  const myTask = {
    id: Date.now(),
    myTitle: title,
    createdAt: new Date(),
    deadline: deadlineInput,
    completed: false,
  };
  arrTasks.push(myTask);
  addTasksToPage(arrTasks);
  addTasksToLocalStorage(arrTasks);

  return true;
}

function addTasksToPage(arrTasks) {
  tasksContainer.innerHTML = "";

  arrTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  arrTasks.forEach((myTask) => {
    let newTask = document.createElement("div");
    newTask.className = "task";
    newTask.setAttribute("data-id", myTask.id);

    const getTimeLeft = () => {
      const taskDeadline = new Date(myTask.deadline);
      const now = new Date();
      const diffTime = taskDeadline - now;

      if (diffTime < 0) return "Expired";
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
      const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);

      if (diffDays === 0 && diffHours === 0 && diffMinutes <= 0) {
        return "Expired";
      }

      if (diffDays === 0) return "Today!";
      return `${diffDays} days left`;
    };

    newTask.innerHTML = `
       
              <div class="name-task">
                <h6>${myTask.myTitle}</h6>              
                <br />
                  <p class="time-left">${getTimeLeft()}</p>
              </div>

              <div class="icons-task">
                <button><img class="edit-btn" src="./imgs/pencil-solid.svg" /></button>
                <button><img class="delete-btn" src="./imgs/trash-solid.svg" /></button>
                <button><img class="done-btn" src="./imgs/check-solid.svg" /></button>

                <br />
                 <p>${new Date(myTask.createdAt).toLocaleDateString()}</p>
              </div>
            
      `;

    const timeLeftEl = newTask.querySelector(".time-left");
    setInterval(() => {
      timeLeftEl.textContent = getTimeLeft();
    }, 60000);

    if (myTask.completed) {
      const titleElement = newTask.querySelector(".name-task h6");
      const doneBtnImg = newTask.querySelector(".done-btn");

      titleElement.style.textDecoration = "line-through";
      titleElement.style.color = "#9e9e9e";
      doneBtnImg.src = "./imgs/check-solid-green.svg.webp";
    }

    tasksContainer.appendChild(newTask);

    newTask.querySelector(".delete-btn").addEventListener("click", (e) => {
      let taskId = newTask.getAttribute("data-id");

      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFromLocalStorage(taskId);
          Swal.fire({
            title: "Deleted!",
            text: "Your note has been deleted.",
            icon: "success",
            confirmButtonColor: "#3f3d56",
          });
        }
      });
    });

    newTask.querySelector(".edit-btn").addEventListener("click", (e) => {
      let taskId = newTask.getAttribute("data-id");
      let taskToEdit = arrTasks.find((t) => t.id === Number(taskId));

      Swal.fire({
        title: "Edit Task?",
        text: "Are you sure you want to edit this task?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3f3d56",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, edit it",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#title").value = taskToEdit.myTitle;
          document.querySelector('input[type="datetime-local"]').value =
            taskToEdit.deadline;
          btnSubmit.textContent = "Update";

          btnSubmit.onclick = function () {
            let newTitle = document.querySelector("#title").value.trim();
            let newDeadline = document.querySelector(
              'input[type="datetime-local"]'
            ).value;

            if (newTitle === "") {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Please enter a task.",
                confirmButtonColor: "#3f3d56",
              });
              return;
            }

            if (!newDeadline) {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Please select a deadline.",
                confirmButtonColor: "#3f3d56",
              });
              return;
            }

            let deadlineDate = new Date(newDeadline);
            let now = new Date();

            if (deadlineDate <= now) {
              Swal.fire({
                icon: "warning",
                title: "Invalid Date",
                text: "Please choose a future date and time.",
                confirmButtonColor: "#3f3d56",
              });
              return;
            }

            taskToEdit.myTitle = newTitle;
            taskToEdit.deadline = newDeadline;

            addTasksToLocalStorage(arrTasks);
            addTasksToPage(arrTasks);

            Swal.fire({
              icon: "success",
              title: "Updated!",
              text: "Task has been updated successfully.",
              confirmButtonColor: "#3f3d56",
            });

            btnSubmit.textContent = "Add";
            document.querySelector("#title").value = "";
            document.querySelector('input[type="datetime-local"]').value = "";

            btnSubmit.onclick = defaultSubmitHandler;
          };
        }
      });
    });

    newTask.querySelector(".done-btn").addEventListener("click", (e) => {
      let taskId = newTask.getAttribute("data-id");
      let taskToMarkDone = arrTasks.find((t) => t.id === Number(taskId));

      if (taskToMarkDone.completed) {
        Swal.fire({
          icon: "info",
          title: "Task already completed",
          text: "This task has already been marked as done.",
          confirmButtonColor: "#3f3d56",
        });
        return;
      }

      Swal.fire({
        title: "Mark as done?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, mark it!",
      }).then((result) => {
        if (result.isConfirmed) {
          e.target.src = "./imgs/check-solid-green.svg.webp";
          newTask.querySelector(".name-task h6").style.textDecoration =
            "line-through";
          newTask.querySelector(".name-task h6").style.color = "#9e9e9e";

          taskToMarkDone.completed = true;
          addTasksToLocalStorage(arrTasks);

          Swal.fire({
            icon: "success",
            title: "Task Completed!",
            text: "Your task has been marked as done.",
            confirmButtonColor: "#3f3d56",
          });
        }
      });
    });
  });
}

function addTasksToLocalStorage(arrTasks) {
  window.localStorage.setItem("task", JSON.stringify(arrTasks));
}

function getTasks() {
  let data = window.localStorage.getItem("task");
  if (data) {
    arrTasks = JSON.parse(data);
    addTasksToPage(arrTasks);
  }
}

function deleteFromLocalStorage(taskId) {
  arrTasks = arrTasks.filter((n) => n.id !== Number(taskId));
  addTasksToLocalStorage(arrTasks);
  addTasksToPage(arrTasks);
}