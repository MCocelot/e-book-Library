//geistzone
const getBorrowBook = async () => {
  try {
    const res = await fetch("http://localhost:5000/borrows?_expand=book")
    if (res.ok) {
      return await res.json();
    }
    else throw new Error('Error, cannot get book data')
  }
  catch (err) {
    console.log(err)
  }
}

const addBrBook = async (newBrBook) => {
  try {
    const res = await fetch('http://localhost:5000/borrows', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBrBook)
    })
    if (res.status === 201) {
      console.log('add successfully')            
      // const addedBrBook = await res.json()
      // brBooks.value.push(addedBrBook)
      // console.log(brBooks.value)
    } else throw new Error('cannot add!')
  } catch (err) {
    console.log(err)
  }
}

const deleteBorrowBook = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/borrows/${id}`, {
        method: 'DELETE'        })
    if (res.ok) {
        brBooks.value = brBooks.value.filter((br) => {
            return br.id !== id           
           })
    } else throw new error('Error, cannot delete data!')
} catch (error) {
    console.log(error)
}
}

export { getBorrowBook, addBrBook, deleteBorrowBook }

