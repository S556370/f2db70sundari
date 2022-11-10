var universities = require('../models/university');
// List of all universities
exports.universities_list = async function (req, res) {
    try {
        result = await universities.find();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific University.
exports.specific_university = function (req, res) {
    res.send('NOT IMPLEMENTED: universities detail: ' + req.params.id);
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
exports.university_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: universities delete DELETE ' + req.params.id);
};
// Handle University update form on PUT.
exports.university_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: universities update PUT' + req.params.id);
};
exports.university_view_all_Page = async function (req, res) {
    try {
        let result = await universities.find();
        res.render('universities', { title: 'universities Search Results', results: result });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};