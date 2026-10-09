import fs from "node:fs";
import path from "node:path";
import { coursework } from "../src/data/coursework.ts";
import { courseCatalog } from "../src/data/course-catalog.ts";
import { validateCoursework } from "../src/lib/coursework-validation.ts";

const publicRoot = path.resolve("public");
const errors = validateCoursework(coursework, courseCatalog, (url) => {
  const file = path.resolve(publicRoot, "." + url);
  return (
    file.startsWith(publicRoot + path.sep) &&
    fs.existsSync(file) &&
    fs.statSync(file).isFile()
  );
});
if (errors.length) {
  console.error(
    "Coursework validation failed:\n" +
      errors.map((error) => "- " + error).join("\n"),
  );
  process.exitCode = 1;
} else {
  console.log(
    `Coursework validation passed: ${coursework.length} assignments, ${new Set(coursework.map((work) => work.courseId).filter(Boolean)).size} courses, ${coursework.reduce((sum, work) => sum + work.documents.length, 0)} documents.`,
  );
}
