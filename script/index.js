var newList = document.getElementsByClassName("task-content")[0];
const API_ROOT = "http://localhost:3000/projects";

function taskList() {
  getTaskInfo();
}

function getTaskInfo() {
  var options = {
    url: API_ROOT,
    method: "GET",
    success: function(res) {
      showContent(res);
    }, // 请求成功后调用此方法
    fail: function(error) {
      console.log("ERROR");
    } // 请求失败或出错后调用此方法
  };
  ajax(options);
}

function showContent(data) {
  if (!Array.isArray(data) && !data instanceof Array) {
    return false;
  }
  for (let index = 0; index < data.length; ++index) {
    let taskRow = document.createElement("li");
    taskRow.setAttribute("class", "project-list");
    let taskContent = `<span class="project-name">${data[index].name}</span>
 <span class="project-description">${data[index].description}</span>
  <span class="end-time">${data[index].endTime}</span>
 <span class="status">${data[index].status}</span>
 <span class="option"><button class="delete-btn">删除</button> </span>`;
    taskRow.innerHTML = taskContent;
    newList.appendChild(taskRow);
    adjustWidth(index);
    changeStatusColor(index);
  }
}

function adjustWidth(index) {
  let name = document.getElementsByClassName("project-name");
  let description = document.getElementsByClassName("project-description");
  let endTime = document.getElementsByClassName("end-time");
  let status = document.getElementsByClassName("status");
  let option = document.getElementsByClassName("option");
  name[index + 1].style.width = name[0].offsetWidth + "px";
  description[index + 1].style.width = description[0].offsetWidth - 10 + "px";
  endTime[index + 1].style.width = endTime[0].offsetWidth + "px";
  status[index + 1].style.width = status[0].offsetWidth + "px";
  option[index + 1].style.width = option[0].offsetWidth + "px";
}

function changeStatusColor(index) {
  let status = document.getElementsByClassName("status");
  switch (status[index + 1].innerHTML) {
    case "ACTIVE":
      status[index + 1].style.color = "#666666";
      break;
    case "PENDING":
      status[index + 1].style.color = "#ee706d";
      break;
    case "CLOSED":
      status[index + 1].style.color = "#f7da47";
      break;
    default:
      break;
  }
}

taskList();
