const estadoInicial = {
    productos: [
        {id: 1, nombre: 'Producto 1'},
        {id: 2, nombre: 'Producto 2'},
        {id: 3, nombre: 'Producto 3'},
        {id: 4, nombre: 'Producto 4'}
    ],

    carrito: []
}


const reducer = (estado = estadoInicial, accion) => {
    switch(accion.type){
        case 'AGREGAR_PRODUCTO_AL_CARRITO':
            const {nombre, idProductoAAgregar} = accion;
            if(estado.carrito.length === 0) {
                return {
                    ...estado,
                    carrito: [{id: idProductoAAgregar, nombre: nombre, cantidad: 1}]
                }
            } else {
                    // Para editar el arreglo lo clonamos
	        		const nuevoCarrito = [...estado.carrito];
			
			        // compruebo con filter si el carrito ya tiene el id del producto a agregar
			        const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {
				    return productoDeCarrito.id === idProductoAAgregar
                    }).length > 0;
                    
                    // Si lo tiene hay que actualizzar su valor
			        // para eso hay que buscarlo y enconmtrar su posición en el arreglo y extraer su cantidad
                    if(yaEstaEnCarrito){
                        nuevoCarrito.forEach((productoDeCarrito, index) => {
                            if(productoDeCarrito.id === idProductoAAgregar){
                                const cantidad = nuevoCarrito[index].cantidad;
                                nuevoCarrito[index] = {id: idProductoAAgregar, nombre: nombre, cantidad: cantidad + 1}
                            }
                        });
                    
                        // Si no lo tiene ese producto la agregamos
                    } else {
                        nuevoCarrito.push(
                            {id: idProductoAAgregar,
                            nombre: nombre,
                        cantidad: 1}
                        );
                    }
                    
                    return {
                        ...estado,
                        carrito: nuevoCarrito
         
         
                }

            
         
            }
        default:
            return estado;

    }
    
}

export default reducer;