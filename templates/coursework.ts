import type { Coursework } from "../src/data/coursework-types";

// Copy this entry into src/data/coursework.ts after adding actual public files.
// Omit semester/date/updatedAt/courseId when unconfirmed; never guess them.
export const courseworkTemplate: Coursework = {
  slug: "replace-with-stable-slug",
  title: "课程名称 · 作业标题",
  // courseId: "an-id-from-course-catalog",
  // semester: "已确认的学期",
  // assignmentNumber: "作业编号",
  // date: "YYYY-MM-DD", // confirmed complete date only
  // dateLabel: "9.29", // partial date; not used for date sorting
  summary: "作业范围与学习主题。",
  tags: ["知识点"],
  background: "原始作业描述。",
  myRole: "个人完成的内容与配套课程材料的区别。",
  topics: ["学习内容"],
  focus: ["分析重点"],
  notes: ["作品说明与真实性边界。"],
  status: "待本人确认",
  screenshots: [],
  documentNote: "标明哪些是个人解答，哪些是课程材料。",
  documents: [
    {
      label: "我的解答",
      url: "/files/replace-with-stable-slug/solution.pdf",
      description: "本人作品 · 原始 PDF",
      role: "solution",
      format: "pdf",
    },
  ],
};
