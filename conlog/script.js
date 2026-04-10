// @ts-nocheck
import { ConLog, ConLogStartMsg } from 'https://esm.sh/@codump/conlog'

// ConLog demo
const inputEl = document.getElementById("terminalInput")
const inputLog = document.getElementById("inputLog")
const outputLog = document.getElementById("outputLog")

function appendLine(container, text, cls="") {
  const div = document.createElement("div")
  div.textContent = text
  if (cls) div.classList.add("outputLine", cls)
  container.appendChild(div)
  container.scrollTop = container.scrollHeight
}
function ConLogColorToHTML (syntaxObject) {
  syntaxObject = syntaxObject.replaceAll(`[31m`, `<span style='color:red;'>`)
  syntaxObject = syntaxObject.replaceAll(`[32m`, `<span style='color:green;'>`)
  syntaxObject = syntaxObject.replaceAll(`[33m`, `<span style='color:yellow;'>`)
  syntaxObject = syntaxObject.replaceAll(`[34m`, `<span style='color:#006be6;'>`)
  syntaxObject = syntaxObject.replaceAll(`[35m`, `<span style='color:purple;'>`)
  syntaxObject = syntaxObject.replaceAll(`[36m`, `<span style='color:#00b8e6;'>`)
  syntaxObject = syntaxObject.replaceAll(`[37m`, `<span style='color:white;'>`)
  syntaxObject = syntaxObject.replaceAll(`[2m`, `<span style='opacity: 0.6;'>`)

  syntaxObject = syntaxObject.replaceAll(`[0m`, `</span>`)
  return syntaxObject
}

document.addEventListener("DOMContentLoaded", () => {
  inputEl.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const value = inputEl.value.trim();
      if (!value) return;

      appendLine(inputLog, `> ${value}`);

      // Simple parser for demo
      if (value.startsWith("ConLog(")) {
        const inside = value.match(/(?<=\().+?(?=\))/g) // get inside of ()
        const stringInputConst = String(inside)
        let stringInput = String(inside)

        const lastComma = stringInput.lastIndexOf(',')
        let resultType = stringInput.substring(lastComma + 1)

        stringInput = stringInput.replaceAll(resultType, ``)
        stringInput = stringInput.replace(/,\s*$/, ``) // last ,
        stringInput = stringInput.replace(/^"/, '') // first "
        stringInput = stringInput.replace(/"\s*$/, ``) // last "
        stringInput = stringInput.replace(/^'/, '') // first '
        stringInput = stringInput.replace(/'\s*$/, ``) // last '
        stringInput = stringInput.replace(/^`/, '') // first `
        stringInput = stringInput.replace(/`\s*$/, ``) // last `
        
        resultType = resultType.replaceAll(`\``, ``)
        resultType = resultType.replaceAll(`'`, ``)
        resultType = resultType.replaceAll(`"`, ``)
        //alert(`pre: ${resultType}`)
        
        if(resultType == 1 || resultType == ' er' || resultType == ` err` || resultType == ' error') {
          ConLog(stringInput, 1)
        } else if(resultType ==  2 || resultType == ` ok`) {
          ConLog(stringInput , 2)
        } else if(resultType ==  3 || resultType == ` wa` || resultType == ` war` || resultType == ` warn` || resultType == ` warning`) {
          ConLog(stringInput , 3)
        } else if(resultType ==  4 || resultType == ` so` || resultType == ` ob` || resultType == ` obj` || resultType == ` object` || resultType == ` showobject`) {
          stringInput = stringInput.replaceAll("`", `"`)
          stringInput = stringInput.replaceAll("'", `"`)
          const jsonStr = stringInput.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
            return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":'
          })
          const parsed = JSON.parse(jsonStr) //converts to a regular object
          ConLog(parsed , 4)
        } else {
          let stringInDefault = stringInputConst
          stringInDefault = stringInDefault.replace(/^"/, '') // first "
          stringInDefault = stringInDefault.replace(/"\s*$/, ``) // last "
          stringInDefault = stringInDefault.replace(/^'/, '') // first '
          stringInDefault = stringInDefault.replace(/'\s*$/, ``) // last '
          stringInDefault = stringInDefault.replace(/^`/, '') // first `
          stringInDefault = stringInDefault.replace(/`\s*$/, ``) // last `

          if(stringInDefault.includes("{") && stringInDefault.includes("}")) {
            stringInDefault = stringInDefault.replaceAll("`", `"`)
            stringInDefault = stringInDefault.replaceAll("'", `"`)
            const jsonStr = stringInDefault.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
              return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":'
            })
            const parsed = JSON.parse(jsonStr); //converts to a regular object
            ConLog(parsed)
          } else {
            ConLog(stringInDefault)
          }
        }
      } else if (value === "clear") {
        outputLog.innerHTML = ""
      } else {
        appendLine(outputLog, "System failed. Try: ConLog(`This is an error!`, `err`)", "nonSys")
      }

      inputEl.value = ""
    }
  })
})

// Console to outputLog
!function () {
  console.old = console.log,
  console.log = function () {
    var n, e, t = "";
    for (e = 0; e < arguments.length; e++)
      t += '<span class="log-' + typeof (n = arguments[e]) + '">',
      "object" == typeof n && "object" == typeof JSON && "function" == typeof JSON.stringify ? 
      t += JSON.stringify(n) : t += n, t += "</span>&nbsp;"
      t = ConLogColorToHTML(t)
      outputLog.innerHTML += t + "<br>", 
    console.old.apply(void 0, arguments)
  }
} (document.log);
// Console to outputLog
ConLogStartMsg(true)
ConLog(`String without a type being set`)
ConLog({ object: true, withoutType: true, conLog: [`system`, `error`, `ok`, `warning`, `object`] })
ConLog(`test1`, 1) 
ConLog(`test2`, 2)
ConLog(`test3`, 3)
ConLog({ userId: 123, status: `active`, permissions: [`read`, `write`] }, 4)
// ConLog demo