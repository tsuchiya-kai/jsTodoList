'use strict';

//追加ボタン
const submitBtn = document.getElementById('submit-btn');
//全タスクチェック
const  allTaskBtn = document.getElementById('alltask')
//input
const inputForm = document.getElementById('input-form');
//リストを表示する場所
const displayPlace = document.getElementById('displayplace');
//タスクを入れる配列
const todoTasks = [];


//状態切り替え
function changeStatus ()  {
  let radioBtns = document.querySelectorAll('.checkbox > .label > .input');

  radioBtns.forEach( (el,i) => {
    el.addEventListener('click',function(){
      console.log(todoTasks[i].status)
      console.log(todoTasks[i])
      todoTasks[i].status = !todoTasks[i].status
      console.log(todoTasks[i].status)
    })
  })
}

//追加ボタンクリック時に発火
submitBtn.addEventListener('click',function(event) {
  event.preventDefault();

  if(inputForm.value !== '') {

    //全タスク表示に切り替える
    allTaskBtn.checked = true;

    todoTasks.push({taskName: inputForm.value,status: false});

    inputForm.value = '';

  }else {
    alert(inputForm.placeholder);
  }

  displayPlace.textContent = null;

  todoTasks.forEach( (el) => {

    if(el.status === false){
      
      let li = document.createElement('li');

      li.className = 'task-card _mb-2';

      li.innerHTML =`
        <div class="checkbox">
          <label class="label">
            <input class="input" type="checkbox">
            <span class="span">済</span>
          </label>
        </div>
        <div class="title">${el.taskName}</div>
        <a class="delete">削除</a>
      `;
      displayPlace.appendChild(li);

    }else {
      let li = document.createElement('li');

      li.className = 'task-card _mb-2';

      li.innerHTML =`
        <div class="checkbox">
          <label class="label">
            <input class="input" type="checkbox"checked>
            <span class="span">済</span>
          </label>
        </div>
        <div class="title">${el.taskName}</div>
        <a class="delete">削除</a>
      `;
      displayPlace.appendChild(li);
    }
  })

  //状態管理
  changeStatus();

})

displayPlace.addEventListener('click',e => {

  //削除ボタン
  let deleteBtns = document.querySelectorAll('.delete');

  if (e.target.classList.contains('delete')) {

    //イベントのあった箇所の親要素(taskcard)を削除
    e.target.parentElement.remove();

    //イベントのあった箇所のindex番号を取得、格納
    const indexNum = Array.prototype.indexOf.call(deleteBtns,e.target);

    //配列内のデータで該当する箇所も削除しておく
    todoTasks.splice(indexNum,1);
  }

})




//タスクのフィルター、発火はHTMLタグで
function allTasks() {
  displayPlace.textContent = null;

  todoTasks.forEach( (el) => {

    if(el.status === false){
      let li = document.createElement('li');

      li.className = 'task-card _mb-2';

      li.innerHTML =`
        <div class="checkbox">
          <label class="label">
            <input class="input" type="checkbox">
            <span class="span">済</span>
          </label>
        </div>
        <div class="title">${el.taskName}</div>
        <a class="delete">削除</a>
      `;
      displayPlace.appendChild(li);

    }else {
      let li = document.createElement('li');

      li.className = 'task-card _mb-2';

      li.innerHTML =`
        <div class="checkbox">
          <label class="label">
            <input class="input" type="checkbox"checked>
            <span class="span">済</span>
          </label>
        </div>
        <div class="title">${el.taskName}</div>
        <a class="delete">削除</a>
      `;
      displayPlace.appendChild(li);
    }
  })

  //状態管理
  changeStatus();

}

function incompleteTasks() {

  const incompleteTasks = todoTasks.filter( el => el.status === false)

  displayPlace.textContent = null;

  incompleteTasks.forEach( (el) => {

    let li = document.createElement('li');
    li.className = 'task-card _mb-2';

    li.innerHTML =`
      <div class="checkbox">
        <label class="label">
          <input class="input" type="checkbox">
          <span class="span">済</span>
        </label>
      </div>
      <div class="title">${el.taskName}</div>
      <a class="delete">削除</a>
    `;

    displayPlace.appendChild(li);
  })

  //状態管理
  changeStatus();

}

function completeTasks() {

  const completeTasks = todoTasks.filter( el => el.status === true)

  console.log(completeTasks)

  displayPlace.textContent = null;

  completeTasks.forEach( (el) => {

    let li = document.createElement('li');
    li.className = 'task-card _mb-2';

    li.innerHTML =`
      <div class="checkbox">
        <label class="label">
          <input class="input" type="checkbox" checked>
          <span class="span">済</span>
        </label>
      </div>
      <div class="title">${el.taskName}</div>
      <a class="delete">削除</a>
    `;

    displayPlace.appendChild(li);
  })

  //状態管理
  changeStatus();

}