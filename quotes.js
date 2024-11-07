const apiKey = "cQ0q+2uXdEGN6YvdET56Dg==yA4hZZlQnRG44tqP"; // Replace with your API Ninjas key
async function getRandomQuote() {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": apiKey },
    });
    const data = await response.json();
    if (data.length > 0) {
      displayQuote(data[0]);
    } else {
      document.getElementById("quote").innerText = "No quotes available.";
      document.getElementById("author").innerText = "";
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    document.getElementById("quote").innerText = "Failed to load quote.";
    document.getElementById("author").innerText = "";
  }
}

function displayQuote(quote) {
  document.getElementById("quote").innerText = quote.quote;
  document.getElementById(
    "author"
  ).innerText = `                 - ${quote.author}`;
}

async function searchByAuthor() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();

  if (searchInput.trim() === "") {
    document.getElementById("quote").innerText =
      "Please enter an author’s name.";
    document.getElementById("author").innerText = "";
    return;
  }

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/quotes?author=${encodeURIComponent(
        searchInput
      )}`,
      {
        headers: { "X-Api-Key": apiKey },
      }
    );
    const data = await response.json();

    if (data.length > 0) {
      displayQuote(data[0]);
    } else {
      document.getElementById("quote").innerText =
        "No quotes found for this author.";
      document.getElementById("author").innerText = "";
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    document.getElementById("quote").innerText = "Failed to load quote.";
    document.getElementById("author").innerText = "";
  }
}

function tweetQuote() {
  const quoteText = document.getElementById("quote").innerText;
  const authorText = document.getElementById("author").innerText;
  const tweetContent = `${quoteText} ${authorText}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetContent
  )}`;
  window.open(tweetUrl, "_blank");
}

getRandomQuote();
