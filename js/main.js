function zuopinClick() {
    alert('没有作品');
}

function xiangxiClick() {
    alert('没有介绍');
}

var typingText = document.getElementById('homeText');
setTimeout(() => {
    typingText.style.borderColor = 'transparent';
    typingText.style.animationPlayState = 'paused';
}, 6000);