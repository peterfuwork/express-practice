module.exports = function(app) {
    let cars = require('./data');

    // get method
    app.get('/cars', function(req, res) {
        res.send({
            cars
        });
    });

    // post method
    app.post('/cars', (req, res, next) => {
        const body = req.body;
        const newObj = {
            id: cars.length + 1,
            brand: body.brand,
            model: body.model
        };
        cars.push(newObj);
        res.send({ cars: newObj })
    });

    // put method
    app.put('/cars/:id', (req, res, next) => {
        const id = Number.parseInt(req.params.id);
        const body = req.body;
        const newArr = cars.map(obj => {
            if(obj.id === id) {
                obj.brand = body.brand;
            };
            return obj;
        });
        res.send({ cars: newArr })
    })



    // get by id
    app.get('/cars/:id', function(req, res) {
        const id = Number.parseInt(req.params.id);
        const matching = cars.filter(item => item.id === id)
        res.send({ 
            cars: matching
        });
    });

    
    app.get('/cars/:brand', function(req, res) {
        const brand = req.params.brand;
        const matching = cars.filter(item => item.brand.toLowerCase().trim() === brand.toLowerCase().trim())
        console.log(matching);
        res.send({
            cars: matching
        });
    });


    app.use((err, req, res, next) => {
        const status = err.status || 500;
        res.status(status).json({ error: err });
    })
      
    app.use((req, res, next) => {
        res.status(404).json({ error: { message: 'Not found' }});
    })
}