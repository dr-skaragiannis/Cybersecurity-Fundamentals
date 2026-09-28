import type { Block, Chapter, Lang, QuizQuestion } from "../content/types";
import { bookMeta, chapters, parts, preface, principles, terminology } from "../content/book";
import { t } from "../i18n";

/** Helper to parse markdown-like bold (**text**), italic (*text*), and code (`code`) into pure HTML */
function parseInline(text: string): string {
  if (!text) return "";
  let out = String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold **...**
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Inline code `...`
  out = out.replace(/`([^`]+)`/g, "<code class=\"inline-code\">$1</code>");
  // Italic *...*
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return out;
}

function resolveLangArray<T>(val: any, lang: Lang): T[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (val[lang] && Array.isArray(val[lang])) return val[lang];
  if (val.el && Array.isArray(val.el)) return val.el;
  if (val.en && Array.isArray(val.en)) return val.en;
  return [];
}

function resolveLangString(val: any, lang: Lang): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (val[lang] && typeof val[lang] === "string") return val[lang];
  if (val.el && typeof val.el === "string") return val.el;
  if (val.en && typeof val.en === "string") return val.en;
  return String(val);
}

function renderBlock(b: Block): string {
  if (typeof b === "string") {
    return `<p class="prose-p">${parseInline(b)}</p>`;
  }

  if (b.t === "list") {
    const tag = b.ordered ? "ol" : "ul";
    const cls = b.ordered ? "prose-ol" : "prose-ul";
    const items = b.items.map((it) => `<li>${parseInline(it)}</li>`).join("");
    return `<${tag} class="${cls}">${items}</${tag}>`;
  }

  if (b.t === "box") {
    const kindClass =
      b.kind === "example"
        ? "callout-example"
        : b.kind === "key"
        ? "callout-key"
        : "callout-note";
    const icon = b.kind === "example" ? "💡" : b.kind === "key" ? "🔑" : "ℹ️";
    return `
      <aside class="callout ${kindClass}">
        <div class="callout-title">${icon} ${parseInline(b.title)}</div>
        <div class="callout-body">${parseInline(b.text)}</div>
      </aside>
    `;
  }

  if (b.t === "table") {
    const headers = b.head.map((h) => `<th>${parseInline(h)}</th>`).join("");
    const rows = b.rows
      .map(
        (r) =>
          `<tr>${r.map((c, idx) => `<td class="${idx === 0 ? "col-first" : ""}">${parseInline(c)}</td>`).join("")}</tr>`
      )
      .join("");

    return `
      <figure class="table-container">
        ${b.caption ? `<figcaption class="table-caption">${parseInline(b.caption)}</figcaption>` : ""}
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </figure>
    `;
  }

  return "";
}

export function generateStandaloneHtml(targetLang: Lang | "both" = "el"): string {
  const isDual = targetLang === "both";
  const primaryLang: Lang = isDual ? "el" : (targetLang === "en" ? "en" : "el");
  const docTitle = `${bookMeta.title[primaryLang]} - Complete Offline Edition`;

  // Render Frontmatter
  const renderedPreface = preface[primaryLang]
    .map((p) => `<p class="prose-p">${parseInline(p)}</p>`)
    .join("");

  const renderedDualPreface = isDual
    ? `
      <div class="dual-section" style="margin-top: 24px; border-top: 1px solid #cbd5e1; padding-top: 16px;">
        <h3 class="dual-subheading" style="color: #0d9488; font-size: 18px; margin-bottom: 12px;">Preface (English)</h3>
        ${preface.en.map((p) => `<p class="prose-p">${parseInline(p)}</p>`).join("")}
      </div>
    `
    : "";

  const renderedPrinciples = principles[primaryLang]
    .map((pr, i) => `
      <div class="principle-card">
        <div class="principle-num">${i + 1}</div>
        <div class="principle-text">${parseInline(pr)}</div>
      </div>
    `)
    .join("");

  const renderedGlossary = terminology
    .map(
      ([enTerm, elTerm]) => `
      <div class="glossary-item">
        <div class="term-en">🔤 ${parseInline(enTerm)}</div>
        <div class="term-el">🇬🇷 ${parseInline(elTerm)}</div>
      </div>
    `
    )
    .join("");

  // Render Table of Contents
  const renderedToc = parts
    .map((p) => {
      const partChapters = chapters.filter((c) => c.part === p.n);
      return `
        <div class="toc-part">
          <div class="toc-part-header">
            <span class="toc-part-tag">${t("part", primaryLang)} ${p.n}</span>
            <span class="toc-part-title">${parseInline(p.title[primaryLang])}</span>
          </div>
          <p class="toc-part-blurb">${parseInline(p.blurb[primaryLang])}</p>
          <div class="toc-chapter-grid">
            ${partChapters
              .map(
                (c) => `
                <a href="#ch-${c.n}" class="toc-chapter-link">
                  <span class="toc-ch-num">${c.n < 10 ? "0" + c.n : c.n}</span>
                  <span class="toc-ch-info">
                    <span class="toc-ch-title">${parseInline(c.title[primaryLang])}</span>
                    <span class="toc-ch-hours">⏱️ ${c.hours} ${t("hours", primaryLang)} · 2h Lab · CLI · Quiz</span>
                  </span>
                </a>
              `
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");

  // Render Chapters
  const renderedChapters = chapters
    .map((ch) => {
      const part = parts.find((p) => p.n === ch.part);

      // Subsections
      const sectionsHtml = ch.sections
        .map((s) => {
          const bodyBlocks = resolveLangArray<Block>(s.body, primaryLang);
          const bodyHtml = bodyBlocks.map((b) => renderBlock(b)).join("");
          const dualBodyBlocks = resolveLangArray<Block>(s.body, "en");
          const dualBodyHtml = isDual
            ? `
              <div class="dual-section" style="margin-top: 20px; border-top: 1px dashed #cbd5e1; padding-top: 14px;">
                <h4 class="dual-subheading" style="color: #0d9488; font-size: 16px; margin-bottom: 10px;">${s.id} · ${parseInline(s.title.en)}</h4>
                ${dualBodyBlocks.map((b) => renderBlock(b)).join("")}
              </div>
            `
            : "";
          return `
            <section class="chapter-section" id="sec-${s.id}">
              <h3 class="section-title">
                <span class="sec-id">${s.id}</span>
                <span>${parseInline(resolveLangString(s.title, primaryLang))}</span>
              </h3>
              ${bodyHtml}
              ${dualBodyHtml}
            </section>
          `;
        })
        .join("");

      // Key terms
      const termList = resolveLangArray<{ term: string; def: string }>(ch.terms, primaryLang);
      const termsHtml = termList
        .map(
          (k) => `
          <div class="term-box">
            <div class="term-name">${parseInline(k.term)}</div>
            <div class="term-def">${parseInline(k.def)}</div>
          </div>
        `
        )
        .join("");

      // Summary
      const summaryList = resolveLangArray<string>(ch.summary, primaryLang);
      const summaryHtml = summaryList
        .map((it) => `<li>${parseInline(it)}</li>`)
        .join("");

      // Review questions
      const questionList = resolveLangArray<string>(ch.questions, primaryLang);
      const reviewQuestionsHtml = questionList
        .map((q, i) => `
          <div class="review-q-item">
            <span class="review-q-num">Q${i + 1}</span>
            <span class="review-q-text">${parseInline(q)}</span>
          </div>
        `)
        .join("");

      // CLI Lab
      const cliLabHtml = ch.cliLab
        ? `
          <section class="lab-block cli-lab-block" id="cli-lab-${ch.n}">
            <div class="lab-header cli-header">
              <div class="lab-badge">💻 ${primaryLang === "en" ? "SIMULATED CLI LAB" : "ΔΙΑΔΡΑΣΤΙΚΟ ΕΡΓΑΣΤΗΡΙΟ CLI"}</div>
              <h4 class="lab-title">${parseInline(resolveLangString(ch.cliLab.title, primaryLang))}</h4>
              <p class="lab-desc">${parseInline(resolveLangString(ch.cliLab.scenario, primaryLang))}</p>
              <div class="lab-meta">
                <span>⏱️ ~30 min</span>
                <span>🐚 ${ch.cliLab.initialPrompt || "analyst@ops:~$"}</span>
              </div>
            </div>
            <div class="tasks-container">
              ${(ch.cliLab.tasks || [])
                .map(
                  (t, idx) => `
                <div class="task-card">
                  <div class="task-head">
                    <span class="task-pill">Task ${idx + 1}</span>
                    <span class="task-name">${parseInline(resolveLangString(t.title, primaryLang))}</span>
                  </div>
                  <p class="task-instruction">${parseInline(resolveLangString(t.description, primaryLang))}</p>
                  ${
                    t.hint
                      ? `<div style="font-size: 12.5px; color: #b45309; background: #fef3c7; padding: 6px 12px; border-radius: 6px; margin: 8px 0;"><strong>💡 Hint:</strong> ${parseInline(resolveLangString(t.hint, primaryLang))}</div>`
                      : ""
                  }
                  <div class="command-box">
                    <div class="command-bar">terminal solution command</div>
                    <pre class="terminal-pre"><code>$ ${parseInline(t.solution || t.expectedCommand || "")}</code></pre>
                  </div>
                  <div class="task-validation">
                    <strong style="color: #059669;">✓ ${primaryLang === "en" ? "Success Verification:" : "Επαλήθευση Επιτυχίας:"}</strong>
                    <span>${parseInline(resolveLangString(t.successMessage, primaryLang))}</span>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </section>
        `
        : "";

      // 2-Hour Hands-on Lab
      const envItems = ch.handsOnLab ? resolveLangArray<string>(ch.handsOnLab.environment, primaryLang) : [];
      const checklistItems = ch.handsOnLab ? resolveLangArray<string>(ch.handsOnLab.verificationChecklist, primaryLang) : [];

      const handsOnLabHtml = ch.handsOnLab
        ? `
          <section class="lab-block hands-on-lab-block" id="lab2h-${ch.n}">
            <div class="lab-header hands-on-header">
              <div class="lab-badge">🧪 ${primaryLang === "en" ? "TECHNICAL HANDS-ON LAB (~2 HOURS)" : "ΤΕΧΝΙΚΟ ΕΡΓΑΣΤΗΡΙΟ (~2 ΩΡΕΣ)"}</div>
              <h4 class="lab-title">${parseInline(resolveLangString(ch.handsOnLab.title, primaryLang))}</h4>
              <p class="lab-desc">${parseInline(resolveLangString(ch.handsOnLab.overview, primaryLang))}</p>
              <div class="lab-meta">
                <span>⏱️ ${parseInline(resolveLangString(ch.handsOnLab.duration, primaryLang))}</span>
                <span>📋 ${(ch.handsOnLab.phases || []).length} ${primaryLang === "en" ? "Structured Phases" : "Δομημένες Φάσεις"}</span>
              </div>
            </div>

            <!-- Lab Environment -->
            <div class="lab-objectives" style="margin-bottom: 20px;">
              <h5 style="font-size: 14px; font-weight: 800; color: #0f766e; margin-bottom: 8px;">🖥️ ${primaryLang === "en" ? "Laboratory Environment & Topology" : "Περιβάλλον & Τοπολογία Εργαστηρίου"}</h5>
              <ul style="list-style: disc; margin-left: 20px; font-size: 13px; color: #334155;">
                ${envItems.map((env) => `<li>${parseInline(env)}</li>`).join("")}
              </ul>
            </div>

            <!-- 4 Lab Phases -->
            <div class="phases-container">
              ${(ch.handsOnLab.phases || [])
                .map((ph) => {
                  const phaseObj = resolveLangArray<string>(ph.objectives, primaryLang);
                  const phaseSteps = resolveLangArray<Block>(ph.steps, primaryLang);
                  return `
                <div class="phase-card">
                  <div class="phase-head">
                    <span class="phase-badge">Phase ${ph.phaseNumber}</span>
                    <span class="phase-name">${parseInline(resolveLangString(ph.title, primaryLang))}</span>
                    <span class="phase-duration">⏱️ ${parseInline(resolveLangString(ph.estimatedTime, primaryLang))}</span>
                  </div>
                  
                  <!-- Phase Objectives -->
                  <div style="font-size: 13px; color: #0f766e; margin-bottom: 12px; background: #f0fdfa; padding: 8px 12px; border-radius: 6px;">
                    <strong>🎯 ${primaryLang === "en" ? "Objectives:" : "Στόχοι:"}</strong>
                    <ul style="list-style: disc; margin-left: 20px; margin-top: 4px;">
                      ${phaseObj.map((o) => `<li>${parseInline(o)}</li>`).join("")}
                    </ul>
                  </div>

                  <div class="steps-container">
                    ${phaseSteps.map((st) => renderBlock(st)).join("")}
                  </div>
                </div>
              `;
                })
                .join("")}
            </div>

            <!-- Verification Checklist -->
            <div class="checklist-card">
              <h5 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">📋 ${primaryLang === "en" ? "Lab Verification Checklist" : "Λίστα Επαλήθευσης Εργαστηρίου"}</h5>
              <div class="checklist-grid">
                ${checklistItems
                  .map(
                    (item) => `
                  <div class="checklist-item">
                    <span class="check-box">☑</span>
                    <span>${parseInline(item)}</span>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </section>
        `
        : "";

      // Enterprise Technical Project
      const techDeliverables = ch.technicalProject ? resolveLangArray<string>(ch.technicalProject.deliverables, primaryLang) : [];

      const techProjectHtml = ch.technicalProject
        ? `
          <section class="project-block" id="proj1-${ch.n}">
            <div class="project-header">
              <div class="project-badge">🚀 ${primaryLang === "en" ? "ENTERPRISE TECHNICAL PROJECT" : "ΠΡΑΚΤΙΚΟ ΤΕΧΝΙΚΟ ΕΡΓΟ"}</div>
              <h4 class="project-title">${parseInline(resolveLangString(ch.technicalProject.title, primaryLang))}</h4>
              <p class="project-desc">${parseInline(resolveLangString(ch.technicalProject.scenario, primaryLang))}</p>
              <div class="project-meta">
                <span>⏱️ ${parseInline(resolveLangString(ch.technicalProject.duration, primaryLang))}</span>
                <span>🎯 ${primaryLang === "en" ? "Enterprise Grade Architecture" : "Αρχιτεκτονική Επιχειρησιακού Επιπέδου"}</span>
              </div>
            </div>

            <!-- Milestones with detailed specs -->
            <div class="milestones-container">
              <h5 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 14px;">📍 ${primaryLang === "en" ? "Implementation Milestones & Detailed Technical Specifications" : "Ορόσημα Υλοποίησης & Τεχνικές Προδιαγραφές"}</h5>
              ${(ch.technicalProject.milestones || [])
                .map((m) => {
                  const specLines = resolveLangArray<string>(m.detailedSpec, primaryLang);
                  return `
                <div class="milestone-card">
                  <div class="milestone-head">
                    <span class="milestone-num">M${m.milestoneNumber}</span>
                    <span class="milestone-title">${parseInline(resolveLangString(m.title, primaryLang))}</span>
                  </div>
                  <p class="milestone-desc">${parseInline(resolveLangString(m.description, primaryLang))}</p>
                  
                  ${
                    specLines.length > 0
                      ? `
                    <details class="spec-details" open>
                      <summary class="spec-summary">
                        ⚙️ ${primaryLang === "en" ? "Detailed Technical Specification & Edge Cases" : "Αναλυτική Τεχνική Προδιαγραφή & Edge Cases"}
                      </summary>
                      <div class="spec-content">
                        ${specLines.map((specLine) => `<p class="prose-p" style="font-size: 13px; margin-bottom: 8px;">${parseInline(specLine)}</p>`).join("")}
                      </div>
                    </details>
                  `
                      : ""
                  }
                  <div style="font-size: 12.5px; color: #4f46e5; margin-top: 10px; font-weight: 700;">
                    📦 ${primaryLang === "en" ? "Milestone Deliverable:" : "Παραδοτέο Οροσήμου:"} ${parseInline(resolveLangString(m.deliverable, primaryLang))}
                  </div>
                </div>
              `;
                })
                .join("")}
            </div>

            <!-- Deliverables -->
            <div class="deliverables-box" style="margin-top: 20px; background: #f8fafc; padding: 18px 22px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h5 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">📦 ${primaryLang === "en" ? "Required Deliverables" : "Παραδοτέα Έργου"}</h5>
              <ul style="list-style: disc; margin-left: 20px; font-size: 13px; color: #334155;">
                ${techDeliverables.map((d) => `<li>${parseInline(d)}</li>`).join("")}
              </ul>
            </div>
          </section>
        `
        : "";

      // Applied Security Engineering Project
      const appliedDeliverables = ch.appliedProject ? resolveLangArray<string>(ch.appliedProject.deliverables, primaryLang) : [];

      const appliedProjectHtml = ch.appliedProject
        ? `
          <section class="project-block applied-project-block" id="proj2-${ch.n}">
            <div class="project-header applied-header">
              <div class="project-badge">⚡ ${primaryLang === "en" ? "APPLIED SOFTWARE & TOOL ENGINEERING PROJECT" : "ΕΦΑΡΜΟΣΜΕΝΟ ΕΡΓΟ ΑΝΑΠΤΥΞΗΣ ΕΡΓΑΛΕΙΩΝ ΑΣΦΑΛΕΙΑΣ"}</div>
              <h4 class="project-title">${parseInline(resolveLangString(ch.appliedProject.title, primaryLang))}</h4>
              <p class="project-desc">${parseInline(resolveLangString(ch.appliedProject.scenario, primaryLang))}</p>
              <div class="project-meta">
                <span>⏱️ ${parseInline(resolveLangString(ch.appliedProject.duration, primaryLang))}</span>
                <span>🛠️ ${primaryLang === "en" ? "Software Engineering & Automation" : "Μηχανική Λογισμικού & Αυτοματοποίηση"}</span>
              </div>
            </div>

            <!-- Milestones with detailed specs -->
            <div class="milestones-container">
              <h5 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 14px;">📍 ${primaryLang === "en" ? "Engineering Milestones & Technical Prompts" : "Ορόσημα Ανάπτυξης & Τεχνικές Προδιαγραφές"}</h5>
              ${(ch.appliedProject.milestones || [])
                .map((m) => {
                  const specLines = resolveLangArray<string>(m.detailedSpec, primaryLang);
                  return `
                <div class="milestone-card">
                  <div class="milestone-head">
                    <span class="milestone-num">M${m.milestoneNumber}</span>
                    <span class="milestone-title">${parseInline(resolveLangString(m.title, primaryLang))}</span>
                  </div>
                  <p class="milestone-desc">${parseInline(resolveLangString(m.description, primaryLang))}</p>
                  
                  ${
                    specLines.length > 0
                      ? `
                    <details class="spec-details" open>
                      <summary class="spec-summary">
                        ⚙️ ${primaryLang === "en" ? "Detailed Technical Specification & Architecture" : "Αναλυτική Τεχνική Προδιαγραφή & Αρχιτεκτονική"}
                      </summary>
                      <div class="spec-content">
                        ${specLines.map((specLine) => `<p class="prose-p" style="font-size: 13px; margin-bottom: 8px;">${parseInline(specLine)}</p>`).join("")}
                      </div>
                    </details>
                  `
                      : ""
                  }
                  <div style="font-size: 12.5px; color: #d97706; margin-top: 10px; font-weight: 700;">
                    📦 ${primaryLang === "en" ? "Software Deliverable:" : "Παραδοτέο Λογισμικού:"} ${parseInline(resolveLangString(m.deliverable, primaryLang))}
                  </div>
                </div>
              `;
                })
                .join("")}
            </div>

            <!-- Deliverables -->
            <div class="deliverables-box" style="margin-top: 20px; background: #f8fafc; padding: 18px 22px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h5 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">📦 ${primaryLang === "en" ? "Required Software Deliverables" : "Παραδοτέα Λογισμικού & Τεκμηρίωση"}</h5>
              <ul style="list-style: disc; margin-left: 20px; font-size: 13px; color: #334155;">
                ${appliedDeliverables.map((d) => `<li>${parseInline(d)}</li>`).join("")}
              </ul>
            </div>
          </section>
        `
        : "";

      // 10-Question Quiz with Balanced Options & Detailed Answers
      const quizHtml = ch.quiz
        ? `
          <section class="quiz-block" id="quiz-${ch.n}">
            <div class="quiz-header">
              <div class="quiz-badge">📝 ${primaryLang === "en" ? "INTERACTIVE KNOWLEDGE QUIZ (10 MCQS)" : "ΚΟΥΙΖ ΑΞΙΟΛΟΓΗΣΗΣ (10 ΕΡΩΤΗΣΕΙΣ ΠΟΛΛΑΠΛΗΣ ΕΠΙΛΟΓΗΣ)"}</div>
              <h4 class="quiz-title">${primaryLang === "en" ? `Chapter ${ch.n} Assessment Examination` : `Εξέταση Αξιολόγησης Κεφαλαίου ${ch.n}`}</h4>
              <p class="quiz-desc">${primaryLang === "en" ? "10 balanced multiple-choice questions (A–E) with uniform answer distribution and rigorous technical distractors." : "10 ισοσκελισμένες ερωτήσεις 5 επιλογών (A–E) με ομοιόμορφη κατανομή και αυστηρές τεχνικές επιλογές."}</p>
            </div>

            <div class="questions-list">
              ${ch.quiz
                .map((q: QuizQuestion, qIdx: number) => {
                  const opts = resolveLangArray<string>(q.options, primaryLang);
                  const correctIdx = typeof q.correctIndex === "number" ? q.correctIndex : (q as any).correctAnswer ?? 0;
                  return `
                <div class="quiz-item-card">
                  <div class="quiz-question-head">
                    <span class="q-badge">Question ${qIdx + 1}</span>
                    <span class="q-text">${parseInline(resolveLangString(q.question, primaryLang))}</span>
                  </div>

                  <div class="options-grid">
                    ${opts
                      .map(
                        (opt: string, optIdx: number) => `
                      <div class="option-row">
                        <span class="option-key">${["A", "B", "C", "D", "E"][optIdx]}</span>
                        <span class="option-val">${parseInline(opt)}</span>
                      </div>
                    `
                      )
                      .join("")}
                  </div>

                  <details class="solution-details">
                    <summary class="solution-summary">
                      🎯 ${primaryLang === "en" ? "Show Answer Key & Pedagogical Solution" : "Εμφάνιση Σωστής Απάντησης & Αιτιολόγησης"}
                    </summary>
                    <div class="solution-content">
                      <div class="correct-answer-pill">
                        <strong>✓ ${primaryLang === "en" ? "Correct Option:" : "Σωστή Επιλογή:"}</strong>
                        <span class="key-letter">${["A", "B", "C", "D", "E"][correctIdx]}</span> — 
                        <span>${parseInline(opts[correctIdx] || "")}</span>
                      </div>
                      <div class="explanation-box">
                        <strong>💡 ${primaryLang === "en" ? "Pedagogical Rationale:" : "Αιτιολόγηση:"}</strong>
                        <p>${parseInline(resolveLangString(q.explanation, primaryLang))}</p>
                      </div>
                    </div>
                  </details>
                </div>
              `;
                })
                .join("")}
            </div>
          </section>
        `
        : "";

      return `
        <article class="chapter-article page-break-before" id="ch-${ch.n}">
          <!-- Chapter Banner -->
          <header class="chapter-header">
            <div class="chapter-top-bar">
              <span class="part-badge">${t("part", primaryLang)} ${ch.part} · ${parseInline(part?.title[primaryLang] || "")}</span>
              <span class="time-badge">${t("chapter", primaryLang)} ${ch.n} · ⏱️ ${ch.hours} ${t("hours", primaryLang)}</span>
            </div>
            <h2 class="chapter-title">${ch.n}. ${parseInline(resolveLangString(ch.title, primaryLang))}</h2>
            ${isDual ? `<h3 class="chapter-dual-title">${parseInline(resolveLangString(ch.title, "en"))}</h3>` : ""}
            <p class="chapter-subtitle">${parseInline(resolveLangString(ch.subtitle, primaryLang))}</p>
          </header>

          <!-- Learning Outcomes -->
          <div class="outcomes-box">
            <div class="outcomes-title">🎯 ${t("outcomes", primaryLang)}</div>
            <ul class="outcomes-list">
              ${resolveLangArray<string>(ch.outcomes, primaryLang).map((o) => `<li><strong>✓</strong> <span>${parseInline(o)}</span></li>`).join("")}
            </ul>
          </div>

          <!-- Chapter Intro -->
          <div class="chapter-intro">
            ${resolveLangArray<string>(ch.intro, primaryLang).map((p) => `<p class="prose-p">${parseInline(p)}</p>`).join("")}
          </div>

          <!-- Numbered Sections -->
          <div class="sections-container">
            ${sectionsHtml}
          </div>

          <!-- Key Terms -->
          <div class="terms-section">
            <h4 class="terms-title">📖 ${t("terms", primaryLang)}</h4>
            <div class="terms-grid">
              ${termsHtml}
            </div>
          </div>

          <!-- Chapter Summary -->
          <div class="summary-section">
            <h4 class="summary-title">📌 ${t("summary", primaryLang)}</h4>
            <ul class="summary-list">
              ${summaryHtml}
            </ul>
          </div>

          <!-- Review Questions -->
          <div class="review-questions-section">
            <h4 class="review-title">✍️ ${t("questions", primaryLang)}</h4>
            <div class="review-grid">
              ${reviewQuestionsHtml}
            </div>
          </div>

          <!-- CLI Simulated Lab -->
          ${cliLabHtml}

          <!-- 2-Hour Hands-on Lab -->
          ${handsOnLabHtml}

          <!-- Project 1: Enterprise Technical Project -->
          ${techProjectHtml}

          <!-- Project 2: Applied Security Tool Engineering Project -->
          ${appliedProjectHtml}

          <!-- 10 Multiple-Choice Questions Quiz -->
          ${quizHtml}
        </article>
      `;
    })
    .join("\n\n");

  // Assembling Full Self-Contained HTML Document
  return `<!DOCTYPE html>
<html lang="${primaryLang}" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${docTitle}</title>
  
  <style>
    /* =========================================================================
       COMPLETE STANDALONE EMBEDDED CSS (100% SELF-CONTAINED & OFFLINE READY)
       ========================================================================= */
    :root {
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-light: #64748b;
      --primary: #0d9488;
      --primary-dark: #115e59;
      --primary-light: #ccfbf1;
      --border: #e2e8f0;
      --border-dark: #cbd5e1;
      --code-bg: #0f172a;
      --code-text: #38bdf8;
      --accent-emerald: #059669;
      --accent-amber: #d97706;
      --accent-indigo: #4f46e5;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    /* Modern Custom Scrollbars */
    * {
      scrollbar-width: thin;
      scrollbar-color: rgba(13, 148, 136, 0.4) transparent;
    }

    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(148, 163, 184, 0.5);
      border-radius: 9999px;
      border: 1px solid transparent;
      background-clip: padding-box;
      transition: all 0.2s ease-in-out;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: rgba(13, 148, 136, 0.85);
      box-shadow: 0 0 6px rgba(13, 148, 136, 0.3);
    }
    
    body {
      font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
      background-color: var(--bg);
      color: var(--text-main);
      line-height: 1.7;
      font-size: 15px;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5, h6, .sans, nav, button, select, summary, .badge, .pill {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    code, pre, kbd, .mono, .inline-code {
      font-family: 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace;
    }

    .inline-code {
      background: #f1f5f9;
      color: #0f766e;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.9em;
      border: 1px solid #e2e8f0;
    }

    /* Offline Navigation Bar */
    .offline-navbar {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      color: white;
      padding: 12px 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 15px;
      color: #2dd4bf;
    }

    .nav-badge {
      background: rgba(45, 212, 191, 0.2);
      color: #5eead4;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
    }

    .nav-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .nav-select {
      background: #1e293b;
      color: #e2e8f0;
      border: 1px solid #334155;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      outline: none;
      cursor: pointer;
    }

    .btn-nav-print {
      background: #0d9488;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s;
    }
    .btn-nav-print:hover { background: #0f766e; }

    .btn-nav-top {
      background: #334155;
      color: #cbd5e1;
      border: none;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-nav-top:hover { background: #475569; }

    /* Main Container */
    .book-wrapper {
      max-width: 960px;
      margin: 30px auto 100px;
      background: var(--card-bg);
      padding: 50px 60px;
      border-radius: 24px;
      box-shadow: 0 10px 40px rgba(15, 23, 42, 0.06);
      border: 1px solid var(--border);
    }

    /* Cover Page */
    .cover-page {
      min-height: 850px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(135deg, #020617 0%, #042f2e 50%, #0f172a 100%);
      color: white;
      padding: 60px;
      border-radius: 20px;
      margin-bottom: 60px;
      border: 6px double #14b8a6;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    }

    .cover-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 20px;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #5eead4;
      font-weight: 700;
    }

    .cover-main {
      margin: auto 0;
      padding: 40px 0;
    }

    .cover-tag {
      display: inline-block;
      background: rgba(45, 212, 191, 0.2);
      border: 1px solid rgba(45, 212, 191, 0.4);
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1px;
      color: #2dd4bf;
      margin-bottom: 20px;
      text-transform: uppercase;
    }

    .cover-title {
      font-size: 44px;
      font-weight: 900;
      line-height: 1.15;
      color: #ffffff;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }

    .cover-dual-title {
      font-size: 28px;
      font-weight: 700;
      color: #5eead4;
      margin-bottom: 20px;
    }

    .cover-subtitle {
      font-size: 18px;
      color: #cbd5e1;
      max-width: 650px;
      line-height: 1.6;
    }

    .cover-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 24px;
      font-size: 13px;
      color: #94a3b8;
    }

    .author-name {
      font-size: 22px;
      font-weight: 800;
      color: #2dd4bf;
      margin-top: 4px;
    }

    /* Section Headings */
    .frontmatter-section {
      margin-bottom: 60px;
      padding-top: 20px;
    }

    .main-heading {
      font-size: 30px;
      font-weight: 900;
      color: var(--text-main);
      border-bottom: 2px solid var(--text-main);
      padding-bottom: 12px;
      margin-bottom: 24px;
    }

    .prose-p {
      margin-bottom: 18px;
      text-align: justify;
      color: #1e293b;
      line-height: 1.75;
      font-size: 15px;
    }

    .prose-ul, .prose-ol {
      margin: 16px 0 20px 24px;
      color: #1e293b;
    }
    .prose-ul li, .prose-ol li { margin-bottom: 8px; }

    /* Principles & Glossary */
    .principles-grid {
      display: grid;
      gap: 16px;
      margin-top: 20px;
    }

    .principle-card {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      background: #f8fafc;
      border: 1px solid var(--border);
      border-left: 4px solid var(--primary);
      padding: 16px 20px;
      border-radius: 12px;
    }

    .principle-num {
      background: var(--primary);
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 13px;
      flex-shrink: 0;
    }

    .glossary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 12px;
      margin-top: 20px;
    }

    .glossary-item {
      background: #ffffff;
      border: 1px solid var(--border);
      padding: 14px 18px;
      border-radius: 10px;
    }

    .term-en { font-weight: 700; color: #0f766e; font-size: 13px; }
    .term-el { color: #334155; font-size: 13px; margin-top: 4px; }

    /* TOC Layout */
    .toc-part {
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .toc-part-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .toc-part-tag {
      background: #0f172a;
      color: #38bdf8;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
    }

    .toc-part-title { font-size: 18px; font-weight: 800; color: var(--text-main); }
    .toc-part-blurb { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; }

    .toc-chapter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 12px;
    }

    .toc-chapter-link {
      display: flex;
      align-items: center;
      gap: 14px;
      background: #ffffff;
      border: 1px solid var(--border);
      padding: 12px 16px;
      border-radius: 10px;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s;
    }
    .toc-chapter-link:hover {
      border-color: var(--primary);
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.15);
      transform: translateY(-1px);
    }

    .toc-ch-num {
      background: #e6fffa;
      color: #0d9488;
      font-weight: 900;
      font-size: 16px;
      padding: 6px 12px;
      border-radius: 8px;
    }

    .toc-ch-info { display: flex; flex-direction: column; }
    .toc-ch-title { font-weight: 700; font-size: 14px; color: #0f172a; }
    .toc-ch-hours { font-size: 11px; color: #64748b; margin-top: 2px; }

    /* Chapter Articles */
    .chapter-article {
      margin-bottom: 80px;
      padding-top: 30px;
    }

    .chapter-header {
      background: #0f172a;
      color: white;
      padding: 36px 40px;
      border-radius: 18px;
      margin-bottom: 30px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    .chapter-top-bar {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      padding-bottom: 12px;
      margin-bottom: 16px;
      font-size: 12px;
      font-weight: 700;
      color: #5eead4;
      text-transform: uppercase;
    }

    .chapter-title {
      font-size: 32px;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.2;
    }

    .chapter-dual-title {
      font-size: 20px;
      color: #5eead4;
      font-weight: 700;
      margin-top: 6px;
    }

    .chapter-subtitle {
      font-size: 15px;
      color: #cbd5e1;
      margin-top: 10px;
    }

    .outcomes-box {
      background: #f0fdfa;
      border: 1px solid #99f6e4;
      border-left: 5px solid #0d9488;
      padding: 20px 24px;
      border-radius: 12px;
      margin-bottom: 30px;
    }

    .outcomes-title {
      font-weight: 800;
      font-size: 13px;
      color: #0f766e;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .outcomes-list {
      list-style: none;
      font-size: 13.5px;
      color: #134e4a;
    }
    .outcomes-list li { margin-bottom: 6px; display: flex; gap: 8px; }

    .chapter-section {
      margin-bottom: 40px;
    }

    .section-title {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-main);
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
      margin: 30px 0 16px;
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    .sec-id { color: var(--primary); font-family: monospace; font-size: 18px; }

    /* Callouts */
    .callout {
      border-radius: 14px;
      padding: 18px 22px;
      margin: 24px 0;
      border: 1px solid var(--border);
    }
    .callout-title { font-weight: 800; font-size: 13px; text-transform: uppercase; margin-bottom: 8px; }
    .callout-body { font-size: 14px; color: #1e293b; }
    
    .callout-example { background: #fffbeb; border-color: #fde68a; border-left: 4px solid #f59e0b; }
    .callout-example .callout-title { color: #b45309; }

    .callout-key { background: #f0fdfa; border-color: #99f6e4; border-left: 4px solid #0d9488; }
    .callout-key .callout-title { color: #0f766e; }

    .callout-note { background: #f8fafc; border-color: #cbd5e1; border-left: 4px solid #64748b; }
    .callout-note .callout-title { color: #334155; }

    /* Tables */
    .table-container { margin: 28px 0; }
    .table-caption { font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 8px; }
    .table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid var(--border); }
    .data-table { width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; }
    .data-table th { background: #0f172a; color: white; padding: 10px 14px; font-weight: 700; }
    .data-table td { padding: 10px 14px; border-top: 1px solid var(--border); color: #334155; }
    .data-table tr:nth-child(even) { background: #f8fafc; }
    .data-table .col-first { font-weight: 700; color: #0f172a; }

    /* Key Terms & Summary */
    .terms-section, .summary-section, .review-questions-section {
      background: #f8fafc;
      border: 1px solid var(--border);
      padding: 24px;
      border-radius: 16px;
      margin: 30px 0;
    }
    .terms-title, .summary-title, .review-title {
      font-size: 15px;
      font-weight: 800;
      text-transform: uppercase;
      color: #0f172a;
      margin-bottom: 16px;
    }
    .terms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 12px;
    }
    .term-box {
      background: white;
      border: 1px solid var(--border);
      padding: 12px 16px;
      border-radius: 10px;
    }
    .term-name { font-weight: 800; color: #0f766e; font-size: 13px; }
    .term-def { font-size: 12.5px; color: #475569; margin-top: 4px; }
    .summary-list { margin-left: 20px; font-size: 13.5px; color: #1e293b; }
    .summary-list li { margin-bottom: 8px; }
    .review-grid { display: grid; gap: 10px; }
    .review-q-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: white;
      border: 1px solid var(--border);
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
    }
    .review-q-num { font-weight: 800; color: #0d9488; }

    /* Labs & Projects */
    .lab-block, .project-block, .quiz-block {
      border-radius: 20px;
      border: 1px solid var(--border);
      padding: 32px;
      margin: 40px 0;
      background: white;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    }
    .lab-header, .project-header, .quiz-header {
      margin-bottom: 24px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 18px;
    }
    .lab-badge, .project-badge, .quiz-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .cli-header .lab-badge { background: #e0f2fe; color: #0284c7; }
    .hands-on-header .lab-badge { background: #d1fae5; color: #059669; }
    .project-badge { background: #ede9fe; color: #6d28d9; }
    .applied-header .project-badge { background: #fef3c7; color: #d97706; }
    .quiz-badge { background: #ccfbf1; color: #0f766e; }

    .lab-title, .project-title, .quiz-title { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
    .lab-desc, .project-desc, .quiz-desc { font-size: 14px; color: #475569; }
    .lab-meta, .project-meta { display: flex; gap: 16px; margin-top: 10px; font-size: 12px; font-weight: 700; color: #64748b; }

    .task-card, .phase-card, .milestone-card, .quiz-item-card {
      background: #f8fafc;
      border: 1px solid var(--border);
      padding: 20px 24px;
      border-radius: 14px;
      margin-bottom: 18px;
    }
    .task-head, .phase-head, .milestone-head, .quiz-question-head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }
    .task-pill, .phase-badge, .milestone-num, .q-badge {
      background: #0f172a;
      color: white;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
    }
    .task-name, .phase-name, .milestone-title, .q-text { font-size: 15px; font-weight: 800; color: #0f172a; }

    .command-box, .output-box {
      background: #090d16;
      border-radius: 8px;
      margin: 12px 0;
      overflow: hidden;
      border: 1px solid #1e293b;
    }
    .command-bar, .output-bar {
      background: #1e293b;
      color: #94a3b8;
      font-size: 10px;
      font-family: monospace;
      padding: 4px 10px;
      text-transform: uppercase;
      font-weight: 700;
    }
    .terminal-pre, .output-pre, .spec-pre {
      padding: 12px 14px;
      color: #38bdf8;
      font-size: 12px;
      line-height: 1.5;
      overflow-x: auto;
      white-space: pre-wrap;
    }
    .output-pre { color: #a7f3d0; }
    .spec-pre { background: #090d16; color: #fde047; padding: 14px; border-radius: 8px; font-size: 11.5px; }

    .spec-details, .solution-details {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 16px;
      margin-top: 14px;
    }
    .spec-summary, .solution-summary {
      cursor: pointer;
      font-weight: 700;
      font-size: 13px;
      color: #0f766e;
      outline: none;
    }
    .spec-content, .solution-content { margin-top: 12px; }

    /* Quiz Options & Answer */
    .options-grid {
      display: grid;
      gap: 8px;
      margin: 14px 0;
    }
    .option-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: white;
      border: 1px solid var(--border);
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
    }
    .option-key {
      background: #e2e8f0;
      color: #0f172a;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 11px;
      flex-shrink: 0;
    }
    .option-val { color: #334155; line-height: 1.5; }

    .correct-answer-pill {
      background: #d1fae5;
      border: 1px solid #6ee7b7;
      color: #065f46;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      margin-bottom: 8px;
    }
    .key-letter { font-weight: 900; background: #059669; color: white; padding: 2px 6px; border-radius: 4px; }
    .explanation-box { font-size: 12.5px; color: #334155; background: #f8fafc; padding: 10px 14px; border-radius: 8px; }

    .checklist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 10px;
      margin-top: 12px;
    }
    .checklist-item {
      background: white;
      border: 1px solid var(--border);
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .check-box { color: #059669; font-weight: bold; }

    /* Print & Pagination Styles */
    @page {
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
    }

    @media print {
      body { background: white !important; color: black !important; padding: 0 !important; font-size: 11pt !important; }
      .offline-navbar, .no-print, .btn-nav-top, .btn-nav-print { display: none !important; }
      .book-wrapper { max-width: 100% !important; margin: 0 !important; padding: 0 !important; border: none !important; box-shadow: none !important; }
      .page-break-before { page-break-before: always; break-before: page; }
      .page-break-after { page-break-after: always; break-after: page; }
      .avoid-break { page-break-inside: avoid; break-inside: avoid; }
      details { open: true !important; }
      details summary { display: none !important; }
    }
  </style>
</head>
<body>
  <!-- Offline Navigation Bar -->
  <header class="offline-navbar no-print">
    <div class="nav-brand">
      <span>🛡️ Cybersecurity 101</span>
      <span class="nav-badge">STANDALONE OFFLINE EDITION (${primaryLang.toUpperCase()})</span>
    </div>

    <div class="nav-controls">
      <select class="nav-select" onchange="if(this.value) location.hash = this.value;">
        <option value="">📖 ${primaryLang === "en" ? "Jump to Section / Chapter..." : "Μετάβαση σε Ενότητα / Κεφάλαιο..."}</option>
        <option value="#cover">00. ${primaryLang === "en" ? "Book Cover" : "Εξώφυλλο Βιβλίου"}</option>
        <option value="#preface">00. ${primaryLang === "en" ? "Preface" : "Πρόλογος"}</option>
        <option value="#principles">00. ${primaryLang === "en" ? "Principles of Security" : "Αρχές Ασφάλειας"}</option>
        <option value="#glossary">00. ${primaryLang === "en" ? "Core Glossary" : "Γλωσσάριο Όρων"}</option>
        <option value="#toc">00. ${primaryLang === "en" ? "Table of Contents" : "Πίνακας Περιεχομένων"}</option>
        ${chapters.map((c) => `<option value="#ch-${c.n}">Ch ${c.n}: ${c.title[primaryLang]}</option>`).join("")}
      </select>

      <button class="btn-nav-print" onclick="window.print()">
        🖨️ ${primaryLang === "en" ? "Print / Save PDF" : "Εκτύπωση / Αποθήκευση PDF"}
      </button>

      <button class="btn-nav-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
        ↑ Top
      </button>
    </div>
  </header>

  <!-- Complete Standalone Book Content Container -->
  <main class="book-wrapper">
    <!-- 1. BOOK COVER PAGE -->
    <section class="cover-page page-break-after" id="cover">
      <div class="cover-top">
        <span>${bookMeta.edition[primaryLang]}</span>
        <span>ISBN: 978-960-00-0000-0</span>
      </div>

      <div class="cover-main">
        <div class="cover-tag">Academic Textbook &amp; Laboratory Manual</div>
        <h1 class="cover-title">${bookMeta.title[primaryLang]}</h1>
        ${isDual ? `<div class="cover-dual-title">${bookMeta.title.en}</div>` : ""}
        <p class="cover-subtitle">${bookMeta.subtitle[primaryLang]}</p>
      </div>

      <div class="cover-footer">
        <div>
          <div>Author &amp; Curriculum Lead</div>
          <div class="author-name">${bookMeta.author}</div>
          <div style="font-size: 12px; margin-top: 2px;">Department of Informatics &amp; Cybersecurity</div>
        </div>
        <div style="text-align: right; line-height: 1.5;">
          <div>13 Chapters · 26+ Lab Hours</div>
          <div>26 Projects · 130 MCQs</div>
          <div>Complete Offline Edition 2026</div>
        </div>
      </div>
    </section>

    <!-- 2. PREFACE -->
    <section class="frontmatter-section page-break-before" id="preface">
      <h2 class="main-heading">${t("preface", primaryLang)}</h2>
      ${renderedPreface}
      ${renderedDualPreface}
    </section>

    <!-- 3. PRINCIPLES -->
    <section class="frontmatter-section page-break-before" id="principles">
      <h2 class="main-heading">${primaryLang === "en" ? "Guiding Pedagogical Principles" : "Καθοδηγητικές Αρχές & Μεθοδολογία"}</h2>
      <div class="principles-grid">
        ${renderedPrinciples}
      </div>
    </section>

    <!-- 4. CORE GLOSSARY -->
    <section class="frontmatter-section page-break-before" id="glossary">
      <h2 class="main-heading">${primaryLang === "en" ? "Core Terminology Concordance" : "Βασικό Γλωσσάριο & Αντιστοίχιση Όρων"}</h2>
      <div class="glossary-grid">
        ${renderedGlossary}
      </div>
    </section>

    <!-- 5. TABLE OF CONTENTS -->
    <section class="frontmatter-section page-break-before" id="toc">
      <h2 class="main-heading">${t("contents", primaryLang)}</h2>
      ${renderedToc}
    </section>

    <!-- 6. ALL 13 CHAPTERS WITH FULL CONTENT, LABS, PROJECTS & QUIZZES -->
    ${renderedChapters}
  </main>
</body>
</html>`;
}
