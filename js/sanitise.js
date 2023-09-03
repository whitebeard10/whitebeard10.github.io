// Sanitize form data before submission
document.querySelector("form").addEventListener("submit", function (event) {
  // Prevent the form from submitting without JavaScript
  event.preventDefault();

  // Get the form data
  const form = event.target;
  const data = new FormData(form);

  // Remove any values in the data object that contain script tags or HTML
  for (const pair of data.entries()) {
    if (pair[1].match(/<script>|<\/script>|<\w+>|<\/\w+>/gi)) {
      data.delete(pair[0]);
    }
  }

  // Submit the sanitized data
  fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Thank you for your feedback!");
      form.reset();
    })
    .catch((error) => {
      console.error("There was a problem with the form submission:", error);
    });
});
