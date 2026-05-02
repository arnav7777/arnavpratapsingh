const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

let html = fs.readFileSync('portfolio.html', 'utf8');

html = html.replace(/<!--[\s\S]*?-->/g, '');

html = html.replace(/<script>([\s\S]*?)<\/script>/g, (match, script) => {
  if (!script.trim()) return match;
  try {
    const result = JavaScriptObfuscator.obfuscate(script, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.9,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.5,
      debugProtection: true,
      debugProtectionInterval: 4000,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      numbersToExpressions: true,
      renameGlobals: false,
      selfDefending: true,
      splitStrings: true,
      splitStringsChunkLength: 5,
      stringArray: true,
      stringArrayCallsTransform: true,
      stringArrayCallsTransformThreshold: 0.75,
      stringArrayEncoding: ['rc4'],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 5,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 5,
      stringArrayWrappersType: 'function',
      stringArrayThreshold: 0.9,
      transformObjectKeys: true,
      unicodeEscapeSequence: true,
    });
    return `<script>${result.getObfuscatedCode()}</script>`;
  } catch(e) {
    console.log('Warning: ' + e.message);
    return match;
  }
});

const blocker = `<script>
(function(){
  var t=new Date();
  debugger;
  if(new Date()-t>100){
    document.body.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#05030f;color:#a78bfa;font-family:monospace;font-size:1.2rem;flex-direction:column;gap:16px;"><div style="font-size:3rem;">🔒</div><div>DevTools access is restricted.</div></div>';
    setInterval(function(){var s=new Date();debugger;if(new Date()-s>100){document.body.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#05030f;color:#a78bfa;font-family:monospace;font-size:1.2rem;flex-direction:column;gap:16px;"><div style="font-size:3rem;">🔒</div><div>DevTools access is restricted.</div></div>';}},1000);
  }
  document.addEventListener('contextmenu',function(e){e.preventDefault();});
  document.addEventListener('keydown',function(e){
    if(e.keyCode===123||(e.ctrlKey&&e.shiftKey&&(e.keyCode===73||e.keyCode===74||e.keyCode===67))||(e.ctrlKey&&e.keyCode===85)){e.preventDefault();return false;}
  });
})();
</script>`;

html = html.replace(/\n\s*\n/g, '\n').replace(/^\s+/gm, '').replace(/\s{2,}/g, ' ').replace(/>\s+</g, '><');
html = html.replace('<body>', '<body>' + blocker);

fs.writeFileSync('index.html', html);
console.log('Done! Size: ' + (html.length/1024).toFixed(1) + ' KB');
