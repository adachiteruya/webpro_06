"use strict";

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

let number=0;
const bbs = document.querySelector('#bbs');

function deletePost(postId) {
    const params = {
        method: "POST",
        body: 'id=' + postId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/delete";  // 削除用のエンドポイント
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            if (response.success) {
                // 削除成功したら、クライアント側で削除
                const postElement = document.getElementById(postId);
                postElement.remove(); // 投稿をDOMから削除
            } else {
                alert('削除に失敗しました');
            }
        });
}

function likePost(postId) {
    const params = {
        method: "POST",
        body: 'id=' + postId,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    };
  
    const url = "/like";  // 「いいね」機能用のエンドポイント
    fetch(url, params)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          // いいねが成功したら、画面上の投稿を更新
          const postElement = document.getElementById(postId);
          const likeButton = postElement.querySelector(".like");
          likeButton.innerText = `いいね (${response.likes})`;  // 更新されたいいね数を表示
        } else {
          alert("「いいね」の処理に失敗しました");
        }
      });
  }

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message, //&:パラメータが変わることを示す文字
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿

                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    cover.id = mes.id;

                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;

                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;

                    let time_area = document.createElement('span');
                    time_area.className = 'time';
                    time_area.innerText = formatDate(mes.createdAt);

                    let deleteButton = document.createElement('button');
                    deleteButton.className = 'delete';
                    deleteButton.innerText = '削除';
                    deleteButton.addEventListener('click', () => {
                        deletePost(mes.id);
                    });

                    let likeButton = document.createElement("button");
                    likeButton.className = 'like';
                    likeButton.innerText = `いいね (${mes.likes})`;  // いいね数を表示

                    likeButton.addEventListener("click", () => {
                    likePost(mes.id);  // 投稿IDを渡して「いいね」を送信
                    });

                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );
                    cover.appendChild( time_area );
                    cover.appendChild( deleteButton );
                    cover.appendChild( likeButton );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});