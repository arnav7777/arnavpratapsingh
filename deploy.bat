@echo off
echo Copying source...
copy portfolio.html index.html
echo Obfuscating...
node obfuscate.js
echo Pushing to GitHub...
git add index.html
git commit -m "Update portfolio"
git push origin main
echo Done! Site will update in 1-2 mins.
pause