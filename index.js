const input = document.querySelector("#input");
const button = document.querySelector(".button");
const container = document.querySelector(".container");
const transliterationMap = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "'",
  э: "e",
  ю: "yu",
  я: "ya",
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "Yo",
  Ж: "Zh",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "Kh",
  Ц: "Ts",
  Ч: "Ch",
  Ш: "Sh",
  Щ: "Shch",
  Ъ: "",
  Ы: "Y",
  Ь: "'",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
};

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewWord();
  }
});

// Функция для транслитерации текста
function transliterate(text) {
  return text
    .split("")
    .map((char) => transliterationMap[char] || char)
    .join("");
}

button.addEventListener("click", addNewWord);

function addNewWord() {
  const indexes = document.querySelectorAll(".index");
  const newDiv = document.createElement("div");
  const newTranslit = document.createElement("div");
  const newIndex = document.createElement("span");
  const transliteratedText = transliterate(input.value);
  const newTranslitFull = document.createElement("div");
  const newFullText = document.createElement("div");
  const newDeleteButton = document.createElement("button");

  newDiv.className = "russian";
  newIndex.className = "index";
  newTranslit.className = "translit";
  newTranslitFull.className = "full";
  newDeleteButton.className = "deleteButton";

  newDeleteButton.style.backgroundImage = "url(./icons/cross.svg)";
  newDeleteButton.style.width = "20px";
  newDeleteButton.style.height = "20px";
  newDeleteButton.style.backgroundRepeat = "no-repeat";
  newTranslit.style.borderRadius = "0px"; 

  newDiv.innerText = input.value;
  newIndex.innerText = indexes.length + 1;
  newTranslit.innerText = transliteratedText;
  newTranslitFull.innerText = transliteratedText;
  

  newDeleteButton.addEventListener("click", () => {
    container.removeChild(newDiv);
    container.removeChild(newTranslit); 
    const indexes = document.querySelectorAll(".index");
    indexes.forEach((element, index) => {
      element.innerText = index + 1;
    });
  });

  // если строка пустая не добавлять ее в контайнер
  if (input.value === "") {
    return;
  }

  //убираем длинну слова больше 7 символов
  if (input.value.length > 7) {
    const shortValue = input.value.substring(0, 7) + "...";
    newDiv.innerText = shortValue;
    newTranslit.innerText = transliterate(shortValue);

    // Появление полного текста при наведении курсора для русского слова

    newFullText.className = "full";
    newFullText.innerText = input.value;
    newDiv.addEventListener("mouseenter", () => {
      newFullText.style.display = "block";
    });
    newDiv.addEventListener("mouseleave", () => {
      newFullText.style.display = "none";
    });
    // Появление полного текста при наведении курсора для транслита
    newTranslitFull.className = "full";
    newTranslit.addEventListener("mouseenter", () => {
      newTranslitFull.style.display = "block";
    });
    newTranslit.addEventListener("mouseleave", () => {
      newTranslitFull.style.display = "none";
    });

    newDiv.appendChild(newFullText);
    newTranslit.appendChild(newTranslitFull);
  }

  // Добавление элементов в DOM
  newDiv.prepend(newIndex);
  container.append(newDiv);
  container.append(newTranslit);
  newTranslit.appendChild(newDeleteButton);
  input.value = "";

  // Кнопка перезагрузки страницы HTML
  const reloadButton = document.querySelector(".btnDel");
  reloadButton.addEventListener("click", (event) => {
    window.location.reload();
  });
}
