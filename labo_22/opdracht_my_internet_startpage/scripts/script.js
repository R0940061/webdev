const STORAGE_KEY = "internetStartpageHistory";

const commandInput = document.getElementById("commandInput");
const goButton = document.getElementById("goButton");
const historyGrid = document.getElementById("historyGrid");

const platforms = {
  "/g": {
    title: "Google",
    buildUrl: (query) => `https://www.google.com/search?q=${encodeURIComponent(query)}`
  },
  "/y": {
    title: "YouTube",
    buildUrl: (query) => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
  },
  "/x": {
    title: "X",
    buildUrl: (query) => `https://x.com/hashtag/${encodeURIComponent(query.replace(/\s+/g, ""))}`
  },
  "/i": {
    title: "Instagram",
    buildUrl: (query) => `https://www.instagram.com/explore/tags/${encodeURIComponent(query.replace(/\s+/g, ""))}/`
  }
};

let historyItems = loadHistory();
renderHistory();

goButton.addEventListener("click", handleGo);
commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGo();
  }
});

function handleGo() {
  const command = commandInput.value.trim();
  const parsed = parseCommand(command);

  if (!parsed) {
    alert("Ongeldig commando. Gebruik formaat '/x zoekopdracht'.");
    return;
  }

  const platform = platforms[parsed.prefix];
  if (!platform) {
    alert(`Onbekende prefix '${parsed.prefix}'. Gebruik /g, /y, /x of /i.`);
    return;
  }

  const item = {
    title: platform.title,
    text: parsed.query,
    url: platform.buildUrl(parsed.query)
  };

  window.open(item.url, "_blank", "noopener,noreferrer");
  historyItems.unshift(item);
  saveHistory();
  renderHistory();
  commandInput.value = "";
  commandInput.focus();
}

function parseCommand(value) {
  if (!value.startsWith("/")) {
    return null;
  }

  const firstSpace = value.indexOf(" ");
  if (firstSpace === -1) {
    return null;
  }

  const prefix = value.slice(0, firstSpace).trim();
  const query = value.slice(firstSpace + 1).trim();

  if (!/^\/[a-zA-Z]$/.test(prefix) || query.length === 0) {
    return null;
  }

  return { prefix: prefix.toLowerCase(), query };
}

function getCardClass(title) {
  switch (title) {
    case "Google":
      return "card-google";
    case "YouTube":
      return "card-youtube";
    case "X":
      return "card-x";
    case "Instagram":
      return "card-instagram";
    default:
      return "";
  }
}

function createHistoryCard(item) {
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-lg-4";

  const card = document.createElement("div");
  card.className = `card h-100 ${getCardClass(item.title)}`.trim();

  const body = document.createElement("div");
  body.className = "card-body d-flex flex-column";

  const title = document.createElement("h3");
  title.className = "card-title h5";
  title.textContent = item.title;

  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = item.text;

  const link = document.createElement("a");
  link.className = "history-link mt-auto";
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Go!";

  body.append(title, text, link);
  card.appendChild(body);
  col.appendChild(card);
  return col;
}

function renderHistory() {
  historyGrid.innerHTML = "";
  historyItems.forEach((item) => {
    historyGrid.appendChild(createHistoryCard(item));
  });
}

function loadHistory() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item) => item && typeof item.title === "string" && typeof item.text === "string" && typeof item.url === "string");
  } catch (error) {
    console.error("Kon history niet uit localStorage lezen.", error);
    return [];
  }
}

function saveHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historyItems));
}
