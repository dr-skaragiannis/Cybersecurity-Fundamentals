import fs from "fs";
import path from "path";
import { generateStandaloneHtml } from "../src/utils/generateStandaloneHtml";

async function main() {
  console.log("Generating complete standalone offline HTML files...");

  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate Greek edition
  console.log("Generating Greek edition...");
  const elHtml = generateStandaloneHtml("el");
  fs.writeFileSync(path.join(publicDir, "Cybersecurity101_Complete_Offline_EL.html"), elHtml, "utf8");
  fs.writeFileSync(path.join(rootDir, "Cybersecurity101_Complete_Offline_EL.html"), elHtml, "utf8");

  // Generate English edition
  console.log("Generating English edition...");
  const enHtml = generateStandaloneHtml("en");
  fs.writeFileSync(path.join(publicDir, "Cybersecurity101_Complete_Offline_EN.html"), enHtml, "utf8");
  fs.writeFileSync(path.join(rootDir, "Cybersecurity101_Complete_Offline_EN.html"), enHtml, "utf8");

  // Generate Bilingual edition
  console.log("Generating Bilingual edition...");
  const dualHtml = generateStandaloneHtml("both");
  fs.writeFileSync(path.join(publicDir, "Cybersecurity101_Complete_Offline_Bilingual.html"), dualHtml, "utf8");
  fs.writeFileSync(path.join(rootDir, "Cybersecurity101_Complete_Offline_Bilingual.html"), dualHtml, "utf8");

  console.log("All offline HTML editions generated successfully!");
  console.log(`- EL HTML Size: ${(elHtml.length / 1024).toFixed(1)} KB`);
  console.log(`- EN HTML Size: ${(enHtml.length / 1024).toFixed(1)} KB`);
  console.log(`- Bilingual HTML Size: ${(dualHtml.length / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error("Error generating offline HTML:", err);
  process.exit(1);
});
