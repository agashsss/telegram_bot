const {getAuth , getGoogleSheet} = require('../helperFunctions')
const spreadsheetId = process.env.SHEET_ID
let ROW_GEN = 0;

exports.getAllClients = async(req, res) => {
    try {
        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);

        const getSheetData = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `ClientInfo!A2:E`,
        });

        res.send(getSheetData.data.values);
    } catch (e) {
        console.log(e.message)
    }
}

exports.getClientByRow = async(req, res) => {
    try {

        const row = req.params.row;

        if(row <= 1) {
            res.send('cannot get header')
            return;
        }

        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);

        const getSheetData = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `ClientInfo!A${row}:E${row}`,
        });

        res.send(getSheetData.data.values);
    } catch (e) {
        console.log(e.message)
    }
}

exports.addClient = async(req, res) => {

    try {
        ROW_GEN++;
        const ROW = ROW_GEN;
        if (!req) {
            res.send('Request must not be empty')
            ROW_GEN--;
            return;
        }

        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);


        await googleSheet.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: `ClientInfo!A${ROW}:E${ROW}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [['@' + req.body.username, req.body.name, req.body.city, req.body.role, req.body.hobby]],
            }
        });
        res.send('Submitted Successfully');
    } catch (e) {
        ROW_GEN--;
        console.log(e.message)
    }
}

exports.updateClientByRow = async(req, res) => {
    try{
        const row = Number(req.params.row);

        if(row <= 1) {
            res.send('cannot update header')
            return;
        }

        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);
        let username;

        if(req.body.username) {
            username = '@' + req.body.username;
        }

        let name;

        if(req.body.username) {
            name = req.body.name;
        }

        let city;

        if(req.body.city) {
            city = req.body.city
        }

        let role;

        if(req.body.role) {
            role = req.body.role
        }

        let hobby;

        if(req.body.hobby) {
            hobby = req.body.hobby
        }



        await googleSheet.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: `ClientInfo!A${row}:E${row}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[username, name, city, role, hobby]],
            }
        })

        res.send('UPDATED SUCCESSFULLY')
    }catch (e) {
        console.log(e.message)
        res.send(e.message)
    }
}

exports.deleteClientByRow = async(req, res) => {
    try{
        const row = Number(req.params.row);
        if(row <= 1) {
            res.send('cannot delete header')
            return;
        }
        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);

        await googleSheet.spreadsheets.values.clear({
            auth,
            spreadsheetId,
            range: `ClientInfo!A${row}:F${row}`,
        });

        res.send('Deleted Successfully');
    }catch (e) {
        console.log(e.message)
        }
    }