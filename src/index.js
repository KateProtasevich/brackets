module.exports = function check(str, bracketsConfig) {
  let special = /[\[\\\^\$\.\|\?\*\+\(\)\]]/g;
  let patternStart;
  let patternEnd;
  let patternEqual;
  let bracketsObject = {};

  function isBracketsCorrect() {
    reverseBracket();
    let bracketsStack = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i].match(patternStart)) {
          bracketsStack.push(str[i]);
        }  else if ( str[i].match(patternEqual) ) {
            if (str[i] == bracketsStack[bracketsStack.length-1]) {
              bracketsStack.pop();
            } else {
              bracketsStack.push(str[i]);
            }
          } else if ( str[i].match(patternEnd)) {
            if (bracketsStack.length == 0) {
              return false;
            }
            if (bracketsStack[bracketsStack.length-1] == bracketsObject[str[i]]) {
              bracketsStack.pop();
            } else {
              return false;
            }}
        }

        if (bracketsStack.length ==0) {
          return true;
        }
        return false;
    }

  function isEqualToConfig() {
    let emptyStr = str;
    let pattern;
    let congifArray = bracketsConfig.reduce((acc, val) => acc.concat(val), []);
    congifArray.forEach((item, i) => {
      if (item.match(special)) {
        pattern = new RegExp(`\\${item}`, 'g');
      } else {
        pattern = new RegExp(`${item}`, 'g');
      }
      emptyStr = emptyStr.replace(pattern, "");
    });
    return emptyStr=='';
  }

  function reverseBracket() {
    let special = /[\[\\\^\$\.\|\?\*\+\(\)\]]/g;
    let end = '';
    let start = '';
    let equal = '';
    let j = 0;

    bracketsConfig.forEach((item, i) => {
      if (item[0] != item[1] ) {
        let key;
        key = item[1];
        bracketsObject[key] = item[0];
        if (item[0].match(special)) {
          start = start + `\\${item[0]}`;
        } else {
          start = start + item[0];
        }
        if (item[0].match(special)) {
          end = end + `\\${item[1]}`;
        } else {
          end = end + item[1];
        }

        j++;
      } else {
        if (item[0].match(special)) {
          equal = equal + `\\${item[0]}`;
        } else {
          equal = equal + item[0];
        }
      }
    });
    end = `[${end}]`;
    start = `[${start}]`;
    equal = `[${equal}]`;
    patternStart = new RegExp(start, "g");
    patternEnd = new RegExp(end, "g");
    patternEqual = new RegExp(equal, "g");

  return bracketsObject;
  }

if (!(isEqualToConfig())) {
  return false;
}

if (bracketsConfig.length == 1 & bracketsConfig[0][0] == bracketsConfig[0][1] ) {
    return (str.length % 2 == 0)? (true):(false);
}

  return isBracketsCorrect();
}
