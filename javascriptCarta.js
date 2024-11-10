console.log("ok");
const miDiv = document.getElementById("contenedor");

fetch('https://raw.githubusercontent.com/yagogarmar/carta/main/carta.xml')
    .then(response => response.text())
    .then(data => {
        //GESTION DEL XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        console.log(xmlDoc);


        const categorias = ["entrantes", "principales", "postres"];

        //ITERAR SOBRE CADA CATEGORIA
        categorias.forEach(categoria => {
            const categoriaElement = xmlDoc.getElementsByTagName(categoria)[0];


            if (categoriaElement) {
                const platos = categoriaElement.getElementsByTagName('plato');


                for (let i = 0; i < platos.length; i++) {
                    const nombre = platos[i].getElementsByTagName('nombre')[0].textContent;
                    const descripcion = platos[i].getElementsByTagName('descripcion')[0].textContent;
                    const precio = platos[i].getElementsByTagName('precio')[0].textContent;
                    const img = platos[i].getElementsByTagName('img')[0].textContent;

                    console.log(`Categoría: ${categoria}`);
                    console.log(`Nombre: ${nombre}`);
                    console.log(`Descripción: ${descripcion}`);
                    console.log(`Precio: ${precio}`);
                    console.log(`Img: ${img}`);


                    miDiv.innerHTML += `
                    <div class="col-sm-6 col-lg-4 all ${categoria}">
                        <div class="box">
                            <div>
                                <div class="img-box">
                                    <img src="images/${img}" alt="">
                                </div>
                                <div class="detail-box">
                                    <h5>${nombre}</h5>
                                    <p>${descripcion}</p>
                                    <div class="options">
                                        <h6>${precio}€</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                }
            }
        });
    })
    .catch(error => console.error('Error al cargar el archivo XML:', error));