# How to Add Quiz 2, if I have already existing questions

To make Quiz 2, you add one entry to src/assessments/index.ts. If the three questions already exist, that's the only file you change.

1. Choose the three questions.
- Existing questions: use their id values. You'll find them at the top of each qNN_*.ts file, for example types-of-goods, market-equilibrium-mixed and economic-terms-dropdown.
- New questions: create each one first as src/questions/q11_description.ts, q12_… and so on, and add each to the questions array in src/questions/index.ts. The Readme walks through this.

2. Add Quiz 2 to src/assessments/index.ts. Copy the Quiz 1 entry, paste it after Quiz 1 inside the assessments array, and change:
- id: a new, unique value such as exam2. It's used in the URL and as the key for saved progress, so don't change it once students have started.
- title: "Quiz 2".
- description: whatever students should read before starting.
- mode: keep "exam". Each student gets one fixed variant per question and one attempt by default.
- questions: your three entries, each with a questionId and points. Add maxAttempts to any question that should allow more than one try.

3. Run npm run test. The tests catch a misspelled questionId or a broken new question. The existing check that "the exam has 3 questions" looks only at the first exam, Quiz 1, so adding Quiz 2 won't break it.

4. Run npm run dev. Quiz 2 appears on the home page automatically. Open it and try a question or two.

A question can be used in several assessments, so Quiz 2 can reuse questions from Exercise 1 or Quiz 1.