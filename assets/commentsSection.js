const form = document.getElementById("commentForm");
const textarea = document.getElementById("commentText");
const btn = document.getElementById("commentSubmitBtn");
const videoContainerr = document.getElementById("videoContainer");

const handleSubmit = (event) => {
    event.preventDefault();
    const commentText = textarea.value;
    const videoId = videoContainerr.dataset.id;
    if(commentText === ""){
        return; 
    }
    fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comment: commentText
        }),
    })
    textarea.value = "";
}

btn.addEventListener("click", handleSubmit);