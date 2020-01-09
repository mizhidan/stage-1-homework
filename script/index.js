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
  for(let i = 0; i < data.length; ++i) {
  let taskRow = document.createElement("li");
  taskRow.setAttribute("class","project-list");
  let taskContent = `<span class="project-name">${data[i].name}</span>
 <span class="project-description">${data[i].description}</span>
  <span class="end-time">${data[i].endTime}</span>
 <span class="status">${data[i].status}</span>
 <span class="option"><button class="delete-btn">删除</button> </span>`;
 taskRow.innerHTML = taskContent;
 newList.appendChild(taskRow);
 adjustWidth(i);
  }
}

function adjustWidth(index) {
    let name = document.getElementsByClassName('project-name');
    let description = document.getElementsByClassName('project-description');
    let endTime = document.getElementsByClassName('end-time');
    let status = document.getElementsByClassName('status');
    let option = document.getElementsByClassName('option');
    name[index+1].style.width = name[0].offsetWidth + 'px';
    description[index+1].style.width = description[0].offsetWidth - 10 + 'px';
    endTime[index+1].style.width = endTime[0].offsetWidth + 'px';
    status[index+1].style.width = status[0].offsetWidth + 'px';
    option[index+1].style.width = option[0].offsetWidth + 'px';
}
taskList();
