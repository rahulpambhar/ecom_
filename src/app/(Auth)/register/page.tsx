"use client"
import Link from "next/link";
import { useState } from 'react';
// import LoaderComponents from "@/components/Loader";
import { useRouter } from "next/navigation";
import { isLoginModel, setOpenCart } from '@/app/redux/slices/utilSlice';
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks';
import axios from "axios";
import { apiUrl } from "../../../../env"

const RegisterComponents = () => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState("abc");
    const [email, setEmail] = useState("abc@gmail.com");
    const [country_code, setCountry_code] = useState("91");
    const [mobile, setMobile] = useState("9090909090");
    const [address, setAddress] = useState("123 Abc");
    const [gender, setGender] = useState("male");
    const [password, setPassword] = useState("123");
    const [profile_pic, setProfile_pic] = useState("");
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    const isLoginModelOpen = useAppSelector((state) => state.utilReducer.isLoginModelOpen);

    const signup = async (e: any) => {
        e.preventDefault();
        try {

            let formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("country_code", country_code);
            formData.append("mobile", mobile);
            formData.append("gender", gender);
            formData.append("password", password);
            formData.append("profile_pic", profile_pic);
            formData.append("type", "add");


            const res = await axios.post(`http://localhost:3000/api/auth/users/signup`, formData,)
            console.log(res);
        } catch (e) {
            console.log('e::: ', e);
        }
    }



    return (
        <>
            {
                // loader && <LoaderComponents />
            }
            <div className="max-w-xl mx-auto mt-7 bg-white rounded-lg">
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-b-4 border-l-4 border-r-4 border-blue-500">
                    <h1 className="text-2xl mb-4 text-center">Registraion Form</h1>

                    <form className=" flex flex-col gap-3 bg-gray-200 p-4 rounded-lg shaddow-md" onSubmit={signup}>
                        <div className="mb-4">
                            <label htmlFor="email" className="bloc font-semibold">
                                Email ID
                            </label>
                            <input type="email" className="w-full px-2 py-1 border rounded mt-2" id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="name" className="bloc font-semibold">
                                User Name
                            </label>
                            <input type="text" className="w-full px-2 py-1 border rounded mt-2" id="name" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="bloc font-semibold">
                                Country Code
                            </label>
                            <input type="text" className="w-full px-2 py-1 border rounded mt-2" id="address"
                                value={country_code}
                                onChange={(e) => setCountry_code(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="bloc font-semibold">
                                Mobile
                            </label>
                            <input type="text" className="w-full px-2 py-1 border rounded mt-2" id="address"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="bloc font-semibold">
                                Address
                            </label>
                            <input type="text" className="w-full px-2 py-1 border rounded mt-2" id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="bloc font-semibold">
                                Gender
                            </label>
                            <input type="text" className="w-full px-2 py-1 border rounded mt-2" id="address"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="bloc font-semibold">
                                Passwrod
                            </label>
                            <input type="password" className="w-full px-2 py-1 border rounded mt-2" id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="">
                            <button className="bg-blue-500  text-white font-bold cursor-pointer px-6 py-4 w-full text-2xl"
                                type="submit">Register</button>
                        </div>
                    </form>
                    {
                        error && <div className="bg-red-500 text-white text-sm py-1 roundexd-sm mt-2 text-center">
                            {error}
                        </div>
                    }
                    <div className=" text-center mt-3">
                        <button onClick={() => dispatch(isLoginModel(!isLoginModelOpen))} className="fontFamily" >
                            Already have an account ? <span className="underline">Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterComponents;