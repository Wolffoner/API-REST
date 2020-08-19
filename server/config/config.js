// ============= PORT
process.env.PORT = process.env.PORT || 3000;

// ============= ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ============= DB

let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = `mongodb://localhost:27017/coffe`;
} else {
    urlDB = `mongodb+srv://wolffoner:6zrdlxxdjHi69cNc@cluster0.mrwfr.mongodb.net/coffee`;
}

process.env.URLDB = urlDB;
