import {useState, useLayoutEffect, useEffect} from "react";
import serverConfig from '@/config'
import { useRouter } from "next/router";
import axios from "axios";

function Menu () {
    const [dimensions, setDimensions] = useState<{width:number, height:number}>()
    const [loginInfo, setLoginInfo] = useState<{id:string, password:string}>({
        id:"",
        password:""
    });

    const router = useRouter()
    useEffect(() => {
        setDimensions({
            width:window.innerWidth, 
            height:window.innerHeight
        });
        window.addEventListener("resize", (ev) => {
            setDimensions({
                width:window.innerWidth, 
                height:window.innerHeight
            })
        })
    }, [setDimensions])

    const login = async () => {
        console.log((await axios.get(`http://${serverConfig.publicAddr}:${serverConfig.frontendPort}/api/login`, {params:loginInfo})).data)
    }

    if(!dimensions) {
        return <>Loading...</>
    }
    if(dimensions.width < 758) {
        return <div>small</div>
    } else {
        return <div>
                <label htmlFor="id">ID</label><input type="text" name="id" onChange={e => {setLoginInfo(state=>{return {...state, id:e.target.value}})}}/>
                <label htmlFor="password">PW</label><input type="text" name="password" onChange={e => {setLoginInfo(state=>{return {...state, password:e.target.value}})}}/>
                <button onClick={() => login()}>login</button>
        </div>
    }
}
export {Menu}
export default Menu