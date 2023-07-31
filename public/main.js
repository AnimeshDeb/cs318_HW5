const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector("#messageDiv");

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.',
        }),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Network response was not ok');
        })
        .then((response) => {
          console.log(response);
          if(response==="No quote to delete")
          {
            messageDiv.textContent="No quote to delete.";
          }
          else
          {
            window.location.reload(true);
          }
            
        })
        .catch(error=>console.error(error));
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Network response was not ok');
    })
    .then(response => {
        if (response.message === 'No quote to delete') {
            messageDiv.textContent = 'No Darth Vader quote to delete';
        } else {
            window.location.reload(true);
        }
    })
    .catch(error => console.error(error));
});