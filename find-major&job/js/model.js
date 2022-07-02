// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = 'https://teachablemachine.withgoogle.com/models/X6c3jKpnL/';


let model, webcam, labelContainer, maxPredictions;

//button changes
const btn = document.getElementById('moveto_other_model');
btn.addEventListener('click', function handleClick() {
    if (btn.textContent == '나는 무슨 직업상일까?') btn.textContent = '나는 무슨 학과상일까?';
    else btn.textContent = '나는 무슨 직업상일까?';
});

// Load the image model and setup the webcam
async function init() {
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById('label-container');
	
        for (let i = 0; i < maxPredictions; i++) {
			const element = document.createElement("div")
			element.classList.add("d-flex");
			labelContainer.appendChild(element);
        }
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const image = document.getElementById('input-image');
    const prediction = await model.predict(image, false);
	const predictionName=[];
	const predictionProbability=[];
	const labelTitle=[];
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
	
	for (let i = 0; i < 4; i++) {
		predictionName.push(prediction[i].className);
		predictionProbability.push(prediction[i].probability.toFixed(2)*100);
		labelTitle.push(predictionName[i]+"-major");
		if(prediction[i].probability.toFixed(2)>0.1){
			varPercent=prediction[i].probability.toFixed(2)*100 + "%";
		}else if(prediction[i].probability.toFixed(2)>=0.01){
			varPercent="4%";
		}else{
			varPercent= "2%";
		}
		
		const label = "<div class='d-flex-label label-"+i+"'"+">" + predictionName[i] + "</div>";
		const barwidth = "<div class='background-bar background-"+i+"'><div class='d-flex-barwidt barwidth"+i+"'"+" style='width:"+varPercent+"'><span class='d-flex-span'>"+predictionProbability[i].toFixed(1)+"%</span></div></div>";
		labelContainer.childNodes[i].innerHTML = label+barwidth;
    }

	console.log(predictionName);
	console.log(predictionProbability);
	console.log(labelTitle);
}







