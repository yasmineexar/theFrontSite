$modelname = $args[0]
$modelnamec = $modelname.substring(0, 1).ToUpper() + $modelname.substring(1).ToLower()
$model = "
const Model = require(`"./model`");

module.exports = class $modelnamec extends Model {
  static tablename = `"$modelname`";
  constructor(id) {
    super();
    this.tablename= `"$modelname`";
    if (id) {
      this._id = id;
    }
  }
  create() {}
  read() {}
  update() {}
  delete() {}
  static getAll() {}
  
};
"

Out-File -FilePath ./Models/$modelnamec.js -InputObject $model

$controller = "
const $modelnamec = require(`"../Models/$modelnamec`");

exports.create = (req, res) => {
    
};
exports.update = (req,res)=>{
    
}
exports.read = (req, res) => {
    
};
exports.delet = (req, res) => {
    
};
"
Out-File -FilePath ./Controllers/$modelnamec"Controller.js" -InputObject $controller


$route = "
const router = require(`"express`").Router()
const {create,read,update,delet} = require(`"../Controllers/$modelnamec"+"Controller`")


router.get('/',read)
router.get('/:id',read)
router.post('/',create)
router.post('/:id',update)
router.delet('/:id', delete)

module.exports = router



"
Out-File -FilePath ./Routes/$modelname.js -InputObject $route