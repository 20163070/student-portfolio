"use client";

import { useState } from "react";
import type { CourseworkDocument } from "@/data/coursework-types";
import { assetPath } from "@/lib/site";

export const documentRoleLabels = {
  solution: "我的解答",
  assignment: "作业题目",
  material: "课程材料",
  other: "其他附件",
};

export function CourseworkDocuments({
  documents,
}: {
  documents: CourseworkDocument[];
}) {
  const [openUrl, setOpenUrl] = useState<string | null>(null);
  return (
    <ul className="mt-5 space-y-4">
      {documents.map((document, index) => {
        const open = openUrl === document.url;
        const previewId = "pdf-preview-" + index;
        const format =
          document.format === "pdf"
            ? "PDF"
            : document.format === "image"
              ? "图片"
              : "文件";
        return (
          <li
            className="rounded-xl border border-ink/15 bg-paper p-5"
            key={document.url}
          >
            <p className="text-xs font-semibold text-clay">
              {documentRoleLabels[document.role]} · {format}
            </p>
            <h3 className="mt-2 font-bold text-ink">{document.label}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              {document.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-clay">
              <a
                className="underline underline-offset-4"
                href={assetPath(document.url)}
              >
                查看{format} ↗
              </a>
              <a
                className="underline underline-offset-4"
                href={assetPath(document.url)}
                download
              >
                下载{format} ↓
              </a>
              {document.format === "pdf" && (
                <button
                  className="rounded-lg border border-clay/30 px-3 py-2 hover:bg-clay/10"
                  aria-expanded={open}
                  aria-label={
                    (open ? "收起预览" : "预览 PDF") + "：" + document.label
                  }
                  aria-controls={previewId}
                  onClick={() => setOpenUrl(open ? null : document.url)}
                >
                  {open ? "收起预览" : "预览 PDF"}
                  <span className="sr-only">：{document.label}</span>
                </button>
              )}
            </div>
            {document.format === "pdf" && (
              <div id={previewId} hidden={!open}>
                {open && (
                  <>
                    <p className="mt-4 text-sm leading-6 text-ink/70">
                      若浏览器无法显示内嵌预览，请使用
                      <a
                        className="font-semibold text-clay underline underline-offset-4"
                        href={assetPath(document.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        新窗口打开原文件
                      </a>
                      或下载阅读。
                    </p>
                    <object
                      className="mt-3 h-[65vh] min-h-[320px] w-full rounded-lg border border-ink/15 bg-cream"
                      data={assetPath(document.url)}
                      type="application/pdf"
                      aria-label={document.label + " PDF 预览"}
                    >
                      <p className="p-5 text-sm leading-6 text-ink">
                        当前浏览器不支持 PDF 预览。
                        <a
                          className="text-clay underline"
                          href={assetPath(document.url)}
                        >
                          打开原文件
                        </a>
                      </p>
                    </object>
                  </>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
