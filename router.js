module.exports = function(app) {
    app.get('/:name', function(req, res) {
        res.send("Your Name: " + req.params.name );
    });

    app.use((err, req, res, next) => {
        const status = err.status || 500;
        res.status(status).json({ error: err });
    })
      
    app.use((req, res, next) => {
        res.status(404).json({ error: { message: 'Not found' }});
    })
}