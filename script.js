function calculate() {
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;

  // Example hardcoded data (we’ll replace later)
  let base = 100000;
  let match = 3200;

  let percentage = (match / base * 100).toFixed(1);
  let oneIn = Math.round(base / match);

  document.getElementById("result").innerText =
    `${percentage}% of ${gender.toLowerCase()}s aged ${age} meet your criteria.
     That’s about 1 in ${oneIn} people.`;
}
