 # How do I build the library for this project and use it in the quarto document ./Econ30303-quarto-book/assets? just tell me the process once I make edit to the library

No existing copy script — it's a manual copy right now. Here's the process:

1. Build the library
npm run build:lib
This runs tsc then Vite in library mode, producing dist-lib/exercise-system.js and dist-lib/exercise-system.css.

2. Copy the two output files into the Quarto book's assets folder, overwriting the old ones:
cp dist-lib/exercise-system.js dist-lib/exercise-system.css Econ30303-quarto-book/assets/exercise-system/
# or on PowerShell: 
Copy-Item dist-lib\exercise-system.js,dist-lib\exercise-system.css quarto-demo\assets\exercise-system\ -Force


3. Re-render the book
cd quarto-demo
quarto render


# copying to another Quarto book:
Copy-Item dist-lib\exercise-system.js,dist-lib\exercise-system.css "C:\Users\aembaye\OneDrive - University of Arkansas\C2-embaye\Teaching\00_AllCourses\Ec_21003\Econ21003-quarto-book\assets\exercise-system\" -Force