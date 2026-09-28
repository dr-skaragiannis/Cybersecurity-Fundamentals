import type { Chapter } from "./types";
import ch01 from "./chapters/ch01";
import ch02 from "./chapters/ch02";
import ch03 from "./chapters/ch03";
import ch04 from "./chapters/ch04";
import ch05 from "./chapters/ch05";
import ch06 from "./chapters/ch06";
import ch07 from "./chapters/ch07";
import ch08 from "./chapters/ch08";
import ch09 from "./chapters/ch09";
import ch10 from "./chapters/ch10";
import ch11 from "./chapters/ch11";
import ch12 from "./chapters/ch12";
import ch13 from "./chapters/ch13";

import { ch01CliLab, ch01HandsOnLab, ch01Project, ch01Quiz } from "./extensions/ch01-ext";
import { ch02CliLab, ch02HandsOnLab, ch02Project, ch02Quiz } from "./extensions/ch02-ext";
import { ch03CliLab, ch03HandsOnLab, ch03Project, ch03Quiz } from "./extensions/ch03-ext";
import { ch04CliLab, ch04HandsOnLab, ch04Project, ch04Quiz } from "./extensions/ch04-ext";
import { ch05CliLab, ch05HandsOnLab, ch05Project, ch05Quiz } from "./extensions/ch05-ext";
import { ch06CliLab, ch06HandsOnLab, ch06Project, ch06Quiz } from "./extensions/ch06-ext";
import { ch07CliLab, ch07HandsOnLab, ch07Project, ch07Quiz } from "./extensions/ch07-ext";
import { ch08CliLab, ch08HandsOnLab, ch08Project, ch08Quiz } from "./extensions/ch08-ext";
import { ch09CliLab, ch09HandsOnLab, ch09Project, ch09Quiz } from "./extensions/ch09-ext";
import { ch10CliLab, ch10HandsOnLab, ch10Project, ch10Quiz } from "./extensions/ch10-ext";
import { ch11CliLab, ch11HandsOnLab, ch11Project, ch11Quiz } from "./extensions/ch11-ext";
import { ch12CliLab, ch12HandsOnLab, ch12Project, ch12Quiz } from "./extensions/ch12-ext";
import { ch13CliLab, ch13HandsOnLab, ch13Project, ch13Quiz } from "./extensions/ch13-ext";
import { appliedProjects } from "./applied-projects";

// Attach interactive labs, dual technical projects, and 10-question quizzes to all chapters
ch01.cliLab = ch01CliLab;
ch01.handsOnLab = ch01HandsOnLab;
ch01.technicalProject = ch01Project;
ch01.appliedProject = appliedProjects[1];
ch01.quiz = ch01Quiz;

ch02.cliLab = ch02CliLab;
ch02.handsOnLab = ch02HandsOnLab;
ch02.technicalProject = ch02Project;
ch02.appliedProject = appliedProjects[2];
ch02.quiz = ch02Quiz;

ch03.cliLab = ch03CliLab;
ch03.handsOnLab = ch03HandsOnLab;
ch03.technicalProject = ch03Project;
ch03.appliedProject = appliedProjects[3];
ch03.quiz = ch03Quiz;

ch04.cliLab = ch04CliLab;
ch04.handsOnLab = ch04HandsOnLab;
ch04.technicalProject = ch04Project;
ch04.appliedProject = appliedProjects[4];
ch04.quiz = ch04Quiz;

ch05.cliLab = ch05CliLab;
ch05.handsOnLab = ch05HandsOnLab;
ch05.technicalProject = ch05Project;
ch05.appliedProject = appliedProjects[5];
ch05.quiz = ch05Quiz;

ch06.cliLab = ch06CliLab;
ch06.handsOnLab = ch06HandsOnLab;
ch06.technicalProject = ch06Project;
ch06.appliedProject = appliedProjects[6];
ch06.quiz = ch06Quiz;

ch07.cliLab = ch07CliLab;
ch07.handsOnLab = ch07HandsOnLab;
ch07.technicalProject = ch07Project;
ch07.appliedProject = appliedProjects[7];
ch07.quiz = ch07Quiz;

ch08.cliLab = ch08CliLab;
ch08.handsOnLab = ch08HandsOnLab;
ch08.technicalProject = ch08Project;
ch08.appliedProject = appliedProjects[8];
ch08.quiz = ch08Quiz;

ch09.cliLab = ch09CliLab;
ch09.handsOnLab = ch09HandsOnLab;
ch09.technicalProject = ch09Project;
ch09.appliedProject = appliedProjects[9];
ch09.quiz = ch09Quiz;

ch10.cliLab = ch10CliLab;
ch10.handsOnLab = ch10HandsOnLab;
ch10.technicalProject = ch10Project;
ch10.appliedProject = appliedProjects[10];
ch10.quiz = ch10Quiz;

ch11.cliLab = ch11CliLab;
ch11.handsOnLab = ch11HandsOnLab;
ch11.technicalProject = ch11Project;
ch11.appliedProject = appliedProjects[11];
ch11.quiz = ch11Quiz;

ch12.cliLab = ch12CliLab;
ch12.handsOnLab = ch12HandsOnLab;
ch12.technicalProject = ch12Project;
ch12.appliedProject = appliedProjects[12];
ch12.quiz = ch12Quiz;

ch13.cliLab = ch13CliLab;
ch13.handsOnLab = ch13HandsOnLab;
ch13.technicalProject = ch13Project;
ch13.appliedProject = appliedProjects[13];
ch13.quiz = ch13Quiz;

export const chapters: Chapter[] = [
  ch01,
  ch02,
  ch03,
  ch04,
  ch05,
  ch06,
  ch07,
  ch08,
  ch09,
  ch10,
  ch11,
  ch12,
  ch13,
].sort((a, b) => a.n - b.n);

export { bookMeta, parts, preface, findings, analysisStats, principles, terminology } from "./frontmatter";
