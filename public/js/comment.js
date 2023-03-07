const newFormHandler = async function (event) {
  event.preventDefault();

  const body = document.querySelector('textarea[name="post-body"]').value;
  await fetch(`/api/comment`, {
    // Double check spelling between comment and comments
    method: "POST",
    body: JSON.stringify({
      body,
    }),
    headers: { "Content-Type": "application/json" },
  });

  document.location.replace("/dashboard");
};
// Use a question mark because possible there wont be new comment form if there
// are no posts, so this will prevent an error by stopping at the question mark
document
  .querySelector("#new-comment-form")
  ?.addEventListener("submit", newFormHandler);
