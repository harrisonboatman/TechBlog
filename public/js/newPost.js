const newPostHandle = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#newBlogTitle').value.trim();
    const content = document.querySelector('#newBlogBody').value.trim();
    console.log(title)
    console.log(content)


    const response = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
        document.location.replace('/')
        console.log("nice")
    }else {
        alert("Ya MESSED UP")
    }

}

document
    .querySelector('.newBlog-Form')
    .addEventListener('submit', newPostHandle);