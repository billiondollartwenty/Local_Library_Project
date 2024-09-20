function getTotalBooksCount(books) {
  //console.log("BOOKS", books.length);
  
  let total = 0;
  
  if (books.length > 0) {
    for (let i = 0; i < books.length; i++) {
      total = books.length;
    }
  } else if (books.length === 0) {
    //console.log("No books available.");
  }
  
  return total;
}

function getTotalAccountsCount(accounts) {
  // YOUR SOLUTION HERE
  let total = 0;
  
  for (let i = 0; i < accounts.length; i++) {
    total += 1;
  }
  
  return total;
}

function getBooksBorrowedCount(books) {
 // YOUR SOLUTION HERE 
 //console.log("BOOKS", books)
 // COUNT HOW MANY BOOKS ARE BORROWED
 // note: borrow.returned
 let count = 0;
 const borrowedBook = books.forEach((book)=>{
    //for each book in books do something
   // console.log("BOOK.BORROWS", book.borrows)
    //now act on each ellement in array
    book.borrows.forEach((borrow)=>{
      //check if borrow.returned is false
    //  console.log("TRUE or FALSE",borrow.returned)
      if(borrow.returned === false){
        count++
      }
    })
 }) 
//console.log("COUNT",count)
return count 
}

// Tbis is a helper function that's called by other functions inside this file. You don't have to edit it.
function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }

    return acc;
  }, {});

  const sorted = _sortObjectByValues(count);
  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});

  const sorted = _sortObjectByValues(groupById);
  return sorted
    .map((id) => {
      const { title: name } = books.find(({ id: bookId }) => bookId === id);
      return { name, count: groupById[id] };
    })
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }

    return acc;
  }, {});

  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }

  const sorted = _sortObjectByValues(count);
  return sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      const name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
