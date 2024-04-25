// post request helper
export const postFn = async(post,d) =>{
    let response = await fetch(post,{
        method:'POST',
        mode:"cors",
        cache:"no-cache",
        credentials: "same-origin",
        headers:{"Content-Type":"application/json"},
        redirect:"follow",
        referrerPolicy:"no-referrer",
        body:JSON.stringify(d)
    })
    return response.json();
}
// post fetch Fn
export const postfetch = async(api,d) => {
    const response = await fetch(api,
    {
      method:'POST',
      mode:"cors",
      cache:"no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: { "Content-Type": "application/json"},
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body:JSON.stringify(d),
    })
    // testing postFetch
    return response.json()
}
