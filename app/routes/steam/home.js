module.exports = function(app){
  app.get('/', function(req,res){
    let pool = app.config.dbConnection;
    let steam = app.app.model.jogadorModel;
    steam.findAll(pool, function(err,result){
      if(err){
        console.log(err.stack);
      }
      else{
        res.render('index', {steam : result});
      }
    })
  });
}
