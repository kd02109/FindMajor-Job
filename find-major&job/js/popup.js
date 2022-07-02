const mark = document.querySelector(".question-mark");
const popup = document.querySelector(".content-popup");
const page0 = document.querySelector(".question");
const page1 = document.querySelector(".content-explanation");
const page2 = document.querySelector(".status-bar");
const page3 = document.querySelector(".file-upload");

console.log(page1);
console.log(page2);
console.log(page3);
console.log(popup);
console.log(mark);

function popUP(){
	page0.style.opacity = "0.1";
	page1.style.opacity = "0.1";
	page2.style.opacity = "0.1";
	page3.style.opacity = "0.1";
	popup.classList.remove("hidden");
}

function popRemove(){
	page0.style.opacity = "1";
	page1.style.opacity = "1";
	page2.style.opacity = "1";
	page3.style.opacity = "1";
	popup.classList.add("hidden");
}

mark.addEventListener("mouseover", popUP);
mark.addEventListener("mouseout", popRemove);