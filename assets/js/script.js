$(() => {
	// Selectores
	let formComunicacion = $('#formComunicacion');
	let formReserva = $('#formReserva');
	let linkNosotros = $('#linkNosotros');
	let linkReserva = $('#linkReserva');
	let modal = $('#exampleModal');
	let tituloModal = $('#exampleModalLabel');
	let contenidoModal = $('#contenidoModal');

	// Click en menu-nav mobile muestra respectivo Form
	let mostrarForm = (form) => {
		console.log(form);
		form.removeClass('d-none');
	};
	linkReserva.click(() => {
		mostrarForm(formReserva);
	});
	linkNosotros.click(() => {
		mostrarForm(formComunicacion);
	});

	// Regex para validar mail
	let regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

	// Funcion valida datos y genera alert de confirmacion
	let submitForm = (name, email, label1, label2) => {
		if (!name && !email) {
			modal.toggle();
			tituloModal.text('Faltan datos por llenar');
			contenidoModal.text(`'${label1}' y '${label2}' son obligatorios`);
		} else if (!regex.test(email)) {
			modal.toggle();
			tituloModal.text('Mail incorrecto');
		} else {
			// Activa modal y Rellena los campos del Modal para ser usado como alert
			modal.toggle();
			tituloModal.text('Comentarios Recibidos');
			contenidoModal.html(
				`Gracias por ponerte en contacto con nosotros <strong>${name}</strong> . Te responderemos a la brevedad al correo <strong>${email}</strong>.<br>Gracias por preferirnos`
			);
		}
	};
	formComunicacion.submit((event) => {
		event.preventDefault();
		// Captura datos de Nombre e Email
		let nombre = $('#nombreComunicacion').val();
		let mail = $('#emailComunicacion').val();

		// Captura nombre de labels de los inputs
		let labelNombre = $('#nombreComunicacion').attr('name');
		let labelMail = $('#emailComunicacion').attr('name');

		submitForm(nombre, mail, labelNombre, labelMail);
	});

	formReserva.submit((e) => {
		e.preventDefault();

		let nombre = $('#nombreReserva').val();
		let mail = $('#emailReserva').val();
		let asistentes = $('#asistentes').val();
		let labelNombre = $('#nombreReserva').attr('name');
		let labelMail = $('#emailReserva').attr('name');

		if (!nombre && !mail) {
			modal.toggle();
			tituloModal.text('Faltan datos por llenar');
			contenidoModal.text(`'${labelNombre}' y '${labelMail}' son obligatorios`);
		} else if (!regex.test(mail)) {
			modal.toggle();
			tituloModal.text('Mail incorrecto');
		} else {
			modal.toggle();
			tituloModal.text('Reserva Recibida');
			contenidoModal.html(
				`Estimado/a: <strong>${nombre}</strong>. Agradecemos por reservar con nosotros. Hemos registrado <strong>${asistentes}</strong> asistentes. Se ha enviado el código de confirmación al correo <strong>${mail}</strong>.<br>Gracias por preferirnos`
			);
		}
	});
	$('#cerrarModal').click(() => {
		$('#exampleModal').toggle();
	});
	$('#cerrarPic').click(() => {
		$('#picture').toggle();
	});

	// Handler para click en Card
	let handler = (event) => {
		let modalPic = $('#picture');
		modalPic.toggle();
		let target = $(event.currentTarget);
		let titulo = target.find('h5').text();
		let content = target.find('.card-text').html();
		let img = target.find('img').attr('src');
		$('#modalPicTitle').text(`${titulo}`);
		$('#modalPicText').html(`${content}`);
		$('#modalPicImg').attr('src', `${img}`);
	};
	$('.card').click(handler);
});
