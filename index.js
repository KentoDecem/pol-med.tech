import express from 'express';
import fs from 'fs'; // File System
import nodeMailer from "nodemailer"
import 'dotenv/config';

const app = express();
const PORT = 3003;

// For form
app.use(express.urlencoded({ extended: true }));

// For email
async function mail(imie, email, telefon, wiadomosc, strona, selectedLanguage) {
    const transporter = nodeMailer.createTransport({
        host: 'serwer2384825.home.pl',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const html=`
    <h1>Wiadomość z formularza kontaktowego</h1>
    <h2>Dane Klienta:</h2>
    <ul>
        <li><b>Imię:</b> ${imie}</li>
        <li><b>Numer telefonu:</b> ${telefon}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Język interfejsu klienta:</b> ${selectedLanguage}</li>
    </ul>
    <h2>Wiadomość:</h2>
    <p>${wiadomosc}</p>
    `;

    let sendTo = "biuro@pol-med.tech"
    // test
    console.log(sendTo)

    const info = await transporter.sendMail({
        from: `${imie} <klient@pol-med.tech>`,
        to: sendTo,
        subject: `Wiadomość od ${imie}`,
        html: html,
    })

    console.log("Message sent: " + info.messageId);
}


let fullLanguageNames = {
    "pl": "Polski",
    "en": "English",
    "ua": "Українська",
    "de": "Deutsch"
};

// Default Language
let selectedLanguage = "pl";

// Middleware for language selection
app.use((req, res, next) => {
    res.locals.navigation = getJsonFile("navigation", selectedLanguage)
    res.locals.notSelectedList = Object.keys(fullLanguageNames).filter(lang => lang !== selectedLanguage);
    res.locals.fullLanguageNames = fullLanguageNames;

    res.locals.footer = getJsonFile("footer", selectedLanguage)
    next();
});

// languages
app.get('/language/:lang', (req, res) => {
    selectedLanguage = req.params.lang;
    let redirectTo = req.header('Referer') || '/';
    res.redirect(redirectTo);
})



app.get('/', (req, res) => {
    res.locals.index = getJsonFile("index", selectedLanguage);
    res.render('index.ejs');
});

app.get('/edukacja', (req, res) => {
    res.locals.edukacja = getJsonFile("edukacja", selectedLanguage);
    res.locals.stanowiska = getJsonFile("stanowiska", selectedLanguage);
    res.render('edukacja.ejs');
});

app.get('/edukacja/stanowisko/:id', (req, res) => {
    let selectedId = req.params.id;

    let iloscStanowisk = 10;
    if (selectedId > iloscStanowisk || selectedId < 1) {
        res.render('404.ejs');
    }

    res.locals.stanowiska = getJsonFile("stanowiska", selectedLanguage);
    res.render('edukacja-stanowiska.ejs', {selectedId: selectedId});
});



app.get('/narzedzia', (req, res) => {
    res.locals.narzedzia = getJsonFile("narzedzia", selectedLanguage);
    
    res.render('narzedzia.ejs');
});

app.get('/oleje', (req, res) => {
    res.locals.oleje = getJsonFile("oleje", selectedLanguage);
    
    res.render('oleje.ejs');
});

app.get('/kontakt', (req, res) => {
    res.locals.kontakt = getJsonFile("kontakt", selectedLanguage);
    res.render('kontakt.ejs');
});

app.get('/o_nas', (req, res) => {
    res.locals.o_nas = getJsonFile("o_nas", selectedLanguage);
    res.render('o_nas.ejs');
});

app.get("/edukacja/interaktywna_platforma_edukacyjna", (req, res) => {
    res.locals.interaktywna_platforma = getJsonFile("interaktywna_platforma", selectedLanguage);
    res.render("interaktywna_platforma_edukacyjna.ejs")
})

app.get("/prawa_autorskie", (req, res) => {
    res.locals.prawa_autorskie = getJsonFile("prawa_autorskie", selectedLanguage);
    res.render("prawa_autorskie.ejs")
})

// List of privacy policy updates
let privacyPolicyList = getFolderNames("./languages/privacy_policy/").sort(compareDates);
let latestPrivacyPolicyUpdate = privacyPolicyList[privacyPolicyList.length - 1];

app.get('/polityka_prywatnosci', (req, res) => {
    res.locals.privacyPolicy = getJsonFile("privacy_policy", selectedLanguage, latestPrivacyPolicyUpdate);
    
    
    res.locals.privacyPolicyList = privacyPolicyList;
    res.locals.latestPrivacyPolicyUpdate = latestPrivacyPolicyUpdate;
    res.render('polityka_prywatnosci.ejs');
});

// Get privacy policy legacy
app.get('/polityka_prywatnosci/v/:version', (req, res) => {
    // Redirect to default if newest version selected
    if (req.params.version == privacyPolicyList.length) {
        return res.redirect('/polityka_prywatnosci');
    }

    // Get privacy policy
    try {
        res.locals.privacyPolicy = getJsonFile("privacy_policy", selectedLanguage, privacyPolicyList[req.params.version - 1]);
    } catch (error) {
        res.status(404).render("404.ejs")
    }

    res.locals.privacyPolicyList = privacyPolicyList;
    res.locals.latestPrivacyPolicyUpdate = latestPrivacyPolicyUpdate;
    res.render('polityka_prywatnosci.ejs');
});







// redirections 
//// --------
app.get('/education', (req, res) => {
    selectedLanguage = 'en';
    res.redirect('/edukacja');
});

app.get('/tools/', (req, res) => {
    selectedLanguage = 'en';
    res.redirect('/narzedzia');
});

app.get('/contact', (req, res) => {
    selectedLanguage = 'en';
    res.redirect('/kontakt');
});

app.get('/about', (req, res) => {
    selectedLanguage = 'en';
    res.redirect('/o_nas');
});

app.get('/privacy_policy', (req, res) => {
    selectedLanguage = 'en';
    res.redirect('/polityka_prywatnosci');
});
//// ---------



// Posts
app.post("/wiadomosc", (req, res) => {
    let name = req.body.name
    let phone = req.body.telephone
    let email = req.body.email
    let message = req.body.message
    let strona = req.body.strona
    console.log(name, phone, email, message, strona, selectedLanguage)

    mail(name, email, phone, message, strona, selectedLanguage)
    .catch(e => console.log(e));
    res.redirect("/")
})


// folder for static files
app.use(express.static('public'));

// 404
app.use((req, res, next) => { 
    res.status(404).render("404.ejs") 
}) 

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});







//* Functions

// Getting list of folder names (for privacy policy list)
function getFolderNames(path) {
    return fs.readdirSync(path, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

// Comparing dates in the format dd.mm.yyyy (for privacy policy list)
function compareDates(date1, date2) {
    const [day1, month1, year1] = date1.split('.').map(Number);
    const [day2, month2, year2] = date2.split('.').map(Number);

    if (year1 !== year2) {
        return year1 - year2;
    } else if (month1 !== month2) {
        return month1 - month2;
    } else {
        return day1 - day2;
    }
}

// Read Json file
function getJsonFile(name, lang, date = null) {
    let fileRoute;
    if (date) {
        fileRoute = `./languages/${name}/${date}/${lang}.json`;
    } else {
        fileRoute = `./languages/${name}/${lang}.json`;
    }

    let rawFile = fs.readFileSync(fileRoute);
    let file = JSON.parse(rawFile);
    return file;
}