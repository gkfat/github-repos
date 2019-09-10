let init = () => {
    getOwner();
    getRepo();
}

// 取得 Github 作者資料
let getOwner = () => {
    let url = 'https://api.github.com/users/gkfat';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(){
        console.log('Status',xhr.status,'ReadyState',xhr.readyState);
        if ( xhr.status===200 && xhr.readyState===4 ) {
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            showDataToOwner(data);
            return;
        } else {
            console.log("Problem! Status",xhr.status,'ReadyState',xhr.readyState)
        }
    };
    xhr.send();
}
    function showDataToOwner(data) {
        let owner = document.querySelector('.owner');
        owner.innerHTML=`
            <div class="avatar">    
                <img src="${data.avatar_url}" />
            </div>
            <div class="about">
                <p class="name">${data.name}</p>
                <i class="fas fa-map-marker-alt"></i>
                <p class="location">${data.location}</p>
                <p>${data.bio}目前已累積 ${data.public_repos} 個 Repos。</p>
                <a href="https://github.com/${data.login}" target="_blank">See More</a>
            </div>
        `;
    }

// 取得 github repos
let getRepo = () => {
    let url = 'https://api.github.com/users/gkfat/repos';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(){
        console.log('Status',xhr.status,'ReadyState',xhr.readyState);
        if ( xhr.status===200 && xhr.readyState===4 ) {
            let data = JSON.parse(xhr.responseText);
            // console.log(data);
            showDataToRepo(data);
            return;
        } else {
            console.log("Problem! Status",xhr.status,'ReadyState',xhr.readyState)
        }
    };
    xhr.send();
}
    function showDataToRepo(data) {
        //令repos依照id大小降冪排列
        data.sort(function (a,b) {
            return b.id - a.id
        });
        
        // console.log(new Date(data[0].updated_at)>new Date(data[1].updated_at))
        let repos = document.querySelector('.repo-container');
        for(let i=0; i<data.length; i++){
            console.log(data[i]);
            let div=document.createElement('div');
            div.classList.add('repo');
            div.innerHTML=`
                <div class="title">
                    <h3>${data[i].name}</h3>
                    <span class="time">Created: ${data[i].created_at.substr(0,10)} /</span>
                    <span class="time">Updated: ${data[i].updated_at.substr(0,10)}</span>
                </div>
                <p class="description">${data[i].description}</p>
                <a href="https://github.com/${data[i].full_name}" target="_blank">See Work</a>
            `;
            repos.appendChild(div);
        }
    }

//Parallax controll
window.addEventListener("scroll", function() {
    let parallax = document.querySelector(".parallax");
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset*0.5 + "px";
});