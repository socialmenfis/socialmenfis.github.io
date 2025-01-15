function publicar_imagen(imageTitle,imageDescription)
{
            var contenido = `
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin-top: 20%;
                }
                h1 {
                    font-size: 72px;
                    color: #000;
                    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
                }
            </style>
            <h1>Esperando....</h1>
        `;
        document.write(contenido);

    // Realiza la solicitud al endpoint
    const encodedCode = encodeURIComponent(localStorage.getItem("refresh_token"));
    fetch(`https://script.google.com/macros/s/AKfycbz5y5VUExFayCdNSVPVF-hw1ZKG6GZzez8EyrnH9V4kKgFI71EyIFQpdQQ5tzKeX-8J8Q/exec?refresh_token=${encodedCode}`)
    .then(response =>
    {
        if (!response.ok)
        {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.text();
    }
    )
    .then(data =>
    {
        console.log('Respuesta del servidor:', data);

        var contenido = `
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin-top: 20%;
                }
                h1 {
                    font-size: 72px;
                    color: #000;
                    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
                }
            </style>
            <h1>Imagen subida!!</h1>
            <h2>La siguiente imagen se  genera en unos minutos</h2>
        `;
        document.write(contenido);
        fetch('https://script.google.com/macros/s/AKfycbxbHqkepU93mfDNncePX5pA1qUyDOOS6hVaHMGY1erqQ-oGej69DZsmcHn92j_yJNa-qA/exec')
        .then(response => response.json()) // Asumiendo que la respuesta es JSON
        .then(data =>
        {
            console.log(data); // Aquí puedes manejar la respuesta, como imprimirla en consola
        }
        )
        .catch(error =>
        {
            console.error('Error en la solicitud:', error);
        }
        );

        setTimeout(function ()
        {

            window.location.href = "https://socialmenfis.github.io/";
        }, 3000); // Redirige después de 3 segundos


    }
    )
    .catch(error =>
    {
        console.error('Error en la solicitud:', error);

    }
    );
}

function creator_info() {
    const encodedCode = encodeURIComponent(localStorage.getItem("refresh_token"));

    fetch(`https://script.google.com/macros/s/AKfycbz5y5VUExFayCdNSVPVF-hw1ZKG6GZzez8EyrnH9V4kKgFI71EyIFQpdQQ5tzKeX-8J8Q/exec?creator=${encodedCode}`)
    .then(response => {
        if (!response.ok) {
            console.log('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        // Aquí puedes manejar la respuesta con el objeto `data`
         let creatorData = JSON.parse(data);
         console.log(creatorData);
         creatorData= creatorData.data;
        
        nickname.innerHTML="NickName: "+ creatorData.creator_nickname
        
        // // Verificar si el creador tiene restricciones de publicación
        // if (creatorData.stitch_disabled || creatorData.duet_disabled) {
        //     console.log('El creador tiene restricciones de publicación (stitch o duet).');
        // }

        // Ejemplo de cómo manejar el caso si el creador no puede hacer más publicaciones
        // if (data.canPost === false) {
        //     console.log('El creador no puede hacer más publicaciones en este momento.');
        //     // Aquí podrías agregar lógica para detener el intento de publicación
        // }

        
    })
    .catch(error => {
        console.error('Error al obtener la información del creador:', error);
    });
}

