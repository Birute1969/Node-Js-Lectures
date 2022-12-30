const cors = require('cors');
const mysql = require('mysql2/promise');

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

//susikuriame Config, kad turėtume ryšį su duomenų baze:
const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Bartaseviciute1969',
    database: 'codeacademy',//db prie kurios jungiamės
    port: 3306
};

//susikuriame endpoint, kad galėtume jungtis prie duomenų bazės
//kadangi tai yra asinchroninis veiksmas, norėsime, kad truputį palauktų
//todėl naudosime async ir await:
app.get('/students', async (req, res)=>{
    //grąžina patį "connection", į kurį paduosime querry
    //guerry grąžins mums rezultatą,- visus students
    //jungiamės prie duomenų baės:
    const connection = await mysql.createConnection(mysqlConfig);
    //pasakome iš kokios lentelės ką paimti ir ką gražinti
    //priskiriame kintamajam students
    //tai taip pat yra asinchroninis veiksmas:
    const result = connection.execute('SELECT * FROM students');
    const students = result[0];
    //pasiloginame:
    console.log(students);//matysime konsolėje
    //grąžiname response:
    res.send(students);//kad nepakibtų responsas, turime kažką gražinti
    //užklausas, kad matytume, darome per Postman
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
