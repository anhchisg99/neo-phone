import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

export default function Success_Payment(){
    return <div className="m-auto max-w-200 border-2 text-center mt-50 p-10 rounded-3xl bg-[var(--main-color)]">

        <CheckCircleOutlined className="text-5xl "/>
        <p className="text-3xl mt-20">you are success payment!</p>
        <Link href={'/'}>
        <Button style={{padding:"25px",borderRadius:"30px",marginTop:"20px"}}>return to home page</Button>
        </Link>
    </div>
}