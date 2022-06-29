const fs = require('fs');

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta;
	}

	async save(objeto) {
		try {
			const productos = JSON.parse(
				await fs.promises.readFile(this.ruta, 'utf-8')
			);
			const idList = productos.map((a) => a.id);
			const largestId = idList.reduce((a, b) => {
				return Math.max(a, b);
			});
			const newId = largestId + 1;
			productos.push({ ...objeto, id: newId || 1 });
			await fs.promises.writeFile(this.ruta, JSON.stringify(productos));
			console.log(`el id asignado es ${newId}`);
		} catch (error) {
			console.log(`Hubo un error al leer el archivo ${error}`);
		}
	}

	async getById(id) {
		try {
			const productos = JSON.parse(
				await fs.promises.readFile(this.ruta, 'utf-8')
			);
			const check = productos.some((a) => a.id === id);
			if (check) {
				const product = productos.find((a) => a.id === id);
				console.log(product);
				return product;
			} else {
				console.log('no existe un objeto con ese id');
				return null;
			}
		} catch (error) {
			console.log(`Hubo un error al leer el archivo ${error}`);
		}
	}

	async getAll() {
		try {
			const productos = JSON.parse(
				await fs.promises.readFile(this.ruta, 'utf-8')
			);
			console.log(productos);
			return productos;
		} catch (error) {
			console.log(`Hubo un error ${error}`);
		}
	}

	async deleteById(id) {
		try {
			const productos = JSON.parse(
				await fs.promises.readFile(this.ruta, 'utf-8')
			);
			const newProductos = productos.filter((productos) => productos.id !== id);
			console.log(newProductos);
			await fs.promises.writeFile(this.ruta, JSON.stringify(newProductos));
			console.log(`Hubo un error al escribir el archivo ${error}`);
		} catch (error) {
			console.log(`Hubo un error al leer el archivo ${error}`);
		}
	}

	async deleteAll() {
		try {
			await fs.promises.writeFile(this.ruta, JSON.stringify([]));
		} catch (error) {
			console.log(`Hubo un error al reescribir el archivo ${error}`);
		}
	}

	async randomProduct() {
		try {
			const array = await fs.promises.readFile(this.ruta, 'utf-8');
			const products = JSON.parse(array);
			var item = products[Math.floor(Math.random() * products.length)];
			console.log(item);
		} catch (error) {
			console.log(`Hubo un error ${error}`);
		}
	}
}

const usuario = new Contenedor('./products.txt');
// usuario.save({
// 	title: 'Harry Poter Y La Camara Secreta',
// 	price: 17.5,
// 	thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/91voauWrUKL.jpg',
// });
// usuario.getAll();
// usuario.getById(2);
// usuario.deleteById(1);
// usuario.deleteAll();
usuario.randomProduct();

