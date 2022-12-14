var universities = require('../models/university');
// List of all universities
exports.universities_list = async function (req, res) {
    try {
        result = await universities.find();
        res.render('university', { title: 'universities Search Results', results: result });
        // res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific University.
exports.specific_university = async function (req, res) {
    // res.send('NOT IMPLEMENTED: universities detail: ' + req.params.id);
    console.log("detail - " + req.params.id)
    try {
        result = await universities.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle University create on POST.
exports.university_create_post = async function (req, res) {
    console.log(req.body)
    let document = new universities();

    /**  
     * We are looking for a body, since POST does not have query parameters.
     * Even though bodies can be in many different formats, we will be picky
     * and require that it be a json object
     * { "University_Name": "California State University", "Capacity": 480000, "Location": " Los Angeles", "State": "California", "Country": "USA" }
    */
    document.University_Id = req.body.University_Id;
    document.University_Name = req.body.University_Name;
    document.Capacity = req.body.Capacity;
    document.Location = req.body.Location;
    document.State = req.body.State;
    document.Country = req.body.Country;
    try {
        result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle University delete form on DELETE.
exports.university_delete = async function (req, res) {
    // res.send('NOT IMPLEMENTED: universities delete DELETE ' + req.params.id);
        console.log("delete " + req.params.id)
        try {
        result = await universities.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
        } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
        }
       
};
// Handle University update form on PUT.
exports.university_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
     try {
     let toUpdate = await universities.findById(req.params.id)
     // Do updates of properties
     if(req.body.University_Id)  toUpdate.University_Id = req.body.University_Id;
     if(req.body.University_Name) toUpdate.University_Name = req.body.University_Name;
     if(req.body.Capacity) toUpdate.Capacity = req.body.Capacity;
     if(req.body.Location)  toUpdate.Location = req.body.Location;
     if(req.body.State) toUpdate.State = req.body.State;
     if(req.body.Country) toUpdate.Country = req.body.Country;
     
     let result = await toUpdate.save();
     console.log("Sucess " + result)
     res.send(result)
     } catch (err) {
     res.status(500)
     res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
     }
    
};
exports.university_view_all_Page = async function (req, res) {
    try {
        let result = await universities.find();
        res.render('university', { title: 'universities Search Results', results: result });
        // res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


//Assignment-12

// Handle a show one view with id specified by query

exports.university_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
      result = await universities.findById(req.query.id)
      res.render('university-detail',
        { title: 'university Detail', toShow: result });
    }
    catch (err) {
      res.status(500)
      res.send(`{'error': '${err}'}`);
    }
  };
  
  // Handle building the view for creating a university.
  // No body, no in path parameter, no query.
  // Does not need to be async
  
  exports.university_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('university-create', { title: 'university Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
  };
  // Handle building the view for updating a university.
  // query provides the id
  
  exports.university_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await universities.findById(req.query.id)
        res.render('university-update', { title: 'university Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
  };
  // Handle a delete one view with id from query
  
  exports.university_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await universities.findById(req.query.id)
        res.render('university-delete', { title: 'university Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
  };
