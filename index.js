const express = require('express');
const app = express();

// app is listening for get requests on '/'.
// req variable is the request, res is the response express sends back
// here we're sending back some JSON
app.get('/', (req, res) => {
    res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//app.post      => send some info
//app.put       => update ALL properties of somethign
//app.delete    => delete something
//app.patch     => update one or two properties (not all)
