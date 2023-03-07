const newComment = async (event) => {
    event.preventDefault();

    const blog_id = event.target.getAttribute('data-id');
    const body = document.querySelector('#newComment').value.trim();
    console.log(blog_id)
    console.log(body)
    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({blog_id, body}),
        headers: {
            'Content-Type': 'application/json',
          },
    });

    if (response.ok){
        document.location.replace(`/blog/${blog_id}`);
    } else{
        alert("Failed to create the comment")
    }
};


document
  .querySelector('#newCommentForm')
  .addEventListener('submit', newComment);