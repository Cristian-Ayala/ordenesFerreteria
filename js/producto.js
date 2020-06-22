var vm = new Vue({
    el: "#domVue",
    data: {
        productos: [],
        producto: {
            idMarca: 0,
            nombreProd: "",
            activoProd: true,
            descripcion: "",
            idCategoria: 0,
            precioUnit: null,
            stockProd: null,
            upc: null
        },
        displayOption: "",
        searchDisplay: "",
        urlApi: `${ApiRestUrl}producto`,
        marcas: [],
        categorias: [],
        categoriaSelected: ""
    },
    methods: {

        /*
        Modifica el registro seleccionado
        */
        edithRegistro() {
            axios.put(this.urlApi, JSON.stringify(this.marca), {
                headers: {
                    'content-type': 'application/json'
                }
            }).then(
                response => {
                    this.getAll();
                    console.log(response.status);
                }
            ).catch(ex => {
                console.log(ex)
            })

        },
        /*
        creacion de nuevos registros
        (no se pueden crear registros vacios)
         */
        createRegistro: function () {
            if (this.marca.nombreMarca.trim() !== "") {
                console.log(this.marca);
                axios.post(this.urlApi, JSON.stringify(this.marca), {
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(response => {
                    console.log(response.status);
                    this.getAll();
                }).catch(ex => {
                    console.log(ex)
                });
            }

        },

        /*
        eliman registros, correspondiente al id seleccionado
         */
        removeRegistro: function () {
            this.displayOption = 'eliminar';
            axios.put(this.urlApi + "/remove/" + this.marca.idMarca).then(
                response => {
                    this.getAll();
                    console.log(response.status)
                }
            ).catch(ex => {
                console.log(ex)
            });

        },

        /*
        recolecta todos los datos al hacer una peticion al api
         */
        getAll() {
            axios.get(this.urlApi).then(
                response => {
                    this.productos = response.data
                    this.productos = this.productos.filter(prod => prod.activoProd === true);
                }
            ).catch(ex => {
                console.log(ex)
            })
        },

        /*
        limpiando valores de la marca previamente seleccionada
         */
        clearData() {
            this.marca = {
                idMarca: 0,
                nombreProd: "",
                activoProd: true,
                descripcion: "",
                idCategoria: 0,
                precioUnit: null,
                stockProd: null,
                upc: null
            }
        },
        getMarcaSelected(mar) {
            this.marca = mar;
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
            // idMarca: 0,
            // idCategoria: 0,
            let array = (this.productos[valor].nombreProd + this.productos[valor].descripcion+this.productos[valor].precioUnit+this.productos[valor].stockProd+this.productos[valor].upc).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        },
    },
    /*
    hook para inicializar los valores de la tabla
     */
    mounted() {
        // Obtener las categorias
        axios.get(ApiRestUrl + "categoria").then(
            response => {
                this.categorias = response.data;
                console.log(response.status);
                // Obtener las marcas
                axios.get(ApiRestUrl + "marca").then(
                    response => {
                        this.marcas = response.data;
                        console.log(response.status);
                        this.getAll();
                    }
                ).catch(ex => {
                    console.log(ex)
                })
            }
        ).catch(ex => {
            console.log(ex)
        })

    },
});