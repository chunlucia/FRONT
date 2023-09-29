function getProfile() {
    const url = "http://127.0.0.1:5000/auth/profile";

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    document.getElementById("nombre_usuario").innerText = data.username;
                   // document.getElementById("email").innerText = data.email;
                    document.getElementById("nombre").innerText = data.first_name;
                    document.getElementById("apellido").innerText = data.last_name;
                });
            } else {
                return response.json().then(data => {
                    document.getElementById("message").innerHTML = data.message;
                });
            }
        })
        .catch(error => {
            document.getElementById("message").innerHTML = "Ocurrió un error.";
        });
}


function logout() {
    const url = "http://127.0.0.1:5000/auth/logout";

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    window.location.href = "login.html";
                });
            } else {
                return response.json().then(data => {
                    document.getElementById("message").innerHTML = data.message;
                });
            }
        })
        .catch(error => {
            document.getElementById("message").innerHTML = "Ocurrió un error.";
        });
}


window.addEventListener('load', function () {
    getProfile();
});
document.getElementById("logout").addEventListener("click", logout);