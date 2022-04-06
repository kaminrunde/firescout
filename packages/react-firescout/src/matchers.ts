
export function containText (node:Element, val:string, inverse:boolean) {
  const text = node.textContent

  if(!inverse) {
    if(!text?.includes(val)) {
      return `"${text}" did not contain "${val}"`
    }
  }
  else {
    if(!!text?.includes(val)) {
      return `"${text}" did contain "${val}"`
    }
  }

  return null
}

export function haveValue (node:Element, val:string, inverse:boolean) {
  if(node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
    const value = node.value

    if(!inverse) {
      if(value !== val) {
        return `expected "${value}" to be "${val}"`
      }
    }
    else {
      if(value === val) {
        return `expected "${value}" not to be "${val}"`
      }
    }
  }
  else {
    return `can only extract values from Input and TextArea nodes`
  }

  return null
}