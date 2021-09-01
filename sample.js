"use strict";
{
  const h1 = document.querySelector("h1");
  const number = document.getElementById("number");
  const retry = document.getElementById("retry-btn");

  window.addEventListener("load", () => {
    createRandomNumber();
    number.focus();
  });

  let answerNumber = [];
  function createRandomNumber() {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(i);
    }

    for (let i = 0; i < 4; i++) {
      let randomNumber = String(
        numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]
      );
      answerNumber.push(randomNumber);
    }
    return answerNumber;
  }

  const ok = document.getElementById("submit-btn");
  ok.addEventListener("click", () => {
    if (ok.classList.contains("disabled")) {
      return;
    } else {
      if (number.value.length !== 4) {
        alert("4桁の数字を入力してください");
        number.value = "";
        number.focus();
      } else {
        check();
        number.value = "";
        number.focus();
      }
    }
  });

  let checkNumber;
  let hit = 0;
  let blow = 0;
  let tryScore = 0;
  
  function check() {
    checkNumber = [...number.value];
    if (
      checkNumber[0] !== checkNumber[1] &&
      checkNumber[0] !== checkNumber[2] &&
      checkNumber[0] !== checkNumber[3] &&
      checkNumber[1] !== checkNumber[2] &&
      checkNumber[1] !== checkNumber[3] &&
      checkNumber[2] !== checkNumber[3]
    ) {
      hitJudge();
      return checkNumber;
    } else {
      alert('"異なる"4桁の数字を入力してください');
    }
  }

  function hitJudge() {
    hit = 0;
    blow = 0;
    for (let i = 0; i < 4; i++) {
      if (answerNumber[i] === checkNumber[i]) {
        hit += 1;
      }
      if (hit === 4) {
        h1.textContent = `クリア！ 試行回数${tryScore + 1}回`;
        ok.classList.add("disabled");
      }
    }
    blowJudge();
  }

  function blowJudge() {
    if (
      answerNumber[0] === checkNumber[1] ||
      answerNumber[0] === checkNumber[2] ||
      answerNumber[0] === checkNumber[3]
    ) {
      blow += 1;
    }
    if (
      answerNumber[1] === checkNumber[0] ||
      answerNumber[1] === checkNumber[2] ||
      answerNumber[1] === checkNumber[3]
    ) {
      blow += 1;
    }
    if (
      answerNumber[2] === checkNumber[0] ||
      answerNumber[2] === checkNumber[1] ||
      answerNumber[2] === checkNumber[3]
    ) {
      blow += 1;
    }
    if (
      answerNumber[3] === checkNumber[0] ||
      answerNumber[3] === checkNumber[1] ||
      answerNumber[3] === checkNumber[2]
    ) {
      blow += 1;
    }
    tryScore += 1;
    resultLabel();
  }

  function resultLabel() {
    const result = document.getElementById("result");
    const p = document.createElement("p");

    p.textContent = `${tryScore}: ${checkNumber.join(
      ""
    )}  ${hit}ヒット ${blow}ブロー`;
    result.appendChild(p);
  }

  retry.addEventListener("click", () => {
    answerNumber = [];
    createRandomNumber();
    hit = 0;
    blow = 0;
    tryScore = 0;
    ok.classList.remove("disabled");
    number.value = "";
    number.focus();
    document.querySelector("h1").textContent =
      "0〜9の4桁の異なる数を入力してね";
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
  });
}
