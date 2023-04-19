import { bookCardMyPage } from "./mypage.js"
import { calcRate } from "./starRating.js"
import { updateGrade } from "./api.js"


export function sortRatedList(obj, value) {
  if (value === "author") {
    let sortedObj = [...obj].sort(sortByAuth)
    return sortedObj
      
  } else if(value === "title") {
    let sortedObj = [...obj].sort(sortByTitle)
    return sortedObj
      
  } else if (value === "rating") {
    let sortedObj = [...obj].sort((a, b) => {
      return b.book.sumGrade - a.book.sumGrade
    })
    return sortedObj
  }
    return obj
}



// sort by author (make dynamic)
export function sortByAuth(a,b) {
    if ( a.book.author < b.book.author ){
      return -1;
    }
    if ( a.book.author > b.book.author ){
      return 1;
    }
    return 0;
}


// sort by title 
export function sortByTitle(a,b) {
    if ( a.book.title < b.book.title ){
      return -1;
    }
    if ( a.book.title > b.book.title ){
      return 1;
    }
    return 0;
}



export async function ratedList(obj) {
  if (obj.length > 0) {
    obj.forEach(book => {
      let sumGrade
      let grades = book.book.review.map(x => x.grade)
      let grade = calcRate(grades)
      if (grade) {
        sumGrade = updateGrade(grade, book.book.id)
      }
      bookCardMyPage(book.book, grade, "#gradedWrapper")
    })
  } 
}

