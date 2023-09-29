function login() {
    const data = {
        nombre_usuario: document.getElementById("nombre_usuarioInput").value,
        contrasena: document.getElementById("contrasenaInput").value,
    };

    fetch('https://qxpfgbqw-5000.brs.devtunnels.ms/users/login', {  //esta peticion es de ejemplo
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data),
        credentials: 'incluide'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(usuario => {
                localStorage.setItem("usuario", JSON.stringify(usuario));
                window.location.href = "./index.html";
            });
        } else {
            return response.json().then(data => {
                alert(data.message);
            });
        }
    })
    .catch(error => {
        alert("A ocurrido un error: " + error);
    })
}



//ACTUALIZAR DATOS

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const fecha_nacimientoInput = document.getElementById("fecha_nacimiento");
    const emailInput = document.getElementById('email');
    const nombre_usuarioInput = document.getElementById('nombre_usuario');
    const contrasenaInput = document.getElementById('contrasena')
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const defaultPhotos = document.getElementById('defaultPhotos');
    const saveButton = document.getElementById('saveButton');

    // Manejar la selección de una foto desde el dispositivo
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                preview.innerHTML = '';
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });

    // Manejar la selección de una foto predefinida
    defaultPhotos.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            preview.innerHTML = '';
            preview.appendChild(e.target.cloneNode());
        }
    });

    // Manejar el evento de guardar los cambios
    saveButton.addEventListener('click', () => {
        // Aquí puedes actualizar los datos del usuario (nombre y correo electrónico)
        const newName = nameInput.value;
        const newEmail = emailInput.value;

        // Aquí puedes guardar la imagen seleccionada en el servidor o realizar cualquier otra acción con ella.
        const selectedPhoto = preview.querySelector('img');
        if (selectedPhoto) {
            const imageUrl = selectedPhoto.src;
            alert(`Cambios guardados: Nombre: ${newName}, Correo Electrónico: ${newEmail}, Foto: ${imageUrl}`);
        } else {
            alert('Por favor, selecciona una foto antes de guardar.');
        }
    });
});
