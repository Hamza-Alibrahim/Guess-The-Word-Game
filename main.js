let NOT = 5, NOL = 6, CT = 1, WTG = "", NOH = 1;
let words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
WTG = words[Math.floor(Math.random() * words.length)].toLowerCase();
let message = document.querySelector(".message");
document.querySelector(".hint span").innerHTML = NOH;
document.querySelector(".hint").onclick = gethint;
function GI() {
    const IC = document.querySelector(".inputs");
    for (let i = 1; i <= NOT; i++) {
        let div = document.createElement("div");
        div.classList.add(`try${i}`);
        div.innerHTML = `<span>Try ${i}</span>`;
        if (i != 1) div.classList.add("disabled");
        for (let j = 1; j <= NOL; j++) {
            let input = document.createElement("input");
            input.type = "text";
            input.id = `guss${i}-letter${j}`;
            input.setAttribute("maxlength", "1");
            div.appendChild(input);
        };
        IC.appendChild(div);
    };
    IC.children[0].children[1].focus();
    document.querySelectorAll(".disabled input").forEach(input => { input.disabled = true; });
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });
        input.addEventListener("keydown", (e) => {
            if (e.key == "ArrowRight") inputs[index + 1].focus();
            else if (e.key == "ArrowLeft") { if (index - 1 >= 0) inputs[index - 1].focus(); }
            else if (e.key == "Backspace") {
                if (index - 1 >= 0) {
                    inputs[index].value = "";
                    inputs[index - 1].value = "";
                    inputs[index - 1].focus();
                };
            };
        });
    });
};
window.onload = function () {
    GI();
};
window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") document.querySelector(".check").click();
});
document.querySelector(".check").onclick = CW;
function CW() {
    let suc = true;
    for (let i = 1; i <= NOL; i++) {
        let inp = document.getElementById(`guss${CT}-letter${i}`);
        if (WTG[i - 1] === inp.value) inp.classList.add("in");
        else if (WTG.includes(inp.value) && inp.value !== "") {
            inp.classList.add("n-in");
            suc = false;
        }
        else {
            inp.classList.add("wr");
            suc = false;
        };
    };
    if (suc) {
        message.innerHTML = `<span>You Win</span>`;
        if (document.querySelector(".hint span").innerHTML == 1) {
            message.innerHTML += `<p>Congratz You Win Without Using Hints`
        };
        document.querySelector(`.try${CT}`).classList.add("disabled");
        document.querySelector(".check").disabled = true;
        document.querySelector(".hint").disabled = true;
    }
    else {
        document.querySelector(`.try${CT}`).classList.add("disabled");
        document.querySelectorAll(`.try${CT} input`).forEach(e => { e.disabled = true; });
        if (CT + 1 <= NOT) {
            document.querySelector(`.try${CT + 1}`).classList.remove("disabled");
            document.querySelectorAll(`.try${CT + 1} input`).forEach(e => { e.disabled = false; });
            document.querySelector(`.try${CT + 1}`).children[1].focus();
            CT++;
        } else {
            document.querySelector(".check").disabled = true;
            document.querySelector(".hint").disabled = true;
            message.innerHTML = `You Lose The Word Is <span>${WTG}</span>`;
        };
    };
};
function gethint() {
    if (NOH > 0) {
        NOH--;
        document.querySelector(".hint span").innerHTML = NOH;
    }
    if (NOH == 0) document.querySelector(".hint").disabled = true;
    let enableinput = document.querySelectorAll("input:not([disabled])");
    let emptyinput = Array.from(enableinput).filter(e => e.value === "");
    if (emptyinput.length > 0) {
        let rindex = Math.floor(Math.random() * emptyinput.length);
        let indextofill = Array.from(enableinput).indexOf(emptyinput[rindex]);
        emptyinput[rindex].value = WTG[indextofill];
        emptyinput[rindex].classList.add("in");
    };
};
