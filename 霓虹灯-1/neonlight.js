var lightflag = false;
var clickflag = true;
let swit = document.getElementsByClassName("switch")[0];
let neon = document.getElementsByClassName("neon")[0];
let btn = document.getElementsByClassName("button")[0];

function change() {
    console.log(clickflag);
    if (clickflag) {
        clickflag = false;
        if (!lightflag) {
            neon.classList.add("neon-on");
            neon.classList.remove("neon-off");
            btn.classList.add("right");
            btn.classList.remove("left");
            lightflag = true;
        } else {
            neon.classList.add("neon-off");
            neon.classList.remove("neon-on");
            btn.classList.add("left");
            btn.classList.remove("right");
            lightflag = false;
        }

        setTimeout(() => {
            clickflag = true;
        }, 3000);
    }
}
