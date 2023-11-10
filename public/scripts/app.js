window.onload = function () {
  var topbtn = document.getElementById('btn')
  topbtn.onclick = function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
}
