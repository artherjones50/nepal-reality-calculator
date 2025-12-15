async function calculate() {
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const marital = document.getElementById("marital").value;
  const employment = document.getElementById("employment").value;

  const resultEl = document.getElementById("result");
  resultEl.classList.remove("show");

  try {
    // Fetch the external data.json file
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("Could not fetch data.json");
    const data = await response.json();

    // Find matching group
    const group = data.find(item => item.gender === gender && item.age_group === age);

    if (!group) {
      resultEl.innerHTML = "<span class='error'>Data not available for this age/gender combination.</span>";
      setTimeout(() => resultEl.classList.add("show"), 50);
      return;
    }

    const match = group.bachelor[marital]?.[employment];

    if (!match || match === 0) {
      resultEl.innerHTML = "<span class='error'>Data not available for this combination.</span>";
      setTimeout(() => resultEl.classList.add("show"), 50);
      return;
    }

    const base = group.population;
    const percentage = ((match / base) * 100).toFixed(1);
    const oneIn = Math.round(base / match);

    // Emoji for fun
    let emoji = percentage > 50 ? "🎉" : percentage > 20 ? "🙂" : "😅";

    resultEl.innerHTML = `${emoji} <span class="highlight">${percentage}%</span> of ${gender.toLowerCase()}s aged ${age} who are ${marital.replace('_',' ')} and ${employment} 
      have a bachelor’s degree or higher (${match} people out of ${base}). That’s about 1 in ${oneIn} people.`;

    // Show result with animation
    setTimeout(() => resultEl.classList.add("show"), 50);

    // Confetti for percentages above 50%
    if (percentage > 50) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

  } catch (err) {
    console.error(err);
    resultEl.innerHTML = "<span class='error'>Error fetching data. Make sure data.json is in the same folder and you are using a local server.</span>";
    setTimeout(() => resultEl.classList.add("show"), 50);
  }
}
