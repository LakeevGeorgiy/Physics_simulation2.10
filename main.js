let wave_length_text = document.getElementById("wave_length_id");
let refractive_index1_text = document.getElementById("refractive_index1_id");
let refractive_index2_text = document.getElementById("refractive_index2_id");
let width_text = document.getElementById("width_id");
let length_text = document.getElementById("length_id");
let button = document.getElementById("button_id");

let wave_length = wave_length_text.value;
let refractive_index1 = refractive_index1_text.value;
let refractive_index2 = refractive_index2_text.value;
let width = width_text.value;
let length = length_text.value;
let intensity = 1;

function calculateIntensity(x){
    const refractive_index = refractive_index2 / refractive_index1;
    const phi = 2 * Math.PI / wave_length * (refractive_index * x * width / length);
    return 4 * intensity * Math.cos(phi / 2) ** 2;
}

function plot() {

    let x_coordinates = [];
    let intensity_coordinates = [];
    let shapes = [];

    let padding = 125;
    for (let i = -padding; i < padding; ++i) {
        x_coordinates[i+padding] = i / 10;
        intensity_coordinates[i+padding] = calculateIntensity(i);
    }

    let trace1 = {
        x: x_coordinates,
        y: intensity_coordinates,
        mode: 'line'
    };

    for (let i = 0; i < x_coordinates.length; ++i){

        let currentIntensity = intensity_coordinates[i];
        let currentColor = 255 * (1 - currentIntensity / 4 / intensity);
        color=`rgba(${currentColor},${currentColor},${currentColor}, 1)`;

        shapes[i] = ({
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: i,
            y0: 0,
            x1: i + 1,
            y1: 10,
            fillcolor: color
        });
    }

	let layout1 = {
        title: 'Интерференционные полосы',
		autosize: true,
		xaxis: {
            visible: false,
            range: [0, x_coordinates.length],
		},
		yaxis: {
            range: [0, 10],
            visible: false
		},
       shapes
	};

    let layout2 = {
        title: 'График интерферентности',
		autosize: true,
		xaxis: {
			title: 'x, м',
		},
		yaxis: {
			title: 'I, Bт/м^2',
		},
	};

	Plotly.react('tester1', [], layout1);
	Plotly.react('tester2', [trace1], layout2);
}

button.addEventListener("click", function(e){

	wave_length = parseFloat(wave_length_text.value);
    wave_length /= (10 ** 9);
	if (wave_length <= 0) {
		alert("Длина волны должна быть больше 0!");
		return;
	}
	
	refractive_index1 = parseFloat(refractive_index1_text.value);
	if (refractive_index1 <= 0) {
		alert("Показатель преломления должен быть больше 0!");
		return;
	}

    refractive_index2 = parseFloat(refractive_index2_text.value);
	if (refractive_index2 <= 0) {
		alert("Показатель преломления должен быть больше 0!");
		return;
	}
    
	// if (information_frequency * 10 > input_frequency){
        // 	alert("Возможно частота несущего сигнала должна быть больше для корректной работы!");
        // }
        
    width = parseFloat(width_text.value);
    if (width < 0) {
        alert("Расстояние между щелями меньше 0!");
        return;
    }
        
    length = parseFloat(length_text.value);
    if (length < 0) {
        alert("Расстояние до экрана меньше 0!");
        return;
    }
        
    if (width > length){
        alert("Расстояние между щелями должно быть меньше расстояния до экрана!");
        return;
    }

    plot();

});