import type { Project } from "./projects";

export const coursework: Project[] = [
  {
    slug: "sets-and-graph-theory-09-29",
    kind: "coursework",
    name: "集合与图论 · 9.29 作业",
    summary:
      "围绕习题 5.1—5.8，记录鸽巢原理在几何、整除与序列问题中的应用，以及组合计数与单调子序列的证明。附手写解答和题目截图。",
    problem:
      "完成题目截图中的 5.1—5.8：从正三角形内的点距问题，到连续整数和、仅由 0 与 7 构成的倍数、圆盘分段、数的选取与单调子序列。",
    myRole:
      "本人完成的集合与图论课程作业。原始手写解答以 PDF 保留，题目截图作为配套课程材料单独展示。",
    techStack: ["集合与图论", "鸽巢原理", "组合证明", "单调子序列"],
    architecture: [
      "5.1—5.3：通过区域划分与前缀和模余数分类，将几何距离和整除问题转化为鸽巢原理的应用。",
      "5.4—5.5：利用循环三项和及计数论证，讨论圆盘相邻三段与从 2n 个数中选取最大的 n 个数。",
      "5.6—5.7：构造配对、奇数部分分组和模 2n 的余数分组，证明差值、倍数及和差整除关系。",
      "5.8：以各位置结尾的递增、递减子序列长度构造有序对，通过反证法与鸽巢原理证明结论。",
    ],
    challenges: [
      "根据每道题的结论构造适当的分组，使同组元素满足所需关系。",
      "处理前缀和余数、圆盘首尾相邻和序列下标等边界。",
      "在单调子序列问题中，将序列长度限制转化为有限种有序对。",
    ],
    results: [
      "提供 6 页原始手写 PDF（含封面），记录习题 5.1—5.8 的证明过程。",
      "附题目原始截图，可与解答逐题对照。",
      "此处为个人课程作业记录，未附教师批改或成绩；证明内容以原稿为准。",
    ],
    screenshots: [
      {
        src: "/images/coursework/sets-and-graph-theory-09-29.png",
        alt: "集合与图论 9.29 作业手写解答第 2 页，包含习题 5.1、5.2 和 5.3 的证明",
        caption:
          "原始解答第 2 页：几何分组与模余数的证明思路。完整内容见下方 PDF。",
        width: 683,
        height: 882,
      },
      {
        src: "/files/sets-and-graph-theory-09-29/questions.png",
        alt: "集合与图论习题 5.1 至 5.8 的原始题目截图",
        caption: "课程题目截图：习题 5.1—5.8。",
        width: 980,
        height: 620,
      },
    ],
    status: "已完成 · 9.29 课程作业",
    featured: false,
    documentNote:
      "手写解答为本人作品；题目截图为课程材料。保留原始文件，方便对照阅读与下载。",
    documents: [
      {
        label: "我的手写解答",
        url: "/files/sets-and-graph-theory-09-29/solution.pdf",
        description: "本人作品 · 原始 PDF · 6 页（含封面）",
      },
      {
        label: "习题 5.1—5.8 题目截图",
        url: "/files/sets-and-graph-theory-09-29/questions.png",
        description: "课程材料 · 原始 PNG 图片",
      },
    ],
    evidence: [],
  },
  {
    slug: "corporate-finance-homework-1",
    kind: "coursework",
    name: "公司金融 · Homework 1",
    summary:
      "2026 秋季 Corporate Finance 课程作业：从现金流与货币时间价值，到资本预算、盈亏平衡和敏感性分析。附手写解答与课程要求原件。",
    problem:
      "围绕 Ross 等《Corporate Finance》第 11 版的相关习题，完成 4 道概念题和 5 组计算题，解释核心概念并记录计算步骤。",
    myRole:
      "本人完成的课程作业。解答以原始手写 PDF 展示；题目和课程指南单独标注为课程提供的参考材料。",
    techStack: ["Corporate Finance", "现金流", "NPV / IRR", "敏感性分析"],
    architecture: [
      "概念部分：永续年金与增长年金、企业组织形式、利率对年金价值的影响，以及企业价值目标。",
      "计算部分：经营现金流、现值与利率及期数、融资型现金流的 IRR 判断、项目 NPV。",
      "综合分析：会计盈亏平衡、基准现金流与 NPV、销量和单位变动成本的敏感性。",
    ],
    challenges: [
      "区分经营现金流与利润，并在项目现金流中考虑折旧和税收。",
      "根据融资型现金流的方向理解 IRR 与 NPV 决策。",
      "将销量和成本的变化转化为现金流及项目价值的变化。",
    ],
    results: [
      "提供 6 页原始手写解答，保留概念解释、计算步骤与结果。",
      "附 3 页作业题目和 1 页课程指南，便于对照阅读。",
      "此处为个人课程作品展示；未附教师批改或成绩，计算结果以原稿为准。",
    ],
    screenshots: [
      {
        src: "/images/projects/corporate-finance-homework-1.png",
        alt: "公司金融 Homework 1 原始手写解答第 2 页，包含概念题答案",
        caption: "原始解答第 2 页：概念题手写内容。完整 6 页请查看下方 PDF。",
        width: 683,
        height: 882,
      },
    ],
    status: "已完成 · 2026 秋季课程作业",
    documentNote:
      "解答为本人作品；作业题目与指南为课程材料。指南要求概念题每题不超过 100 词、按要点简答，计算题列出关键步骤和结果。",
    featured: false,
    documents: [
      {
        label: "我的手写解答",
        url: "/files/corporate-finance-homework-1/solution-1.pdf",
        description: "本人作品 · 原始 PDF · 6 页",
      },
      {
        label: "Homework 1 作业题目",
        url: "/files/corporate-finance-homework-1/homework-1.pdf",
        description: "课程材料 · 原始 PDF · 3 页",
      },
      {
        label: "课程作业指南",
        url: "/files/corporate-finance-homework-1/course-guideline.pdf",
        description: "课程材料 · 原始 PDF · 1 页",
      },
    ],
    evidence: [],
  },
];
