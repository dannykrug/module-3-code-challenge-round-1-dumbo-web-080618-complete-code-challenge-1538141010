document.addEventListener('DOMContentLoaded', function() {

  const yourUUID = `6fbe8f0d-6d3e-4a3b-a2a7-46dbdf182c40` //Enter your assigned uuid here

  const imageURL = `https://randopic.herokuapp.com/images/${yourUUID}`

  let imageId = 885 //Enter the id from the fetched image here

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage()

  function getImage() {
    fetch(imageURL)
    .then(res => res.json())
    .then(res => renderImage(res))
  }

  function renderImage(pic){
      const container = document.getElementById('image_card')
      const img = document.getElementById('image')
      const name = document.getElementById('name')
      const likes = document.getElementById('likes')
      const likeButton = document.getElementById('like_button')
      const commentTxt = document.getElementById('comments')


      img.src = pic.url
      name.innerText = pic.name
      likes.innerText = pic.like_count
      commentTxt.innerText = pic.comments.content

      likeButton.addEventListener('click', () => {
        const likeValue = {
            like_count: ++pic.like_count
          }
          const imageValue = {
            image_id:pic.id
          }
          updateLikes(pic.id,likeValue,imageValue)
          likes.innerText = pic.like_count
      })

      const submitButton = document.getElementById('submit-button')
      const comment = document.getElementById('comment_input')

      submitButton.addEventListener('click', () =>{
        let userComment = {
          image_id: pic.id,
          content: comment.value
        }
        newComments(userComment)
        commentTxt.innerText = comment.value

      })

    }

  function updateLikes (id, likeValue, imageValue) {
    return fetch(`https://randopic.herokuapp.com/likes`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(imageValue),
    })
    .then(response => response.json());
    }

    function newComments(comments){
    return fetch('https://randopic.herokuapp.com/comments', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comments),
    })
    .then(response => response.json())
  }







})
