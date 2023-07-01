const game = new Game('main-canvas');

window.addEventListener('keydown', (event) => game.onKeyDown(event))
window.addEventListener('keyup', (event) => game.onKeyUp(event))

//esto pone la musica al incio
document.getElementById("start-btn").onclick = () => {
    game.start();
};
