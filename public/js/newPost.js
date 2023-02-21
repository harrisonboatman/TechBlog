const newPostHandle = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#newBlogTitle').value.trim();
    const BlogBody = document.querySelector('#newBlogBody').value.trim();


    const blogResponse = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({ title, BlogBody }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (blogResponse.ok) {
        document.location.replace('/dashboard')
    }else {
        alert("Ya MESSED UP")
    }

}

document
    .querySelector('#newBlogForm')
    .addEventListener('submit', newPostHandle);