let box = document.getElementById('box');
let liList = document.querySelectorAll('#box>li');
let back = document.querySelector('li.back');
let next = document.querySelector('li.next');

// liChange();
liList.forEach(function(item, index) {
    //获取当前点击的元素.innerHTML-liStart < 6 ,不删不加
    // 获取当前点击的元素.innerHTML-liStart < 6 并且 liStart!==1
    //获取当前点击的元素.innerHTML-liStart >= 6 ,删左加右
    item.onclick = itemClick;
});

back.onclick = function() {
    liList = document.querySelectorAll('#box>li');
    //点击上一页
    // active的元素.innerHTML>6,删右加左
    // active的元素.innerHTML<=6
    // active的元素.innerHTML===1,back消失
    for (var i = 1; i <= 10; i++) {
        if (liList[i].className === 'active') {
            liList[i].className = '';
            if (i !== 1) {
                liList[i - 1].className = 'active';
            }
            if (i >= 6 && liList[1].innerHTML !== '1') {
                liList[10].remove();
                let creatLi = document.createElement('li');
                creatLi.onclick = itemClick;
                creatLi.innerHTML = Number(liList[1].innerHTML) - 1;
                box.insertBefore(creatLi, liList[1]);
            }
        }
    }
    if (liList[1].className === 'active' && liList[1].innerHTML === '1') {
        this.style.display = 'none';
    } else {
        this.style.display = 'block';
    }
}
next.onclick = function() {
    liList = document.querySelectorAll('#box>li');
    //点击下一页，
    // active的元素.innerHTML>=7,删左加右
    // active的元素.innerHTML<7
    for (let i = 1; i <= 10; i++) {
        if (liList[i].className === 'active') {
            liList[i].className = '';
            liList[i + 1].className = 'active';
            if (i >= 6) {
                liList[1].remove();
                let creatLi = document.createElement('li');
                creatLi.onclick = itemClick;
                creatLi.innerHTML = Number(liList[10].innerHTML) + 1;
                box.insertBefore(creatLi, next);
            }
            break;
        }
    }
    if (liList[1].className === 'active' && liList[1].innerHTML === '1') {
        back.style.display = 'none';
    } else {
        back.style.display = 'block';
    }
}

function itemClick() {
    liList = document.querySelectorAll('#box>li');
    for (let i = 1; i <= 10; i++) {
        liList[i].className = '';
    }
    this.className = 'active';
    // 当前active元素的innerHTML <= 6, 不删不加，
    // 当前active元素的innerHTML > 6, 删左加右
    if (Number(this.innerHTML) > Number(liList[6].innerHTML)) {
        // 左删右加
        let num = this.innerHTML - liList[6].innerHTML;
        for (let i = 1; i <= num; i++) {
            liList[i].remove();
            let creatLi = document.createElement('li');
            creatLi.onclick = itemClick;
            creatLi.innerHTML = liList[10].innerHTML * 1 + i;
            box.insertBefore(creatLi, next);
        }
    } else if (Number(this.innerHTML) < Number(liList[6].innerHTML) && liList[1].innerHTML !== '1') {
        // 右删左加
        let num = liList[6].innerHTML - this.innerHTML;
        for (let i = num; i >= 1; i--) {
            let creatLi = document.createElement('li');
            creatLi.onclick = itemClick;
            creatLi.innerHTML = Number(liList[1].innerHTML) - i;
            if (Number(creatLi.innerHTML) < 1) {
                continue;
            }
            box.insertBefore(creatLi, liList[1]);
            liList[11 - i].remove();
        }
    }
    if (liList[1].className === 'active' && liList[1].innerHTML === '1') {
        back.style.display = 'none';
    } else {
        back.style.display = 'block';
    }
}