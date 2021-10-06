$.ajax({
    type: "GET",
    url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
    success: function (respuesta) {
        console.log(respuesta)
    }
});