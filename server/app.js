const express = require("express");
const path = require("path");
const XLSX = require("xlsx");

const app = express();

// Utiliser le dossier public pour les fichiers statiques
app.use(express.static("public"));

// Route principale pour servir index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/Index.html"));
});

// Route pour lire et retourner le fichier Excel en JSON
app.get("/data", async function (req, res) {
  const workbook = XLSX.readFile(path.join(__dirname, "assets/poesy.xlsx"));
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const dataToJson = XLSX.utils.sheet_to_json(worksheet);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(dataToJson));
});

// Vérifier si le script est exécuté en local
if (require.main === module) {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

// Exporter l'application pour Vercel
module.exports = app;
