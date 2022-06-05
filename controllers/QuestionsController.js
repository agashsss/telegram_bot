const {getGoogleSheet} = require('../helperFunctions')
const {google} = require("googleapis");
const spreadsheetId = process.env.SHEET_ID

function getAuth() {
    return new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    });
}

exports.getAllQuestions = async(req, res) => {
    try {
        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);

        const getSheetData = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `Questions!A2:A`,
        });

        res.send(getSheetData.data.values);
    } catch (e) {
        console.log(e.message)
    }
}

exports.getQuestion = async(req, res) => {
    try {
        let row;
        if(req.params.row < 1) {
            row = 1;
        } else {
            row = Number(req.params.row) + 1;
        }

        if(row > 7) {
            row = 7;
        }

        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);

        const getSheetData = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `Questions!A${row}:A${row}`,
        });

        res.send(getSheetData.data.values);
    } catch (e) {
        console.log(e.message)
    }
}