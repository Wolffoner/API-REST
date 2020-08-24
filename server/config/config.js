// ============= PORT
process.env.PORT = process.env.PORT || 3000;

// ============= ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ============= EXPIRATION TOKEN
//60 Sec
//60 Min
//24 Hrs
//30 Days
process.env.EXPIRATION_TOKEN =  60 * 60 * 24 * 30;

// ============= SEED

process.env.SEED = process.env.SEED || `seed-dev` ;

// ============= DB

let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = `mongodb://localhost:27017/coffe`;
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
