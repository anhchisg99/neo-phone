import { Space } from "antd";
import {
  PhoneOutlined,
  ContactsOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import Link from "next/link";
type Item = {
  Key: number;
  Label: string;
};
export default function Header() {
  const items: Item[] = [
    {
      Key: 1,
      Label: "test",
    },
  ];
  return (
    <div className="flex place-content-between h-15  items-center pl-5 pr-5 bg-[#ffffff] text-black backdrop-blur-md sticky top-0 z-50 font-bold">
      <div className="Logo w-1/2 flex gap-3 items-center">
        <Link href={"/"}>
          <p className="text-4xl text-[#2031f8]">Neo Phone</p>
        </Link>

        <p className="">
          {/* <img src="phone.jpg " className='w-12 h-12 rounded-xl' alt="" /> */}
        </p>
      </div>
      <div className="right-header w-1/3">
        <ul className="flex justify-start gap-30 text-[#2031f8] items-center">
          <li>
            <Link href={"/login"}>
              <Space>
                <PhoneOutlined />
                <span className="pl-3">Login</span>
              </Space>
            </Link>
          </li>
          <li>
            <Link href={"/billing"}>
              <Space>
                <ContactsOutlined />
                <span className="pl-3">Buy Credit</span>
              </Space>
            </Link>
          </li>
          <li>
            <Space>
              <CreditCardOutlined />
              <span className="pl-3">Contact</span>
            </Space>
          </li>
        </ul>
      </div>
    </div>
  );
}
