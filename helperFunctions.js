const {google} =require('googleapis')


function getAuth() {
    return new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
}


async function getGoogleSheet(auth) {
    const client = await auth.getClient();
    return google.sheets({version: 'v4', auth: client});
}

module.exports = {
    getAuth,
    getGoogleSheet
}

