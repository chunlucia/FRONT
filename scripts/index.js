
   document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre_usuario = document.getElementById("nombre_usuario").value;
        const contrasena = document.getElementById("contrasena").value;

        // Realizar aquí la lógica de autenticación, por ejemplo, enviar datos al servidor y validar

        if (nombre_usuario === "nombre_usuario" && contrasena === "contrasena") {
            alert("Ingreso exitoso"); // Cambiar por tu lógica de autenticación real
        } else {
            alert("Credenciales incorrectas");
        }
    });
});


//NUEVO REGISTRO
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
        const correo = document.getElementById("correo").value;
        const nombre_usuario = document.getElementById("nombre_usuario").value;
        const contrasena = document.getElementById("contrasena").value;

        // Realizar aquí la lógica de registro de usuario, por ejemplo, enviar datos al servidor para crear una nueva cuenta

        alert("Usuario registrado exitosamente"); // Cambiar por tu lógica de registro real
    });
});


//INVITADO
document.addEventListener("DOMContentLoaded", function () {
    const guestButton = document.getElementById("guestButton");

    guestButton.addEventListener("click", function () {
        // Aquí puedes realizar acciones como redireccionar a una página de inicio de sesión o habilitar ciertas funciones como invitado.
        alert("Has iniciado como invitado. ¡Bienvenido!");
    });
});


//PAGINA PRINCIPAL
document.addEventListener("DOMContentLoaded", function () {
    const serverList = document.getElementById("serverList");
    const channelList = document.getElementById("channelList");
    const messageList = document.getElementById("messageList");
    const createServerButton = document.getElementById("createServer");
    const createChannelButton = document.getElementById("createChannel");
    const newMessageTextarea = document.getElementById("newMessage");
    const sendMessageButton = document.getElementById("sendMessage");

    // Ejemplo de datos de servidores, canales y mensajes
    let servers = [];
    let currentServerId = null;

    function displayServers() {
        serverList.innerHTML = "";
        if (servers.length === 0) {
            serverList.innerHTML = "<p>No perteneces a ningún servidor.</p>";
        } else {
            servers.forEach((server) => {
                const listItem = document.createElement("li");
                listItem.textContent = server.name;
                listItem.addEventListener("click", () => {
                    currentServerId = server.id;
                    displayChannels();
                });
                serverList.appendChild(listItem);
            });
        }
    }

    function displayChannels() {
        channelList.innerHTML = "";
        if (currentServerId !== null) {
            const channelsInServer = channels.filter((channel) => channel.serverId === currentServerId);
            if (channelsInServer.length === 0) {
                channelList.innerHTML = "<p>No hay canales en este servidor.</p>";
            } else {
                channelsInServer.forEach((channel) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = channel.name;
                    listItem.addEventListener("click", () => {
                        displayMessages(channel.id);
                    });
                    channelList.appendChild(listItem);
                });
            }
        }
    }

    function displayMessages(channelId) {
        messageList.innerHTML = "";
        const messagesInChannel = messages.filter((message) => message.channelId === channelId);
        if (messagesInChannel.length === 0) {
            messageList.innerHTML = "<p>No hay mensajes en este canal.</p>";
        } else {
            messagesInChannel.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
            messagesInChannel.forEach((message) => {
                const listItem = document.createElement("li");
                listItem.textContent = message.text;
                messageList.appendChild(listItem);
            });
        }
    }

    function createServer() {
        const serverName = prompt("Ingrese el nombre del nuevo servidor:");
        if (serverName) {
            const newServer = { id: servers.length + 1, name: serverName };
            servers.push(newServer);
            displayServers();
        }
    }

    function createChannel() {
        if (currentServerId !== null) {
            const channelName = prompt("Ingrese el nombre del nuevo canal:");
            if (channelName) {
                const newChannel = { id: channels.length + 1, serverId: currentServerId, name: channelName };
                channels.push(newChannel);
                displayChannels();
            }
        } else {
            alert("Selecciona un servidor antes de crear un canal.");
        }
    }

    function sendMessage() {
        if (currentServerId !== null) {
            const messageText = newMessageTextarea.value;
            if (messageText) {
                const newMessage = {
                    id: messages.length + 1,
                    channelId: currentChannelId,
                    text: messageText,
                    timestamp: new Date().toISOString(),
                };
                messages.push(newMessage);
                displayMessages(currentChannelId);
                newMessageTextarea.value = "";
            }
        } else {
            alert("Selecciona un canal antes de enviar un mensaje.");
        }
    }

    // Event listeners
    createServerButton.addEventListener("click", createServer);
    createChannelButton.addEventListener("click", createChannel);
    sendMessageButton.addEventListener("click", sendMessage);

    // Inicialización
    displayServers();
});



// Función para mostrar mensajes y habilitar la edición/eliminación
function displayMessages(channelId, usuarioId) {
    messageList.innerHTML = "";
    const messagesInChannel = messages.filter((message) => message.channelId === channelId);
    
    messagesInChannel.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    
    messagesInChannel.forEach((message) => {
        const listItem = document.createElement("li");
        listItem.textContent = message.text;

        // Agrega botones de edición/eliminación solo si el usuario es el autor
        if (message.usuarioId === usuarioId) {
            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.addEventListener("click", () => {
                // Aquí puedes implementar la lógica para editar el mensaje
                const nuevoTexto = prompt("Edita tu mensaje:", message.text);
                if (nuevoTexto) {
                    message.text = nuevoTexto;
                    displayMessages(channelId, usuarioId);
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", () => {
                // Aquí puedes implementar la lógica para eliminar el mensaje
                const confirmarEliminacion = confirm("¿Estás seguro de que deseas eliminar este mensaje?");
                if (confirmarEliminacion) {
                    const index = messages.indexOf(message);
                    if (index !== -1) {
                        messages.splice(index, 1);
                        displayMessages(channelId, usuarioId);
                    }
                }
            });

            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
        }

        messageList.appendChild(listItem);
    });
}
