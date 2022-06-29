const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta;
	}

	async getAll() {
		try {
			const productos = JSON.parse(
				await fs.promises.readFile(this.ruta, 'utf-8')
			);
			return productos;
		} catch (error) {
			console.log(`Hubo un error ${error}`);
		}
	}

	async randomProduct() {
		try {
			const array = await fs.promises.readFile(this.ruta, 'utf-8');
			const products = JSON.parse(array);
			var item = products[Math.floor(Math.random() * products.length)];
			return item;
		} catch (error) {
			console.log(`Hubo un error ${error}`);
		}
	}
}

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));

app.get('/', (req, res) => {
	res.send('<h1> BackendProject -- Martin Tejerina </h1>');
});

app.get('/productos', async (req, res) => {
	let usuario = new Contenedor('./products.txt');
	let answer = await usuario.getAll();
	res.send(answer);
});

app.get('/productoRandom', async (req, res) => {
	let usuario = new Contenedor('./products.txt');
	let answer = await usuario.randomProduct();
	res.send(answer);
});
