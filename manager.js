// MY TASK MANAGER - TERMINAL

// SETUP CODE
const fs = require("fs")
const readline = require("readline")
var rl = readline.createInterface(process.stdin, process.stdout)

/////////variable//////////
let tasks = []

//we connect task.json file to save file in memory/
try {
  const data = fs.readFileSync("tasks.json", "utf8")
  tasks = JSON.parse(data)
} catch (error) {
  console.log("No existing tasks found.")
}

////////////function to save tasks/////////////////
const saveTasks = () => {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks))
}

//////////////function to show out tasks////////////////////
const showTasks = () => {
  tasks.forEach((task, index) => {
    console.log(`${index}. ${task.name} - ${task.done ? "Done" : "Not Done"}`)
  })
}

///////////////function to add another task to our objects//////////////////////
const addTask = (task) => {
  tasks.push({ name: task, done: false })
  saveTasks()
}

////////////////function to delete the task from our objects//////////////////////////////////
const deleteTask = (taskIndex) => {
  tasks.splice(taskIndex, 1)
  saveTasks()
}
//////////////////function to mark the task as done ////////////////////////////////////
const markDone = (taskIndex) => {
  tasks[taskIndex].done = true
  saveTasks()
}
////////////////////function that allows us to come back at the menu of choices/////////////////////////////////////
const printMenu = () => {
  console.log(
    "Press: \n1. to see all your tasks;\n2. to add a task;\n3. to delete a task;\n4. to mark a task as done;\n5. to Exit the task manager"
  )
}

/////////////////Solution with switchcase that i was more clear for me ////////////////////////////

const promptUser = () => {
  rl.question("Pick a number: ", (number) => {
    switch (number) {
      case "1":
        console.log("Your tasks are:")
        showTasks() 
        printMenu() 
        promptUser() 
        break
      case "2":
        rl.question("Enter a task to add: ", (task) => {
          addTask(task) 
          console.log("Your tasks after adding are:") // current tasks
          showTasks() 
          printMenu() 
          promptUser() 
        })
        break
      case "3":
        rl.question("Enter the index of the task to delete: ", (index) => {
          deleteTask(index) 
          console.log("Your tasks after deletion are:") ///remaining tasks
          showTasks() 
          printMenu() 
          promptUser() 
        })
        break
      case "4":
        rl.question(
          "Enter the index of the task to mark as done: ",
          (index) => {
            markDone(index) 
            console.log("Your tasks after marking are:") 
            showTasks() 
            printMenu() 
            promptUser() 
          }
        )
        break
      case "5":
        console.log("Exiting task manager...") 
        rl.close()
        break
      default:
        console.log("Invalid choice, please enter a number between 1 and 5.")
        printMenu()
        promptUser()
        break
    }
  })
}



console.log("Welcome to your task manager")
printMenu()
promptUser()
