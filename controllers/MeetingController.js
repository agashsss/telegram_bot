const {getAuth , getGoogleSheet} = require('../helperFunctions')

const spreadsheetId = process.env.SHEET_ID
let ROW_GEN = 0;

exports.getAllMeetings = async(req, res) => {
    try {
        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);

        const getSheetData = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `history_of_meetings!A2:C`,
        });

        res.send(getSheetData.data.values);
    } catch (e) {
        console.log(e.message)
    }
}


exports.getMeeting = async (req, res) => {
    try {
        const ROW = Number(req.params.row)

        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);

        const getSheetData = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `history_of_meetings!A${ROW}:C${ROW}`,
        });

        res.send(getSheetData.data.values);
    } catch (e) {
        console.log(e.message)
    }
}


exports.addMeeting = async (req, res) => {
    try {
        ROW_GEN++;
        let ROW = ROW_GEN;

        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);


        await googleSheet.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: `history_of_meetings!A${ROW}:E${ROW}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [['@' + req.body.firstUser, '@' + req.body.secondUser, req.body.date]],
            }
        });
        res.send('Submitted Successfully');

    } catch (e) {
        ROW_GEN--;
        console.log(e.message)
    }
}


exports.deleteMeetingByRow = async (req, res) => {
    try {
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
            range: `history_of_meetings!A${row}:F${row}`,
        });

        res.send('Deleted Successfully');
    } catch (e) {
        console.log(e.message)
    }
}