
let navigator
export function setNavigator(nav) {
  navigator = nav
}

export function navigate(e, params = {}) {
  if (navigator) {
    navigator.navigate(e, params)
  }
}

export function goBack() {
  if (navigator) {
    navigator.goBack()
  }
}