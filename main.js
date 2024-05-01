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
    console.log(Math.cos(phi / 2) ** 2);
    return 4 * intensity * Math.cos(phi / 2) ** 2;
}

function plot() {

    shapes = [];

    let x_coordinates = [];
    let intensity_coordinates = [];
    let shapes_colors = [];

    let i = 0;
    for (let t = -10; t < 10; t += 0.1){
        x_coordinates[i] = t;
        intensity_coordinates[i] = calculateIntensity(t);
        ++i;
    }

    let trace1 = {
        x: x_coordinates,
        y: intensity_coordinates,
        mode: 'line'
    };

    console.log(trace1);

    const rectangleWidth = wave_length * length / width;

    for (let i = 0; i < 10000; ++i){

        let currentIntensity = calculateIntensity(x_coordinates[i]);
        // if ((x / rectangleWidth) % 2 == 0) 
        //     color=`rgba(${i},0,0,0.3)`;
        // else
        //     color = 'rgba(0, 0,0, 0.8)';

        // shapes_colors.push({
        //     type: 'rect',
        //     xref: 'x',
        //     yref: 'y',
        //     x0: x * 100000,
        //     y0: 0,
        //     x1: x * 100000 + rectangleWidth * 100000,
        //     y1: 10,
        //     fillcolor: color
        // });
    }

    console.log(shapes);

	let layout1 = {
        title: 'Несущий сигнал',
		autosize: true,
		xaxis: {
			title: 't, c',
            visible: false
		},
		yaxis: {
			title: 'A, B',
            range: [0, 10],
            visible: false
		},
       shapes
	};

	Plotly.react('tester1', [], layout1);
	Plotly.react('tester2', [trace1], layout1);
	// Plotly.react('tester3', [third], layout3);
	// Plotly.react('tester4', [fourth], layout4);
	// Plotly.react('tester5', [fifth], layout5);
	// Plotly.react('tester6', [sixth], layout6);
}

button.addEventListener("click", function(e){

	wave_length = parseFloat(wave_length_text.value);
    wave_length /= (10 ** 9);
	if (wave_length <= 0) {
		alert("Частота несущего сигнала должна быть больше 0!");
		return;
	}
	
	refractive_index1 = parseFloat(refractive_index1_text.value);
	if (refractive_index1 <= 0) {
		alert("Частота информационного сигнала должна быть больше 0!");
		return;
	}

    refractive_index2 = parseFloat(refractive_index2_text.value);
	if (refractive_index2 <= 0) {
		alert("Частота информационного сигнала должна быть больше 0!");
		return;
	}
    
	// if (information_frequency * 10 > input_frequency){
        // 	alert("Возможно частота несущего сигнала должна быть больше для корректной работы!");
        // }
        
    width = parseFloat(width_text.value);
    if (width < 0) {
        alert("Амплитуда меньше 0!");
        return;
    }
        
    length = parseFloat(length_text.value);
    if (length < 0) {
        alert("Амплитуда меньше 0!");
        return;
    }
        
    if (width > length){
        alert("Частота информационного сигнала должна быть меньше частоты несущего сигнала!");
        return;
    }

    plot();

});