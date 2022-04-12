
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

export function haveCss (node:Element, key:string, val:string, inverse:boolean) {
  if(node instanceof HTMLElement) {
    const style = getComputedStyle(node)
    if(inverse && style[key as any] === val) {
      return `expected node not to have css-property "${key}" with value "${val}"`
    }
    if(!inverse && style[key as any] !== val) {
      return `expected node to have css-property "${key}" to have value "${val}" but got "${style[key as any]}"`
    }
  }
  else {
    return 'only HTML-Elements can have css property'
  }
  return null
}