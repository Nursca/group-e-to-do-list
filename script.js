document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById
  ("task-input");
  const addTaskBtn = document.getElementById
  ("add-task-btn");
  const taskList = document.getElementById
  ("task-list");
  const emptyImage = document.querySelector
  (".empty-image");
  const todosContainer = document.querySelector
  (".todos-container");
  const progressBar = document.getElementById
  ("progress");
  const progressNumbers = document.getElementById
  ("numbers");


  const form = document.getElementById("input-area");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });



  const toggleEmptyState = () => {
    emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
    todosContainer.style.width = taskList.children.length > 0 ? "100%" : "50%";
  };

  const updateProgress = (checkCompletion = true) => {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll
    (".checkbox:checked").length;

    progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : "0%";
    progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

  };

  const addTask = (text, completed = false, checkCompletion = true) => {
    const taskText = text || taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");

    li.className = "flex items-center justify-between bg-blue-500 mb-2 px-2 py-2.5 border rounded-4xl font-semibold text-white relative transition-shadow-[0.2s] hover:shadow-sm";

    li.innerHTML = `
    <input type="checkbox" class="checkbox min-[20px] h-5 border border-gray-300 rounded-sm cursor-pointer transition-all duration-200 ease-in-out checked:bg-blue-500 checked:border-blue-500 checked:transform checked:scale-125 checked::before:content-['\u2714'] checked::before:text-white checked::before:flex checked::before:items-center checked::before:justify-center checked::before:font-base"
    ${completed ? 'checked' : ''}>

    <span class="flex mx-2 wrap-break-word">${taskText}</span>

    <div class="task-buttons flex gap-2 mr-auto">

      <button class="edit-btn bg-indigo-500 flex justify-center items-center border border-none rounded-[50%] w-6 h-6 text-color-white font-sm cursor-pointer transition duration-200 ease-in-out hover:transform hover:scale-110">
        <i class="fa-solid fa-pen"></i>
      </button>

      <button class="delete-btn bg-red-500 flex justify-center items-center border border-none rounded-[50%] w-6 h-6 text-color-white font-sm cursor-pointer transition-all duration-200 ease-in-out hover:transform hover:scale-110">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
    `;

    const checkbox = li.querySelector
    (".checkbox");
    const editBtn = li.querySelector
    (".edit-btn");

    if (completed) {
      li.classList.add("completed");
      editBtn.disabled = true;
      editBtn.style.opacity = "0.5";
      editBtn.style.pointerEvents = "none";
    }
  
    checkbox.addEventListener("change", () => {
  const isChecked = checkbox.checked;

  if (isChecked) {
    li.classList.add("bg-gray-500", "opacity-60");
    li.querySelector("span").classList.add("line-through");
  } else {
    li.classList.remove("bg-gray-500", "opacity-60");
    li.querySelector("span").classList.remove("line-through");
  }

  li.classList.toggle("completed", isChecked);
  editBtn.disabled = isChecked;
  editBtn.style.opacity = isChecked ? "0.5" : "1";
  editBtn.style.pointerEvents = isChecked ? "none" : "auto";
  updateProgress();
});



    editBtn.addEventListener("click", () => {
      if (!checkbox.checked) {
        taskInput.value = li.querySelector("span").textContent;
        li.remove();
        toggleEmptyState();
        updateProgress(false);
      }
    });

    li.querySelector(".delete-btn").
    addEventListener("click", () => {
      li.remove();
      toggleEmptyState();
      updateProgress();
    });

    taskList.appendChild(li);
    taskInput.value = "";
    toggleEmptyState();
    updateProgress(checkCompletion);
  };
});