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
    },
    fail: function(error) {
      console.log("ERROR");
    }
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
    taskRow.setAttribute("id", data[index].id);
    let taskContent = `<span class="project-name">${data[index].name}</span>
    <span class="project-description">${data[index].description}</span>
    <span class="end-time">${data[index].endTime}</span>
    <span class="status">${data[index].status}</span>
    <span class="option"><button class="delete-btn" id="${data[index].id}" onclick=checkDeleteProject(${data[index].id})>删除</button> </span>`;
    taskRow.innerHTML = taskContent;
    newList.appendChild(taskRow);
    adjustWidth(index);
    changeStatusColor(index);
  }
  changeCardNumber();
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

function changeCardNumber() {
  let status = document.getElementsByClassName("status");
  let cardNum = document.getElementsByClassName("task-number");
  let activeNum = 0;
  let pendingNum = 0;
  let closedNum = 0;
  let sum = activeNum + pendingNum + closedNum;
  for (let index = 1; index < status.length; ++index) {
    switch (status[index].innerHTML) {
      case "ACTIVE":
        ++activeNum;
        break;
      case "PENDING":
        ++pendingNum;
        break;
      case "CLOSED":
        ++closedNum;
        break;
      default:
        break;
    }
  }
  cardNum[0].innerHTML = sum;
  cardNum[1].innerHTML = activeNum;
  cardNum[2].innerHTML = pendingNum;
  cardNum[3].innerHTML = closedNum;
  changeCardPercent(activeNum, pendingNum, closedNum);
}

function changeCardPercent(act, pending, closed) {
  let sum = act + pending + closed;
  let percent = document.getElementsByClassName("percent");
  if (sum == 0) {
    percent[0].innerHTML = 0 + "%";
    percent[1].innerHTML = 0 + "%";
    percent[2].innerHTML = 0 + "%";
  } else {
    percent[0].innerHTML = Math.round((act / sum) * 100) + "%";
    percent[1].innerHTML = Math.round((pending / sum) * 100) + "%";
    percent[2].innerHTML = Math.round((closed / sum) * 100) + "%";
  }
}

function checkDeleteProject(index) {
  let checkBox = document.getElementsByClassName("delete-check")[0];
  let cover = document.getElementsByClassName("cover")[0];
  let guanbiIcon = document.getElementsByClassName("icon-guanbi")[0];
  let deleteBtn = document.getElementsByClassName("yes-btn")[0];
  checkBox.style.visibility = "visible";
  cover.style.visibility = "visible";
  guanbiIcon.addEventListener("click", function() {
    checkBox.style.visibility = "hidden";
    cover.style.visibility = "hidden";
  });
  deleteBtn.addEventListener("click", function(event) {
    let options = {
      url: API_ROOT + "/" + index,
      method: "DELETE",
      success: function(res) {
        deleteProject(index);
      },
      fail: function(error) {
        console.log("ERROR");
      }
    };
    ajax(options);
  });
}

function backToPage() {
  let checkBox = document.getElementsByClassName("delete-check")[0];
  let cover = document.getElementsByClassName("cover")[0];
  checkBox.style.visibility = "hidden";
  cover.style.visibility = "hidden";
}

function deleteProject(index) {
  let row = document.getElementsByClassName("task-content");
  row.removeChild(index);
}

taskList();
