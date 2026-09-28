# Git Push Guide for subsequent times:
# First cd to root of the project directory:
cd C:\Users\aembaye\Documents\exercise-system

git add .
git commit -m "Update project"
git push

# If Git says there's no upstream branch
# If this is an existing repository but your current branch isn't connected to the remote yet:

git push -u origin main





## First-time Git push
From inside your project folder:

# 1. Initialize Git
git init

# 2. Add all your files
git add .

# 3. Create your first commit
git commit -m "Initial commit"

# 4. Connect your local project to your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 5. Make sure your branch is called main
git branch -M main

# 6. Push it to GitHub
git push -u origin main