# source of adoption of the quatro book
This quatro book (focused html version to be put on static website) is adopted from the following repo: https://bookdown.org/jtkulas/bookexample/
or https://github.com/jtkulas/SBMAuthoring.git

The _quatro.yml file organizes the structure of the book, but from a vscode terminal, you can run the following command to build the book:

> quarto render 

This will create _book folder with all versions of the book (.html, .pdf, etc) 

For the .html version the entry point is index.html file; if you open that file in live browser, it links all the chapters; however, if you want to host it on a static website, you need to upload the entire _book folder to the server, with at least the .html files of the chapters, plus the assets folder containing any necessary CSS, JavaScript, and image files.

from here just experiment with the contents of the book by editing the .Rmd files in the chapters folder; Learn in particular how to do interactive quizes like students solving simultaneous equations and how to randomize the questions, with the ability to put input boxes, check-answer buttons, etc. Another things is how to run Jsxgraph code in the .Rmd files to create interactive graphs.
