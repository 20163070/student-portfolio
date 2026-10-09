import type { Course, Coursework } from "../data/coursework-types.ts";

export function validateCoursework(
  works: Coursework[],
  courses: Course[],
  fileExists: (url: string) => boolean,
): string[] {
  const errors: string[] = [];
  const courseIds = new Set<string>();
  for (const course of courses) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(course.id) ||
      course.id === "unconfirmed"
    )
      errors.push(`Invalid course ID: ${course.id}`);
    if (courseIds.has(course.id))
      errors.push(`Duplicate course ID: ${course.id}`);
    courseIds.add(course.id);
    if (!course.name.trim()) errors.push(`Missing course name: ${course.id}`);
  }
  const slugs = new Set<string>();
  const validDate = (value: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value;
  const checkPath = (url: string, slug: string) => {
    if (
      !/^\/(files|images)\//.test(url) ||
      /[\\?#]/.test(url) ||
      url
        .split("/")
        .some(
          (segment) =>
            segment === ".." || segment === "." || segment.includes("%"),
        )
    ) {
      errors.push(`Invalid public asset path: ${slug}: ${url}`);
    } else if (!fileExists(url)) errors.push(`Missing file: ${slug}: ${url}`);
  };
  for (const work of works) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(work.slug))
      errors.push(`Invalid slug: ${work.slug}`);
    if (slugs.has(work.slug)) errors.push(`Duplicate slug: ${work.slug}`);
    slugs.add(work.slug);
    if (!work.title.trim()) errors.push(`Missing title: ${work.slug}`);
    if (work.courseId !== undefined && !courseIds.has(work.courseId))
      errors.push(`Unknown course ID: ${work.slug}: ${work.courseId}`);
    if (work.semester !== undefined && !work.semester.trim())
      errors.push(`Empty semester: ${work.slug}; omit unknown values`);
    for (const [field, value] of [
      ["date", work.date],
      ["updatedAt", work.updatedAt],
    ]) {
      if (value !== undefined && !validDate(value))
        errors.push(`Invalid ${field}: ${work.slug}: ${value}`);
    }
    if (work.date && work.updatedAt && work.updatedAt < work.date)
      errors.push(`updatedAt precedes date: ${work.slug}`);
    const urls = new Set<string>();
    for (const document of work.documents) {
      if (!document.label.trim() || !document.description.trim())
        errors.push(`Missing document label or description: ${work.slug}`);
      if (urls.has(document.url))
        errors.push(`Duplicate document: ${work.slug}: ${document.url}`);
      urls.add(document.url);
      if (
        !["solution", "assignment", "material", "other"].includes(document.role)
      )
        errors.push(`Invalid document role: ${work.slug}: ${document.url}`);
      if (!["pdf", "image", "file"].includes(document.format))
        errors.push(`Invalid document format: ${work.slug}: ${document.url}`);
      if (document.format === "pdf" && !/\.pdf$/i.test(document.url))
        errors.push(`PDF extension mismatch: ${work.slug}: ${document.url}`);
      if (
        document.format === "image" &&
        !/\.(png|jpe?g|webp|gif|svg)$/i.test(document.url)
      )
        errors.push(`Image extension mismatch: ${work.slug}: ${document.url}`);
      checkPath(document.url, work.slug);
    }
    for (const shot of work.screenshots) {
      if (!shot.alt.trim() || shot.width <= 0 || shot.height <= 0)
        errors.push(`Invalid screenshot metadata: ${work.slug}: ${shot.src}`);
      checkPath(shot.src, work.slug);
    }
  }
  return errors;
}
