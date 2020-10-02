// empty entry
function empty (current) {
	current.value = "";
}

// validate entry, allow only numbers
function validate (current) {
	if (!(current.value < 48 || current.value > 57))
		current.value = "";
}

// go to next input automatically
function autoTab (current, to) {
	if (current.getAttribute && current.value.length == current.getAttribute("maxlength"))
		to.focus();
}

// get CEP from input
function getCep() {
	let cep = "";
	for (let i=1; i<=8; i++)
		cep += document.getElementById(`cep-input${i}`).value;
	return cep;
}

async function search() {

	// remove initial alert
	const divAlert = document.getElementById('div-alert');
	const oldPAlert = document.getElementById('p-alert');
	if(oldPAlert != null)
		divAlert.removeChild(oldPAlert);

	// get API data
	const url = `https://viacep.com.br/ws/${getCep()}/json/`;
	const response = await fetch(url);
	const result = await response.json();

	// remove old list
	const divResult = document.getElementById('result');
	const oldRenderList = document.getElementById('render-list');
	divResult.removeChild(oldRenderList);

	// create new list
	let newRenderList = document.createElement('ul');
	newRenderList.setAttribute('id', 'render-list');

	// if CEP get error
	if(result.hasOwnProperty('erro')) {
		
		// create new alert
		let newPAlert = document.createElement('p');
		newPAlert.setAttribute('id', 'p-alert');
		newPAlert.innerHTML = "CEP inválido, digite novamente.";
		divAlert.append(newPAlert);

		// empty list
		newRenderList.innerHTML = `
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		`;

	// if there are no errors
	}else{
		newRenderList.innerHTML = `
			<li>${result.logradouro}</li>
			<li><b>Bairro:</b> ${result.bairro}</li>
			<li><b>Cidade:</b> ${result.localidade}</li>
			<li><b>Estado:</b> ${result.uf}</li>
		`;
	}

	// append new list
	divResult.append(newRenderList);
}