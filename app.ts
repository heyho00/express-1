import express from 'express';

const port = 3000;

const app = express();

app.get('/', (req, res) => {
	res.send('Hello, world!');
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

// 브라우저에서 http://localhost:3000/products 입력하면 나옴.
app.get('/products', (req, res) => {
	const products = [
		{
			category: 'Fruits', price: '$1', stocked: true, name: 'Apple',
		},
		{
			category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit',
		},
		{
			category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit',
		},
		{
			category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach',
		},
		{
			category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin',
		},
		{
			category: 'Vegetables', price: '$1', stocked: true, name: 'Peas',
		},
	];

	res.send(products);
});
