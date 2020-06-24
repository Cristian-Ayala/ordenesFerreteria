var vm = new Vue({
    el: "#domVue",
    data: {
        ordenes: [],
        orden: {
            idMarca: null,
            nombreProd: "",
            activoProd: true,
            descripcion: "",
            idCategoria: null,
            precioUnit: null,
            stockProd: null,
            upc: null,
            nombreMarca: "",
            nombreCategoria: ""
        },
        displayOption: "",
        searchDisplay: "",
        urlApi: `${ApiRestUrl}orden`,
        marcas: [],
        categorias: [],
        add: [],
        // Esto va a servir para construir objetos ordenes
        productosObject: [],
        i: 0,
        j: 0,
    },
    methods: {

        /*
        Modifica el registro seleccionado
        */
        edithRegistro() {
            this.producto.idMarca = this.marcas.filter(mar => mar.nombreMarca === this.producto.nombreMarca)[0].idMarca;
            this.producto.idCategoria = this.categorias.filter(cat => cat.nombreCat === this.producto.nombreCategoria)[0].idCategoria;
            if (this.producto.upc.trim() !== "" && this.producto.stockProd > 0 && this.producto.nombreProd.trim() !== "" && this.producto.idMarca > 0 && this.producto.idCategoria > 0) {
                console.log(this.producto);
                axios.put(this.urlApi, JSON.stringify(this.producto), {
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(response => {
                    console.log(response.status);
                    this.getAll();
                }).catch(ex => {
                    console.log(ex)
                });
            } else {
                console.log("No se pudo editar el producto porque uno de los valores es nulo, indefinido o está vacio");
            }
        },
        /*
        creacion de nuevos registros
        (no se pueden crear registros vacios)
         */
        createRegistro: function () {
            this.producto.idMarca = this.marcas.filter(mar => mar.nombreMarca === this.producto.nombreMarca)[0].idMarca;
            this.producto.idCategoria = this.categorias.filter(cat => cat.nombreCat === this.producto.nombreCategoria)[0].idCategoria;
            if (this.producto.upc.trim() !== "" && this.producto.stockProd > 0 && this.producto.nombreProd.trim() !== "" && this.producto.idMarca > 0 && this.producto.idCategoria > 0) {
                console.log(this.producto);
                axios.post(this.urlApi, JSON.stringify(this.producto), {
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(response => {
                    console.log(response.status);
                    this.getAll();
                }).catch(ex => {
                    console.log(ex)
                });
            } else {
                console.log("No se pudo registrar el producto porque uno de los valores es nulo, indefinido o está vacio");
            }

        },

        /*
        eliman registros, correspondiente al id seleccionado
         */
        removeRegistro: function () {
            axios.put(this.urlApi + "/remove/" + this.producto.upc).then(
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
        getAll: async function () {
            await axios.get(ApiRestUrl + "detalleOrden").then(
                response => {
                    this.ordenes = response.data
                    this.ordenes.map(detOrd => {
                        try {
                            if (typeof this.ordenes[this.i].idOrden != 'undefined') {
                                if (this.ordenes[this.i].idOrden !== detOrd.orden.idOrden) {
                                    this.i++;
                                    this.j = 0;
                                    this.productosObject = [];
                                }
                            }
                        } catch (err) {}
                        this.ordenes[this.i] = detOrd.orden;
                        this.productosObject.push(detOrd.producto);
                        this.ordenes[this.i].productos = this.productosObject;
                        this.ordenes[this.i].productos[this.j].descuento = detOrd.descuento;
                        this.ordenes[this.i].productos[this.j].cantidadProd = detOrd.cantidadProd;
                        this.ordenes[this.i].productos[this.j].precioUnit = detOrd.precioUnit;
                        try {
                            let myDate= new Date(this.ordenes[this.i].fechaOrd.slice(0, this.ordenes[this.i].fechaOrd.length-5));
                            //para quitar [UTC] al final de la fecha
                            this.ordenes[this.i].fechaOrd = this.formatDate(myDate);
                            this.ordenes[this.i].totalOrden = this.ordenes[this.i].totalOrden.toFixed(2);
                        } catch (error) {
                        }
                        this.j++;
                    });
                }
            ).catch(ex => {
                console.log(ex)
            })
            //Quita los que no son ordenes sino detallesOrdenes
            this.ordenes = this.ordenes.slice(0, this.i + 1);
        },
        restartObject: function () {
            console.log("Me llamaron?")
            this.i++;
            this.j = 0;
            this.productosObject = [];
        },

        formatDate: function(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
          },

        /*
        limpiando valores de la marca previamente seleccionada
         */
        clearData() {
            this.producto = {
                idMarca: null,
                nombreProd: "",
                activoProd: true,
                descripcion: "",
                idCategoria: null,
                precioUnit: null,
                stockProd: null,
                upc: null,
                nombreMarca: "",
                nombreCategoria: ""
            }
        },
        getProductoSelected(prod) {
            this.producto = prod;
            // this.producto.idMarca = this.marcas.filter(mar => mar.idMarca === this.producto.idMarca)[0].nombreMarca;
            // console.log(this.marcas.filter(mar => mar.idMarca === this.producto.idMarca)[0].nombreMarca);
            // var idMar = typeof this.marcas !== 'undefined'?this.marcas.filter(mar => mar.idMarca === this.producto.idMarca)[0].nombreMarca:'';
            // this.producto.idMarca = idMar;
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
            let array = (this.marcas.filter(mar => mar.idMarca === this.productos[valor].idMarca)[0].nombreMarca + this.categorias.filter(cat => cat.idCategoria === this.productos[valor].idCategoria)[0].nombreCat + this.productos[valor].nombreProd + this.productos[valor].descripcion + this.productos[valor].precioUnit + this.productos[valor].stockProd + this.productos[valor].upc).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        },
        showEditing: function (input) {
            // Get the value from the input
            var value = input.value;
            // Get the matching `option` element from the `datalist` (which is
            // available via `input.list`)
            var option = Array.prototype.find.call(input.list.options, function (option) {
                return option.value === value;
            });
            // Get its `data-id` attribute value
            console.log(option.getAttribute("data-id"));
        }
    },
    /*
    hook para inicializar los valores de la tabla
     */
    mounted() {
        this.getAll();

        axios.get(ApiRestUrl + "marca").then(
            response => {
                this.marcas = response.data;
                console.log(response.status);
            }
        ).catch(ex => {
            console.log(ex)
        })
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