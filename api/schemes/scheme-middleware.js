const Schemes = require('./scheme-model');
const db = require('../../data/db-config')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  Schemes.findById(req.params.scheme_id)
  .then( schemeById => {
    if (schemeById) {
      req.scheme = schemeById;
      next();
    } else {
      next({status: 404, message: `scheme with scheme_id <${req.params.scheme_id}> not found`})
    }
  })
  .catch(next)
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try{
    const { scheme_name } = req.body;
    if(!scheme_name || scheme_name === '' || typeof scheme_name !== 'string'){
    // const valid = await schemeSchema.validate(req.body)
    // req.body = valid
    next({ status: 400, message: 'invalid scheme_name'});
    }else{
      next();
    }
  }catch(err){
    next(err);
  }

};


/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {
  try{
    const valid = await steps.validate(req.body);
    req.body = valid;
    next();
  }catch(err){
    next({ status: 400, message: err.message});
  }
};


module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
