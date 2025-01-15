function publicar_imagen(imageTitle, imageDescription,nivel_privacyA)
{

    //

    var contenido = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
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
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
        `;
    document.write(contenido);

    // Realiza la solicitud al endpoint
    const encodedCode = encodeURIComponent(localStorage.getItem("refresh_token"));
    const title = encodeURIComponent(imageTitle);
    const description = encodeURIComponent(imageDescription);
    const nivel_privacy = encodeURIComponent(nivel_privacyA);  
    fetch(`https://script.google.com/macros/s/AKfycbz5y5VUExFayCdNSVPVF-hw1ZKG6GZzez8EyrnH9V4kKgFI71EyIFQpdQQ5tzKeX-8J8Q/exec?refresh_token=${encodedCode}&title=${title}&description=${description}&nivel_privacy=${nivel_privacy}`)
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

function creator_info()
{
    const encodedCode = encodeURIComponent(localStorage.getItem("refresh_token"));

    fetch(`https://script.google.com/macros/s/AKfycbz5y5VUExFayCdNSVPVF-hw1ZKG6GZzez8EyrnH9V4kKgFI71EyIFQpdQQ5tzKeX-8J8Q/exec?creator=${encodedCode}`)
    .then(response =>
    {
        if (!response.ok)
        {
            console.log('Error en la respuesta del servidor');
        }
        return response.json();
    }
    )
    .then(data =>
    {
        // Aquí puedes manejar la respuesta con el objeto `data`
        let creatorData = JSON.parse(data);
        console.log(creatorData);
        // revisar intentalo mas tarde y desactivar todo
        creatorData = creatorData.data;

        nickname.innerHTML = `<img src="${creatorData.creator_avatar_url}" class="rounded-circle" alt="Avatar" style="width: 6%; height: 6%;"> <span class="badge text-bg-success text-uppercase">NickName</span> <span class="fw-bold">${creatorData.creator_nickname}</span>`

            // Referencias a los elementos
            const allowCommentCheckbox = document.getElementById("allow-comment");
        const imageDescriptionTextarea = document.getElementById("imageDescription");

        // Lógica para habilitar/deshabilitar según el valor de comment_disabled
        if (creatorData.comment_disabled)
        {
            allowCommentCheckbox.checked = false;
            allowCommentCheckbox.disabled = true; // Desactiva el checkbox
            imageDescriptionTextarea.disabled = true; // Desactiva el textarea
            imageDescriptionTextarea.classList.add("hidden"); // Oculta el textarea
        }
        else
        {

            allowCommentCheckbox.addEventListener("change", () =>
            {
                imageDescriptionTextarea.disabled = !allowCommentCheckbox.checked;
                imageDescriptionTextarea.classList.toggle("hidden", !allowCommentCheckbox.checked);
            }
            );
        }

        // // Verificar si el creador tiene restricciones de publicación
        // if (creatorData.stitch_disabled || creatorData.duet_disabled) {
        //     console.log('El creador tiene restricciones de publicación (stitch o duet).');
        // }

        // Ejemplo de cómo manejar el caso si el creador no puede hacer más publicaciones
        // if (data.canPost === false) {
        //     console.log('El creador no puede hacer más publicaciones en este momento.');
        //     // Aquí podrías agregar lógica para detener el intento de publicación
        // }

        // Array con las opciones
        let privacyOptions = creatorData.privacy_level_options

            // Referencia al elemento select
            const selectElement = document.getElementById("dynamic_select");

        // Agregar opciones dinámicamente
        privacyOptions.forEach(option =>
        {
            const opt = document.createElement("option");
            opt.value = option; // El valor será igual al texto del array
            opt.textContent = option.replace(/_/g, ' '); // Texto amigable reemplazando guiones bajos por espacios
            selectElement.appendChild(opt);
        }
        );

    }
    )
    .catch(error =>
    {
        console.error('Error al obtener la información del creador:', error);
    }
    );
}

/*brand comarcial content*/

const commercialToggle = document.getElementById('commercial-toggle');
const yourBrandCheckbox = document.getElementById('your-brand');
const brandedContentCheckbox = document.getElementById('branded-content');
const commercialOptions = document.getElementById('commercial-options');
const message = document.getElementById('message');
const publishButton = document.getElementById('publish-button');
const declaration = document.getElementById('declaration');
const visibilitySelect = document.getElementById('visibility');
const visibilityWarning = document.getElementById('visibility-warning');

// Toggle Commercial Content Options
commercialToggle.addEventListener('change', () =>
{
    const isChecked = commercialToggle.checked;
    commercialOptions.classList.toggle('hidden', !isChecked);
    checkPublishState();
}
);

// Update Message and Declaration
[yourBrandCheckbox, brandedContentCheckbox].forEach(checkbox =>
{
    checkbox.addEventListener('change', () =>
    {
        let selectedOptions = [];
        if (yourBrandCheckbox.checked)
            selectedOptions.push('Promotional content');
        if (brandedContentCheckbox.checked)
            selectedOptions.push('Paid partnership');

        if (selectedOptions.length === 0)
        {
            message.textContent = "You need to indicate if your content promotes yourself, a third party, or both.";
            publishButton.disabled = true;
        }
        else if (selectedOptions.length === 2)
        {
            message.textContent = "Your photo/video will be labeled as 'Paid partnership'.";
        }
        else
        {
            message.textContent = `Your photo/video will be labeled as '${selectedOptions[0]}'.`;
        }

        updateDeclaration();
        checkPublishState();
    }
    );
}
);

// Visibility Logic
visibilitySelect.addEventListener('change', () =>
{
    if (brandedContentCheckbox.checked && visibilitySelect.value === 'private')
    {
        visibilitySelect.value = 'public';
        visibilityWarning.classList.remove('hidden');
    }
    else
    {
        visibilityWarning.classList.add('hidden');
    }
}
);

// Update Declaration
function updateDeclaration()
{
    const isYourBrand = yourBrandCheckbox.checked;
    const isBrandedContent = brandedContentCheckbox.checked;
    declaration.classList.toggle('hidden', !(isYourBrand || isBrandedContent));

    if (isYourBrand && isBrandedContent)
    {
        declaration.innerHTML = `By posting, you agree to
                    <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank">TikTok's Music Usage Confirmation</a>
                    and 
                    <a href="https://www.tiktok.com/legal/page/global/bc-policy/en" target="_blank">Branded Content Policy</a>.`;
    }
    else if (isBrandedContent)
    {
        declaration.innerHTML = `By posting, you agree to
                    <a href="https://www.tiktok.com/legal/page/global/bc-policy/en" target="_blank">TikTok's Branded Content Policy</a>
                    and 
                    <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank">Music Usage Confirmation</a>.`;
    }
    else
    {
        declaration.innerHTML = `By posting, you agree to
                    <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank">TikTok's Music Usage Confirmation</a>.`;
    }
}

// Check Publish State
function checkPublishState()
{
    publishButton.disabled = !(commercialToggle.checked && (yourBrandCheckbox.checked || brandedContentCheckbox.checked));
}
/*fin brando comenrical content*/
