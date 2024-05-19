import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()

    const [form, setForm] = useState({site: "", username: "", password: ""})
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }
    
    useEffect(() => {
    //   let passwords = localStorage.getItem("passwords")
    //   if (passwords) {
    //     setPasswordArray(JSON.parse(passwords))
    //   }
        getPasswords()
    }, [])
    
    const showPassword = () => {
      if (ref.current.src.includes("icons/hide.png")) {
        ref.current.src = "icons/show.png"
        passwordRef.current.type = "password"
      }
      else {
        ref.current.src = "icons/hide.png"
        passwordRef.current.type = "text"
      }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({...form, id: uuidv4()})})
            setForm({site: "", username: "", password: ""})
            toast('Password Saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Error: Password Not Saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this entry?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id})})
            toast('Password Deleted', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const editPassword = async (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id})})
    }

    const handleChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
    }

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }
 
  return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition= 'Bounce'
        />
        <ToastContainer />
        <div className="p-3 md:container md:px-40 md:py-16 md:mx-auto min-h-[86vh]">
            <h1 className='text-4xl font-bold text-center text-[#D37676]'>KeyKeeper</h1>
            <p className='text-lg text-center text-[#EBC49F]'>Your Own Password Manager</p>
            <div className="flex flex-col p-4 gap-8 items-center">
                <input type="text" name='site' value={form.site} id='site' placeholder='Enter Website URL' className='rounded-full border border-[#2E2E2E] w-full px-4 py-1' onChange={handleChange}/>
                <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                    <input type="text" name='username' value={form.username} id='username' placeholder='Enter Username' className='rounded-full border border-[#2E2E2E] w-full px-4 py-1' onChange={handleChange}/>
                    <div className="relative">
                        <input ref={passwordRef} type="password" name='password' value={form.password} id='password' placeholder='Enter Password' className='rounded-full border border-[#2E2E2E] w-full px-4 py-1' onChange={handleChange}/>
                        <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                            <img ref={ref} className='p-1' width={26} src="icons/show.png" alt="show" />
                        </span>
                    </div>
                </div>
                <button className='flex justify-center items-center gap-2 bg-[#939190] text-[#F0EDE5] hover:bg-[#EBC49F] rounded-full px-4 py-2 w-fit border font-bold' onClick={savePassword}>
                    <img className='size-6' src="icons/save.png" alt="save" />
                    Save
                </button>
            </div>
            <div className="passwords">
                <h2 className='font-bold text-2xl py-4 text-[#2E2E2E]'>Your Passwords</h2>
                {passwordArray.length === 0 && <div>No passwords to show</div>}
                {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden mb-10'>
                    <thead className='bg-[#D37676] text-[#F0EDE5]'>
                        <tr>
                            <th className='py-2'>Site</th>
                            <th className='py-2'>Username</th>
                            <th className='py-2'>Password</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-[#F0EDE5] text-[#2E2E2E]'>
                        {passwordArray.map((item, index) => {
                            return <tr key={index}>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center'>
                                        <a href={item.site} target='_blank'>{item.site}</a>
                                        <img className='size-7 cursor-pointer w-6 h-6 pt-1 pl-1' src="icons/copy.png" alt="copy" onClick={() => {copyText(item.site)}}/>
                                    </div>
                                </td>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center'>
                                        <span>{item.username}</span>
                                        <img className='size-7 cursor-pointer w-6 h-6 pt-1 pl-1' src="icons/copy.png" alt="copy" onClick={() => {copyText(item.username)}}/>
                                    </div>
                                </td>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center'>
                                        <span>{"*".repeat(item.password.length)}</span>
                                        <img className='size-7 cursor-pointer w-6 h-6 pt-1 pl-1' src="icons/copy.png" alt="copy" onClick={() => {copyText(item.password)}}/>
                                    </div>
                                </td>
                                <td className='flex justify-center py-2 border border-white text-center'>
                                    <span className='cursor-pointer mx-1'>
                                        <img className='w-6 h-6' src="icons/edit.png" alt="edit" onClick={() => {editPassword(item.id)}}/>
                                    </span>
                                    <span className='cursor-pointer mx-1'>
                                        <img className='w-6 h-6' src="icons/delete.png" alt="delete" onClick={() => {deletePassword(item.id)}}/>
                                    </span>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>}
            </div>
        </div>
    </>
  )
}

export default Manager
