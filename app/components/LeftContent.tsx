"use client"
import { useState } from "react"
import { Button } from "antd"
import {ArrowRightOutlined} from '@ant-design/icons';


export default function LeftContent(){
    const [headingContent,setHeadingContent] = useState("Cheap internaltional calls in your")
    const [middleContent,setMiddleContent] = useState("Call clients, banks, government offices, or any number worldwide. Pay only for what you use. No contracts or hidden fees")
    const [bottomContent,setBottomContent] = useState("From only 0.02 USD per minute!")
    const [hintContent,setHintContent] = useState("50x cheaper than your carrier")
    function handleContent(e:any){
        console.log('testing: ',e.target.value);
        

    }
    return <div className="w-2/3 text-black ">
        <h1 className="text-5xl font-bold w-80 leading-normal pb-7">{headingContent}</h1>
        <p className="text-2xl pb-7 w-3/4">{middleContent}</p>
        {/* <Button className="" type="primary">Call anyone in VietNam</Button> */}
        <div className="pb-5">

        <button className="p-5 border rounded-4xl bg-[#2031f8] font-bold text-white">Call anyone in the worldwide <ArrowRightOutlined /></button>
        </div>
        <p className="text-zinc-500 font-bold">{bottomContent}</p>
        <p className="text-zinc-500 text-[14px] font-bold rounded-xl border-1 inline-block p-2 bg-orange-200 mt-5">{hintContent}</p>

    </div>
}