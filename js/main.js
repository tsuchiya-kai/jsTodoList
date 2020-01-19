'use strict';

//追加ボタン
const submitBtn = document.getElementById('submit-btn');

//input
const inputForm = document.getElementById('input-form');

//リストを表示する場所
let displayPlace = document.getElementById('.displayplace');

//タスクを入れる配列
let todoTasks = [];

//ラジオボタン
let radioBtns = document.querySelector('.c-form__radio-button');







//----------------------------関数---------------------------//

//配列の中身の数だけHTMLを生成しタスクに追加
function taskAdd() {

    todoTasks.forEach(function(todoTask){

        // liタグ作成
        let li = document.createElement('li');

        // クラス名付与
        li.className = 'p-tasks__card';

        // ステータスの真偽でテキストを変える
        let displayStatus = (todoTask.status === true) ? '完了済':'未完了';

        // liタグに小要素を挿入する
        li.innerHTML = `
        <p class="p-tasks__text">タスク名：${todoTask.title}</p>
        <p class="p-tasks__badge">${displayStatus}</p>
        <i class="fas fa-trash p-tasks__trash"></i>
        `;

        // liタグをulの末尾に追加
        tasksSpace.appendChild(li);

    });
}

//未完了のタスクだけHTMLを生成しタスクに追加
function incompleteOnleyAdd() {

    todoTasks.forEach(function(todoTask){

        if(todoTask.status === false){

        let li = document.createElement('li');

        li.className = 'p-tasks__card';

        let displayStatus = '未完了';

        li.innerHTML = `
        <p class="p-tasks__text">タスク名：${todoTask.title}</p>
        <p class="p-tasks__badge">${displayStatus}</p>
        <i class="fas fa-trash p-tasks__trash"></i>
        `;

        tasksSpace.appendChild(li);
        }
    });
}

//完了済のタスクだけHTMLを生成しタスクに追加
function completeOnleyAdd() {

    todoTasks.forEach(function(todoTask){

        if(todoTask.status === true){

        let li = document.createElement('li');

        li.className = 'p-tasks__card';

        let displayStatus = '完了済';

        li.innerHTML = `
        <p class="p-tasks__text">タスク名：${todoTask.title}</p>
        <p class="p-tasks__badge">${displayStatus}</p>
        <i class="fas fa-trash p-tasks__trash"></i>
        `;

        tasksSpace.appendChild(li);
        }
    });
}

// ul内を空にする
function resetTodolist() {
    while (tasksSpace.firstChild) tasksSpace.removeChild(tasksSpace.firstChild);
}

// //タスクの絞り込み検索機能(発火はHTMLの属性で制御しています)
function clickedRadioBtn() {
    let radioValues = document.getElementsByName("todos");

    radioValues.forEach(function(radioValue){

        if(radioValue.checked){

            if(radioValue.value === 'Incomplete'){
                console.log('未完了選択')
                resetTodolist();
                incompleteOnleyAdd()
            }else if(radioValue.value === 'Complete') {
                console.log('完了選択')
                resetTodolist();
                completeOnleyAdd()
            }else{
                resetTodolist();
                taskAdd();
            }
            
        }
    });
}

//--------------------------------------------------------------------//









//クリックされたらユーザーが入力したタスクの内容をオブジェクトに格納
submitBtn.addEventListener('click',function(e){
    // ボタンタグ無効化
    e.preventDefault();

    if(inputForm.value !== ''){

    // 配列に追加
    todoTasks.push({id:1,title:inputForm.value,status:false});

    // inputの文字列をリセット
    inputForm.value = '';

    //ulを一度空にする(空にしないと配列が全部出力されるため、被ってしまう)
    resetTodolist();
    
    //タスク追加の関数呼び出し
    taskAdd();

    }else {
        alert('タスクを入力してください');
    }


});

//タスク状態管理
tasksSpace.addEventListener('click', e => {
    let badge = document.querySelectorAll('.p-tasks__badge');
    let BadgeBtns = document.querySelectorAll('.p-tasks__badge');

    if (e.target.classList.contains('p-tasks__badge')){

        //イベントのあった箇所のインデックス番号を取得、変数に格納
        let indexNum = Array.prototype.indexOf.call(badge, e.target);

        //配列内のデータで該当する箇所も削除しておく

        if( todoTasks[indexNum].status === true){
            todoTasks[indexNum].status = false;
            BadgeBtns[indexNum].innerText = '未完了';
        }else{
            todoTasks[indexNum].status = true;
            BadgeBtns[indexNum].innerText = '完了済';
        }
        

    }
});

//タスク削除機能
tasksSpace.addEventListener('click', e => {
    var deleteList = document.querySelectorAll('.p-tasks__trash');
    if (e.target.classList.contains('p-tasks__trash')){
        //イベントのあった箇所のliを削除
        e.target.parentElement.remove();

        //イベントのあった箇所のインデックス番号を取得、変数に格納
        let indexNum = Array.prototype.indexOf.call(deleteList, e.target);

        //配列内のデータで該当する箇所も削除しておく
        todoTasks.splice(indexNum,1);
    }
});

function chooseItem(event) {
    var ul = event.target.parentNode;
    var li = ul.querySelectorAll("li");
    console.log(Array.prototype.indexOf.call(li, event.target));
  }



