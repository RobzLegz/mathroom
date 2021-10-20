const supportedLanguages = [
    {
        flag: "https://flagpedia.net/data/flags/w580/lv.png",
        short: "LV",
        language: "latvian"
    }
];

const pageText = {
    latvian: {
        messages: {
            auth: {
                register: {
                    emailExists: "Šāds e-pasts jau eksistē.",
                    success: "Reģistrācija veiksmīga, tagad ielogojies.",
                },
                login: {
                    userDoesntExist: "Šis lietotājs neeksistē.",
                    incorrectPassword: "Nepareiza parole.",
                    success: "Autorizācija veiksmīga!",
                },
                token: {
                    expiredOrIncorrect: "Jūsu autorizācijas tokens ir novecojis.",
                },
                unauthorized: {
                    user: "Nēesat autorizēts",
                }
            },
            email: {
                validation: "Lūdzu ievadi pareizu e-pastu",
            },
            form: {
                allFields: "Lūdzu aizpildiet visus laukumus",
            },
            store: {
                created: "Veiksmīgi izveidots jauns veikals!",
                noStore: "Nevarējām atrast veikalu.",
                noStoreProducts: "Nevarējām atrast produktus šim veikalam",
                cantEdit: "Jūs nevarat rediģēt šo veikalu",
                cantAddProducts: "Jūs nevarat pievienot produktus šim veikalam",
            },
            CRUD: {
                deleteSuccess: "Izdzēsts veiksmīgi",
                updateSuccess: "Rediģēts veiksmīgi",
                noChangesApplyed: "Nekādas izmaiņas netika publicētas",
                mustBeAChangeFirst: "Vispirms jāveic izmaiņas",
            },
            product: {
                cantEdit: "Jūs nevarat rediģēt šo produktu",
                created: "Veiksmīgi izveidots jauns produkts",
            },
            checkout: {
                message: "Lūdzu ielieciet grozā produktus pirms pasūtīšanas.",
                order: "Pasūtījums saņemts, produkti ir ceļā pie Jums.",
            },
            error: {
                wrong: "Kaut kas aizgāja greizi.",
            }
        }
    },
    english: {
        messages: {
            auth: {
                register: {
                    emailExists: "This email already exists.",
                    success: "Register Success! Please log in now.",
                },
                login: {
                    userDoesntExist: "This user does not exist.",
                    incorrectPassword: "Incorrect password.",
                    success: "Login Success!",
                },
                token: {
                    expiredOrIncorrect: "Your token is incorrect or has expired.",
                },
                unauthorized: {
                    user: "Unauthorized user",
                }
            },
            email: {
                validation: "Please enter a valid email.",
            },
            form: {
                allFields: "Please fill in all fields.",
            },
            store: {
                created: "New store created!",
                noStore: "Couldn't find a store.",
                noStoreProducts: "Couldn't find products for this store.",
                cantEdit: "You can't edit this store.",
                cantAddProducts: "You can't add products to this store.",
            },
            CRUD: {
                deleteSuccess: "Delete success",
                updateSuccess: "Update success",
                noChangesApplyed: "No changes applyed.",
                mustBeAChangeFirst: "There must be a change made first.",
            },
            product: {
                cantEdit: "You can't edit this product",
                created: "New product created!",
            },
            checkout: {
                message: "Please select products before checkout.",
                order: "Order recieved, shop owners will speak to You soon.",
            },
            error: {
                wrong: "Something went wrong.",
            }
        }
    }
}

export {supportedLanguages, pageText};