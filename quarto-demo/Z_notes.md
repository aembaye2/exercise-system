# to create all version of documents (html and pdf, word, etc) and you will find them under h:
quarto render

# to create a only html version:
quarto render --to html
# to create a only pdf version:
quarto render --to pdf

# you can create chapters by createing ch01-intro.qmd files and editing them according to the rules; the files should be listed in the _quarto.yml File

# you can convert individual chapters to all versions like this:
quarto render ch04-consumer-theory.qmd
# or specific version:
quarto render ch04-consumer-theory.qmd --html


# copying built react app to assets folder
# copy everything from the built folder
Copy-Item -Path ".\react-app\dist\assets\*" -Destination ".\assets\dist\" -Recurse -Force

# quick check
Get-ChildItem -Path ".\assets\dist" -Recurse | Select-Object FullName,Length

# copying to z:/ drive:
robocopy .\_book Z:\public_html\teaching\doc_econ21003\_book /E /PURGE /R:2 /W:2