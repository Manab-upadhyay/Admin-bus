"use client"
import { result } from "lodash"
import { useState } from "react"

export default function Admin(){
const [Email,setemail]= useState()
const[password,setpassword]= useState()
function handdlechange(e){
    if(e.target.name=='email'){
        setemail(e.target.value)
    }
    if(e.target.name=='password'){
        setpassword(e.target.value)
    }


}
async function handdlesubmit(e){
    const data= {Email, password}
    e.preventDefault()

    const res = await fetch('http://localhost:3000/userauth',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      })
    const result= await res.json()

    console.log(result.body.message)
    if(result.body.message=='Success'){

        localStorage.setItem('token',result.token)
        window.location.reload()
    }
}
    return(
        <>
        <div>
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ml-96">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                login as admin
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" value={Email} onChange={handdlechange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={handdlechange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" onClick={handdlesubmit} className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
                 
              </form>
          </div>
      </div>
  </div>
</section>
        </div>
        
        </>
    )
}