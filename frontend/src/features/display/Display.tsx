import { Header } from "antd/es/layout/layout"
import DisplayTable from "./components/DisplayTable"
import { Select } from "antd"
import { Option } from "antd/es/mentions"
import { useState } from "react"
import { Link } from "react-router-dom"
import Flag from 'react-world-flags';

const Display = () => {
  const [language, setLanguage] = useState<string>('en');

  const handleLanguageChange = (value: string) => { 
    setLanguage(value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white"> 
        <Header className="w-full">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'white', fontSize: '18px' }}><Link to={"/"} >Dashboard</Link></div>
            <Select
              value={language}
              onChange={handleLanguageChange}
              style={{ width: 150 }}
            >
              
              <Option value="en">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Flag code="GB" style={{ width: 20, height: 15, marginRight: 8 }} />
                  English
                </div>
              </Option>
              <Option value="de">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Flag code="DE" style={{ width: 20, height: 15, marginRight: 8 }} />
                  Deutsch (German)
                </div>
              </Option>
            </Select>
          </div>
        </Header>
        <DisplayTable/>
    </div>
  )
}

export default Display